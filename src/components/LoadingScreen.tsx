import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-xs">
        <div className="flex justify-between items-end mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold text-white tracking-tighter"
          >
            SURAJIT<span className="text-neon-purple leading-none">.</span>
          </motion.div>
          <span className="text-xs font-mono text-neon-blue font-bold tracking-widest">
            {progress}%
          </span>
        </div>
        <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-purple to-neon-blue"
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
