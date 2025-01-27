"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

export default function Rain() {
  // Reduce number of raindrops and adjust properties for lighter effect
  const raindrops = Array.from({ length: 150 }, (_, i) => ({ // Reduced from 200 to 150 drops
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2, // Increased delay for less intensity (from 1.5 to 2)
    duration: 0.8 + Math.random() * 0.6, // Slower drops (from 0.6 to 0.8)
    width: Math.random() < 0.3 ? 2 : 1, // Fewer thick drops (from 0.4 to 0.3)
    height: 20 + Math.random() * 30, // Shorter drops (from 30-70 to 20-50)
    opacity: 0.4 + Math.random() * 0.3, // Lower opacity (from 0.6-1.0 to 0.4-0.7)
    glow: Math.random() < 0.3, // Less glowing drops (from 0.5 to 0.3)
  }));

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className={cn(
            "absolute bg-gradient-to-b from-white/50 via-white/40 to-white/30", // Reduced opacity in gradient
            drop.glow && "shadow-[0_0_10px_rgba(255,255,255,0.5)]" // Reduced glow intensity
          )}
          style={{
            left: drop.left,
            width: drop.width,
            height: `${drop.height}px`,
            opacity: drop.opacity,
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
      
      {/* Adjusted overlay gradient for subtler effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              rgba(0, 0, 0, 0.2) 30%, /* Reduced from 0.3 */
              rgba(0, 0, 0, 0.5) 100% /* Reduced from 0.7 */
            ),
            linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03) 0%, /* Reduced from 0.05 */
              transparent 100%
            )
          `,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
} 