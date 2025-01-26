"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';
import NetworkWave from './NetworkWave';

// Add FLIPZ_RESPONSES object
const FLIPZ_RESPONSES = {
  greeting: [
    "Yo, FLIPZ A.I. in the building! What's good?",
    "Welcome to the future of music. How can I assist?",
    "FLIPZ A.I. online. Ready to create some heat?",
    "System initialized. Let's make something legendary."
  ],
  music: [
    "That beat is straight fire! 🔥",
    "We cooking up something special!",
    "The neural flow is strong with this one.",
    "These frequencies are hitting different!"
  ],
  default: [
    "I got you fam, let's make it happen!",
    "Processing that through the neural matrix...",
    "Analyzing the frequencies...",
    "Running it through the algorithm..."
  ],
  analysis: [
    "Analyzing beat patterns...",
    "Processing audio frequencies...",
    "Running neural analysis...",
    "Calculating rhythm metrics..."
  ],
  beats: [
    "Generating neural patterns...",
    "Synthesizing frequencies...",
    "Creating beat structure...",
    "Optimizing sound waves..."
  ]
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'flipz';
  timestamp: Date;
  type?: 'system' | 'analysis' | 'beat';
  beatData?: {
    bpm: number;
    key: string;
    intensity: number;
  };
  analysisData?: {
    confidence: number;
    genre: string;
    mood: string;
  };
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Initial greeting
  useEffect(() => {
    const greeting = FLIPZ_RESPONSES.greeting[Math.floor(Math.random() * FLIPZ_RESPONSES.greeting.length)];
    setMessages([{
      id: Date.now().toString(),
      text: greeting,
      sender: 'flipz',
      timestamp: new Date()
    }]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateFlipzResponse = () => {
    // Add null check before accessing length
    if (!FLIPZ_RESPONSES.music || !FLIPZ_RESPONSES.default) {
      return "I'm here to help!"; // Fallback response
    }

    // Use optional chaining to safely access properties
    return Math.random() > 0.5
      ? FLIPZ_RESPONSES.music?.[Math.floor(Math.random() * FLIPZ_RESPONSES.music.length)] 
      : FLIPZ_RESPONSES.default?.[Math.floor(Math.random() * FLIPZ_RESPONSES.default.length)];
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // User message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // FLIPZ AI response
    setTimeout(() => {
      const flipzResponse = generateFlipzResponse();
      const flipzMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: flipzResponse,
        sender: 'flipz',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, flipzMessage]);
    }, 1000);
  };

  // Quick actions menu
  const quickActions = [
    { id: 'analyze', label: 'ANALYZE BEAT', icon: '📊' },
    { id: 'generate', label: 'GENERATE BEAT', icon: '🎵' },
    { id: 'enhance', label: 'ENHANCE SOUND', icon: '✨' },
    { id: 'mix', label: 'NEURAL MIX', icon: '🔄' },
  ];

  // Beat analysis visualization
  const BeatAnalysis = () => (
    <motion.div 
      className="p-2 bg-black/40 rounded-lg border border-[#FF4400]/30 mt-2"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
    >
      <div className="flex justify-between text-xs text-[#FF4400]">
        <span>BPM: 128</span>
        <span>KEY: Am</span>
        <span>INTENSITY: 85%</span>
      </div>
      <div className="h-8 mt-2">
        <NetworkWave 
          total={128}
          columns={32}
          rows={8}
          className="beat-visualization"
        />
      </div>
    </motion.div>
  );

  // Handle quick action clicks
  const handleQuickAction = async (actionId: string) => {
    setIsAnalyzing(true);
    setActiveFeature(actionId);

    // Simulate AI processing
    const processingMessage: Message = {
      id: Date.now().toString(),
      text: FLIPZ_RESPONSES[actionId === 'analyze' ? 'analysis' : 'beats'][
        Math.floor(Math.random() * FLIPZ_RESPONSES.analysis.length)
      ],
      sender: 'flipz',
      timestamp: new Date(),
      type: 'system'
    };
    
    setMessages(prev => [...prev, processingMessage]);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate result based on action
    const result: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'flipz',
      timestamp: new Date(),
      type: actionId === 'analyze' ? 'analysis' : 'beat',
      text: 'Analysis complete! Here are the results:',
      beatData: actionId === 'generate' ? {
        bpm: Math.floor(Math.random() * 40) + 120, // 120-160 BPM
        key: ['Am', 'Cm', 'Gm', 'Fm'][Math.floor(Math.random() * 4)],
        intensity: Math.floor(Math.random() * 30) + 70 // 70-100%
      } : undefined,
      analysisData: actionId === 'analyze' ? {
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
        genre: ['Trap', 'Hip Hop', 'R&B', 'Drill'][Math.floor(Math.random() * 4)],
        mood: ['Energetic', 'Dark', 'Melodic', 'Aggressive'][Math.floor(Math.random() * 4)]
      } : undefined
    };

    setMessages(prev => [...prev, result]);
    setIsAnalyzing(false);
    setActiveFeature(null);
  };

  return (
    <div className="relative bg-black/20 backdrop-blur-sm border border-[#9945FF]/20 rounded-lg h-[400px]">
      {/* Enhanced Header */}
      <div className="absolute inset-x-0 top-0 p-2 flex items-center border-b border-[#9945FF]/20">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white tracking-wider font-mono">FLIPZ_AI.exe</span>
          <div className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]"></div>
          <div className="px-1.5 py-0.5 text-[10px] bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF]">
            ONLINE
          </div>
          
          {/* Quick Actions - Moved here */}
          <div className="flex items-center gap-2 ml-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className="px-2 py-0.5 text-[10px] bg-black/40 rounded border border-[#9945FF]/30 text-[#00F0FF] hover:bg-[#9945FF]/20 transition-colors"
              >
                <span className="mr-1">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-white">STATUS</span>
          <div className="px-1.5 py-0.5 text-[10px] bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF]">
            {isAnalyzing ? 'PROCESSING' : 'READY'}
          </div>
        </div>
      </div>

      {/* Background effects remain the same */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            rgba(153, 69, 255, 0.1) 1px,
            transparent 2px
          )`
        }}
        animate={{
          x: [-10, 10],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Chat content area - adjusted padding for new header */}
      <div className="flex flex-col h-full pt-14"> {/* Increased from pt-7 to pt-14 */}
        <div className="flex-1 overflow-y-auto px-2 py-0.5 space-y-0.5 scrollbar-hide">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={cn(
                "rounded-lg p-0.5", // Reduced from p-1 to p-0.5
                message.sender === 'user' 
                  ? "bg-gradient-to-r from-[#FF4400]/20 to-[#FF8800]/20 border-[#FF4400]/30"
                  : "bg-gradient-to-r from-[#9945FF]/20 to-[#00F0FF]/20 border-[#9945FF]/30",
                "border shadow-[0_0_15px_rgba(153,69,255,0.2)]"
              )}>
                <div className="text-xs text-white/90">{message.text}</div>
                {message.type === 'beat' && <BeatAnalysis />}
                {message.type === 'analysis' && (
                  <div className="mt-1 text-[10px] text-[#00F0FF]/70">
                    <div>Confidence: {message.analysisData?.confidence}%</div>
                    <div>Genre: {message.analysisData?.genre}</div>
                    <div>Mood: {message.analysisData?.mood}</div>
                  </div>
                )}
                <div className="mt-0.5 text-[10px] text-[#00F0FF]/70">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced input area */}
        <div className="border-t border-[#9945FF]/20 p-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-black/40 border border-[#9945FF]/20 rounded px-3 py-1.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#9945FF]/40"
              placeholder="Chat with FLIPZ AI..."
            />
            <div className="flex items-center gap-2">
              {isAnalyzing ? (
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#9945FF]"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              ) : (
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#00F0FF]"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 