"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileWarning() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-[#9945FF]/90 to-[#00F0FF]/90 backdrop-blur-sm md:hidden"
      >
        <div className="px-4 py-3 text-center relative">
          <p className="text-xs text-white font-mono">
            For the best experience, view FLIPZ on desktop 🖥️
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white px-2"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 