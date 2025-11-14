import { motion } from 'motion/react';
import { Mic, Camera, Lock } from 'lucide-react';

export function RecordingEvidence() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 relative">
      {/* Subtle Red Glow */}
      <motion.div
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-red-900"
      />

      <div className="relative z-10 text-center max-w-md">
        {/* Recording Indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-4 h-4 rounded-full bg-red-500"
          />
          <span className="text-slate-400 text-sm">Recording in progress</span>
        </motion.div>

        {/* Audio Waveform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Mic className="w-6 h-6 text-slate-500" />
          </div>
          
          {/* Waveform Bars */}
          <div className="flex items-center justify-center gap-1 h-16">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [
                    Math.random() * 40 + 10,
                    Math.random() * 60 + 10,
                    Math.random() * 40 + 10,
                  ],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: 'easeInOut',
                }}
                className="w-1 bg-slate-700 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Camera Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
            <Camera className="w-6 h-6 text-slate-500" />
          </div>
          <p className="text-slate-500 text-sm">Silent camera active</p>
        </motion.div>

        {/* Recording Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-slate-400 mb-2">Recording Evidence</h3>
          <p className="text-slate-600 text-sm">
            Audio and video evidence is being captured silently
          </p>
        </motion.div>

        {/* Security Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 text-slate-600"
        >
          <Lock className="w-4 h-4" />
          <span className="text-xs">Evidence encrypted and backed up</span>
        </motion.div>
      </div>

      {/* Bottom Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <p className="text-slate-700 text-xs">This screen is intentionally dark for stealth</p>
      </motion.div>
    </div>
  );
}
