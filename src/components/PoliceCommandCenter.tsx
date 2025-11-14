import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  User,
  ChevronDown,
  Search,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  Send,
  FileText,
  Download,
  Navigation,
  Activity,
  Users,
  Map,
  FileBarChart,
  Settings,
  LogOut,
  Shield,
  Radio,
  MessageSquare,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface PoliceCommandCenterProps {
  onLogout?: () => void;
}

interface EmergencyCase {
  id: string;
  victimName: string;
  victimPhone: string;
  victimId: string;
  timestamp: Date;
  status: 'active' | 'dispatched' | 'resolved';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  speed?: number;
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  action: string;
  officer?: string;
  location?: string;
}

export function PoliceCommandCenter({ onLogout }: PoliceCommandCenterProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'resolved' | 'map' | 'logs' | 'settings'>('active');
  const [selectedCase, setSelectedCase] = useState<EmergencyCase | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const activeCases: EmergencyCase[] = [
    {
      id: 'SOS-2024-001',
      victimName: 'Sarah Johnson',
      victimPhone: '+1 234 567 8900',
      victimId: 'USER-45231',
      timestamp: new Date(),
      status: 'active',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Main St, New York, NY 10001',
      },
      speed: 15,
    },
    {
      id: 'SOS-2024-002',
      victimName: 'Emily Davis',
      victimPhone: '+1 234 567 8901',
      victimId: 'USER-45232',
      timestamp: new Date(Date.now() - 300000),
      status: 'dispatched',
      location: {
        lat: 40.7589,
        lng: -73.9851,
        address: '456 Park Ave, New York, NY 10022',
      },
    },
  ];

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      timestamp: new Date(),
      action: 'SOS Alert received from Sarah Johnson',
      location: '40.7128°N, 74.0060°W',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 30000),
      action: 'Alert acknowledged by Officer Rodriguez',
      officer: 'Officer J. Rodriguez',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 60000),
      action: 'Patrol Unit #12 dispatched to location',
      officer: 'Dispatcher M. Chen',
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 120000),
      action: 'Victim moved 120m north from original position',
      location: '40.7140°N, 74.0055°W',
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 180000),
      action: 'Guardian notification sent (3 contacts)',
    },
  ];

  const handleAcknowledge = () => {
    alert('Case acknowledged. Dispatching nearest unit...');
  };

  const handleDispatch = () => {
    alert('Patrol unit dispatched to victim location.');
  };

  const handleResolve = () => {
    if (confirm('Mark this case as resolved?')) {
      alert('Case marked as resolved.');
    }
  };

  const handleExportLogs = () => {
    alert('Exporting case logs as PDF...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-slate-900 dark:text-white">Sahaaya Command Center</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Real-time Emergency Response System</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by case ID, name, or user ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              <Bell className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Officer Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-slate-900 dark:text-white text-sm">Officer Rodriguez</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Badge #4521</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50">
                  <button className="w-full px-4 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('active')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
              <span>Active Cases</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {activeCases.filter(c => c.status === 'active').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('resolved')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'resolved'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Resolved Cases</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Map className="w-5 h-5" />
              <span>Live Map View</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'logs'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <FileBarChart className="w-5 h-5" />
              <span>Logs & Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Nearest Patrol Unit */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <p className="text-blue-900 dark:text-blue-100 text-sm">Nearest Patrol</p>
            </div>
            <p className="text-blue-800 dark:text-blue-200">Unit #12</p>
            <p className="text-blue-600 dark:text-blue-400 text-xs">0.8 km away • ETA 3 min</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Victim Details Panel (Left) */}
          <div className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 overflow-y-auto">
            <h2 className="text-slate-900 dark:text-white mb-4">Active Emergency</h2>

            {activeCases.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Case Card */}
                {activeCases.slice(0, 1).map((emergencyCase) => (
                  <div key={emergencyCase.id} className="space-y-4">
                    {/* Victim Info */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-900 dark:text-white">{emergencyCase.victimName}</p>
                          <p className="text-slate-600 dark:text-slate-400 text-xs">ID: {emergencyCase.victimId}</p>
                        </div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          <span className="text-slate-700 dark:text-slate-300">{emergencyCase.victimPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          <span className="text-slate-700 dark:text-slate-300">
                            {emergencyCase.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          <span className="text-slate-700 dark:text-slate-300 text-xs">
                            {emergencyCase.location.address}
                          </span>
                        </div>
                        {emergencyCase.speed && (
                          <div className="flex items-center gap-2 text-sm">
                            <Activity className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <span className="text-slate-700 dark:text-slate-300">
                              Moving at {emergencyCase.speed} km/h
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Case Details */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-600 dark:text-slate-400 text-xs mb-1">Case ID</p>
                          <p className="text-slate-900 dark:text-white">{emergencyCase.id}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400 text-xs mb-1">Status</p>
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            {emergencyCase.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={handleAcknowledge}
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Acknowledge Alert
                      </Button>
                      <Button
                        onClick={handleDispatch}
                        className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Dispatch Unit
                      </Button>
                      <Button
                        onClick={handleResolve}
                        variant="outline"
                        className="w-full h-11 border-slate-200 dark:border-slate-600 rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 dark:text-slate-400">No active emergencies</p>
              </div>
            )}
          </div>

          {/* Center Map Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Map Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white" />
                  <h3 className="text-white">Live Location Tracking</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors">
                    <Users className="w-4 h-4 inline mr-1" />
                    Nearby Users
                  </button>
                  <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors">
                    <Navigation className="w-4 h-4 inline mr-1" />
                    Navigate
                  </button>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-[calc(100%-4rem)] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <p className="text-slate-900 dark:text-white mb-2">Live GPS Tracking</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Real-time location: 40.7128°N, 74.0060°W
                    </p>
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-slate-700 dark:text-slate-300">Victim Location</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-slate-700 dark:text-slate-300">Nearby Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-slate-700 dark:text-slate-300">Police Stations</span>
                        </div>
                      </div>
                      <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg mt-4">
                        <Navigation className="w-4 h-4 inline mr-2" />
                        Start Live Navigation
                      </div>
                    </div>
                  </div>
                </div>

                {/* Movement Trail Indicator */}
                <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-2">Movement Trail</p>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-900 dark:text-white text-sm">Moving NE • 15 km/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Activity Log Panel */}
          <div className="w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-900 dark:text-white">Activity Log</h2>
              <button
                onClick={handleExportLogs}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="space-y-3">
              {activityLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 dark:text-white text-sm">{log.action}</p>
                      {log.officer && (
                        <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">{log.officer}</p>
                      )}
                      {log.location && (
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{log.location}</p>
                      )}
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                        {log.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Officer Chat Panel */}
            <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h3 className="text-slate-900 dark:text-white">Officer Coordination</h3>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 mb-3">
                <p className="text-slate-700 dark:text-slate-300 text-sm mb-1">Officer Chen:</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Unit 12 is 2 minutes away</p>
                <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">2m ago</p>
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type message..."
                  className="flex-1 h-9 bg-slate-50 dark:bg-slate-700 text-sm rounded-lg"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 px-4 rounded-lg">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
