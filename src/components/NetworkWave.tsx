"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/utils";

interface NetworkWaveProps {
  total: number;
  columns?: number;
  rows?: number;
}

const NetworkWave = ({ total = 300, columns = 15, rows = 20 }: NetworkWaveProps) => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    const generateWave = () => {
      const newBars = Array.from({ length: columns }, (_, i) => {
        // Create a sine wave pattern
        const base = Math.sin((i / columns) * Math.PI * 2) * 0.5 + 0.5;
        // Add some randomness
        return Math.min(rows, Math.max(1, Math.floor(base * rows + Math.random() * 5)));
      });
      setBars(newBars);
    };

    generateWave();
    const interval = setInterval(generateWave, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [columns, rows]);

  const getBarColor = (height: number) => {
    const ratio = height / rows;
    if (ratio > 0.8) return "bg-red-400";
    if (ratio > 0.5) return "bg-yellow-400";
    return "bg-green-400";
  };

  return (
    <div className="flex justify-between h-32 items-end gap-1">
      <AnimatePresence mode="sync">
        {bars.map((height, i) => (
          <div key={i} className="flex flex-col gap-0.5 justify-end">
            {Array.from({ length: height }).map((_, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  height: "2px",
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
                className={cn(
                  "w-2 rounded-full",
                  getBarColor(height),
                  "backdrop-blur-sm",
                  "after:absolute after:inset-0 after:bg-white/20 after:rounded-full"
                )}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NetworkWave; 