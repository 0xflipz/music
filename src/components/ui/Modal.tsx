"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/utils/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with enhanced blur */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container - Positioned higher up */}
          <motion.div
            className={cn(
              "fixed top-[80px] left-[40px] z-50",
              "w-full max-w-[800px]",
              className
            )}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="relative bg-black/90 border border-[#00F0FF]/30 rounded-lg overflow-hidden">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(153, 69, 255, 0.2)",
                    "0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(153, 69, 255, 0.3)",
                    "0 0 15px rgba(0, 240, 255, 0.3), 0 0 30px rgba(153, 69, 255, 0.2)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Header with enhanced styling */}
              <div className="border-b border-[#00F0FF]/30 bg-[#9945FF]/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#00F0FF]"
                    animate={{ 
                      opacity: [1, 0.3, 1],
                      boxShadow: [
                        "0 0 10px #00F0FF",
                        "0 0 15px #00F0FF",
                        "0 0 10px #00F0FF"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[#00F0FF] font-mono tracking-wider text-sm">{title}</span>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#00F0FF]/60 hover:text-[#00F0FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content with enhanced background */}
              <div className="relative">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-[#9945FF]/5 to-[#00F0FF]/5"
                  animate={{
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Content */}
                <div className="relative z-10 p-6">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 