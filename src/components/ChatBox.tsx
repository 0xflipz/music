"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'flipz';
  timestamp: Date;
  type?: 'text' | 'beat' | 'analysis' | 'system'; // New message types
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

// Enhanced FLIPZ AI responses
const FLIPZ_RESPONSES = {
  greeting: [
    "Yo! Ready to drop some beats?",
    "Welcome to the future of music. What's on your mind?",
    "FLIPZ AI online. How can I assist you today?",
  ],
  beats: [
    "Analyzing your beat pattern... BPM matches current trends 🎵",
    "I can help modify that rhythm to hit harder 🔊",
    "Let me run that through the neural mixer...",
  ],
  analysis: [
    "Breaking down the sonic elements...",
    "Running genre classification algorithms...",
    "Detecting key harmonic patterns...",
  ],
  suggestions: [
    "Try adding some neural-enhanced 808s to that pattern",
    "I'm detecting space for a counter-melody around bar 16",
    "The wave analysis suggests room for more sub-bass",
  ]
};

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

  const generateFlipzResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('music') || input.includes('beat') || input.includes('song')) {
      return FLIPZ_RESPONSES.music[Math.floor(Math.random() * FLIPZ_RESPONSES.music.length)];
    }
    return FLIPZ_RESPONSES.default[Math.floor(Math.random() * FLIPZ_RESPONSES.default.length)];
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
      const flipzResponse = generateFlipzResponse(input);
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
    <div className="relative h-full rounded-lg border border-white/20 bg-black/40 p-4">
      <div className="absolute inset-0 solana-chat-gradient opacity-20" />
      
      {/* Header with integrated quick actions */}
      <div className="sticky top-0 z-20 -mt-4 -mx-4 px-4 py-2 bg-black/80 border-b border-[#9945FF]/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-white">FLIPZ_AI.exe</span>
            <span className="px-1.5 py-0.5 text-xs bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF]">
              ONLINE
            </span>
            
            {/* Quick Actions integrated in header */}
            <div className="flex gap-1.5 ml-3">
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  disabled={isAnalyzing}
                  className={cn(
                    "px-2 py-0.5 rounded",
                    "bg-black/40 backdrop-blur-sm",
                    "border border-[#9945FF]/30",
                    "text-[10px] text-white/80",
                    "hover:border-[#00F0FF]/40",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "flex items-center gap-1",
                    activeFeature === action.id && "border-[#00F0FF] bg-[#00F0FF]/10"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xs">{action.icon}</span>
                  <span className="tracking-wide">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Chat messages */}
      <div className="h-[calc(100%-100px)] flex flex-col space-y-4 overflow-y-auto custom-scrollbar mt-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className="flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={cn(
              "rounded-lg p-3 relative max-w-[80%]",
              message.sender === 'user' 
                ? "bg-gradient-to-r from-[#FF4400]/20 to-[#FF8800]/20 border-[#FF4400]/30"
                : "bg-gradient-to-r from-[#9945FF]/20 to-[#00F0FF]/20 border-[#9945FF]/30",
              "border shadow-[0_0_15px_rgba(153,69,255,0.2)]"
            )}>
              <div className="text-sm text-white/90">{message.text}</div>
              {message.type === 'beat' && <BeatAnalysis />}
              {message.type === 'analysis' && (
                <div className="mt-2 text-xs text-[#00F0FF]/70">
                  <div>Confidence: {message.analysisData?.confidence}%</div>
                  <div>Genre: {message.analysisData?.genre}</div>
                  <div>Mood: {message.analysisData?.mood}</div>
                </div>
              )}
              <div className="mt-1 text-xs text-[#00F0FF]/70">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isAnalyzing ? "Analyzing beat patterns..." : "Chat with FLIPZ AI..."}
            className={cn(
              "w-full px-4 py-2 rounded-lg",
              "bg-black/60 backdrop-blur-sm",
              "border border-[#9945FF]/40",
              "text-white placeholder-white/50",
              "focus:outline-none focus:border-[#00F0FF]/60",
              "transition-colors duration-200"
            )}
            disabled={isAnalyzing}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isAnalyzing ? (
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FF4400]"
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
  );
} 