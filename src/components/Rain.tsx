"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

export default function Rain() {
  // Increased number of raindrops with slightly adjusted opacity
  const raindrops = Array.from({ length: 300 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 0.6 + Math.random() * 0.4,
    width: Math.random() < 0.3 ? 3 : 2,
    height: 20 + Math.random() * 30,
    opacity: 0.3 + Math.random() * 0.3, // Slightly increased opacity range (0.3-0.6)
    glow: Math.random() < 0.3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className={cn(
            "absolute bg-gradient-to-b from-[#00F0FF]/40 via-[#00F0FF]/30 to-[#9945FF]/20", // Slightly increased gradient opacity
            drop.glow && "shadow-[0_0_8px_rgba(0,240,255,0.4)]" // Slightly increased glow opacity
          )}
          style={{
            left: drop.left,
            width: drop.width,
            height: `${drop.height}px`,
            opacity: drop.opacity,
            filter: drop.glow ? 'brightness(1.4)' : 'none', // Slightly increased brightness
          }}
          animate={{
            y: ['-20vh', '120vh'],
            opacity: [0, drop.opacity, 0]
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: 'linear'
          }}
        />
      ))}
      
      {/* Enhanced overlay gradient with slightly increased opacity */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              rgba(0, 0, 0, 0.25) 30%,
              rgba(0, 0, 0, 0.6) 100%
            ),
            linear-gradient(
              0deg,
              rgba(0, 240, 255, 0.03) 0%,
              transparent 100%
            )
          `,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
} 