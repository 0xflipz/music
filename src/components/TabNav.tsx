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

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-6 py-2.5 rounded-full font-mono text-sm tracking-wider transition-all",
            "border border-white/30 backdrop-blur-sm",
            "hover:bg-white/20 hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
            "relative overflow-hidden",
            activeTab === tab.id 
              ? "bg-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
              : "bg-black/20 text-white/90"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            initial={false}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0.9,
            }}
          >
            {tab.label}
          </motion.span>
          {activeTab === tab.id && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-white/5"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </>
          )}
        </motion.button>
      ))}
    </div>
  );
} 