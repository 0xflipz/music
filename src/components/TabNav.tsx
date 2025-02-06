"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/utils";
import Modal from "./ui/Modal";
import { ModalHeader, ModalSection, StatusIndicator, TypewriterText } from "./modals/ModalContent";

const tabs = [
  { 
    id: 'gang', 
    label: 'GANG', 
    modalTitle: 'GANG INTERFACE v1.0.2',
    description: 'Access the exclusive FLIPZ community network and governance system. Join the GANG to participate in decision-making and earn rewards.'
  },
  { 
    id: 'tokenomics', 
    label: 'TOKENOMICS', 
    modalTitle: 'TOKENOMICS ANALYZER v2.1.4',
    description: 'Real-time analysis of $FLIPZ token metrics and market performance. Explore detailed insights into market cap, trading volume, and price trends.'
  },
  { 
    id: 'mao', 
    label: 'M.A.O', 
    modalTitle: 'M.A.O SYSTEM v3.0.1',
    description: 'Music Asset Optimization - AI-powered music creation and enhancement. COMING SOON: Revolutionize your music production with cutting-edge AI tools.'
  },
  { 
    id: 'submit', 
    label: 'SUBMIT YOUR MUSIC', 
    modalTitle: 'MUSIC SUBMISSION PROTOCOL v1.1.5',
    description: 'Submit your tracks to the FLIPZ network for AI enhancement and distribution. Get your music heard by a global audience and leverage AI for superior sound quality.'
  },
];

