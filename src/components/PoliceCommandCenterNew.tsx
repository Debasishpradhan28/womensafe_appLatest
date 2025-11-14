import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Navigation,
  ArrowLeft,
  Phone,
  User,
  Send,
  Radio,
  Users,
  TrendingUp,
  Filter,
  Activity,
  ChevronLeft,
  X,
  Bell,
  Car,
  UserCircle2,
  Battery,
  Zap,
  Volume2,
  Settings,
  List,
  Target,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PoliceCommandCenterNewProps {
  onClose: () => void;
}

interface SOSCase {
  id: string;
  victimName: string;
  age: number;
  phone: string;
  location: string;
  coordinates: { lat: number; lng: number };
  distance: string;
  time: string;
  severity: 'critical' | 'high' | 'medium';
  status: 'active' | 'acknowledged' | 'dispatched' | 'resolved';
  guardians: { name: string; phone: string }[];
  movementSpeed?: string;
  batteryLevel?: number;
}

interface Responder {
  id: string;
  name: string;
  type: 'volunteer' | 'guardian';
  distance: string;
  distanceMeters: number;
  status: 'available' | 'responding';
}

interface PCRUnit {
  id: string;
  vehicleNumber: string;
  officers: string[];
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'available' | 'dispatched' | 'on-scene' | 'returning';
  distance?: string;
  eta?: string;
  assignedCaseId?: string;
}

