"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

export default function HolographicVideo() {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        milliseconds: Math.floor(difference % 1000)
      });
    }, 41); // Update roughly every frame for smooth milliseconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="component-container holographic-video relative h-[238px] w-[520px] bg-black/20 backdrop-blur-sm border border-[#9945FF]/20 rounded-lg overflow-hidden">
      {/* Enhanced Header */}
      <div className="absolute inset-x-0 top-0 p-2 flex items-center justify-between border-b border-[#9945FF]/20">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white tracking-wider font-mono">FLIPZ_HOLOGRAM.exe</span>
          <div className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]"></div>
          <div className="px-1.5 py-0.5 text-[10px] bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF]">
            LIVE
          </div>
        </div>

        {/* Simple Hieroglyphic Timer */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#FF4400] tracking-[0.5em]">
            ⟊⟡⟰⟱⟲⟳⟴⟵⟶⟷
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col h-full pt-14">
        <div className="relative flex-1 overflow-hidden">
          {/* Video Content */}
          <video
            src="/hologram.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Scan lines effect */}
          <div className="absolute inset-0 bg-scan-lines opacity-20 z-[1]" />
          
          {/* Holographic glow effect */}
          <motion.div 
            className="absolute inset-0 z-[2]"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.2) 0%, transparent 70%)'
            }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Error alert overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-[3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 8 }}
          >
            <div className="text-[#FF4400] text-2xl font-bold font-mono tracking-wider">
              BREACH_ALERT
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add glow effect that stays within container */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg"
        style={{
          background: `radial-gradient(
            circle at center,
            rgba(153, 69, 255, 0.2) 0%,
            rgba(0, 240, 255, 0.15) 50%,
            transparent 70%
          )`
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute inset-0 -z-20 rounded-lg opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
} 