"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/utils";

const tabs = [
  { id: 'gang', label: 'GANG' },
  { id: 'tokenomics', label: 'TOKENOMICS' },
  { id: 'mao', label: 'M.A.O' },
  { id: 'submit', label: 'SUBMIT YOUR MUSIC' },
];

export default function TabNav() {
  const [activeTab, setActiveTab] = React.useState('gang');
  
  // Memoize handlers
  const handleTabClick = React.useCallback((id: string) => {
    setActiveTab(id);
  }, []);

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            "px-6 py-2.5 rounded-lg font-mono text-sm tracking-wider",
            "border border-[#0ff]/20",
            "hover:bg-black hover:border-[#0ff]/40",
            "relative overflow-hidden bg-black",
            activeTab === tab.id 
              ? "text-[#0ff]" 
              : "text-white/90"
          )}
          // Simplified animations
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <motion.span
            initial={false}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0.9,
            }}
            className="relative z-10"
          >
            {tab.label}
          </motion.span>

          {activeTab === tab.id && (
            <>
              <motion.div
                className="absolute inset-0 bg-black"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              <motion.div
                className="absolute right-2 top-1/2 -translate-y-1/2"
                animate={{
                  opacity: [1, 0.3, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0ff] shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
              </motion.div>
            </>
          )}
        </motion.button>
      ))}
    </div>
  );
} 