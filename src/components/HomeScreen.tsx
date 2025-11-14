import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Menu, Hand, Radio } from 'lucide-react';

interface HomeScreenProps {
  onSOSTrigger: () => void;
  onOpenSettings: () => void;
  onOpenPoliceControl?: () => void;
}

export function HomeScreen({ onSOSTrigger, onOpenSettings, onOpenPoliceControl }: HomeScreenProps) {
  const [tapCount, setTapCount] = useState(0);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tapCount === 6) {
      onSOSTrigger();
      setTapCount(0);
    }

    if (tapCount > 0) {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
      tapTimeoutRef.current = setTimeout(() => {
        setTapCount(0);
      }, 2000);
    }

    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, [tapCount, onSOSTrigger]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipplePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setShowRipple(true);
    setTapCount(prev => prev + 1);
    
    setTimeout(() => setShowRipple(false), 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-slate-900">Sahaaya</h2>
        </div>
        <div className="flex items-center gap-2">
          {onOpenPoliceControl && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onOpenPoliceControl}
              className="p-2 hover:bg-blue-50 rounded-full transition-all shadow-sm bg-white border border-blue-200 group relative"
              title="Police Control Room"
            >
              <Radio className="w-6 h-6 text-blue-600" />
              {/* Pulse indicator */}
              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full"
              />
            </motion.button>
          )}
          <button
            onClick={onOpenSettings}
            className="p-2 hover:bg-white rounded-full transition-all shadow-sm"
          >
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Main Tap Area */}
      <div
        onClick={handleTap}
        className="min-h-screen flex flex-col items-center justify-center cursor-pointer relative"
      >
        {/* Ripple Effect */}
        <AnimatePresence>
          {showRipple && (
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute w-20 h-20 rounded-full bg-blue-400 pointer-events-none"
              style={{
                left: ripplePosition.x,
                top: ripplePosition.y,
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 max-w-md"
        >
          {/* Shield Icon with Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-blue-200 opacity-20 blur-xl" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-4 border-white shadow-lg">
              <Shield className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Instruction Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-slate-900 mb-3">You're Protected</h1>
            <p className="text-slate-600 mb-6">
              Tap anywhere on the screen <span className="text-blue-600">6 times quickly</span> to trigger emergency SOS
            </p>
          </motion.div>

          {/* Tap Counter (Subtle) */}
          <AnimatePresence>
            {tapCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-2 justify-center mb-4"
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      scale: i < tapCount ? 1 : 0.7,
                      backgroundColor: i < tapCount ? '#3b82f6' : '#cbd5e1',
                    }}
                    className="w-3 h-3 rounded-full"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tap Demonstration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 text-slate-400 text-sm"
          >
            <Hand className="w-4 h-4" />
            Tap demonstration area
          </motion.div>
        </motion.div>

        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-100 opacity-30 blur-2xl" />
        <div className="absolute bottom-32 right-10 w-32 h-32 rounded-full bg-indigo-100 opacity-30 blur-2xl" />
        <div className="absolute top-1/2 right-20 w-16 h-16 rounded-full bg-cyan-100 opacity-30 blur-2xl" />
      </div>

      {/* Bottom Safe Zone Text */}
      <div className="absolute bottom-8 left-0 right-0 text-center px-6">
        <p className="text-slate-400 text-sm">
          Protected 24/7 • Emergency contacts ready
        </p>
      </div>
    </div>
  );
}
