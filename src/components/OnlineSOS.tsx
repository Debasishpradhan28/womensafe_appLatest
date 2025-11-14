import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Radio, Users, Shield, Check, Navigation } from 'lucide-react';
import type { Guardian } from '../App';

interface OnlineSOSProps {
  guardians: Guardian[];
  onImSafe: () => void;
}

export function OnlineSOS({ guardians, onImSafe }: OnlineSOSProps) {
  const [locationUpdates, setLocationUpdates] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLocationUpdates(prev => prev + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const responders = [
    { id: 1, name: 'Officer Sharma', distance: '0.8 km', type: 'police' },
    { id: 2, name: 'Maya K.', distance: '0.3 km', type: 'volunteer' },
    { id: 3, name: 'Rahul M.', distance: '0.5 km', type: 'volunteer' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Status Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-6 text-white mb-6 shadow-lg relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Radio className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-white">Live SOS Active</h2>
                <p className="text-white/90 text-sm">Real-time tracking enabled</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Connected to control room</span>
            </div>
          </div>
        </motion.div>

        {/* Live Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-900">Your Live Location</h3>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
              <span>Updating</span>
            </div>
          </div>

          {/* Map Area */}
          <div className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden relative mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100" />
            
            {/* Your Location */}
            <motion.div
              key={locationUpdates}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
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
                className="absolute inset-0 w-12 h-12 rounded-full bg-red-500"
              />
              <div className="relative w-12 h-12 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Responder Locations */}
            {responders.map((responder, index) => (
              <motion.div
                key={responder.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`absolute w-8 h-8 rounded-full border-3 border-white shadow-md flex items-center justify-center text-white ${
                  responder.type === 'police' ? 'bg-blue-600' : 'bg-green-600'
                }`}
                style={{
                  top: `${30 + index * 20}%`,
                  left: `${20 + index * 25}%`,
                }}
              >
                {responder.type === 'police' ? (
                  <Shield className="w-4 h-4" />
                ) : (
                  <Users className="w-4 h-4" />
                )}
              </motion.div>
            ))}

            {/* Trail Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.path
                d="M 50 150 Q 80 130, 100 100"
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </div>

          <div className="text-slate-600 text-sm">
            <MapPin className="w-4 h-4 inline mr-1" />
            Connaught Place, New Delhi, India
          </div>
        </motion.div>

        {/* Responders List */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-200"
        >
          <h3 className="text-slate-900 mb-3">Nearby Responders</h3>
          <div className="space-y-2">
            {responders.map((responder, index) => (
              <motion.div
                key={responder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  responder.type === 'police' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {responder.type === 'police' ? (
                    <Shield className={`w-5 h-5 text-blue-600`} />
                  ) : (
                    <Users className={`w-5 h-5 text-green-600`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 text-sm">{responder.name}</p>
                  <p className="text-slate-500 text-xs capitalize">{responder.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 text-sm">{responder.distance}</p>
                  <p className="text-slate-400 text-xs">away</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notification Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-200"
        >
          <h3 className="text-slate-900 mb-3 text-sm">Alerts Sent</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-slate-700 text-sm">Police notified</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-slate-700 text-sm">Guardians notified</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-slate-700 text-sm">Community responders alerted</span>
            </div>
          </div>
        </motion.div>

        {/* Evidence Recording Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-900 rounded-2xl p-4 mb-4 border border-slate-700"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <p className="text-white text-sm">Recording audio evidence</p>
          </div>
        </motion.div>

        {/* I Am Safe Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={onImSafe}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-200"
        >
          I Am Safe Now
        </motion.button>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-slate-500 text-sm mt-4"
        >
          Help is on the way. Stay in a safe location.
        </motion.p>
      </div>
    </div>
  );
}
