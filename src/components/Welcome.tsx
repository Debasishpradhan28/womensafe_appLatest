import { motion } from 'motion/react';
import { Shield, MapPin, Users, Bell, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeProps {
  onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Logo & Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
              <Shield className="w-14 h-14 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-white mb-3">Sahaaya</h1>
            <p className="text-white/90 text-lg">
              Your intelligent safety companion
            </p>
          </motion.div>

          {/* Features */}
          <div className="w-full space-y-4 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white mb-0.5">Stealth SOS Activation</p>
                <p className="text-white/70 text-sm">Discrete 6-tap emergency trigger</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white mb-0.5">Live Location Tracking</p>
                <p className="text-white/70 text-sm">Real-time location sharing with guardians</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white mb-0.5">Emergency Network</p>
                <p className="text-white/70 text-sm">Alert guardians & authorities instantly</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white mb-0.5">Offline SOS</p>
                <p className="text-white/70 text-sm">Works without internet connection</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="px-6 pb-8 pt-4"
        >
          <Button
            onClick={onGetStarted}
            className="w-full h-14 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl shadow-xl group"
          >
            <span className="mr-2">Get Started</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-center text-white/60 text-sm mt-4">
            Protected by end-to-end encryption
          </p>
        </motion.div>
      </div>
    </div>
  );
}
