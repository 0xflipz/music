"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/utils";

const tabs = [
  { id: 'gang', label: 'GANG' },
  { id: 'tokenomics', label: 'TOKENOMICS' },
  { id: 'mao', label: 'M.A.O' },
  { id: 'submit', label: 'SUBMIT YOUR MUSIC' },
];

export default function TabNav() {
  const [activeTab, setActiveTab] = React.useState('gang');
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
  
  return (
    <div className="flex items-center gap-6 h-[45px]">
      <Image
        src="/logo.png"
        alt="FLIPZ Logo"
        width={280}
        height={280}
        className="object-contain -ml-2"
        priority
      />
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            className={cn(
              "cyber-tab relative px-6 py-2.5",
              "font-mono text-sm tracking-wider",
              "border border-red-500/30 backdrop-blur-sm",
              "transition-all duration-300 ease-out",
              "hover:border-red-500/60",
              "before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-950/50 before:via-black/90 before:to-red-950/50",
              activeTab === tab.id ? "cyber-tab-active" : "cyber-tab-inactive"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Text content with enhanced visibility */}
            <span className={cn(
              "relative z-10",
              "transition-all duration-300",
              activeTab !== tab.id && "text-shadow-red"
            )}>
              {tab.label}
            </span>
            
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-red-800/5 to-red-900/10" />
            
            {/* Enhanced hover effect */}
            <div className={cn(
              "absolute inset-0 transition-all duration-300",
              "bg-gradient-to-r from-red-500/10 via-white/5 to-red-500/10",
              hoveredTab === tab.id ? "opacity-100" : "opacity-0"
            )} />
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-red-500/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-red-500/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-red-500/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-red-500/40" />
            
            {activeTab === tab.id && (
              <>
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-400/10 to-red-500/20"
                  transition={{ type: "spring", duration: 0.5 }}
                />
                
                <motion.div
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
                </motion.div>
                
                <motion.div
                  layoutId="activeTabBorder"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-white to-red-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
} 