export function PoliceCommandCenterNew({ onClose }: PoliceCommandCenterNewProps) {
  const [currentView, setCurrentView] = useState<'dashboard' | 'case-detail' | 'responders' | 'dispatch-room'>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'acknowledged' | 'dispatched' | 'resolved'>('all');
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [selectedProfileCaseId, setSelectedProfileCaseId] = useState<string | null>(null);
  
  // Mock SOS cases data
  const [cases, setCases] = useState<SOSCase[]>([
    {
      id: '1',
      victimName: 'Priya S.',
      age: 28,
      phone: '+91 98765 43210',
      location: 'Connaught Place, New Delhi',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      distance: '1.2 km',
      time: '2 min ago',
      severity: 'critical',
      status: 'active',
      movementSpeed: '4.5 km/h',
      batteryLevel: 45,
      guardians: [
        { name: 'Rajesh S. (Father)', phone: '+91 98765 43211' },
        { name: 'Meera S. (Mother)', phone: '+91 98765 43212' },
      ],
    },
    {
      id: '2',
      victimName: 'Anjali M.',
      age: 32,
      phone: '+91 98765 43220',
      location: 'Karol Bagh, New Delhi',
      coordinates: { lat: 28.6519, lng: 77.1900 },
      distance: '3.8 km',
      time: '15 min ago',
      severity: 'high',
      status: 'acknowledged',
      movementSpeed: '2.1 km/h',
      batteryLevel: 72,
      guardians: [
        { name: 'Arun M. (Husband)', phone: '+91 98765 43221' },
      ],
    },
    {
      id: '3',
      victimName: 'Sakshi R.',
      age: 24,
      phone: '+91 98765 43230',
      location: 'Nehru Place, New Delhi',
      coordinates: { lat: 28.5494, lng: 77.2501 },
      distance: '5.4 km',
      time: '28 min ago',
      severity: 'medium',
      status: 'dispatched',
      movementSpeed: '0.8 km/h',
      batteryLevel: 28,
      guardians: [
        { name: 'Sunita R. (Mother)', phone: '+91 98765 43231' },
      ],
    },
  ]);

  // Mock responders data
  const responders: Responder[] = [
    { id: '1', name: 'Kavya P.', type: 'volunteer', distance: '120m', distanceMeters: 120, status: 'available' },
    { id: '2', name: 'Neha K.', type: 'volunteer', distance: '280m', distanceMeters: 280, status: 'available' },
    { id: '3', name: 'Pooja S.', type: 'volunteer', distance: '350m', distanceMeters: 350, status: 'responding' },
    { id: '4', name: 'Aarti M.', type: 'volunteer', distance: '420m', distanceMeters: 420, status: 'available' },
    { id: '5', name: 'Rajesh S. (Father)', type: 'guardian', distance: '450m', distanceMeters: 450, status: 'responding' },
  ];

  // Mock PCR Units data
  const [pcrUnits, setPcrUnits] = useState<PCRUnit[]>([
    {
      id: 'PCR-01',
      vehicleNumber: 'DL 1P 4567',
      officers: ['SI Rakesh Kumar', 'Const. Amit Singh'],
      location: 'Connaught Place Station',
      coordinates: { lat: 28.6289, lng: 77.2065 },
      status: 'available',
      distance: '0.8 km',
      eta: '2 min',
    },
    {
      id: 'PCR-02',
      vehicleNumber: 'DL 1P 8901',
      officers: ['SI Priya Sharma', 'Const. Neha Verma'],
      location: 'Karol Bagh Station',
      coordinates: { lat: 28.6519, lng: 77.1900 },
      status: 'available',
      distance: '1.5 km',
      eta: '4 min',
    },
    {
      id: 'PCR-03',
      vehicleNumber: 'DL 1P 2345',
      officers: ['SI Vijay Rao', 'Const. Suresh Yadav'],
      location: 'Nehru Place Station',
      coordinates: { lat: 28.5494, lng: 77.2501 },
      status: 'dispatched',
      distance: '2.2 km',
      eta: '5 min',
      assignedCaseId: '3',
    },
    {
      id: 'PCR-04',
      vehicleNumber: 'DL 1P 6789',
      officers: ['SI Anjali Kapoor', 'Const. Rahul Mehra'],
      location: 'Lajpat Nagar Patrol',
      coordinates: { lat: 28.5677, lng: 77.2431 },
      status: 'available',
      distance: '3.1 km',
      eta: '7 min',
    },
  ]);

  // State for incoming alerts with sound
  const [incomingAlerts, setIncomingAlerts] = useState<SOSCase[]>([]);
  const [showAlertNotification, setShowAlertNotification] = useState(false);

  // Mock locations for demonstration
  const mockLocations = [
    { name: 'Lajpat Nagar Market', coordinates: { lat: 28.5677, lng: 77.2431 } },
    { name: 'Sarojini Nagar', coordinates: { lat: 28.5750, lng: 77.1954 } },
    { name: 'Hauz Khas Village', coordinates: { lat: 28.5494, lng: 77.1932 } },
    { name: 'Chandni Chowk', coordinates: { lat: 28.6506, lng: 77.2303 } },
    { name: 'Rajouri Garden', coordinates: { lat: 28.6410, lng: 77.1214 } },
  ];

  const mockNames = [
    { name: 'Divya K.', age: 26 },
    { name: 'Sneha T.', age: 29 },
    { name: 'Riya P.', age: 23 },
    { name: 'Kavita M.', age: 31 },
    { name: 'Pooja D.', age: 27 },
  ];

  // Function to simulate 6-tap SOS trigger
  const simulateSixTapSOS = () => {
    const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    
    const newCase: SOSCase = {
      id: `case-${Date.now()}`,
      victimName: randomName.name,
      age: randomName.age,
      phone: `+91 ${Math.floor(10000000 + Math.random() * 90000000)}`,
      location: randomLocation.name,
      coordinates: randomLocation.coordinates,
      distance: `${(Math.random() * 5 + 0.5).toFixed(1)} km`,
      time: 'Just now',
      severity: 'critical',
      status: 'active',
      movementSpeed: `${(Math.random() * 5 + 1).toFixed(1)} km/h`,
      batteryLevel: Math.floor(Math.random() * 60 + 20),
      guardians: [
        { name: 'Emergency Contact 1', phone: `+91 ${Math.floor(10000000 + Math.random() * 90000000)}` },
        { name: 'Emergency Contact 2', phone: `+91 ${Math.floor(10000000 + Math.random() * 90000000)}` },
      ],
    };

    // Add new case at the beginning of the array
    setCases([newCase, ...cases]);
    setFilter('active'); // Switch to active filter to show the new case
    
    // Add to incoming alerts in dispatch room
    setIncomingAlerts([newCase, ...incomingAlerts]);
    setShowAlertNotification(true);
    
    // Auto-switch to dispatch room view
    setCurrentView('dispatch-room');
    
    // Find and auto-alert nearest available PCR units
    autoAlertNearestPCR(newCase);
    
    // Hide notification after 5 seconds
    setTimeout(() => setShowAlertNotification(false), 5000);
  };

  // Function to auto-alert nearest PCR units
  const autoAlertNearestPCR = (sosCase: SOSCase) => {
    // Find available units and calculate distances
    const availableUnits = pcrUnits.filter(unit => unit.status === 'available');
    
    if (availableUnits.length > 0) {
      // For demo, alert the nearest unit
      const nearestUnit = availableUnits[0];
      // This would trigger a notification to the PCR unit in real implementation
      console.log(`Auto-alerting ${nearestUnit.id} for case ${sosCase.id}`);
    }
  };

  // Function to dispatch PCR unit to a case
  const dispatchPCRUnit = (unitId: string, caseId: string) => {
    setPcrUnits(pcrUnits.map(unit => 
      unit.id === unitId 
        ? { ...unit, status: 'dispatched', assignedCaseId: caseId }
        : unit
    ));
    setCases(cases.map(c => 
      c.id === caseId 
        ? { ...c, status: 'dispatched' }
        : c
    ));
  };

  const selectedCase = cases.find(c => c.id === selectedCaseId);
  const profilePanelCase = cases.find(c => c.id === selectedProfileCaseId);

  const filteredCases = filter === 'all' ? cases : cases.filter(c => c.status === filter);

  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentView('case-detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCaseId(null);
  };

  const handleOpenProfile = (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProfileCaseId(caseId);
    setShowProfilePanel(true);
  };

  const handleCloseProfile = () => {
    setShowProfilePanel(false);
    setSelectedProfileCaseId(null);
  };

  const handleAcknowledge = () => {
    if (selectedCaseId) {
      setCases(cases.map(c => c.id === selectedCaseId ? { ...c, status: 'acknowledged' } : c));
    }
  };

  const handleDispatch = () => {
    if (selectedCaseId) {
      setCases(cases.map(c => c.id === selectedCaseId ? { ...c, status: 'dispatched' } : c));
    }
  };

  const handleResolve = () => {
    if (selectedCaseId) {
      setCases(cases.map(c => c.id === selectedCaseId ? { ...c, status: 'resolved' } : c));
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-700 border-red-200';
      case 'acknowledged': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'dispatched': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Dashboard View
  const renderDashboard = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header with Tabs */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 pt-6 pb-2 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Shield className="w-8 h-8" />
              <h1 className="text-white">Sahaaya Police Control Room</h1>
            </div>
            <p className="text-white/80 text-sm">Real-time emergency monitoring & response dashboard</p>
          </div>

          {/* Simulate 6-Tap SOS Button */}
          <button
            onClick={simulateSixTapSOS}
            className="absolute top-6 right-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center gap-2 transition-colors shadow-lg"
          >
            <Bell className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Simulate 6-Tap SOS</span>
          </button>

          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-6 py-3 rounded-t-xl flex items-center gap-2 transition-all ${
                currentView === 'dashboard'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm">Cases</span>
            </button>
            <button
              onClick={() => setCurrentView('dispatch-room')}
              className={`px-6 py-3 rounded-t-xl flex items-center gap-2 transition-all relative ${
                currentView === 'dispatch-room'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm">Dispatch Room</span>
              {incomingAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {incomingAlerts.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              key={`active-${cases.filter(c => c.status === 'active').length}`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Active Cases</p>
                  <p className="text-slate-900 dark:text-slate-100 mt-1">{cases.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              key={`ack-${cases.filter(c => c.status === 'acknowledged').length}`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Acknowledged</p>
                  <p className="text-slate-900 dark:text-slate-100 mt-1">{cases.filter(c => c.status === 'acknowledged').length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              key={`res-${cases.filter(c => c.status === 'resolved').length}`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Resolved</p>
                  <p className="text-slate-900 dark:text-slate-100 mt-1">{cases.filter(c => c.status === 'resolved').length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Avg Response</p>
                  <p className="text-slate-900 dark:text-slate-100 mt-1">4.2 min</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {(['all', 'active', 'acknowledged', 'dispatched', 'resolved'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                  filter === status
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SOS Cases List */}
            <div className={`space-y-4 ${showProfilePanel ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              {filteredCases.length > 0 ? (
                filteredCases.map((sosCase, index) => (
                  <motion.div
                    key={sosCase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all relative overflow-hidden group"
                  >
                    {/* Red alert border for active/critical cases */}
                    {sosCase.status === 'active' && sosCase.severity === 'critical' && (
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 border-2 border-red-500 rounded-2xl pointer-events-none"
                      />
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1 cursor-pointer" onClick={() => handleViewCase(sosCase.id)}>
                        {/* Profile Avatar */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <UserCircle2 className="w-7 h-7 text-white" />
                          </div>
                          {/* Red alert indicator for active */}
                          {sosCase.status === 'active' && (
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                              }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full border-2 border-white flex items-center justify-center"
                            >
                              <Bell className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-slate-900 dark:text-slate-100">{sosCase.victimName}</h3>
                            <span className={`w-2 h-2 rounded-full ${getSeverityColor(sosCase.severity)} ${sosCase.status === 'active' ? 'animate-pulse' : ''}`} />
                          </div>
                          <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <span>{sosCase.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(sosCase.status)}`}>
                          {sosCase.status}
                        </div>
                        <button
                          onClick={(e) => handleOpenProfile(sosCase.id, e)}
                          className="text-blue-600 hover:text-blue-700 text-xs underline transition-colors"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <AlertCircle className={`w-3 h-3 ${sosCase.severity === 'critical' ? 'text-red-600' : sosCase.severity === 'high' ? 'text-orange-600' : 'text-yellow-600'}`} />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Priority</span>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-slate-100 capitalize">{sosCase.severity}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Distance</span>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-slate-100">{sosCase.distance}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Time</span>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-slate-100">{sosCase.time}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Speed</span>
                        </div>
                        <span className="text-xs text-slate-900 dark:text-slate-100">{sosCase.movementSpeed}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-900 dark:text-slate-100 mb-2">No Cases Found</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    All alerts in this category have been handled
                  </p>
                </div>
              )}
            </div>

            {/* Profile Panel - Right Sidebar */}
            <AnimatePresence>
              {showProfilePanel && profilePanelCase && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="lg:col-span-1"
                >
                  {/* Profile Header */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 sticky top-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-slate-900 dark:text-slate-100">Woman's Profile</h3>
                      <button
                        onClick={handleCloseProfile}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Profile Photo */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-3">
                        <UserCircle2 className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-slate-900 dark:text-slate-100 mb-1">{profilePanelCase.victimName}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{profilePanelCase.age} years old</p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Phone Number</p>
                          <p className="text-sm text-slate-900 dark:text-slate-100 truncate">{profilePanelCase.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Current Location</p>
                          <p className="text-sm text-slate-900 dark:text-slate-100">{profilePanelCase.location}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                          <Activity className="w-4 h-4 text-blue-600" />
                          <div className="flex-1">
                            <p className="text-xs text-slate-500 dark:text-slate-400">Speed</p>
                            <p className="text-sm text-slate-900 dark:text-slate-100">{profilePanelCase.movementSpeed}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                          <Battery className="w-4 h-4 text-blue-600" />
                          <div className="flex-1">
                            <p className="text-xs text-slate-500 dark:text-slate-400">Battery</p>
                            <p className="text-sm text-slate-900 dark:text-slate-100">{profilePanelCase.batteryLevel}%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-4">
                      <h4 className="text-sm text-slate-900 dark:text-slate-100 mb-3">Emergency Contacts</h4>
                      <div className="space-y-2">
                        {profilePanelCase.guardians.map((guardian, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-900 dark:text-slate-100 truncate">{guardian.name}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">{guardian.phone}</p>
                            </div>
                            <button className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex-shrink-0">
                              <Phone className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Case Info */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-4">
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                        <p className="text-xs text-red-600 dark:text-red-400 mb-1">Case ID</p>
                        <p className="text-sm text-slate-900 dark:text-slate-100">#{profilePanelCase.id}</p>
                      </div>
                    </div>

                    {/* Map Preview */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-4">
                      <h4 className="text-sm text-slate-900 dark:text-slate-100 mb-3">Live Location Preview</h4>
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-xl relative overflow-hidden">
                        {/* Victim marker */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                            className="absolute -inset-3 bg-red-500 rounded-full"
                          />
                          <div className="relative w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg" />
                        </div>

                        {/* Nearby Sahaaya users (blue dots) */}
                        <div className="absolute left-1/4 top-1/4 w-3 h-3 bg-blue-600 rounded-full border border-white shadow-sm" />
                        <div className="absolute right-1/3 top-1/3 w-3 h-3 bg-blue-600 rounded-full border border-white shadow-sm" />
                        <div className="absolute left-2/3 bottom-1/3 w-3 h-3 bg-blue-600 rounded-full border border-white shadow-sm" />

                        {/* Police vehicle (yellow dot) */}
                        <div className="absolute right-1/4 bottom-1/4 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                          <Car className="w-2 h-2 text-white" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          <span className="text-slate-600 dark:text-slate-400">Nearby (3)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span className="text-slate-600 dark:text-slate-400">Units (1)</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2">
                      <Button
                        onClick={() => {
                          setCases(cases.map(c => c.id === profilePanelCase.id ? { ...c, status: 'acknowledged' } : c));
                        }}
                        disabled={profilePanelCase.status !== 'active'}
                        className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Acknowledge
                      </Button>
                      <Button
                        onClick={() => {
                          setCases(cases.map(c => c.id === profilePanelCase.id ? { ...c, status: 'dispatched' } : c));
                        }}
                        disabled={profilePanelCase.status === 'active' || profilePanelCase.status === 'resolved'}
                        className="w-full h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-xl disabled:opacity-50"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Dispatch Units
                      </Button>
                      <Button
                        onClick={() => {
                          setCases(cases.map(c => c.id === profilePanelCase.id ? { ...c, status: 'resolved' } : c));
                        }}
                        disabled={profilePanelCase.status !== 'dispatched'}
                        className="w-full h-10 bg-green-600 hover:bg-green-700 text-white rounded-xl disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Resolved
                      </Button>
                      <Button
                        onClick={() => {
                          handleCloseProfile();
                          handleViewCase(profilePanelCase.id);
                        }}
                        className="w-full h-10 bg-slate-600 hover:bg-slate-700 text-white rounded-xl"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Full Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );

  // Case Detail View with Live Map
  const renderCaseDetail = () => {
    if (!selectedCase) return null;

    // Mock moving marker position
    const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.2090 });
    
    useEffect(() => {
      const interval = setInterval(() => {
        setMarkerPosition(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
        }));
      }, 2000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-6 text-white relative">
            <button
              onClick={handleBackToDashboard}
              className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-white mb-1">Case #{selectedCase.id}</h1>
              <p className="text-white/80 text-sm">Emergency SOS - {selectedCase.severity.toUpperCase()} Priority</p>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - Live Map */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900 dark:text-slate-100">Live Location Tracking</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-green-600">Live</span>
                    </div>
                  </div>

                  {/* Map Area */}
                  <div className="w-full h-96 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900" />
                    
                    {/* Trail Path */}
                    <svg className="absolute inset-0 w-full h-full">
                      <path
                        d="M 50,250 Q 150,200 250,220 T 450,240"
                        stroke="#0EA5E9"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="5,5"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Moving Marker - Victim */}
                    <motion.div
                      animate={{
                        x: [200, 220, 240, 260],
                        y: [200, 210, 195, 205],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute"
                      style={{ left: '40%', top: '50%' }}
                    >
                      <div className="relative">
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute -inset-4 bg-red-500 rounded-full"
                        />
                        <div className="relative w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Nearby Civilian Markers (Blue) */}
                    <div className="absolute left-1/4 top-1/3 w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow-md flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute right-1/3 top-1/4 w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow-md flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute left-2/3 bottom-1/3 w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow-md flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>

                    {/* Police Vehicle Marker (Yellow) */}
                    <div className="absolute bottom-16 right-16 w-8 h-8 bg-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <Car className="w-4 h-4 text-white" />
                    </div>

                    {/* Police Station Marker */}
                    <div className="absolute top-16 right-16 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-around text-xs mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full" />
                      <span className="text-slate-600 dark:text-slate-400">Victim</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <span className="text-slate-600 dark:text-slate-400">Civilians</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-slate-600 dark:text-slate-400">Police</span>
                    </div>
                  </div>

                  {/* Distance & ETA */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs text-blue-600 dark:text-blue-400">Distance</span>
                      </div>
                      <p className="text-blue-900 dark:text-blue-100">{selectedCase.distance}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-green-600 dark:text-green-400">ETA</span>
                      </div>
                      <p className="text-green-900 dark:text-green-100">3-5 min</p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-3 gap-4"
                >
                  <Button
                    onClick={handleAcknowledge}
                    disabled={selectedCase.status !== 'active'}
                    className="h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Acknowledge
                  </Button>
                  <Button
                    onClick={handleDispatch}
                    disabled={selectedCase.status === 'active' || selectedCase.status === 'resolved'}
                    className="h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Dispatch
                  </Button>
                  <Button
                    onClick={handleResolve}
                    disabled={selectedCase.status !== 'dispatched'}
                    className="h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Resolve
                  </Button>
                </motion.div>

                {/* View Responders Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={() => setCurrentView('responders')}
                    className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    View Nearby Responders (Within 500m)
                  </Button>
                </motion.div>
              </div>

              {/* Sidebar - Victim Details */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-slate-900 dark:text-slate-100 mb-4">Victim Profile</h3>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-slate-100">{selectedCase.victimName}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{selectedCase.age} years old</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                      <Phone className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Phone</p>
                        <p className="text-sm text-slate-900 dark:text-slate-100">{selectedCase.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                      <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Location</p>
                        <p className="text-sm text-slate-900 dark:text-slate-100">{selectedCase.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                      <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Time</p>
                        <p className="text-sm text-slate-900 dark:text-slate-100">{selectedCase.time}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <Activity className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Speed</p>
                          <p className="text-sm text-slate-900 dark:text-slate-100">{selectedCase.movementSpeed}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <Battery className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Battery</p>
                          <p className="text-sm text-slate-900 dark:text-slate-100">{selectedCase.batteryLevel}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Emergency Contacts */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-slate-900 dark:text-slate-100 mb-4">Emergency Contacts</h3>
                  
                  <div className="space-y-3">
                    {selectedCase.guardians.map((guardian, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <div>
                          <p className="text-sm text-slate-900 dark:text-slate-100">{guardian.name}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{guardian.phone}</p>
                        </div>
                        <Button size="sm" className="h-8 w-8 p-0 rounded-full bg-blue-600 hover:bg-blue-700">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Activity Log */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-slate-900 dark:text-slate-100 mb-4">Activity Log</h3>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-900 dark:text-slate-100">SOS Alert Triggered (6-Tap)</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{selectedCase.time}</p>
                      </div>
                    </div>

                    {selectedCase.status !== 'active' && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-900 dark:text-slate-100">Alert Acknowledged</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">3 min ago</p>
                        </div>
                      </div>
                    )}

                    {selectedCase.status === 'dispatched' && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                          <Send className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-900 dark:text-slate-100">Units Dispatched</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">1 min ago</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Responder View - Nearby Volunteers
  const renderResponders = () => {
    if (!selectedCase) return null;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 text-white relative">
            <button
              onClick={() => setCurrentView('case-detail')}
              className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-white mb-1">Nearby Responders</h1>
              <p className="text-white/80 text-sm">Volunteers & Guardians within 500m radius</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4">
            {/* Map Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-slate-900 dark:text-slate-100 mb-4">Location Overview</h3>
              
              <div className="w-full h-64 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900" />
                
                {/* Victim Marker (Center) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute -inset-8 bg-red-500 rounded-full"
                  />
                  <div className="relative w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Responder Markers */}
                {responders.slice(0, 5).map((responder, index) => {
                  const angle = (index * 2 * Math.PI) / 5;
                  const radius = 60 + Math.random() * 40;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);

                  return (
                    <motion.div
                      key={responder.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute"
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className={`w-6 h-6 rounded-full border-3 border-white shadow-lg flex items-center justify-center ${
                        responder.status === 'responding' ? 'bg-green-600' : 'bg-blue-600'
                      }`}>
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    </motion.div>
                  );
                })}

                {/* 500m Radius Circle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-80 h-80 rounded-full border-2 border-dashed border-slate-400 dark:border-slate-500 opacity-30" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>500 meter radius from victim location</span>
              </div>
            </motion.div>

            {/* Responders List */}
            <div className="space-y-3">
              {responders.map((responder, index) => (
                <motion.div
                  key={responder.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        responder.type === 'guardian' 
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                          : responder.status === 'responding'
                          ? 'bg-gradient-to-br from-green-600 to-emerald-600'
                          : 'bg-gradient-to-br from-blue-600 to-cyan-500'
                      }`}>
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-slate-100">{responder.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            responder.type === 'guardian' 
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {responder.type === 'guardian' ? 'Guardian' : 'Volunteer'}
                          </span>
                          {responder.status === 'responding' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              Responding
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Navigation className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          <span className="text-slate-900 dark:text-slate-100">{responder.distance}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          ETA: {Math.ceil(responder.distanceMeters / 80)} min
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="h-10 w-10 p-0 rounded-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Radio className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4"
            >
              <div className="flex items-center gap-6 justify-center flex-wrap text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                  <span className="text-slate-700 dark:text-slate-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600" />
                  <span className="text-slate-700 dark:text-slate-300">Responding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                  <span className="text-slate-700 dark:text-slate-300">Guardian</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

  // Dispatch Room View
  const renderDispatchRoom = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header with Tabs */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 pt-6 pb-2 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Shield className="w-8 h-8" />
              <h1 className="text-white">Sahaaya Police Control Room</h1>
            </div>
            <p className="text-white/80 text-sm">Real-time emergency monitoring & response dashboard</p>
          </div>

          {/* Simulate 6-Tap SOS Button */}
          <button
            onClick={simulateSixTapSOS}
            className="absolute top-6 right-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center gap-2 transition-colors shadow-lg"
          >
            <Bell className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Simulate 6-Tap SOS</span>
          </button>

          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-6 py-3 rounded-t-xl flex items-center gap-2 transition-all ${
                currentView === 'dashboard'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm">Cases</span>
            </button>
            <button
              onClick={() => setCurrentView('dispatch-room')}
              className={`px-6 py-3 rounded-t-xl flex items-center gap-2 transition-all relative ${
                currentView === 'dispatch-room'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm">Dispatch Room</span>
              {incomingAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {incomingAlerts.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dispatch Room Content */}
        <div className="px-6 py-6">
          {/* Alert Notification Banner */}
          <AnimatePresence>
            {showAlertNotification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-red-600 text-white rounded-2xl p-4 shadow-lg flex items-center gap-4"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Bell className="w-6 h-6" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-semibold">🚨 NEW EMERGENCY ALERT</p>
                  <p className="text-sm text-white/90">6-Tap SOS Activated - Immediate Response Required</p>
                </div>
                <Volume2 className="w-6 h-6 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Incoming Alerts</p>
                  <p className="text-slate-900 dark:text-slate-100 mt-1">{incomingAlerts.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-red-600 dark:text-red-400 animate-pulse" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Available Units</p>
                  <p className="text-slate-900 dark:text-slate-100 mt-1">{pcrUnits.filter(u => u.status === 'available').length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Car className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Dispatched</p>
                  <p className="text-slate-900 dark:text-slate-100 mt-1">{pcrUnits.filter(u => u.status === 'dispatched').length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Avg Dispatch Time</p>
                  <p className="text-slate-900 dark:text-slate-100 mt-1">47 sec</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Incoming Alerts & PCR Units */}
            <div className="space-y-6">
              {/* Incoming Emergency Alerts */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-red-600" />
                    Live Incoming Alerts
                  </h3>
                  <Badge className="bg-red-100 text-red-700 border-red-200">
                    {incomingAlerts.length} Active
                  </Badge>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {incomingAlerts.length > 0 ? (
                    incomingAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border-2 border-red-200 dark:border-red-800 relative overflow-hidden"
                      >
                        <motion.div
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute inset-0 bg-red-500/10"
                        />
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center flex-shrink-0">
                                <UserCircle2 className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-slate-900 dark:text-slate-100">{alert.victimName}</p>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <MapPin className="w-3 h-3" />
                                  <span>{alert.location}</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                              {alert.time}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-2">
                              <p className="text-slate-500">Distance</p>
                              <p className="text-slate-900 dark:text-slate-100">{alert.distance}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-2">
                              <p className="text-slate-500">Battery</p>
                              <p className="text-slate-900 dark:text-slate-100">{alert.batteryLevel}%</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-2">
                              <p className="text-slate-500">Speed</p>
                              <p className="text-slate-900 dark:text-slate-100">{alert.movementSpeed}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => {
                                const nearestUnit = pcrUnits.find(u => u.status === 'available');
                                if (nearestUnit) {
                                  dispatchPCRUnit(nearestUnit.id, alert.id);
                                }
                              }}
                              className="flex-1 h-9 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                            >
                              <Zap className="w-4 h-4 mr-1" />
                              Quick Dispatch
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedProfileCaseId(alert.id);
                                setShowProfilePanel(true);
                                setCurrentView('dashboard');
                              }}
                              className="flex-1 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
                        <Bell className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">No active incoming alerts</p>
                      <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">New alerts will appear here instantly</p>
                    </div>
                  )}
                </div>
              </div>

              {/* PCR Units List */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  PCR Units Status
                </h3>

                <div className="space-y-3">
                  {pcrUnits.map((unit, index) => (
                    <motion.div
                      key={unit.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            unit.status === 'available' ? 'bg-green-100 dark:bg-green-900' :
                            unit.status === 'dispatched' ? 'bg-purple-100 dark:bg-purple-900' :
                            unit.status === 'on-scene' ? 'bg-orange-100 dark:bg-orange-900' :
                            'bg-blue-100 dark:bg-blue-900'
                          }`}>
                            <Car className={`w-5 h-5 ${
                              unit.status === 'available' ? 'text-green-600 dark:text-green-400' :
                              unit.status === 'dispatched' ? 'text-purple-600 dark:text-purple-400' :
                              unit.status === 'on-scene' ? 'text-orange-600 dark:text-orange-400' :
                              'text-blue-600 dark:text-blue-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-900 dark:text-slate-100">{unit.id}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">{unit.vehicleNumber}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span className="text-xs text-slate-600 dark:text-slate-400">{unit.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`${
                          unit.status === 'available' ? 'bg-green-100 text-green-700 border-green-200' :
                          unit.status === 'dispatched' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                          unit.status === 'on-scene' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                          'bg-blue-100 text-blue-700 border-blue-200'
                        }`}>
                          {unit.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-3">
                        <Users className="w-3 h-3" />
                        {unit.officers.join(', ')}
                      </div>

                      {unit.status === 'available' && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-2">
                            <p className="text-slate-500">Distance</p>
                            <p className="text-slate-900 dark:text-slate-100">{unit.distance}</p>
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-2">
                            <p className="text-slate-500">ETA</p>
                            <p className="text-slate-900 dark:text-slate-100">{unit.eta}</p>
                          </div>
                        </div>
                      )}

                      {unit.status === 'dispatched' && unit.assignedCaseId && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 text-xs">
                          <p className="text-purple-600 dark:text-purple-400">
                            Assigned to Case #{unit.assignedCaseId} • ETA: {unit.eta}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Live Map */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 sticky top-6">
              <h3 className="text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Real-Time Unit Locations
              </h3>

              {/* Map Container */}
              <div className="w-full h-[600px] bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 rounded-xl relative overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(#666 1px, transparent 1px), linear-gradient(90deg, #666 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />

                {/* SOS Alert Markers */}
                {incomingAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute -inset-4 bg-red-500 rounded-full"
                    />
                    <div className="relative w-8 h-8 bg-red-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-xs">
                        {alert.victimName}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* PCR Unit Markers */}
                {pcrUnits.map((unit, index) => {
                  const positions = [
                    { left: '60%', top: '25%' },
                    { left: '40%', top: '50%' },
                    { left: '70%', top: '60%' },
                    { left: '50%', top: '75%' },
                  ];
                  return (
                    <motion.div
                      key={unit.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute"
                      style={positions[index] || { left: '50%', top: '50%' }}
                    >
                      {unit.status === 'dispatched' && (
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                          className="absolute -inset-2 bg-purple-500 rounded-full opacity-30"
                        />
                      )}
                      <div className={`relative w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center ${
                        unit.status === 'available' ? 'bg-green-600' :
                        unit.status === 'dispatched' ? 'bg-purple-600' :
                        unit.status === 'on-scene' ? 'bg-orange-600' :
                        'bg-blue-600'
                      }`}>
                        <Car className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-xs">
                          <p className="font-medium">{unit.id}</p>
                          {unit.status === 'available' && (
                            <p className="text-green-600 dark:text-green-400">Available</p>
                          )}
                          {unit.status === 'dispatched' && (
                            <p className="text-purple-600 dark:text-purple-400">En Route</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center">
                        <AlertCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">SOS Alert</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
                        <Car className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                        <Car className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Dispatched</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center">
                        <Car className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">On Scene</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-Alert Info */}
              <div className="mt-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-900 dark:text-slate-100 mb-1">Auto-Dispatch Enabled</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Nearest available PCR units are automatically alerted when a new SOS is triggered. 
                      Quick dispatch reduces response time to under 1 minute.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'case-detail' && renderCaseDetail()}
      {currentView === 'responders' && renderResponders()}
      {currentView === 'dispatch-room' && renderDispatchRoom()}
    </AnimatePresence>
  );
}
