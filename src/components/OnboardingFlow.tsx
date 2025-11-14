import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, MapPin, Smartphone, Users, ChevronRight, Check } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Shield,
    title: 'Welcome to Sahaaya',
    subtitle: 'Your Safety Companion',
    description: 'Sahaaya is designed to keep you safe with intelligent emergency response, even in the most challenging situations.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Smartphone,
    title: 'Secret SOS Activation',
    subtitle: 'Tap 6 Times Anywhere',
    description: 'Trigger an emergency alert by tapping anywhere on the screen 6 times quickly. Works even when your phone is locked.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: MapPin,
    title: 'Offline & Online Support',
    subtitle: 'Always Connected',
    description: 'Send SMS alerts when offline or share live location tracking when online. Your safety is never compromised.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Users,
    title: 'Permissions Required',
    subtitle: 'We Need Your Permission',
    description: 'Sahaaya requires access to location, SMS, and background services to protect you effectively.',
    color: 'from-blue-500 to-indigo-600',
  },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col px-6 py-8">
        {/* Skip Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSkip}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 shadow-lg shadow-blue-200`}
              >
                <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
              </motion.div>

              {/* Illustration Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                {currentStep === 0 && (
                  <div className="flex gap-3 justify-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                      className="w-12 h-12 rounded-full bg-blue-200 opacity-40"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                      className="w-12 h-12 rounded-full bg-indigo-200 opacity-40"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
                      className="w-12 h-12 rounded-full bg-cyan-200 opacity-40"
                    />
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="relative w-40 h-40">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-blue-400"
                        style={{ transform: 'translate(-50%, -50%)' }}
                      />
                    ))}
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-slate-300 flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-slate-600" />
                      </div>
                      <span className="text-xs text-slate-500">Offline</span>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronRight className="w-8 h-8 text-blue-500" />
                    </motion.div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-green-600" />
                      </div>
                      <span className="text-xs text-slate-500">Online</span>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="grid grid-cols-3 gap-3">
                    {[MapPin, Smartphone, Users].map((Icon, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                        className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center"
                      >
                        <Icon className="w-8 h-8 text-blue-600" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-blue-600 mb-2">{step.subtitle}</p>
                <h2 className="mb-4">{step.title}</h2>
                <p className="text-slate-600 max-w-sm mx-auto">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {onboardingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-blue-600'
                  : index < currentStep
                  ? 'w-2 bg-blue-400'
                  : 'w-2 bg-slate-300'
              }`}
              initial={false}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
              }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex-1 py-3 rounded-full border-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            {currentStep === onboardingSteps.length - 1 ? (
              <>
                Get Started
                <Check className="w-5 h-5" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
