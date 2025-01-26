"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
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
    <div className="token-metric">
      <div className="flex justify-between items-center mb-2">
        <span className="token-label">{label}</span>
        {trend && (
          <motion.span
            className={cn(
              "trend-value",
              trend > 0 ? "trend-positive" : "trend-negative"
            )}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {trend > 0 ? "+" : ""}{trend}%
          </motion.span>
        )}
      </div>
      <motion.div 
        className="token-value"
        animate={isAnimated ? {
          opacity: [0.9, 1, 0.9],
          textShadow: [
            "0 0 10px rgba(0, 255, 255, 0.3)",
            "0 0 20px rgba(0, 255, 255, 0.5)",
            "0 0 10px rgba(0, 255, 255, 0.3)"
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {value}
      </motion.div>
    </div>
  );
};

// Add this function at the top
const generateRandomFluctuation = (baseValue: number, range: number = 2) => {
  return Math.min(100, Math.max(0, baseValue + (Math.random() - 0.5) * range));
};

// Add this utility function at the top
const generateFluctuation = (baseValue: number, range: number = 3) => {
  return Math.min(100, Math.max(0, baseValue + (Math.random() - 0.5) * range));
};

const LiveStatBar = ({ value: initialValue, label, className }: { value: number; label: string; className?: string }) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => generateFluctuation(initialValue));
    }, 1000);

    return () => clearInterval(interval);
  }, [initialValue]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-mono tracking-wider text-white cyber-flicker">{label}</span>
        <span className="text-sm font-mono text-white cyber-flicker">{value.toFixed(1)}%</span>
      </div>
      <div className={cn(
        "h-2 bg-black/40 rounded-sm overflow-hidden",
        "border border-blue-500/30",
        "relative shadow-[0_0_15px_rgba(0,157,255,0.3)]",
        className
      )}>
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"
          animate={{ 
            width: `${value}%`,
            transition: { duration: 1, ease: "easeInOut" }
          }}
        />
        
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 bg-blue-500/10"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Scanning line */}
        <motion.div
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
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

// Add new system stats component
const SystemStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="terminal-container p-3">
        <div className="text-xs text-[#0ff]/70">CPU Load</div>
        <div className="flex items-center gap-2">
          <span className="terminal-value">34.5%</span>
          <div className="progress-bar w-full h-2 rounded">
            <motion.div 
              className="progress-fill h-full rounded"
              initial={{ width: "0%" }}
              animate={{ width: "34.5%" }}
            />
          </div>
        </div>
      </div>
      <div className="terminal-container p-3">
        <div className="text-xs text-[#0ff]/70">Memory</div>
        <div className="flex items-center gap-2">
          <span className="terminal-value">37.9%</span>
          <div className="progress-bar w-full h-2 rounded">
            <motion.div 
              className="progress-fill h-full rounded"
              initial={{ width: "0%" }}
              animate={{ width: "37.9%" }}
            />
          </div>
        </div>
      </div>
      {/* Add Network and GPU temp stats similarly */}
    </div>
  );
};

// Add initialization sequence
const InitializationSequence = () => {
  return (
    <div className="terminal-container p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <motion.div 
          className="w-2 h-2 rounded-full bg-[#0ff]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="terminal-text">INITIALIZING NEURAL AUDIO ENGINE</span>
      </div>
      <div className="progress-bar w-full h-3 rounded">
        <motion.div 
          className="progress-fill h-full rounded"
          animate={{ 
            width: ["0%", "100%"],
            transition: { duration: 3, repeat: Infinity }
          }}
        />
      </div>
    </div>
  );
};

// Memoized components
const AnimatedMetric = memo(({ label, value, unit = '' }: { label: string, value: string, unit?: string }) => (
  <div className="flex flex-col">
    <span className="text-white/60 mb-1 text-xs tracking-wider">{label}</span>
    <span className="text-white font-bold metric-glow">
      {value}{unit}
    </span>
  </div>
));

AnimatedMetric.displayName = 'AnimatedMetric';

// Optimized random value generator
const generateRandomValue = (min: number, max: number, decimals = 0) => {
  const value = min + Math.random() * (max - min);
  return Number(value.toFixed(decimals));
};

