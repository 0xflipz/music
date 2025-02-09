"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { cn } from "@/utils/utils";
import NetworkWave from "./NetworkWave";
import { useSwipeable } from 'react-swipeable';

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
    <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
      <div className="p-4">
        {/* Header with Label and Trend */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-white tracking-wider font-mono">{label}</span>
          { trend && <span className={cn(
            "px-1.5 py-0.5 text-[10px] rounded border",
            trend >= 0 
              ? "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30" 
              : "text-[#FF4400] bg-[#FF4400]/10 border-[#FF4400]/30"
          )}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
}
        </div>

        {/* Value Display */}
        <motion.div 
          className="text-2xl font-mono text-[#00F0FF] tracking-wider"
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
          {currentValue}
        </motion.div>
      </div>

      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
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
    <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-white tracking-wider font-mono">{label}</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded border text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30">
            {value.toFixed(1)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1.5 bg-black/60 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
            style={{ width: `${(value / maxValue) * 100}%` }}
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

      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </Card>
  );
};

// Update the SystemStats component
const SystemMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpu: 39.2,
    memory: 64.9
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: 35 + Math.random() * 10,
        memory: 60 + Math.random() * 10
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* CPU Load */}
      <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white tracking-wider font-mono">CPU_LOAD</span>
            <span className="text-[10px] text-[#00F0FF]">{metrics.cpu.toFixed(1)}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-1.5 bg-black/60 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
              style={{ width: `${metrics.cpu}%` }}
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

        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-lg opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Card>

      {/* Memory Usage */}
      <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white tracking-wider font-mono">MEMORY</span>
            <span className="text-[10px] text-[#00F0FF]">{metrics.memory.toFixed(1)}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-1.5 bg-black/60 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
              style={{ width: `${metrics.memory}%` }}
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

        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-lg opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Card>
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

