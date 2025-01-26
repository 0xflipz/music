"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/utils";

interface NetworkWaveProps {
  total: number;
  columns?: number;
  rows?: number;
  className?: string;
}

const NetworkWave = ({ total = 300, columns = 48, rows = 24, className }: NetworkWaveProps) => {
  const [bars, setBars] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Optimized wave generation with memoized calculation
  const generateWave = useCallback(() => {
    const time = Date.now() / 2500; // Slower animation for better performance
    const baseWave = new Array(columns).fill(0);
    return baseWave.map((_, i) => {
      const wave = Math.sin((i / columns) * Math.PI * 2 + time) * 0.5;
      const noise = Math.random() * 0.1; // Reduced noise
      return Math.min(rows, Math.max(2, Math.floor((wave + 1) * rows * 0.5 + noise * rows)));
    });
  }, [columns, rows]);

  // Reduced update frequency
  useEffect(() => {
    const interval = setInterval(() => setBars(generateWave()), isHovered ? 150 : 250);
    return () => clearInterval(interval);
  }, [generateWave, isHovered]);

  // Memoized color getter
  const getBarColor = useCallback((ratio: number) => {
    if (ratio > 0.8) return "bg-gradient-to-t from-red-600 to-[#ff0000]";
    if (ratio > 0.6) return "bg-gradient-to-t from-orange-500 to-[#ff4400]";
    return "bg-gradient-to-t from-red-500 to-[#ff0000]";
  }, []);

  return (
    <div 
      className={cn("relative w-full h-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 flex items-end justify-between">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-full mx-px rounded-t",
              className?.includes('cooking-heat') 
                ? "bg-gradient-to-t from-[#9945FF] to-[#00F0FF] opacity-90"
                : "bg-gradient-to-t from-[#9945FF]/80 to-[#00F0FF]/80"
            )}
            style={{
              height: `${(height / rows) * 100}%`,
            }}
            animate={{
              height: `${(height / rows) * 100}%`,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

const NeuralBeats = () => {
  return (
    <div className="terminal-container p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="terminal-text">NEURAL BEATS v1.0</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/70">170.2 BPM</span>
          <button className="px-3 py-1 text-sm border border-[#0ff]/20 text-[#0ff] hover:bg-[#0ff]/10">
            PAUSE
          </button>
        </div>
      </div>
      <div className="text-xs text-white/50 mb-2">AUDIO SEQUENCE</div>
      <NetworkWave 
        total={300} 
        columns={48}
        rows={24}
        className="h-24"
      />
      <div className="text-right text-xs text-white/50 mt-2">
        FREQ: 237.6 Hz
      </div>
    </div>
  );
};

export default React.memo(NetworkWave); 