// Main component optimization
export default function StatsContainer() {
  const [metrics, setMetrics] = useState(() => ({
    price: "$1.247",
    marketCap: "$12.4M",
    holders: "1,247",
    volume: "$847.2K"
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        price: fluctuate(1.247, 2),
        marketCap: fluctuate(12.4, 1),
        holders: Math.floor(1247 + Math.random() * 10).toString(),
        volume: fluctuate(847.2, 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Memoized value generators
  const getBPM = useCallback(() => generateRandomValue(138, 145), []);
  const getPeak = useCallback(() => generateRandomValue(95, 99), []);
  
  return (
    <motion.div
      className="fixed top-0 right-0 w-[400px] h-screen z-50"
      initial={{ transform: 'translateX(100%)' }}
      animate={{ transform: 'translateX(0)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full overflow-y-auto scrollbar-hide backdrop-blur-lg bg-black/20 p-8 border-l border-white/20">
        <div className="sticky top-0 z-10 bg-black/40 -mx-8 px-8 pt-4 pb-4 mb-8">
          <div className="text-white font-mono text-sm border-b border-white/20 pb-4 relative">
            <motion.span
              className="absolute -left-2 top-0 h-full w-1 bg-white/50"
              animate={{
                height: ["0%", "100%", "0%"],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="tracking-[0.3em] relative">
              SYSTEM_STATUS.exe
              <motion.span 
                className="absolute -top-1 right-0 text-[8px] text-white/70"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ▊
              </motion.span>
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <TokenMetric label="FLIPZ_PRICE" value={metrics.price} trend={2.5} />
            <TokenMetric label="MARKET_CAP" value={metrics.marketCap} trend={-1.2} />
            <TokenMetric label="HOLDERS" value={metrics.holders} trend={5.8} />
            <TokenMetric label="24H_VOLUME" value={metrics.volume} trend={3.1} />
          </div>

          <SystemStats />
          
          <Card variant="quantum" className="p-6 relative overflow-hidden border-white/20 bg-black/40">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ff0000]/10 via-transparent to-[#ff0000]/10"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                x: [0, 100, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="flex flex-col space-y-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#ff4400] tracking-[0.3em]">COOKING_HEAT</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/60">BPM</span>
                    <span className="text-xs font-mono text-white">{getBPM()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/60">PEAK</span>
                    <span className="text-xs font-mono text-white">{getPeak()}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-white">LIVE</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-xs font-mono">
                <AnimatedMetric 
                  label="INTENSITY" 
                  value={generateRandomValue(85, 89).toString()} 
                  unit="%" 
                />
                <AnimatedMetric 
                  label="FREQUENCY" 
                  value={generateRandomValue(18.0, 18.4, 1).toString()} 
                  unit="kHz" 
                />
                <AnimatedMetric 
                  label="AMPLITUDE" 
                  value={`-${generateRandomValue(3.0, 3.4, 1)}`} 
                  unit="dB" 
                />
                <AnimatedMetric 
                  label="SATURATION" 
                  value={generateRandomValue(90, 94).toString()} 
                  unit="%" 
                />
              </div>
            </div>

            <div className="mt-4 rounded-lg overflow-hidden bg-black/40 border border-white/20">
              <NetworkWave 
                total={300} 
                columns={48}
                rows={24}
                className="network-wave-enhanced"
              />
            </div>
          </Card>

          <div className="space-y-6">
            <LiveStatBar value={94} label="NEURAL_HARMONY" className="shadow-[0_0_15px_rgba(255,0,0,0.2)]" />
            <LiveStatBar value={67} label="BEATS_ANALYZED" className="shadow-[0_0_15px_rgba(255,0,0,0.2)]" />
            <LiveStatBar value={88} label="RHYTHM_SYNC" className="shadow-[0_0_15px_rgba(255,0,0,0.2)]" />
            <LiveStatBar value={96} label="AI_FLOW" className="shadow-[0_0_15px_rgba(255,0,0,0.2)]" />
            <LiveStatBar value={82} label="NEURAL_SYNC" className="shadow-[0_0_15px_rgba(255,0,0,0.2)]" />
            <LiveStatBar value={91} label="SYSTEM_HEALTH" className="shadow-[0_0_15px_rgba(255,0,0,0.2)]" />
          </div>

          <InitializationSequence />
        </div>
      </div>
    </motion.div>
  );
} 