"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HolographicVideoProps {
  videoUrl?: string;
}

export default function HolographicVideo({ videoUrl }: HolographicVideoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-[280px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0ff]/0 via-[#0ff]/5 to-[#0ff]/0" />
      
      <div className="relative z-10 h-full">
        <div className="p-3 border-b border-[#0ff]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#0ff]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="terminal-text-primary text-sm">FLIPZ_HOLOGRAM.exe</span>
          </div>
          <span className="px-2 py-0.5 bg-[#0ff]/10 border border-[#0ff]/30 rounded text-xs text-[#0ff]">
            LIVE
          </span>
        </div>

        <div className="relative h-[calc(100%-48px)] overflow-hidden">
          {videoUrl ? (
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-[#0ff]/10 via-transparent to-[#0ff]/10 pointer-events-none"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <video
                className="w-full h-full object-cover mix-blend-screen"
                src={videoUrl}
                autoPlay
                loop
                muted
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <motion.div
                className="absolute inset-0 border border-[#0ff]/20"
                animate={{
                  boxShadow: isHovered 
                    ? ['inset 0 0 15px rgba(0,255,255,0.2)', 'inset 0 0 30px rgba(0,255,255,0.4)', 'inset 0 0 15px rgba(0,255,255,0.2)']
                    : ['inset 0 0 10px rgba(0,255,255,0.1)', 'inset 0 0 20px rgba(0,255,255,0.2)', 'inset 0 0 10px rgba(0,255,255,0.1)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <motion.div 
                className="text-[#0ff]/50 font-mono text-sm"
                animate={{ opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AWAITING HOLOGRAM INPUT...
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 