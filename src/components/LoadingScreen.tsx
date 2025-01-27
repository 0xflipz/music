"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
  setIsLoading: (value: boolean) => void;
}

export default function LoadingScreen({ setIsLoading }: LoadingScreenProps) {
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnter(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Solid black background */}
      <div className="absolute inset-0 bg-black z-[49]" />

      {/* Fullscreen video with dramatic fade effect */}
      <motion.div 
        className="absolute inset-0 z-[50]"
        animate={{
          opacity: [0, 0.4, 0], // Reduced max opacity to keep darker
        }}
        transition={{
          duration: 0.8, // Faster transition
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 1], // Quick fade in, longer fade out
        }}
      >
        <video
          src="/hologram.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover mix-blend-screen"
        />
      </motion.div>

      {/* Quick glitch overlay */}
      <motion.div
        className="absolute inset-0 bg-black z-[51]"
        animate={{
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "linear"
        }}
      />

      {/* RGB split effect */}
      <motion.div
        className="absolute inset-0 bg-[#FF0000]/10 mix-blend-screen z-[52]"
        animate={{
          x: ['-2%', '2%', '-2%'],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 1.2,
          ease: "linear"
        }}
      />

      {/* Additional glitch layers for more aggressive effect */}
      <motion.div
        className="absolute inset-0 bg-[#00F0FF]/20 mix-blend-screen z-[53]"
        animate={{
          opacity: [0, 0.8, 0],
          x: ['-5%', '5%', '-5%']
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 0.3,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute inset-0 bg-[#FF0000]/10 mix-blend-overlay z-[54]"
        animate={{
          opacity: [0, 0.5, 0],
          x: ['3%', '-3%', '3%']
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 0.25,
          ease: "linear"
        }}
      />

      {/* Enhanced scan lines with motion */}
      <motion.div 
        className="absolute inset-0 z-[55] opacity-30"
        animate={{
          backgroundPosition: ['0 0', '0 -100%']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 2px
          )`,
          backgroundSize: '100% 4px'
        }}
      />

      {/* Fixed Avatar Position */}
      <motion.div 
        className="fixed right-[400px] bottom-0 z-[60] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-[600px] h-[600px]">
          {/* Solana glow effect */}
          <motion.div 
            className="absolute inset-0 solana-glow-effect z-[1]"
            animate={{
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Avatar image */}
          <Image
            src="/loadingavatar.png"
            alt="Loading Avatar"
            fill
            className="object-contain relative z-[3] solana-enhanced-glow"
            priority
            sizes="600px"
            quality={75}
          />
        </div>
      </motion.div>

      {/* Enter Button */}
      <AnimatePresence>
        {showEnter && (
          <motion.button
            className="fixed z-[101] px-8 py-3 bg-transparent border border-[#FF0000] rounded-md text-[#FF0000] font-mono text-xl tracking-[0.2em] pointer-events-auto hover:bg-[#FF0000]/10 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [1, 0.7, 1],
              left: [
                '50%',
                `${Math.random() * 70 + 15}%`, // Keep button 15-85% from left edge
                '50%'
              ],
              top: [
                '50%',
                `${Math.random() * 70 + 15}%`, // Keep button 15-85% from top edge
                '50%'
              ],
              textShadow: [
                '0 0 10px rgba(255, 0, 0, 0.7)',
                '0 0 20px rgba(255, 0, 0, 0.5)',
                '0 0 10px rgba(255, 0, 0, 0.7)'
              ]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
            style={{
              position: 'fixed',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
              textShadow: '0 0 10px rgba(255, 0, 0, 0.5)'
            }}
            onClick={() => setIsLoading(false)}
          >
            ENTER AT YOUR OWN RISK
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}