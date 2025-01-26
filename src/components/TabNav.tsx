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
    <div className="flex items-center gap-4 h-[45px] px-4">
      <div className="flex-shrink-0 w-[180px]">
        <Image
          src="/logo.png"
          alt="FLIPZ Logo"
          width={180}
          height={180}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex gap-3 ml-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            className={cn(
              "relative px-6 py-2.5",
              "font-mono text-sm tracking-wider",
              "border border-[#9945FF]/40 backdrop-blur-sm",
              "transition-all duration-300 ease-out",
              "hover:border-[#00F0FF]/80",
              "shadow-[0_0_10px_rgba(255,255,255,0.1)]",
              "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
              activeTab === tab.id ? "bg-black/40" : "bg-black/20"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={cn(
              "relative z-20",
              "transition-all duration-300",
              activeTab === tab.id ? "text-[#00F0FF]" : "text-white/90"
            )}>
              {tab.label}
            </span>
            
            {/* Base gradient */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#9945FF]/10 via-[#00F0FF]/5 to-[#9945FF]/10" />
            
            {/* Hover gradient */}
            <div className={cn(
              "absolute inset-0 z-[2] transition-all duration-300",
              "bg-gradient-to-r from-[#9945FF]/20 via-[#00F0FF]/10 to-[#9945FF]/20",
              hoveredTab === tab.id ? "opacity-100" : "opacity-0"
            )} />
            
            {activeTab === tab.id && (
              <>
                {/* Active tab glow */}
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 z-[3]"
                  style={{
                    boxShadow: "0 0 15px rgba(153, 69, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.15)",
                    background: "linear-gradient(180deg, rgba(153, 69, 255, 0.2) 0%, rgba(0, 240, 255, 0.1) 100%)"
                  }}
                  transition={{ type: "spring", duration: 0.5 }}
                />
                
                {/* Active indicator dot */}
                <motion.div
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-[4]"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.9),0_0_20px_rgba(255,255,255,0.5)]" />
                </motion.div>
              </>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
} 