export default function TabNav() {
  const [activeTab, setActiveTab] = React.useState('gang');
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<typeof tabs[0] | null>(null);
  
  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.id);
    setSelectedTab(tab);
    setModalOpen(true);
  };

  const renderModalContent = (tab: typeof tabs[0]) => {
    if (tab.id === 'mao') {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold text-[#00F0FF]">COMING SOON</h2>
          <div className="mt-4 text-sm text-white/80">
            <TypewriterText text="The Music Asset Optimization (M.A.O) system is under development. Stay tuned for revolutionary AI-powered music tools. Experience the future of music production with our cutting-edge technology." />
          </div>
          <div className="mt-4 text-xs text-white/60">
            - $FLIPZ
          </div>
          <motion.div
            className="mt-8 w-16 h-16 border-4 border-dashed border-[#00F0FF] rounded-full animate-spin"
          />
        </div>
      );
    }
    
    if (tab.id === 'submit') {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6">
          <h2 className="text-3xl font-bold text-[#00F0FF] mb-4">Submit Your Music</h2>
          <p className="text-center text-white/80 mb-6">
            Share your tracks with the FLIPZ community and let our AI enhance your music. 
            Reach a global audience and experience superior sound quality.
          </p>
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            <input
              type="file"
              accept="audio/*"
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#00F0FF]/10 file:text-[#00F0FF] hover:file:bg-[#00F0FF]/20"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#00F0FF] text-white rounded hover:bg-[#00F0FF]/80 transition"
            >
              Upload
            </button>
          </form>
          <p className="text-xs text-white/60 mt-4">
            Supported formats: MP3, WAV, FLAC. Max size: 10MB.
          </p>
        </div>
      );
    }
    
    if (tab.id === 'tokenomics') {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6">
          <h2 className="text-3xl font-bold text-[#00F0FF] mb-4">Tokenomics</h2>
          <p className="text-center text-white/80 mb-6">
            Discover the distribution of the $FLIPZ token. Our tokenomics are designed to ensure a fair and transparent allocation.
          </p>
          <div className="w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Public Distribution</span>
              <span className="text-[#00F0FF] font-bold">90%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">Team Allocation</span>
              <span className="text-[#00F0FF] font-bold">10%</span>
            </div>
          </div>
          <div className="mt-6 w-full max-w-md">
            <div className="h-4 bg-[#00F0FF]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#00F0FF] rounded-full" style={{ width: '90%' }}></div>
            </div>
            <div className="h-4 bg-[#9945FF]/10 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#9945FF] rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <ModalHeader title={tab.modalTitle} />
        
        <div className="p-6 space-y-6">
          <ModalSection>
            <div className="font-mono text-sm text-white/80">
              {tab.description}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <motion.button
                className={cn(
                  "px-4 py-2 rounded border border-[#00F0FF]/40",
                  "bg-black/40 font-mono text-sm text-[#00F0FF]",
                  "hover:border-[#00F0FF]/60 hover:bg-black/60",
                  "transition-all duration-300"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                INITIALIZE
              </motion.button>
              
              <motion.button
                className={cn(
                  "px-4 py-2 rounded border border-[#9945FF]/40",
                  "bg-black/40 font-mono text-sm text-[#9945FF]",
                  "hover:border-[#9945FF]/60 hover:bg-black/60",
                  "transition-all duration-300"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                VIEW DETAILS
              </motion.button>
            </div>
          </ModalSection>

          <div className="grid grid-cols-2 gap-4">
            <ModalSection>
              <h3 className="text-[#00F0FF] font-mono text-sm">SYSTEM STATUS</h3>
              <div className="space-y-2 mt-2">
                <StatusIndicator label="NETWORK" value="CONNECTED" />
                <StatusIndicator label="LATENCY" value="23ms" color="#9945FF" />
                <StatusIndicator label="UPTIME" value="99.9%" />
              </div>
            </ModalSection>

            <ModalSection>
              <h3 className="text-[#00F0FF] font-mono text-sm">QUICK ACTIONS</h3>
              <div className="space-y-2 mt-2">
                <button className="w-full text-left px-3 py-2 rounded bg-black/20 text-white/80 hover:bg-black/40 transition-colors font-mono text-sm">
                  → SCAN NETWORK
                </button>
                <button className="w-full text-left px-3 py-2 rounded bg-black/20 text-white/80 hover:bg-black/40 transition-colors font-mono text-sm">
                  → UPDATE CACHE
                </button>
              </div>
            </ModalSection>
          </div>
        </div>
      </div>
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle file selection
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <>
      <div className="flex items-center h-[45px]">
        <div className="flex-shrink-0 w-[180px]">
          <Image
            src="/logo.png"
            alt="FLIPZ"
            width={180}
            height={45}
            className="object-contain"
            priority
          />
        </div>
        <div className="flex gap-3 ml-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative px-6 py-2.5",
                "font-mono text-sm tracking-wider",
                "border border-[#9945FF]/40 backdrop-blur-sm",
                "transition-all duration-300 ease-out",
                "hover:border-[#00F0FF]/80",
                "shadow-[0_0_10px_rgba(255,255,255,0.1)]",
                "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
                activeTab === tab.id ? "bg-black/40" : "bg-black/20"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={cn(
                "relative z-20",
                "transition-all duration-300",
                activeTab === tab.id ? "text-[#00F0FF]" : "text-white/90"
              )}>
                {tab.label}
              </span>
              
              {/* Base gradient */}
              <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#9945FF]/10 via-[#00F0FF]/5 to-[#9945FF]/10" />
              
              {/* Hover gradient */}
              <div className={cn(
                "absolute inset-0 z-[2] transition-all duration-300",
                "bg-gradient-to-r from-[#9945FF]/20 via-[#00F0FF]/10 to-[#9945FF]/20",
                hoveredTab === tab.id ? "opacity-100" : "opacity-0"
              )} />
              
              {activeTab === tab.id && (
                <>
                  {/* Active tab glow */}
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 z-[3]"
                    style={{
                      boxShadow: "0 0 15px rgba(153, 69, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.15)",
                      background: "linear-gradient(180deg, rgba(153, 69, 255, 0.2) 0%, rgba(0, 240, 255, 0.1) 100%)"
                    }}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                  
                  {/* Active indicator dot */}
                  <motion.div
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-[4]"
                    animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.9),0_0_20px_rgba(255,255,255,0.5)]" />
                  </motion.div>
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="w-[800px]"
      >
        {selectedTab && renderModalContent(selectedTab)}
      </Modal>
    </>
  );
} 