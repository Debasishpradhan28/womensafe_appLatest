import { motion } from 'motion/react';
import { AlertTriangle, Radio } from 'lucide-react';

export function SOSActivation() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle Pulsing Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-red-900"
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Alert Icon with Pulse */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="relative w-24 h-24 mx-auto mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full bg-red-500"
          />
          <div className="relative w-full h-full rounded-full bg-red-600 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-white mb-2">Emergency Mode Active</h2>
          <p className="text-slate-400 text-sm mb-8">
            Connecting to emergency services...
          </p>
        </motion.div>

        {/* Connecting Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 justify-center mb-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-slate-500"
            />
          ))}
        </motion.div>

        {/* Signal Waves */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-slate-500"
        >
          <Radio className="w-4 h-4" />
          <span className="text-xs">Checking network status</span>
        </motion.div>
      </div>

      {/* Very subtle "I am safe" hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-0 right-0 text-center"
      >
        <p className="text-slate-600 text-xs">Long press anywhere to cancel</p>
      </motion.div>
    </div>
  );
}
