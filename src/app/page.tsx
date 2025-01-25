"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import TabNav from "@/components/TabNav";
import MusicPlayer from "@/components/MusicPlayer";
import LyricGenerator from "@/components/LyricGenerator";
import ChatBox from "@/components/ChatBox";

const StatsContainer = dynamic(() => import('@/components/StatsContainer'), {
  ssr: false,
  loading: () => <div className="w-[400px] h-screen bg-black/20" />
});

const CalibrationText = () => {
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2 font-mono">
        <motion.div 
          className="text-[#ff0000] text-sm tracking-wider"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ● CALIBRATING RHYTHM ENGINE CRE_0x02
        </motion.div>
        <motion.div 
          className="text-[#ff0000]/60 text-sm tracking-wider"
          animate={{ opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          ● CALIBRATING RHYTHM ENGINE CRE_0xb2
        </motion.div>
        <motion.div 
          className="text-[#ff0000]/30 text-sm tracking-wider"
          animate={{ opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        >
          ● CALIBRATING RHYTHM ENGINE CRE_0xa2
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative pb-20">
      {/* Stats Container */}
      <StatsContainer />

      {/* Logo and Navigation Container - Stays high */}
      <motion.div 
        className="fixed -top-6 left-8 z-50 flex flex-row items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo and TabNav remain unchanged */}
        <div className="relative w-[200px] z-[51]">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={270}
            className="w-auto h-auto object-contain"
            priority
          />
        </div>
        <TabNav />
      </motion.div>

      {/* Main Content Area - Adjusted positioning */}
      <div className="fixed left-8 top-32 flex flex-col gap-8 w-[600px]">
        <LyricGenerator />
        <ChatBox />
      </div>

      {/* Rest of the components */}
      <motion.div 
        className="fixed -right-[100px] bottom-0 w-[1000px] z-[100]"
      >
        <div className="relative flex items-end justify-center">
          <Image
            src="/loadingavatar.png"
            alt="Loading Avatar"
            width={800}
            height={800}
            className="w-auto h-auto object-contain"
          />
        </div>
      </motion.div>

      <MusicPlayer />
    </main>
  );
} 