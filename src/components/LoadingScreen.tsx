"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

interface LoadingScreenProps {
  setIsLoading: (value: boolean) => void;
}

export default function LoadingScreen({ setIsLoading }: LoadingScreenProps) {
  const [showEnter, setShowEnter] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnter(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play music when component mounts with retry logic
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5;
          // Try to play immediately
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        } catch (error) {
          console.log("Initial autoplay failed, trying with user interaction");
          // Add event listener for first user interaction
          const handleFirstInteraction = async () => {
            try {
              await audioRef.current?.play();
              setIsPlaying(true);
              // Remove the event listeners after successful play
              document.removeEventListener('click', handleFirstInteraction);
              document.removeEventListener('touchstart', handleFirstInteraction);
            } catch (error) {
              console.log("Autoplay failed after interaction:", error);
            }
          };

          // Add listeners for user interaction
          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('touchstart', handleFirstInteraction);
        }
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Clean up event listeners if they were added
      document.removeEventListener('click', () => {});
      document.removeEventListener('touchstart', () => {});
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      await audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "linear" }}
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

      {/* Floating Solana Logo with Photon Link */}
      <motion.div
        className="fixed z-[52] w-[80px] h-[80px]"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [1, 0.7, 1],
          left: [
            '50%',
            `${Math.random() * 70 + 15}%`, // Random horizontal position
            '50%'
          ],
          top: [
            '50%',
            `${Math.random() * 70 + 15}%`, // Random vertical position
            '50%'
          ],
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
        style={{
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(153, 69, 255, 0.3)',
        }}
      >
        <a 
          href="https://photon-sol.tinyastro.io/en/lp/HKuJrP5tYQLbEUdjKwjgnHs2957QKjR2iWhJKTtMa1xs?handle=134697779d2600e3dd417b"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full relative hover:scale-110 transition-transform duration-300"
        >
          <Image
            src="/solanalogo.png"
            alt="Solana Logo"
            fill
            className="object-contain"
            style={{
              filter: "drop-shadow(0 0 10px rgba(153, 69, 255, 0.5))"
            }}
          />
        </a>
      </motion.div>

      {/* RGB split effects - enhanced with negative blend */}
      <motion.div
        className="absolute inset-0 bg-[#FF0000]/30 mix-blend-difference z-[52]"
        animate={{
          x: ['-4%', '4%', '-4%'],
          y: ['2%', '-2%', '2%'],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute inset-0 bg-[#00FF00]/30 mix-blend-exclusion z-[53]"
        animate={{
          x: ['4%', '-4%', '4%'],
          y: ['-2%', '2%', '-2%'],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 0.7,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute inset-0 bg-[#0000FF]/30 mix-blend-difference z-[54]"
        animate={{
          x: ['-3%', '3%', '-3%'],
          y: ['3%', '-3%', '3%'],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 0.25,
          repeat: Infinity,
          repeatDelay: 0.6,
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

      {/* Updated Audio Player - moved to top right */}
      <div className="fixed top-8 right-8 z-[101] flex items-center gap-4">
        <motion.button
          onClick={togglePlay}
          className="p-3 bg-transparent border border-white rounded-full text-white hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <SpeakerWaveIcon className="w-5 h-5" />
          ) : (
            <SpeakerXMarkIcon className="w-5 h-5" />
          )}
        </motion.button>
        <audio 
          ref={audioRef}
          src="/loadingaudio.mp3"
          loop
        />
      </div>
    </motion.div>
  );
}