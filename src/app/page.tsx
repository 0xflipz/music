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

      {/* Logo and Navigation Container */}
      <motion.div 
        className="fixed top-[1px] left-[300px] z-50 flex flex-row items-center gap-6 pt-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Tabs (now on the left) */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <TabNav />
        </motion.div>

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Music App Logo"
          width={240}
          height={240}
          className="w-auto h-auto"
          priority
        />
      </motion.div>

      {/* Avatar Container */}
      <motion.div 
        className="fixed -right-[400px] bottom-0 w-[1300px] z-10 h-auto"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Base Layer */}
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

        {/* Glitch Container */}
        <div className="absolute inset-0 glitch-container">
          {/* Glitch Layer */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center glitch-layer"
            animate={{
              x: [2, -2, 2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            <Image
              src="/loadingavatar.png"
              alt="Glitch Layer"
              width={1300}
              height={1755}
              className="w-auto h-auto object-contain mix-blend-screen"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 