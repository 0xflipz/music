"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import StatsContainer from "@/components/StatsContainer";
import TabNav from "@/components/TabNav";

export default function Home() {
  React.useEffect(() => {
    console.log('Component mounted');
    // Check if elements are positioned correctly
    const avatar = document.querySelector('.glitch-container');
    if (avatar) {
      console.log('Avatar container position:', avatar.getBoundingClientRect());
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      {/* Stats Container */}
      <StatsContainer />

      {/* Logo and Navigation Container */}
      <motion.div 
        className="fixed -top-12 left-[180px] z-50 flex flex-row items-center gap-8"
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

        {/* Logo with glow effect */}
        <motion.div
          className="relative w-[200px] z-[51]"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={270}
            className="w-auto h-auto object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Avatar Container */}
      <motion.div 
        className="fixed -right-[400px] bottom-0 w-[1300px] z-[100] h-auto"
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

        {/* Glitch Effects */}
        <div className="absolute inset-0">
          {/* Chromatic Aberration Layer 1 */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            animate={{
              x: [-4, 4, -4],
              opacity: [0.3, 0, 0.3],
              filter: [
                'hue-rotate(-45deg) brightness(150%)',
                'hue-rotate(0deg) brightness(100%)',
                'hue-rotate(-45deg) brightness(150%)'
              ]
            }}
            transition={{
              duration: 0.05,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            <Image
              src="/loadingavatar.png"
              alt="Glitch Layer 1"
              width={1300}
              height={1755}
              className="w-auto h-auto object-contain mix-blend-screen"
              priority
            />
          </motion.div>

          {/* Chromatic Aberration Layer 2 */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            animate={{
              x: [4, -4, 4],
              opacity: [0.3, 0, 0.3],
              filter: [
                'hue-rotate(45deg) brightness(150%)',
                'hue-rotate(0deg) brightness(100%)',
                'hue-rotate(45deg) brightness(150%)'
              ]
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            <Image
              src="/loadingavatar.png"
              alt="Glitch Layer 2"
              width={1300}
              height={1755}
              className="w-auto h-auto object-contain mix-blend-screen"
              priority
            />
          </motion.div>

          {/* Random Glitch Slice */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center overflow-hidden"
            animate={{
              clipPath: [
                'inset(0% 0% 100% 0%)',
                'inset(10% 0% 85% 0%)',
                'inset(85% 0% 10% 0%)',
                'inset(100% 0% 0% 0%)'
              ],
              x: [-10, 10, -5, 5, -10],
              opacity: [1, 0.8, 0.6, 0.8, 1]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Image
              src="/loadingavatar.png"
              alt="Glitch Slice"
              width={1300}
              height={1755}
              className="w-auto h-auto object-contain mix-blend-difference"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 