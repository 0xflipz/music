"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

export default function HolographicVideo() {
  return (
    <div className="cyber-container w-full h-[280px] relative flex flex-col">
      <div className="cyber-corner cyber-corner-tl" />
      <div className="cyber-corner cyber-corner-tr" />
      <div className="cyber-corner cyber-corner-bl" />
      <div className="cyber-corner cyber-corner-br" />
      
      <div className="cyber-header p-3 flex items-center justify-between bg-black/40 border-b border-[#9945FF]/20">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#00F0FF]"
            animate={{ 
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 10px #00F0FF",
                "0 0 5px #00F0FF",
                "0 0 10px #00F0FF"
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[#00F0FF] text-sm font-mono tracking-wider">FLIPZ_HOLOGRAM.exe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#00F0FF] text-xs font-mono">LIVE</span>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 10px #00F0FF",
                "0 0 5px #00F0FF",
                "0 0 10px #00F0FF"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden bg-black/20">
        {/* Scan lines effect */}
        <div className="absolute inset-0 bg-scan-lines opacity-20 z-[1]" />
        
        {/* Holographic glow effect */}
        <motion.div 
          className="absolute inset-0 solana-glow-effect z-[2]"
          animate={{
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main content */}
        <div className="relative z-[3] w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <video
              src="/hologram.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Recording indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FF4400]"
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <span className="text-[#FF4400] text-xs font-mono">REC</span>
            </div>

            {/* Error alert overlay - conditionally rendered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 8 }}
            >
              <div className="text-[#FF4400] text-2xl font-bold font-mono tracking-wider">
                ERROR_ALERT
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 