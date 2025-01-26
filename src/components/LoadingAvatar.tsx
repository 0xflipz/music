"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LoadingAvatar = memo(() => {
  return (
    <motion.div 
      className="fixed right-[400px] bottom-0 z-[60] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative w-[600px] h-[600px]">
        {/* Enhanced Solana glow effect - more concentrated */}
        <motion.div 
          className="absolute inset-0 solana-glow-effect z-[1]"
          animate={{
            opacity: [0.7, 0.9, 0.7],  // Increased base opacity
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Glitch effects - middle layer */}
        <motion.div
          className="absolute inset-0 z-[2] mix-blend-screen"
          animate={{
            x: ["0%", "-2%", "2%", "0%"],
            opacity: [1, 0.85, 0.85, 1]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear"
          }}
        >
          <Image
            src="/loadingavatar.png"
            alt="Glitch Layer 1"
            fill
            className="object-contain solana-enhanced-glow"
            priority
            sizes="600px"
            quality={75}
          />
        </motion.div>

        {/* Base image - top layer */}
        <Image
          src="/loadingavatar.png"
          alt="Loading Avatar"
          fill
          className="object-contain relative z-[3] solana-enhanced-glow"
          priority
          sizes="600px"
          quality={75}
        />
      </div>
    </motion.div>
  );
});

LoadingAvatar.displayName = 'LoadingAvatar';
export default LoadingAvatar; 