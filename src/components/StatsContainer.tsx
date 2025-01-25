"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { cn } from "@/utils/utils";
import NetworkWave from "./NetworkWave";

// Utility function to generate random fluctuations
const fluctuate = (base: number, percentage: number = 5) => {
  const variance = base * (percentage / 100);
  return (base + (Math.random() - 0.5) * variance).toFixed(3);
};

interface TokenMetricProps {
  label: string;
  value: string;
  trend?: number;
  isAnimated?: boolean;
}

const TokenMetric = ({ label, value, trend, isAnimated = true }: TokenMetricProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  
  useEffect(() => {
    if (!isAnimated) return;
    
    const interval = setInterval(() => {
      const baseValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
      const newValue = (baseValue + (Math.random() - 0.5) * 0.1).toFixed(3);
      setCurrentValue(value.startsWith("$") ? `$${newValue}` : newValue);
    }, 3000);

    return () => clearInterval(interval);
  }, [value, isAnimated]);

  return (
    <Card className="relative p-4 bg-black/40 border-[#0ff]/20 backdrop-blur-md group hover:bg-black/50 transition-all duration-300">
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#0ff]/0 via-[#0ff]/20 to-[#0ff]/0"
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Hover highlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#0ff]/5 transition-opacity duration-300"
        initial={false}
        whileHover={{ scale: 1.02 }}
      />

      <div className="space-y-2 relative">
        {/* Label with enhanced styling */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-white/70 tracking-[0.2em] uppercase">{label}</span>
          {trend && (
            <motion.span
              className={cn(
                "text-xs font-mono",
                trend > 0 ? "text-green-400" : "text-red-400"
              )}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {trend > 0 ? "+" : ""}{trend}%
            </motion.span>
          )}
        </div>

        {/* Value with cyberpunk styling */}
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-mono font-bold text-white tracking-tight">
            {currentValue.split('.')[0]}
          </span>
          {currentValue.includes('.') && (
            <span className="text-lg font-mono font-medium text-[#0ff]">
              .{currentValue.split('.')[1]}
            </span>
          )}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-[#0ff]/50 to-transparent"
          animate={{
            width: ['0%', '100%', '0%'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-[#0ff]/30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-[#0ff]/30" />
      </div>
    </Card>
  );
};

interface LiveStatBarProps {
  value: number;
  max?: number;
  label: string;
  className?: string;
}

const LiveStatBar = ({ value, max = 100, label, className }: LiveStatBarProps) => {
  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-[#0ff] tracking-[0.3em] opacity-90">{label}</span>
        <span className="text-xs font-mono text-[#0ff] font-bold">{value}%</span>
      </div>
      <div className={cn(
        "relative h-1.5 bg-black/60 rounded-sm overflow-hidden border border-[#0ff]/10",
        "before:absolute before:inset-0 before:bg-black/40 before:backdrop-blur-sm",
        className
      )}>
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0ff]/90 via-[#0ff] to-[#0ff]/80"
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0ff]/20 to-transparent"
          animate={{
            x: [-20, 20, -20],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

const NetworkGrid = ({ total, active }: { total: number; active: number }) => {
  return (
    <div className="grid grid-cols-15 gap-0.5">
      {[...Array(total)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.01 }}
          className={cn(
            "h-1.5 w-1.5 rounded-sm relative group",
            i < active ? 'bg-blue-400/80' : 'bg-gray-700/30',
            i < active && 'animate-pulse'
          )}
        >
          <motion.div
            className="absolute inset-0 bg-blue-400/30 rounded-sm"
            initial={false}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function StatsContainer() {
  return (
    <motion.div
      className="fixed top-0 right-0 w-[500px] h-screen z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full space-y-6 backdrop-blur-lg bg-black/20 p-8 border-l border-[#0ff]/20">
        {/* Terminal header styling */}
        <div className="text-[#0ff] font-mono text-sm border-b border-[#0ff]/20 pb-4 mb-8 relative">
          <motion.span
            className="absolute -left-2 top-0 h-full w-1 bg-[#0ff]/50"
            animate={{
              height: ["0%", "100%", "0%"],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="tracking-[0.3em] relative">
            SYSTEM_STATUS.exe
            <motion.span 
              className="absolute -top-1 right-0 text-[8px] text-[#0ff]/70"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ▊
            </motion.span>
          </span>
        </div>

        {/* Stats grid with updated styling */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <TokenMetric label="FLIPZ_PRICE" value="$1.247" trend={2.5} />
          <TokenMetric label="MARKET_CAP" value="$12.4M" trend={-1.2} />
          <TokenMetric label="HOLDERS" value="1,247" trend={5.8} />
          <TokenMetric label="24H_VOLUME" value="$847.2K" trend={3.1} />
        </div>

        {/* Neural Matrix card with enhanced effects */}
        <Card variant="quantum" className="p-6 relative overflow-hidden border-[#ff4400]/30 bg-black/40 mb-8">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/5 via-[#ff4400]/10 to-[#ff0000]/5"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              x: [0, 100, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-mono text-[#ff4400] tracking-[0.3em]">COOKING_HEAT</span>
            <motion.div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#ff4400]"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 0.8, 1],
                  boxShadow: [
                    "0 0 10px #ff4400",
                    "0 0 5px #ff4400",
                    "0 0 10px #ff4400"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-[#ff4400] tracking-wider">LIVE</span>
            </motion.div>
          </div>
          <NetworkWave 
            total={300} 
            columns={32} // Increased for more aggressive look
            rows={20}    // Increased for higher peaks
          />
        </Card>

        {/* Enhanced stat bars with new styling */}
        <div className="space-y-6">
          <LiveStatBar value={94} label="NEURAL_HARMONY" className="glow-bar" />
          <LiveStatBar value={67} label="BEATS_ANALYZED" max={100} className="glow-bar" />
          <LiveStatBar value={88} label="RHYTHM_SYNC" className="glow-bar" />
          <LiveStatBar value={96} label="AI_FLOW" className="glow-bar" />
          <LiveStatBar value={82} label="NEURAL_SYNC" className="glow-bar" />
          <LiveStatBar value={91} label="SYSTEM_HEALTH" className="glow-bar" />
        </div>
      </div>
    </motion.div>
  );
} 