import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const eased = Math.round((1 - Math.pow(1 - current / steps, 3)) * 100);
      setProgress(eased);
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#030712' }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Concentric Spinner */}
          <motion.div
            className="mb-10 relative w-32 h-32 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer Ring - Cyan */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 border-r-cyan-500 animate-spin-slow" />
            
            {/* Middle Ring - Purple */}
            <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-purple-500 border-l-purple-500 animate-spin-reverse" />
            
            {/* Inner Ring - Blue */}
            <div className="absolute inset-6 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500 animate-spin-fast" />

            {/* Pulsing Core */}
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center z-10"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(3,7,18,0.9) 70%)',
                border: '1px solid rgba(59,130,246,0.3)',
                boxShadow: '0 0 20px rgba(59,130,246,0.2)',
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span
                className="text-white font-black text-2xl"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                V
              </span>
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.div
            className="mb-1 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1
              className="text-2xl font-bold tracking-widest uppercase text-white glitch-text"
              data-text="VINAY"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.3em' }}
            >
              Vinay
            </h1>
          </motion.div>

          <motion.p
            className="text-sm mb-12 tracking-widest"
            style={{ color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Portfolio Loading
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            className="w-48 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div
              className="w-full h-px mb-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  boxShadow: '0 0 8px rgba(59,130,246,0.8)',
                  transition: 'width 20ms linear',
                }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span
                className="text-xs"
                style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}
              >
                Initializing
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: '#3b82f6', fontFamily: 'JetBrains Mono, monospace' }}
              >
                {progress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
