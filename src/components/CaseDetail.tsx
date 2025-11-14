import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  User,
  Navigation,
  CheckCircle,
  Send,
  AlertCircle,
  Radio,
} from 'lucide-react';

interface CaseDetailProps {
  caseId: string | null;
  onBack: () => void;
}

export function CaseDetail({ caseId, onBack }: CaseDetailProps) {
  const [status, setStatus] = useState<'active' | 'acknowledged' | 'dispatched' | 'resolved'>('active');

  const caseData = {
    id: caseId || '1',
    victimName: 'Priya S.',
    age: 28,
    phone: '+91 98765 43210',
    location: 'Connaught Place, New Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    distance: '1.2 km',
    time: '2 min ago',
    severity: 'critical',
    guardians: [
      { name: 'Rajesh S. (Father)', phone: '+91 98765 43211' },
      { name: 'Meera S. (Mother)', phone: '+91 98765 43212' },
    ],
  };

  const handleAcknowledge = () => {
    setStatus('acknowledged');
  };

  const handleDispatch = () => {
    setStatus('dispatched');
  };

  const handleResolve = () => {
    setStatus('resolved');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-slate-900">Case #{caseData.id}</h1>
              <p className="text-slate-600">Emergency SOS - Critical Priority</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900">Live Location Tracking</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-600">Live</span>
                </div>
              </div>

              {/* Map Area */}
              <div className="w-full h-80 bg-slate-100 rounded-xl overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100" />
                
                {/* Victim Location */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 w-16 h-16 rounded-full bg-red-500"
                  />
                  <div className="relative w-16 h-16 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Police Location */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-[30%] left-[30%]"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 border-4 border-white shadow-lg flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                {/* Trail Path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    d="M 120 100 Q 150 150, 200 200"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>

                {/* Distance Indicator */}
                <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                  <p className="text-slate-900">{caseData.distance}</p>
                  <p className="text-slate-500 text-xs">ETA: 3 min</p>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-slate-900">{caseData.location}</p>
                    <p className="text-slate-500 text-sm">
                      Lat: {caseData.coordinates.lat}, Lng: {caseData.coordinates.lng}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trail History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200"
            >
              <h3 className="text-slate-900 mb-4">Location Trail</h3>
              <div className="space-y-3">
                {[
                  { time: '2 min ago', location: 'Connaught Place', status: 'current' },
                  { time: '4 min ago', location: 'Janpath Road', status: 'past' },
                  { time: '6 min ago', location: 'Barakhamba Road', status: 'past' },
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${point.status === 'current' ? 'bg-red-500' : 'bg-slate-300'}`} />
                    <div className="flex-1">
                      <p className="text-slate-900 text-sm">{point.location}</p>
                      <p className="text-slate-500 text-xs">{point.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Victim Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200"
            >
              <h3 className="text-slate-900 mb-4">Victim Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-slate-900">{caseData.victimName}</p>
                    <p className="text-slate-500 text-xs">Age: {caseData.age}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-900 text-sm">{caseData.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-900 text-sm">{caseData.time}</p>
                </div>
              </div>
            </motion.div>

            {/* Guardian Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200"
            >
              <h3 className="text-slate-900 mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                {caseData.guardians.map((guardian, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 text-sm truncate">{guardian.name}</p>
                      <p className="text-slate-500 text-xs">{guardian.phone}</p>
                    </div>
                    <button className="p-2 hover:bg-blue-50 rounded-full">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200"
            >
              <h3 className="text-slate-900 mb-4">Actions</h3>
              <div className="space-y-3">
                {status === 'active' && (
                  <button
                    onClick={handleAcknowledge}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Acknowledge
                  </button>
                )}
                {(status === 'acknowledged' || status === 'active') && (
                  <button
                    onClick={handleDispatch}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Dispatch Unit
                  </button>
                )}
                {status !== 'resolved' && (
                  <button
                    onClick={handleResolve}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark Resolved
                  </button>
                )}
              </div>

              {/* Status Indicator */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-slate-600 text-xs mb-2">Current Status</p>
                <div className={`px-3 py-2 rounded-full text-sm inline-flex items-center gap-2 ${
                  status === 'active' ? 'bg-red-100 text-red-700' :
                  status === 'acknowledged' ? 'bg-blue-100 text-blue-700' :
                  status === 'dispatched' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  <Radio className="w-4 h-4" />
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
