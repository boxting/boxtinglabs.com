'use client';

import { motion } from 'framer-motion';

export function Loading() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-slate-950"
    >
      <div className="relative flex flex-col items-center">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, borderRightWidth: 0, borderBottomWidth: 0 }}
              animate={{ 
                scale: 1, 
                borderRightWidth: 4, 
                borderBottomWidth: 4,
                rotate: [0, 90, 90, 0] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="h-12 w-12 border-2 border-slate-900 bg-brand-orange-500 dark:border-white"
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 font-heading text-lg font-bold tracking-widest text-slate-900 dark:text-white"
        >
          ASSEMBLING BOXES...
        </motion.div>
      </div>
    </motion.div>
  );
}
