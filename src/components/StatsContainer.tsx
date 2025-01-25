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

const TokenMetric = ({ label, value, trend, isAnimated = true }: { 
  label: string; 
  value: string; 
  trend?: number;
  isAnimated?: boolean;
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [currentTrend, setCurrentTrend] = useState(trend);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isAnimated) {
      const interval = setInterval(() => {
        const baseValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
        const newValue = fluctuate(baseValue);
        const newTrend = ((newValue - baseValue) / baseValue) * 100;
        
        setCurrentValue(value.startsWith("$") ? `$${parseFloat(newValue).toFixed(3)}` : newValue);
        setCurrentTrend(parseFloat(newTrend.toFixed(2)));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [value, isAnimated]);

  return (
    <Card
      variant="neural"
      className="relative overflow-hidden group w-full h-[85px] border-cyan-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="p-4 relative z-10 h-full flex flex-col justify-between"
        animate={{ 
          backgroundColor: isHovered ? "rgba(0,20,40,0.4)" : "rgba(0,0,0,0)" 
        }}
      >
        <div className="text-[10px] font-mono text-cyan-500/70 tracking-[0.25em] uppercase flex items-center gap-2">
          {label}
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-cyan-500"
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentValue}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-lg font-mono text-cyan-400 font-bold tracking-wider whitespace-nowrap"
            >
              {currentValue}
            </motion.div>
          </AnimatePresence>
          {currentTrend && (
            <motion.span 
              className={cn(
                "text-xs font-mono ml-2 whitespace-nowrap tracking-wider",
                currentTrend > 0 ? "text-emerald-400" : "text-red-400"
              )}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentTrend > 0 ? "+" : ""}{currentTrend.toFixed(2)}%
            </motion.span>
          )}
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5"
        animate={{
          opacity: [0.1, 0.15, 0.1],
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </Card>
  );
};

const LiveStatBar = ({ value, label, max = 100, color = "blue", className }: { 
  value: number; 
  label: string;
  max?: number;
  color?: "blue" | "purple" | "cyan";
  className?: string;
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(prev => {
        const fluctuation = max === 100 ? 5 : 50;
        const newValue = prev + (Math.random() - 0.5) * fluctuation;
        return Math.min(Math.max(newValue, 0), max);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [max]);

  return (
    <motion.div 
      className={`mb-6 relative group ${className || ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-mono tracking-[0.2em] text-gray-400 flex items-center gap-2">
          <motion.span 
            className={cn(
              `w-2 h-2 rounded-full bg-${color}-500`,
              isHovered && "animate-ping"
            )}
          />
          {label}
        </span>
        <AnimatePresence mode="wait">
          <motion.span 
            key={currentValue}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className={`text-sm font-mono text-${color}-400 font-bold`}
          >
            {currentValue.toFixed(1)}{max === 100 ? '%' : ''}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm group-hover:h-3 transition-all">
        <motion.div
          animate={{ 
            width: `${(currentValue/max) * 100}%`,
            transition: { duration: 1 }
          }}
          className={cn(
            `h-full relative`,
            `bg-gradient-to-r from-${color}-500/50 to-${color}-300`,
          )}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"
            animate={{ 
              x: ["0%", "100%"],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "linear" 
            }}
          />
        </motion.div>
      </div>
    </motion.div>
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
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed left-[550px] top-0 h-screen w-[380px] bg-[#000B14]/80 backdrop-blur-2xl p-8 border-l border-cyan-500/20 shadow-[inset_0_0_50px_rgba(0,255,255,0.1)] relative overflow-hidden"
    >
      {/* Ambient glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-blue-500/5" />
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,255,0.1),transparent_70%)]"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <div className="space-y-8 relative z-10">
        {/* Header with cyber effect */}
        <div className="text-cyan-400 font-mono text-sm border-b border-cyan-500/20 pb-4 mb-8 relative">
          <motion.span
            className="absolute -left-2 top-0 h-full w-1 bg-cyan-400/50"
            animate={{
              height: ["0%", "100%", "0%"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          SYSTEM STATUS
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <TokenMetric label="$FLIPZ PRICE" value="$1.247" trend={2.5} />
          <TokenMetric label="MARKET CAP" value="$12.4M" trend={-1.2} />
          <TokenMetric label="HOLDERS" value="1,247" trend={5.8} />
          <TokenMetric label="24H VOLUME" value="$847.2K" trend={3.1} />
        </div>

        <LiveStatBar 
          value={92} 
          label="QUANTUM STABILITY" 
          color="cyan" 
          className="glow-bar"
        />
        <LiveStatBar 
          value={1247} 
          label="AI MODELS TRAINED" 
          max={2000} 
          color="purple"
          className="glow-bar" 
        />
        <LiveStatBar 
          value={95} 
          label="NEURAL SYNC" 
          color="blue"
          className="glow-bar" 
        />
        <LiveStatBar 
          value={78} 
          label="BLOCKCHAIN SYNC" 
          color="cyan"
          className="glow-bar" 
        />

        <Card variant="quantum" className="p-6 relative overflow-hidden border-cyan-500/30">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-blue-500/10"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              x: [0, 100, 0],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-mono text-cyan-400">NETWORK ACTIVITY</span>
            <motion.div 
              className="flex items-center gap-2"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 0.8, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-mono text-cyan-400">LIVE</span>
            </motion.div>
          </div>
          <NetworkWave total={300} />
          <div className="mt-4 flex justify-between text-xs font-mono">
            <span className="text-emerald-400">Stable</span>
            <span className="text-amber-400">Warning</span>
            <span className="text-rose-400">Critical</span>
          </div>
        </Card>
      </div>
    </motion.div>
  );
} 