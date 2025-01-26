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
    }, 2000);

    return () => clearInterval(interval);
  }, [value, isAnimated]);

  return (
    <Card className="bg-black/40 border-[#9945FF]/20">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#9945FF] tracking-wider">{label}</span>
          {trend && (
            <div className="flex items-center gap-2">
              <motion.span
                className={cn(
                  "px-1.5 py-0.5 text-[10px] rounded",
                  "border border-[#9945FF]/30",
                  trend > 0 
                    ? "text-[#00F0FF] bg-[#00F0FF]/10" 
                    : "text-[#FF4400] bg-[#FF4400]/10"
                )}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  boxShadow: [
                    "0 0 10px rgba(153, 69, 255, 0.2)",
                    "0 0 15px rgba(0, 240, 255, 0.3)",
                    "0 0 10px rgba(153, 69, 255, 0.2)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {trend > 0 ? "+" : ""}{trend}%
              </motion.span>
            </div>
          )}
        </div>

        <motion.div 
          className="text-xl font-mono text-[#00F0FF] tracking-wider"
          animate={isAnimated ? {
            opacity: [0.9, 1, 0.9],
            textShadow: [
              "0 0 10px rgba(0, 240, 255, 0.3)",
              "0 0 20px rgba(0, 240, 255, 0.5)",
              "0 0 10px rgba(0, 240, 255, 0.3)"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentValue.split('.')[0]}
          <span className="text-base opacity-90">.{currentValue.split('.')[1] || '000'}</span>
        </motion.div>

        {/* Bottom line animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(to right, #9945FF, #00F0FF)'
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            boxShadow: [
              "0 0 10px rgba(153, 69, 255, 0.2)",
              "0 0 15px rgba(0, 240, 255, 0.3)",
              "0 0 10px rgba(153, 69, 255, 0.2)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </Card>
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

// Add this LiveStatBar component
const LiveStatBar = ({ label, value, className }: { label: string; value: number; className?: string }) => {
  const [currentValue, setCurrentValue] = useState(value);

  // Add subtle value fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(prev => {
        const fluctuation = (Math.random() - 0.5) * 0.4;
        return Number((prev + fluctuation).toFixed(1));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-mono text-[#9945FF] tracking-[0.2em]">{label}</span>
        <span className="text-xs font-mono text-[#00F0FF]">{currentValue.toFixed(1)}%</span>
      </div>
      <div className="relative h-1.5 bg-black/60 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
          style={{ width: `${currentValue}%` }}
          animate={{
            opacity: [0.7, 1, 0.7],
            boxShadow: [
              "0 0 10px rgba(153, 69, 255, 0.3)",
              "0 0 15px rgba(0, 240, 255, 0.5)",
              "0 0 10px rgba(153, 69, 255, 0.3)"
            ]
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

// Add this component near the top of StatsContainer.tsx, after the TokenMetric component
const SystemMetric = ({ label, value, maxValue = 100 }: { label: string; value: number; maxValue?: number }) => {
  return (
    <Card className="bg-black/40 border-[#9945FF]/20 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono text-[#9945FF] tracking-wider">{label}</span>
        <span className="text-xs font-mono text-[#00F0FF]">{value}%</span>
      </div>
      <div className="relative h-2 bg-black/60 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
          style={{ width: `${(value / maxValue) * 100}%` }}
          animate={{
            opacity: [0.7, 1, 0.7],
            boxShadow: [
              "0 0 10px rgba(153, 69, 255, 0.3)",
              "0 0 20px rgba(0, 240, 255, 0.5)",
              "0 0 10px rgba(153, 69, 255, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </Card>
  );
};

// Update the SystemStats component
const SystemStats = () => {
  const [cpuLoad, setCpuLoad] = useState(34.5);
  const [memory, setMemory] = useState(37.9);

  // Simulate fluctuating values
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => Number((prev + (Math.random() - 0.5) * 2).toFixed(1)));
      setMemory(prev => Number((prev + (Math.random() - 0.5) * 2).toFixed(1)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-black/40 border-[#9945FF]/20">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#9945FF] tracking-wider">CPU_LOAD</span>
            <span className="text-xs font-mono text-[#00F0FF]">{cpuLoad}%</span>
          </div>
          <div className="relative h-1.5 bg-black/60 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
              style={{ width: `${cpuLoad}%` }}
              animate={{
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  "0 0 10px rgba(153, 69, 255, 0.3)",
                  "0 0 15px rgba(0, 240, 255, 0.5)",
                  "0 0 10px rgba(153, 69, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </Card>

      <Card className="bg-black/40 border-[#9945FF]/20">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#9945FF] tracking-wider">MEMORY</span>
            <span className="text-xs font-mono text-[#00F0FF]">{memory}%</span>
          </div>
          <div className="relative h-1.5 bg-black/60 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
              style={{ width: `${memory}%` }}
              animate={{
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  "0 0 10px rgba(153, 69, 255, 0.3)",
                  "0 0 15px rgba(0, 240, 255, 0.5)",
                  "0 0 10px rgba(153, 69, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </Card>
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
          
          <CookingHeat />

          <NeuralMetrics />
          <InitializationSequence />
        </div>
      </div>
    </motion.div>
  );
}

// Add this CookingHeat component inside StatsContainer.tsx
const CookingHeat = () => {
  // Generate random values for demo
  const getBPM = () => Math.floor(Math.random() * (145 - 135) + 135);
  const getPeak = () => Math.floor(Math.random() * (98 - 93) + 93);
  
  return (
    <Card className="bg-black/40 border-[#9945FF]/20">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-mono text-[#00F0FF]">COOKING_HEAT</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#9945FF]">BPM</span>
              <span className="text-xs text-[#00F0FF]">{getBPM()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#9945FF]">PEAK</span>
              <span className="text-xs text-[#00F0FF]">{getPeak()}%</span>
            </div>
            <span className="px-1.5 py-0.5 text-[10px] bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF]">
              LIVE
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 text-[10px] mb-4">
          <div>
            <div className="text-[#9945FF]">INTENSITY</div>
            <div className="text-[#00F0FF]">86%</div>
          </div>
          <div>
            <div className="text-[#9945FF]">FREQUENCY</div>
            <div className="text-[#00F0FF]">18.3kHz</div>
          </div>
          <div>
            <div className="text-[#9945FF]">AMPLITUDE</div>
            <div className="text-[#00F0FF]">-3.2dB</div>
          </div>
          <div>
            <div className="text-[#9945FF]">SATURATION</div>
            <div className="text-[#00F0FF]">93%</div>
          </div>
        </div>

        {/* Visualization */}
        <div className="h-32 rounded-lg overflow-hidden bg-black/40 border border-[#9945FF]/20">
          <NetworkWave 
            total={128}
            columns={32}
            rows={24}
            className="cooking-heat"
          />
        </div>
      </div>
    </Card>
  );
};

// Update the stats section in StatsContainer
const NeuralMetrics = () => {
  return (
    <Card className="bg-black/40 border-[#9945FF]/20">
      <div className="p-4 space-y-4">
        <LiveStatBar value={93.3} label="NEURAL_HARMONY" />
        <LiveStatBar value={67.7} label="BEATS_ANALYZED" />
        <LiveStatBar value={88.4} label="RHYTHM_SYNC" />
        <LiveStatBar value={96.9} label="AI_FLOW" />
        <LiveStatBar value={81.3} label="NEURAL_SYNC" />
        <LiveStatBar value={91.7} label="SYSTEM_HEALTH" />
      </div>
    </Card>
  );
}; 