interface StatsContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatsContainer({ isOpen, onClose }: StatsContainerProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Add touch detection
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch device and mobile
    const checkDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handlers = useSwipeable({
    onSwiping: (event) => {
      if (!isTouchDevice) return;
      
      // Handle Safari touch events specifically
      if (event.dir === 'Right' || event.dir === 'Left') {
        event.preventDefault?.(); // Prevent Safari overscroll
        
        // Calculate offset with Safari touch consideration
        const newOffset = isOpen 
          ? Math.min(Math.max(0, event.deltaX), 320)
          : Math.min(Math.max(0, event.deltaX + 320), 320);
        
        setSwipeOffset(newOffset);
      }
    },
    onSwipeEnd: (event) => {
      if (!isTouchDevice) return;
      
      const threshold = 100;
      const velocity = Math.abs(event.velocity);
      
      // Consider both distance and velocity for better touch feel
      if (isOpen && (event.deltaX > threshold || (event.deltaX > 50 && velocity > 0.5))) {
        onClose();
      } else if (!isOpen && (event.deltaX < -threshold || (event.deltaX < -50 && velocity > 0.5))) {
        onClose();
      }
      
      setSwipeOffset(0);
    },
    trackMouse: false,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
  });

  return (
    <>
      <motion.div
        id="stats-container"
        className={cn(
          "bg-black/20 backdrop-blur-lg border-l border-white/20",
          "fixed md:relative top-0 right-0 h-screen w-[320px] z-50",
          "md:h-auto md:w-full md:border-none",
          !isOpen && "md:translate-x-0",
          // Add Safari-specific touch handling
          isTouchDevice && "touch-pan-y touch-pan-x"
        )}
        style={{
          // Prevent Safari rubber-banding
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        initial={{ x: '100%' }}
        animate={{ 
          x: isTouchDevice ? swipeOffset : (isOpen ? 0 : '100%')
        }}
        transition={{ 
          duration: swipeOffset ? 0 : 0.3,
          ease: "easeOut"
        }}
        {...handlers}
      >
        {isMobile && (
          <div className="md:hidden text-xs text-white/50 font-mono mb-2 pl-2">
            {isOpen ? '← Swipe right to close' : 'Swipe left to open →'}
          </div>
        )}

        <div className="space-y-2 p-4">
          <TokenMetrics />
          <SystemMetrics />
          <CookingHeat />
          <NeuralMetrics />
        </div>
      </motion.div>

      {/* Floating button to reopen stats - only shows on mobile when closed */}
      {isMobile && !isOpen && (
        <motion.button
          onClick={onClose}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className={cn(
            "fixed top-24 right-0 z-50 md:hidden",
            "px-2 py-3 bg-black/40 backdrop-blur-sm",
            "border-l border-t border-b border-[#9945FF]/40",
            "rounded-l-lg",
            "hover:bg-black/60 transition-colors"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#00F0FF] text-sm font-mono">
              Stats
            </span>
            <motion.span
              animate={{ x: [-3, 3, -3] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[#00F0FF]"
            >
              ←
            </motion.span>
          </div>
        </motion.button>
      )}
    </>
  );
}

// Add this CookingHeat component inside StatsContainer.tsx
const CookingHeat = () => {
  const getBPM = () => Math.floor(Math.random() * (140 - 135) + 135);
  const getPeak = () => Math.floor(Math.random() * (98 - 93) + 93);
  
  return (
    <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
      <div className="p-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] text-white tracking-wider font-mono">COOKING_HEAT</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white tracking-wider">BPM</span>
              <span className="text-[10px] text-[#00F0FF]">{getBPM()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white tracking-wider">PEAK</span>
              <span className="text-[10px] text-[#00F0FF]">{getPeak()}%</span>
            </div>
            <div className="px-1.5 py-0.5 text-[10px] bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF]">
              LIVE
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[
            { label: "INTENSITY", value: "86%" },
            { label: "FREQUENCY", value: "18.3kHz" },
            { label: "AMPLITUDE", value: "-3.2dB" },
            { label: "SATURATION", value: "93%" }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[10px] text-white tracking-wider font-mono mb-1">{stat.label}</div>
              <div className="text-[10px] text-[#00F0FF] tracking-wider">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Visualization */}
        <div className="relative h-32 rounded-lg overflow-hidden bg-black/60 border border-[#9945FF]/20">
          <NetworkWave 
            total={128}
            columns={32}
            rows={24}
            className="cooking-heat"
          />
          
          {/* Overlay Gradient */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  transparent 0%,
                  rgba(0, 240, 255, 0.1) 50%,
                  rgba(153, 69, 255, 0.2) 100%
                )
              `,
              mixBlendMode: 'overlay'
            }}
          />
        </div>
      </div>

      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </Card>
  );
};

// Update the NeuralMetrics component to remove SYSTEM_HEALTH
const NeuralMetrics = () => {
  return (
    <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
      <div className="p-2 space-y-4">
        {[
          { label: "NEURAL_HARMONY", value: 93.3 },
          { label: "BEATS_ANALYZED", value: 67.7 },
          { label: "AI_FLOW", value: 96.9 }
        ].map((metric) => (
          <div key={metric.label} className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-white tracking-wider font-mono">{metric.label}</span>
              <span className="px-1.5 py-0.5 text-[10px] rounded border text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30">
                {metric.value}%
              </span>
            </div>
            <div className="relative h-1.5 bg-black/60 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
                style={{ width: `${metric.value}%` }}
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
        ))}
      </div>

      {/* Background Glow - keeping the exact same effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </Card>
  );
};

const TokenMetrics = () => {
  const [metrics, setMetrics] = useState({
    price: 1.247,
    priceChange: 2.5,
    marketCap: 12.4,
    marketCapChange: 1.8,
    holders: "1247",
    holdersChange: 3.2,
    volume: 847.2,
    volumeChange: -0.7
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        price: parseFloat(fluctuate(prev.price, 2)),
        priceChange: parseFloat(fluctuate(prev.priceChange, 10)),
        marketCap: parseFloat(fluctuate(prev.marketCap, 1)),
        marketCapChange: parseFloat(fluctuate(prev.marketCapChange, 5)),
        holders: Math.floor(1247 + Math.random() * 10).toString(),
        holdersChange: parseFloat(fluctuate(prev.holdersChange, 3)),
        volume: parseFloat(fluctuate(prev.volume, 3)),
        volumeChange: parseFloat(fluctuate(prev.volumeChange, 8))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 pt-[14px]">
      {/* Price */}
      <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white tracking-wider font-mono">FLIPZ_PRICE</span>
            <span className={cn(
              "px-1.5 py-0.5 text-[10px] rounded border",
              metrics.priceChange >= 0 
                ? "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30" 
                : "text-[#FF4400] bg-[#FF4400]/10 border-[#FF4400]/30"
            )}>
              {metrics.priceChange >= 0 ? '+' : ''}{metrics.priceChange.toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-mono text-[#00F0FF] tracking-wider">
            ${metrics.price.toFixed(3)}
          </div>
        </div>
        <TokenMetricGlow />
      </Card>

      {/* Market Cap */}
      <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white tracking-wider font-mono">MARKET_CAP</span>
            <span className={cn(
              "px-1.5 py-0.5 text-[10px] rounded border",
              metrics.marketCapChange >= 0 
                ? "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30" 
                : "text-[#FF4400] bg-[#FF4400]/10 border-[#FF4400]/30"
            )}>
              {metrics.marketCapChange >= 0 ? '+' : ''}{metrics.marketCapChange.toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-mono text-[#00F0FF] tracking-wider">
            ${metrics.marketCap.toFixed(1)}M
          </div>
        </div>
        <TokenMetricGlow />
      </Card>

      {/* Holders */}
      <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white tracking-wider font-mono">HOLDERS</span>
            <span className="px-1.5 py-0.5 text-[10px] rounded border text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30">
              +{metrics.holdersChange.toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-mono text-[#00F0FF] tracking-wider">
            {metrics.holders}
          </div>
        </div>
        <TokenMetricGlow />
      </Card>

      {/* Volume */}
      <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border border-[#9945FF]/40">
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white tracking-wider font-mono">VOLUME</span>
            <span className={cn(
              "px-1.5 py-0.5 text-[10px] rounded border",
              metrics.volumeChange >= 0 
                ? "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30" 
                : "text-[#FF4400] bg-[#FF4400]/10 border-[#FF4400]/30"
            )}>
              {metrics.volumeChange >= 0 ? '+' : ''}{metrics.volumeChange.toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-mono text-[#00F0FF] tracking-wider">
            ${metrics.volume.toFixed(1)}K
          </div>
        </div>
        <TokenMetricGlow />
      </Card>
    </div>
  );
};

// Helper component for the glow effect
const TokenMetricGlow = () => (
  <motion.div
    className="absolute inset-0 -z-10 rounded-lg opacity-20"
    style={{
      background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.3, 0.2]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
); 