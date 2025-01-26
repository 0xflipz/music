"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatusIndicatorProps {
  label: string;
  value: string;
  color?: string;
}

export const StatusIndicator = ({ label, value, color = "#00F0FF" }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <motion.div
      className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.6)]"
      style={{ backgroundColor: color }}
      animate={{ 
        opacity: [1, 0.3, 1],
        boxShadow: [
          `0 0 8px ${color}`,
          `0 0 12px ${color}`,
          `0 0 8px ${color}`
        ]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <span className="font-mono text-sm flex items-center gap-1">
      <span className="text-white/60">{label}</span>
      <span className="text-white/40">:</span>
      <motion.span 
        style={{ color }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {value}
      </motion.span>
    </span>
  </div>
);

export const ModalHeader = ({ title }: { title: string }) => (
  <div className="border-b border-[#9945FF]/20 p-4 relative overflow-hidden">
    {/* Animated background line */}
    <motion.div
      className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"
      animate={{
        x: ['-100%', '100%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    
    <div className="flex items-center gap-3">
      <StatusIndicator label="SYSTEM" value="ONLINE" />
      <StatusIndicator label="STATUS" value="ACTIVE" color="#9945FF" />
    </div>
    
    <div className="mt-2 flex items-center gap-2">
      <motion.div
        className="w-1 h-4 bg-[#00F0FF]"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <h2 className="text-xl font-mono text-[#00F0FF] tracking-wider">{title}</h2>
    </div>
  </div>
);

// Export TypewriterText component
export const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="font-mono text-sm relative">
      <span className="text-white/80">{displayText}</span>
      <motion.span 
        className="absolute inline-block w-[2px] h-[14px] bg-[#00F0FF] ml-0.5"
        animate={{ opacity: [1, 0], }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
};

// Export StatValue component
export const StatValue = ({ value, label, color = "#00F0FF" }: { 
  value: string; 
  label: string; 
  color?: string; 
}) => (
  <div className="relative group">
    <motion.div
      className="absolute -inset-1 rounded opacity-75 blur-sm"
      style={{ background: `linear-gradient(45deg, ${color}20, transparent)` }}
      animate={{
        opacity: [0.4, 0.2, 0.4],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <div className="relative bg-black/40 p-3 rounded border border-[#9945FF]/20">
      <motion.div
        className="text-xl font-mono"
        style={{ color }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-white/60 mt-1 font-mono tracking-wider">{label}</div>
    </div>
  </div>
);

export const ModalSection = ({ children, title, stats }: { 
  children: React.ReactNode; 
  title?: string;
  stats?: Array<{ value: string; label: string; color?: string; }>;
}) => (
  <div className="relative">
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-[#9945FF]/40" />
    <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-[#9945FF]/40" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-[#9945FF]/40" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-[#9945FF]/40" />
    
    <div className="bg-black/40 border border-[#9945FF]/20 rounded-lg p-4 space-y-3 backdrop-blur-sm">
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            className="h-3 w-[2px] bg-[#00F0FF]"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <h3 className="text-[#00F0FF] font-mono text-sm tracking-wider">{title}</h3>
        </div>
      )}
      
      {/* Add grid for stats if provided */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {stats.map((stat, index) => (
            <StatValue key={index} {...stat} />
          ))}
        </div>
      )}
      
      {children}
    </div>
  </div>
);

export const ActionButton = ({ children, color = "#00F0FF", onClick }: { 
  children: React.ReactNode; 
  color?: string;
  onClick?: () => void;
}) => (
  <motion.button
    className="relative w-full px-4 py-2 rounded overflow-hidden"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    {/* Animated border */}
    <motion.div
      className="absolute inset-0"
      style={{
        border: `1px solid ${color}40`,
        borderRadius: '0.25rem',
      }}
      animate={{
        boxShadow: [
          `0 0 10px ${color}20`,
          `0 0 15px ${color}40`,
          `0 0 10px ${color}20`,
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Content */}
    <div className="relative z-10 font-mono text-sm" style={{ color }}>
      {children}
    </div>
    
    {/* Background */}
    <div className="absolute inset-0 bg-black/40 -z-10" />
  </motion.button>
); 