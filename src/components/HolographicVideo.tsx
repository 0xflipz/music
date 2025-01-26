"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HolographicVideo() {
  const [isHovered, setIsHovered] = useState(false);
  const videoUrl = "/hologram.mp4"; // Add your video path here

  return (
    <div className="cyber-container w-full h-[280px] relative">
      <div className="cyber-corner cyber-corner-tl" />
      <div className="cyber-corner cyber-corner-tr" />
      <div className="cyber-corner cyber-corner-bl" />
      <div className="cyber-corner cyber-corner-br" />
      
      <div className="cyber-header p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-white text-sm">FLIPZ_HOLOGRAM.exe</span>
        </div>
        <span className="cyber-button px-2 py-0.5 text-xs text-white">
          LIVE
        </span>
      </div>

      <div className="relative z-10 h-[calc(280px-48px)]">
        <div className="relative h-full overflow-hidden">
          {/* Holographic container */}
          <div className="absolute inset-0 z-20">
            {/* Scan lines */}
            <div className="absolute inset-0 bg-scan-lines opacity-10" />
            
            {/* Top glow */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white/20 to-transparent"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Bottom glow */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-white/20 to-transparent"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Side glows */}
            <motion.div
              className="absolute inset-y-0 left-0 w-[50px] bg-gradient-to-r from-white/20 to-transparent"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-y-0 right-0 w-[50px] bg-gradient-to-l from-white/20 to-transparent"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Video element */}
          <video
            className="relative z-10 w-full h-full object-cover mix-blend-screen"
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline // Add this for better mobile support
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          {/* Holographic overlay effects */}
          <motion.div
            className="absolute inset-0 z-30 mix-blend-overlay bg-gradient-to-b from-white/5 via-transparent to-white/5"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Border glow effect */}
          <motion.div
            className="absolute inset-0 z-40 border border-white/20"
            animate={{
              boxShadow: isHovered 
                ? [
                    'inset 0 0 15px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.2)',
                    'inset 0 0 30px rgba(255,255,255,0.4), 0 0 50px rgba(255,255,255,0.3)',
                    'inset 0 0 15px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.2)'
                  ]
                : [
                    'inset 0 0 10px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.1)',
                    'inset 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.2)',
                    'inset 0 0 10px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.1)'
                  ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
} 