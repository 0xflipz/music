"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from "@/components/LoadingScreen";
import LoadingAvatar from "@/components/LoadingAvatar";
import TabNav from "@/components/TabNav";
import Rain from '@/components/Rain';
import StatsContainer from "@/components/StatsContainer";
import MobileWarning from '@/components/MobileWarning';

// Lazy load components with proper loading states
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), {
  ssr: false,
  loading: () => <div className="h-[80px] bg-black/20" />
});

const LyricGenerator = dynamic(() => import('@/components/LyricGenerator'), {
  loading: () => <div className="h-[238px] bg-black/20" />
});

const ChatBox = dynamic(() => import('@/components/ChatBox'), {
  loading: () => <div className="h-[400px] bg-black/20" />
});

const HolographicVideo = dynamic(() => import('@/components/HolographicVideo'), {
  loading: () => <div className="h-[238px] bg-black/20" />
});

const FlipzChat = dynamic(() => import('@/components/FlipzChat'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-black/20" />
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Set initial state based on device
    const isMobile = window.innerWidth < 768;
    setIsStatsOpen(!isMobile); // Open by default on desktop, closed on mobile
  }, []);

  const handleStatsToggle = useCallback(() => {
    setIsStatsOpen(prev => !prev);
  }, []);

  // Update scroll position on regular scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence mode="sync">
        {isLoading ? (
          <LoadingScreen key="loading" setIsLoading={setIsLoading} />
        ) : (
          <main className="relative min-h-screen bg-black touch-pan-y" key="main">
            <MobileWarning />
            <Rain />
            
            {/* Header with Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 px-8 pt-6 pb-4">
              <div className="max-w-[1800px] mx-auto">
                <TabNav />
              </div>
            </div>

            <LoadingAvatar />
            
            <div className="max-w-[1800px] mx-auto px-8 pt-24">
              <div className="grid md:grid-cols-[1fr_320px] grid-cols-1 gap-16">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full">
                      <LyricGenerator />
                    </div>
                    <div className="w-full hidden md:block">
                      <HolographicVideo />
                    </div>
                  </div>
                  <div className="w-full">
                    <ChatBox />
                  </div>
                </div>
                <div className="hidden md:block">
                  <StatsContainer 
                    isOpen={true}
                    onClose={() => {}}
                  />
                </div>
                <div className="md:hidden fixed inset-0 z-[60] pointer-events-none">
                  <StatsContainer 
                    isOpen={isStatsOpen}
                    onClose={handleStatsToggle}
                  />
                </div>
              </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 z-50">
              <MusicPlayer />
            </div>
          </main>
        )}
      </AnimatePresence>
    </>
  );
} 