import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeContext';
import {
  X,
  User,
  Users,
  Phone,
  Smartphone,
  Power,
  Vibrate,
  Mic,
  Moon,
  Sun,
  HelpCircle,
  Info,
  Shield,
  ChevronRight,
  LogOut,
  Mail,
  MapPin,
  Calendar,
  Droplet,
  Bell,
  Lock,
  Eye,
  FileText,
  ChevronLeft,
  Plus,
  Edit2,
  Trash2,
  Building2,
  Radio,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Guardian } from '../App';
import { AddGuardianModal } from './AddGuardianModal';
import { AddPoliceStationModal, PoliceStation } from './AddPoliceStationModal';
import { PoliceCommandCenterNew } from './PoliceCommandCenterNew';

interface SettingsProps {
  onClose: () => void;
  onLogout?: () => void;
  guardians?: Guardian[];
  onUpdateGuardians?: (guardians: Guardian[]) => void;
}

type SettingsView = 
  | 'main' 
  | 'profile' 
  | 'guardians' 
  | 'police-stations'
  | 'police-command'
  | 'privacy' 
  | 'notifications'
  | 'help'
  | 'about';

export function Settings({ onClose, onLogout, guardians = [], onUpdateGuardians }: SettingsProps) {
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const { darkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    sixTapGesture: true,
    powerButtonMode: true,
    shakeToSOS: false,
    silentRecording: true,
  });

  // Modal states
  const [showGuardianModal, setShowGuardianModal] = useState(false);
  const [showPoliceStationModal, setShowPoliceStationModal] = useState(false);
  const [editingGuardian, setEditingGuardian] = useState<Guardian | null>(null);
  const [editingStation, setEditingStation] = useState<PoliceStation | null>(null);
  
  // Police stations state
  const [policeStations, setPoliceStations] = useState<PoliceStation[]>(() => {
    const saved = localStorage.getItem('sahaaya_police_stations');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    if (onLogout && confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  const handleBack = () => {
    setCurrentView('main');
  };

  // Guardian handlers
  const handleAddGuardian = (guardianData: Omit<Guardian, 'id'>) => {
    const newGuardian: Guardian = {
      ...guardianData,
      id: `guardian-${Date.now()}`,
    };
    const updated = [...guardians, newGuardian];
    if (onUpdateGuardians) {
      onUpdateGuardians(updated);
      localStorage.setItem('sahaaya_guardians', JSON.stringify(updated));
    }
  };

  const handleEditGuardian = (guardianData: Omit<Guardian, 'id'>) => {
    if (editingGuardian && onUpdateGuardians) {
      const updated = guardians.map(g => 
        g.id === editingGuardian.id ? { ...guardianData, id: g.id } : g
      );
      onUpdateGuardians(updated);
      localStorage.setItem('sahaaya_guardians', JSON.stringify(updated));
    }
    setEditingGuardian(null);
  };

  const handleDeleteGuardian = (id: string) => {
    if (confirm('Are you sure you want to remove this guardian?') && onUpdateGuardians) {
      const updated = guardians.filter(g => g.id !== id);
      onUpdateGuardians(updated);
      localStorage.setItem('sahaaya_guardians', JSON.stringify(updated));
    }
  };

  // Police station handlers
  const handleAddPoliceStation = (stationData: Omit<PoliceStation, 'id'>) => {
    const newStation: PoliceStation = {
      ...stationData,
      id: `station-${Date.now()}`,
    };
    const updated = [...policeStations, newStation];
    setPoliceStations(updated);
    localStorage.setItem('sahaaya_police_stations', JSON.stringify(updated));
  };

  const handleEditPoliceStation = (stationData: Omit<PoliceStation, 'id'>) => {
    if (editingStation) {
      const updated = policeStations.map(s => 
        s.id === editingStation.id ? { ...stationData, id: s.id } : s
      );
      setPoliceStations(updated);
      localStorage.setItem('sahaaya_police_stations', JSON.stringify(updated));
    }
    setEditingStation(null);
  };

  const handleDeletePoliceStation = (id: string) => {
    if (confirm('Are you sure you want to remove this police station?')) {
      const updated = policeStations.filter(s => s.id !== id);
      setPoliceStations(updated);
      localStorage.setItem('sahaaya_police_stations', JSON.stringify(updated));
    }
  };

  // Profile View
  const renderProfileView = () => {
    const userStr = localStorage.getItem('sahaaya_user');
    const user = userStr ? JSON.parse(userStr) : null;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-white mb-1">My Profile</h1>
              <p className="text-white/80 text-sm">Your personal information</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-slate-600" />
                  <Label className="text-slate-600">Full Name</Label>
                </div>
                <p className="text-slate-900 ml-8">{user?.fullName || 'Not provided'}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-slate-600" />
                  <Label className="text-slate-600">Email</Label>
                </div>
                <p className="text-slate-900 ml-8">{user?.email || 'Not provided'}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-slate-600" />
                  <Label className="text-slate-600">Phone Number</Label>
                </div>
                <p className="text-slate-900 ml-8">{user?.phone || 'Not provided'}</p>
              </div>

              {user?.bloodGroup && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplet className="w-5 h-5 text-slate-600" />
                    <Label className="text-slate-600">Blood Group</Label>
                  </div>
                  <p className="text-slate-900 ml-8">{user.bloodGroup}</p>
                </div>
              )}

              {user?.emergencyContactName && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-slate-600" />
                    <Label className="text-slate-600">Emergency Contact</Label>
                  </div>
                  <p className="text-slate-900 ml-8">{user.emergencyContactName}</p>
                  {user.emergencyContactPhone && (
                    <p className="text-slate-600 text-sm ml-8">{user.emergencyContactPhone}</p>
                  )}
                </div>
              )}

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  <Label className="text-slate-600">Member Since</Label>
                </div>
                <p className="text-slate-900 ml-8">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently joined'}</p>
              </div>
            </div>

            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Guardians View
  const renderGuardiansView = () => {
    return (
      <>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white relative">
              <button
                onClick={handleBack}
                className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  setEditingGuardian(null);
                  setShowGuardianModal(true);
                }}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
              <div className="text-center">
                <h1 className="text-white mb-1">Emergency Contacts</h1>
                <p className="text-white/80 text-sm">Manage your trusted guardians</p>
              </div>
            </div>

            <div className="px-6 py-6 space-y-4">
              {guardians.length > 0 ? (
                <>
                  {guardians.map((guardian) => (
                    <div
                      key={guardian.id}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-900 dark:text-white">{guardian.name}</p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">{guardian.relationship}</p>
                          <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">{guardian.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingGuardian(guardian);
                              setShowGuardianModal(true);
                            }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteGuardian(guardian.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-900 dark:text-white mb-2">No Emergency Contacts</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Add trusted guardians who will be notified during emergencies</p>
                  <Button 
                    onClick={() => setShowGuardianModal(true)}
                    className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Emergency Contact
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddGuardianModal
          isOpen={showGuardianModal}
          onClose={() => {
            setShowGuardianModal(false);
            setEditingGuardian(null);
          }}
          onSave={editingGuardian ? handleEditGuardian : handleAddGuardian}
          editGuardian={editingGuardian}
        />
      </>
    );
  };

  // Police Stations View
  const renderPoliceStationsView = () => {
    return (
      <>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white relative">
              <button
                onClick={handleBack}
                className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  setEditingStation(null);
                  setShowPoliceStationModal(true);
                }}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
              <div className="text-center">
                <h1 className="text-white mb-1">Police Stations</h1>
                <p className="text-white/80 text-sm">Manage nearby police stations</p>
              </div>
            </div>

            <div className="px-6 py-6 space-y-4">
              {policeStations.length > 0 ? (
                <>
                  {policeStations.map((station) => (
                    <div
                      key={station.id}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-900 dark:text-white">{station.name}</p>
                          <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">{station.phone}</p>
                          <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">{station.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingStation(station);
                              setShowPoliceStationModal(true);
                            }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </button>
                          <button
                            onClick={() => handleDeletePoliceStation(station.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-10 h-10 text-slate-400" />
                  </div>
                  <p className="text-slate-900 dark:text-white mb-2">No Police Stations</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">Add nearby police stations for emergency situations</p>
                  <Button 
                    onClick={() => setShowPoliceStationModal(true)}
                    className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Police Station
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddPoliceStationModal
          isOpen={showPoliceStationModal}
          onClose={() => {
            setShowPoliceStationModal(false);
            setEditingStation(null);
          }}
          onSave={editingStation ? handleEditPoliceStation : handleAddPoliceStation}
          editStation={editingStation}
        />
      </>
    );
  };

  // Privacy & Security View
  const renderPrivacyView = () => {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-white mb-1">Privacy & Security</h1>
              <p className="text-white/80 text-sm">Manage your data and security</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4">
            <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">Change Password</p>
                <p className="text-slate-500 text-xs">Update your account password</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">Location Privacy</p>
                <p className="text-slate-500 text-xs">Control location sharing</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">Privacy Policy</p>
                <p className="text-slate-500 text-xs">View our privacy policy</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 mt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-900 text-sm mb-1">End-to-End Encryption</p>
                  <p className="text-blue-700 text-xs">
                    All your data is encrypted with industry-standard security protocols. Your location, contacts, and emergency alerts are protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Notifications View
  const renderNotificationsView = () => {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-white mb-1">Notifications</h1>
              <p className="text-white/80 text-sm">Manage notification preferences</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-slate-900 text-sm">SOS Alerts</p>
                    <p className="text-slate-500 text-xs">Emergency notifications</p>
                  </div>
                </div>
                <button className="relative w-12 h-7 rounded-full bg-blue-600">
                  <div className="absolute top-0.5 left-[20px] w-6 h-6 bg-white rounded-full shadow-sm" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-slate-900 text-sm">Location Updates</p>
                    <p className="text-slate-500 text-xs">Track location changes</p>
                  </div>
                </div>
                <button className="relative w-12 h-7 rounded-full bg-blue-600">
                  <div className="absolute top-0.5 left-[20px] w-6 h-6 bg-white rounded-full shadow-sm" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-slate-900 text-sm">Guardian Responses</p>
                    <p className="text-slate-500 text-xs">When guardians respond</p>
                  </div>
                </div>
                <button className="relative w-12 h-7 rounded-full bg-blue-600">
                  <div className="absolute top-0.5 left-[20px] w-6 h-6 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Help View
  const renderHelpView = () => {
    const faqs = [
      {
        question: 'How does the 6-tap SOS work?',
        answer: 'Simply tap anywhere on the screen 6 times rapidly to trigger an emergency alert. This works even when the app is in the background.',
      },
      {
        question: 'What happens during an SOS?',
        answer: 'Your location is shared with emergency contacts and authorities, audio recording begins, and all guardians receive instant notifications.',
      },
      {
        question: 'Can I use Sahaaya offline?',
        answer: 'Yes! Offline SOS sends SMS alerts to your guardians even without internet connection.',
      },
      {
        question: 'How do I add emergency contacts?',
        answer: 'Go to Settings → Emergency Contacts → Add Emergency Contact to add trusted guardians.',
      },
    ];

    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-white mb-1">Help & FAQ</h1>
              <p className="text-white/80 text-sm">Find answers to common questions</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                <p className="text-slate-900 mb-2">{faq.question}</p>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </div>
            ))}

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 mt-6">
              <p className="text-white">Contact Support</p>
              <p className="text-white/80 text-sm">Get help from our team</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // About View
  const renderAboutView = () => {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-white mb-1">About Sahaaya</h1>
              <p className="text-white/80 text-sm">Your safety companion</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-slate-900 mb-2">Sahaaya</h2>
              <p className="text-slate-600 mb-1">Version 1.0.0</p>
              <p className="text-slate-500 text-sm">Build 2024.11.001</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                Sahaaya is an intelligent women's safety and emergency response application designed to provide peace of mind and instant help when you need it most.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">
                Our mission is to create a safer world by connecting people in emergency situations with their trusted network and authorities through innovative technology.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                <p className="text-slate-900 text-sm">Terms of Service</p>
              </button>
              <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                <p className="text-slate-900 text-sm">Privacy Policy</p>
              </button>
              <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                <p className="text-slate-900 text-sm">Open Source Licenses</p>
              </button>
            </div>

            <p className="text-center text-slate-500 text-xs">
              © 2024 Sahaaya. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Main Settings View
  const renderMainView = () => (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-white mb-1">Settings</h1>
            <p className="text-white/80 text-sm">Customize your safety preferences</p>
          </motion.div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button 
              onClick={() => setCurrentView('profile')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900">My Profile</p>
                <p className="text-slate-500 text-sm">View and edit profile</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </motion.div>

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            <h3 className="text-slate-900">Emergency Contacts</h3>
            
            <button 
              onClick={() => setCurrentView('guardians')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">Manage Guardians</p>
                {guardians.length > 0 && (
                  <p className="text-slate-500 text-xs">{guardians.length} contact{guardians.length > 1 ? 's' : ''} added</p>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button 
              onClick={() => setCurrentView('police-stations')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">Police Stations</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </motion.div>

          {/* SOS Activation Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-slate-900">SOS Activation</h3>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-slate-900 text-sm">6-Tap Gesture</p>
                    <p className="text-slate-500 text-xs">Tap screen 6 times</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('sixTapGesture')}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.sixTapGesture ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: settings.sixTapGesture ? 20 : 0,
                    }}
                    className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Power className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-slate-900 text-sm">Power Button Mode</p>
                    <p className="text-slate-500 text-xs">Press 5 times quickly</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('powerButtonMode')}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.powerButtonMode ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: settings.powerButtonMode ? 20 : 0,
                    }}
                    className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Vibrate className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-slate-900 text-sm">Shake to SOS</p>
                    <p className="text-slate-500 text-xs">Shake phone vigorously</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('shakeToSOS')}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.shakeToSOS ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: settings.shakeToSOS ? 20 : 0,
                    }}
                    className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Evidence Recording */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-3"
          >
            <h3 className="text-slate-900">Evidence Collection</h3>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="text-slate-900 text-sm">Silent Audio Recording</p>
                    <p className="text-slate-500 text-xs">Record during SOS</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('silentRecording')}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings.silentRecording ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: settings.silentRecording ? 20 : 0,
                    }}
                    className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Privacy & Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-slate-900">Privacy & Preferences</h3>
            
            <button 
              onClick={() => setCurrentView('privacy')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">Privacy & Security</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button 
              onClick={() => setCurrentView('notifications')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">Notifications</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </motion.div>

          {/* App Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-3"
          >
            <h3 className="text-slate-900">Appearance</h3>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-slate-600" />
                  ) : (
                    <Sun className="w-5 h-5 text-slate-600" />
                  )}
                  <div>
                    <p className="text-slate-900 text-sm">Dark Mode</p>
                    <p className="text-slate-500 text-xs">App appearance</p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: darkMode ? 20 : 0,
                    }}
                    className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Help & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-slate-900">Support</h3>
            
            <button 
              onClick={() => setCurrentView('help')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">Help & FAQ</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button 
              onClick={() => setCurrentView('about')}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 text-sm">About Sahaaya</p>
                <p className="text-slate-500 text-xs">Version 1.0.0</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="bg-blue-50 rounded-2xl p-4 border border-blue-200"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-900 text-sm mb-1">Your Privacy Matters</p>
                <p className="text-blue-700 text-xs">
                  All your data is encrypted and stored securely. We never share your information.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Logout Button */}
          {onLogout && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={handleLogout}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-red-200 flex items-center gap-4 hover:bg-red-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-red-900 text-sm">Log Out</p>
                  <p className="text-red-600 text-xs">Sign out from your account</p>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {currentView === 'main' && renderMainView()}
      {currentView === 'profile' && renderProfileView()}
      {currentView === 'guardians' && renderGuardiansView()}
      {currentView === 'police-stations' && renderPoliceStationsView()}
      {currentView === 'privacy' && renderPrivacyView()}
      {currentView === 'notifications' && renderNotificationsView()}
      {currentView === 'help' && renderHelpView()}
      {currentView === 'about' && renderAboutView()}
    </AnimatePresence>
  );
}