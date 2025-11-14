import { motion } from 'motion/react';
import { MessageSquare, MapPin, Phone, Check, RefreshCw, Signal } from 'lucide-react';
import type { Guardian } from '../App';

interface OfflineSOSProps {
  guardians: Guardian[];
  onImSafe: () => void;
}

export function OfflineSOS({ guardians, onImSafe }: OfflineSOSProps) {
  const currentLocation = {
    lat: 28.6139,
    lng: 77.2090,
    address: 'Connaught Place, New Delhi, India',
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Status Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Signal className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-white">Offline SOS Active</h2>
              <p className="text-white/90 text-sm">SMS alerts sent</p>
            </div>
          </div>
        </motion.div>

        {/* SMS Sent Confirmation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-200"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-1">Emergency SMS Sent</h3>
              <p className="text-slate-600 text-sm">
                All emergency contacts have been notified via SMS
              </p>
            </div>
          </div>

          {/* Contact List */}
          <div className="space-y-2">
            {guardians.slice(0, 3).map((guardian, index) => (
              <motion.div
                key={guardian.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm truncate">{guardian.name}</p>
                  <p className="text-slate-500 text-xs">{guardian.phone}</p>
                </div>
                <Phone className="w-4 h-4 text-slate-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location Details */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-200"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-1">Your Location Shared</h3>
              <p className="text-slate-600 text-sm mb-3">
                {currentLocation.address}
              </p>
              <div className="flex gap-4 text-xs text-slate-500">
                <span>Lat: {currentLocation.lat}</span>
                <span>Lng: {currentLocation.lng}</span>
              </div>
            </div>
          </div>

          {/* Mini Map Placeholder */}
          <div className="w-full h-32 bg-slate-100 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-8 h-8 rounded-full bg-red-500 border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Police Notification */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 rounded-2xl p-4 border border-blue-200 mb-6"
        >
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-blue-600" />
            <p className="text-blue-900 text-sm">
              Local police station notified via SMS
            </p>
          </div>
        </motion.div>

        {/* Retry Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full py-3 rounded-full border-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 mb-3"
        >
          <RefreshCw className="w-5 h-5" />
          Resend SMS Alert
        </motion.button>

        {/* I Am Safe Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={onImSafe}
          className="w-full py-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-200"
        >
          I Am Safe Now
        </motion.button>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-4"
        >
          <p className="text-slate-500 text-sm">
            Your contacts can see your last known location. Stay safe!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
