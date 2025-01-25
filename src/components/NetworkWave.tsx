"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/utils";

interface NetworkWaveProps {
  total: number;
  columns?: number;
  rows?: number;
}

const NetworkWave = ({ total = 300, columns = 32, rows = 20 }: NetworkWaveProps) => {
  const [bars, setBars] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Memoize wave generation
  const generateWave = useCallback(() => {
    const time = Date.now() / 1000;
    return Array.from({ length: columns }, (_, i) => {
      const wave = Math.sin((i / columns) * Math.PI * 2 + time) * 0.5;
      const noise = Math.random() * (isHovered ? 0.3 : 0.2);
      return Math.min(rows, Math.max(2, Math.floor((wave + 1) * rows * 0.5 + noise * rows)));
    });
  }, [columns, rows, isHovered]);

  useEffect(() => {
    const interval = setInterval(() => setBars(generateWave()), isHovered ? 50 : 100);
    return () => clearInterval(interval);
  }, [generateWave, isHovered]);

  const getBarColor = (height: number) => {
    const ratio = height / rows;
    // Heat-themed aggressive color variations
    if (ratio > 0.8) return "bg-gradient-to-t from-red-600 to-[#ff0000] shadow-red-500/50";
    if (ratio > 0.6) return "bg-gradient-to-t from-orange-500 to-[#ff4400] shadow-orange-500/50";
    if (ratio > 0.4) return "bg-gradient-to-t from-yellow-500 to-[#ffaa00] shadow-yellow-500/50";
    return "bg-gradient-to-t from-yellow-300 to-[#ffdd00] shadow-yellow-400/50";
  };

  return (
    <div 
      className="flex justify-between h-32 items-end gap-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="sync">
        {bars.map((height, i) => {
          const ratio = height / rows;
          return (
            <div key={i} className="flex flex-col gap-0.5 justify-end">
              {Array.from({ length: height }).map((_, j) => (
                <motion.div
                  key={j}
                  initial={false}
                  animate={{ 
                    height: isHovered ? "4px" : "3px",
                    scale: isHovered ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    scale: {
                      repeat: Infinity,
                      duration: 0.5
                    }
                  }}
                  className={cn(
                    "rounded-full",
                    getBarColor(height),
                    "backdrop-blur-sm",
                    "shadow-lg",
                    isHovered ? "w-4" : "w-3",
                    "relative",
                    "after:absolute after:inset-0 after:opacity-40 after:blur-sm",
                    ratio > 0.8 ? "after:bg-red-500" : 
                    ratio > 0.6 ? "after:bg-orange-500" : 
                    "after:bg-yellow-500"
                  )}
                />
              ))}
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(NetworkWave); 