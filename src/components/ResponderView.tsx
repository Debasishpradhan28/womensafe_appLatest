import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  MapPin,
  Navigation,
  Phone,
  X,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface ResponderViewProps {
  onClose: () => void;
}

export function ResponderView({ onClose }: ResponderViewProps) {
  const [status, setStatus] = useState<'alert' | 'responding' | 'arrived'>('alert');

  const sosAlert = {
    victimName: 'Priya S.',
    location: 'Connaught Place, New Delhi',
    distance: '320 meters',
    direction: 'Northeast',
    time: '2 min ago',
    severity: 'critical',
  };

  const handleRespond = () => {
    setStatus('responding');
  };

  const handleArrived = () => {
    setStatus('arrived');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto">
        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-rose-600 p-6 text-white relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white"
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <AlertTriangle className="w-8 h-8" />
                </motion.div>
                <div>
                  <h2 className="text-white">Emergency Alert</h2>
                  <p className="text-white/90 text-sm">Help needed nearby</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white/90 text-sm">{sosAlert.time}</span>
            </div>
          </div>
        </motion.div>

        <div className="px-6 py-6 space-y-6">
          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Victim Location</h3>
                <p className="text-slate-600 text-sm">{sosAlert.location}</p>
              </div>
            </div>

            {/* Distance & Direction */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <p className="text-blue-600 text-xs mb-1">Distance</p>
                <p className="text-blue-900">{sosAlert.distance}</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-200">
                <p className="text-indigo-600 text-xs mb-1">Direction</p>
                <div className="flex items-center gap-1">
                  <Navigation className="w-4 h-4 text-indigo-900" />
                  <p className="text-indigo-900">{sosAlert.direction}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200"
          >
            <h3 className="text-slate-900 mb-3">Quick Navigation</h3>
            
            {/* Mini Map */}
            <div className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100" />
              
              {/* Your Location */}
              <motion.div
                className="absolute bottom-[20%] left-[30%]"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
              </motion.div>

              {/* Victim Location */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="absolute top-[30%] right-[25%]"
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
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
              </motion.div>

              {/* Route Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                  x1="30%"
                  y1="80%"
                  x2="75%"
                  y2="30%"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="8,8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </div>

            <button className="w-full py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Navigation className="w-5 h-5" />
              Open in Maps
            </button>
          </motion.div>

          {/* Safety Instructions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-amber-50 rounded-2xl p-4 border border-amber-200"
          >
            <h3 className="text-amber-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Safety Instructions
            </h3>
            <ul className="space-y-2 text-amber-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                <span>Approach the situation carefully and assess safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                <span>Call police immediately if situation is dangerous</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                <span>Stay in a group if possible</span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            {status === 'alert' && (
              <>
                <button
                  onClick={handleRespond}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  I'm On My Way
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-full border-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Can't Help Right Now
                </button>
              </>
            )}

            {status === 'responding' && (
              <>
                <div className="bg-white rounded-2xl p-4 border border-green-200 mb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-green-900">You're Responding</p>
                      <p className="text-green-700 text-sm">Police have been notified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>ETA: 4 minutes</span>
                  </div>
                </div>
                <button
                  onClick={handleArrived}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  I've Arrived
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            )}

            {status === 'arrived' && (
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-green-900 mb-2">Thank You!</h3>
                <p className="text-green-700 text-sm mb-4">
                  You've arrived at the location. Police are also on their way.
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Police
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Emergency Call */}
          {status !== 'arrived' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full py-3 rounded-full border-2 border-red-300 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Emergency Services
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
