"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import StatsContainer from "@/components/StatsContainer";
import TabNav from "@/components/TabNav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      {/* Stats Container */}
      <StatsContainer />

      {/* Logo and Navigation Container - Simplified animations */}
      <motion.div 
        className="fixed -top-12 left-[180px] z-50 flex flex-row items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <TabNav />

        {/* Logo - Removed unnecessary wrapper */}
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
      </motion.div>

      {/* Avatar Container - Optimized glitch effects */}
      <motion.div 
        className="fixed -right-[100px] bottom-0 w-[1300px] z-[100] h-auto"
      >
        <div className="relative flex items-end justify-center">
          <Image
            src="/loadingavatar.png"
            alt="Loading Avatar"
            width={1300}
            height={1755}
            className="w-auto h-auto object-contain"
            priority
          />
        </div>

        {/* Reduced number of glitch layers */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center"
          animate={{
            x: [-4, 4, -4],
            filter: [
              'hue-rotate(-45deg) brightness(150%)',
              'hue-rotate(0deg) brightness(100%)',
              'hue-rotate(-45deg) brightness(150%)'
            ]
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src="/loadingavatar.png"
            alt="Glitch Effect"
            width={1300}
            height={1755}
            className="w-auto h-auto object-contain mix-blend-screen"
            priority
          />
        </motion.div>
      </motion.div>
    </main>
  );
} 