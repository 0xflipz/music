"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import TabNav from "@/components/TabNav";
import MusicPlayer from "@/components/MusicPlayer";
import LyricGenerator from "@/components/LyricGenerator";
import ChatBox from "@/components/ChatBox";
import HolographicVideo from "@/components/HolographicVideo";
import LoadingAvatar from "@/components/LoadingAvatar";

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
    <main className="h-screen p-1 pl-8 relative pt-[80px] pb-[80px]">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 px-8 pt-6 pb-4">
        <div className="max-w-[1600px] mx-0">
          <TabNav />
        </div>
      </div>
      
      <LoadingAvatar />
      
      <div className="max-w-[1600px] mx-0">
        <div className="grid grid-cols-[1fr_400px] gap-6 mt-4">
          <div className="space-y-6">
            <div className="grid grid-cols-[1fr_300px] gap-6">
              <div>
                <LyricGenerator />
              </div>
              <div>
                <HolographicVideo />
              </div>
            </div>
            <div className="col-span-1">
              <ChatBox />
            </div>
          </div>
          <StatsContainer />
        </div>
      </div>
      <MusicPlayer />
    </main>
  );
} 