"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';
import NetworkWave from './NetworkWave';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'flipz';
  timestamp: Date;
  type?: 'system' | 'analysis' | 'beat';
  walletAddress?: string;
  stats?: {
    sentiment?: number;
    confidence?: number;
    responseTime?: number;
  };
  beatData?: {
    bpm: number;
    key: string;
    genre: string;
    neural_harmony?: number;
    intensity?: number;
  };
}

const MOCK_WALLET = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
const FLIPZ_WALLET = "0xF71Pz...420x";

const FLIPZ_RESPONSES = {
  greeting: [
    "Yo, FLIPZ A.I. in the building! What's good?",
    "Welcome to the future of music. How can I assist?",
    "FLIPZ A.I. online. Ready to create some heat?",
    "System initialized. Let's make something legendary."
  ],
  default: [
    "I got you fam, let's make it happen!",
    "Processing that through the neural matrix...",
    "Analyzing the frequencies...",
    "Running it through the algorithm..."
  ],
  analysis: [
    "Analyzing waveform patterns...",
    "Running frequency spectrum analysis...",
    "Calculating harmonic resonance...",
    "Processing audio fingerprint..."
  ]
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatStats, setChatStats] = useState({
    messagesCount: 0,
    avgResponseTime: 0,
    neuralHarmony: 0,
  });

  // Add initial greeting with wallet
  useEffect(() => {
    const greeting: Message = {
      id: Date.now().toString(),
      text: FLIPZ_RESPONSES.greeting[Math.floor(Math.random() * FLIPZ_RESPONSES.greeting.length)],
      sender: 'flipz',
      timestamp: new Date(),
      type: 'system',
      walletAddress: FLIPZ_WALLET,
      stats: {
        confidence: 0.98,
        responseTime: 0.12,
      }
    };
    setMessages([greeting]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      walletAddress: MOCK_WALLET
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsAnalyzing(true);

    // Simulate FLIPZ response with enhanced stats
    setTimeout(() => {
      const responses = FLIPZ_RESPONSES.default;
      const flipzMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'flipz',
        timestamp: new Date(),
        walletAddress: FLIPZ_WALLET,
        stats: {
          sentiment: Math.random() * 0.5 + 0.5,
          confidence: Math.random() * 0.2 + 0.8,
          responseTime: Math.random() * 0.2 + 0.1,
        }
      };
      setMessages(prev => [...prev, flipzMessage]);
      setIsAnalyzing(false);
      
      // Update chat stats
      setChatStats(prev => ({
        messagesCount: prev.messagesCount + 2,
        avgResponseTime: (prev.avgResponseTime + flipzMessage.stats!.responseTime!) / 2,
        neuralHarmony: Math.min(1, prev.neuralHarmony + 0.05),
      }));
    }, 1000);
  };

  return (
    <div className="component-container chat-box relative h-[550px] w-[1060px] bg-black/40 backdrop-blur-sm border border-[#9945FF]/20 rounded-lg overflow-hidden">
      {/* Add NetworkWave visualization */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <NetworkWave
          total={40}
          columns={8}
          rows={5}
          className="w-full h-full"
        />
      </div>

      <div className="absolute inset-x-0 top-0 p-2 flex items-center justify-between border-b border-[#9945FF]/20 bg-black/40">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white tracking-wider font-mono font-bold">
            FLIPZ_CHAT.exe
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
          <div className="px-1.5 py-0.5 text-[10px] bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-white font-bold">
            {isAnalyzing ? 'PROCESSING' : 'CONNECTED'}
          </div>
        </div>
        
        {/* Chat Stats with improved contrast */}
        <div className="flex items-center gap-4 text-[10px] font-bold">
          <div className="flex items-center gap-2">
            <span className="text-white">MSG_COUNT:</span>
            <span className="text-[#00F0FF]">{chatStats.messagesCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">RESP_TIME:</span>
            <span className="text-[#00F0FF]">{chatStats.avgResponseTime.toFixed(3)}s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">NEURAL_HARMONY:</span>
            <span className="text-[#00F0FF]">{(chatStats.neuralHarmony * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full pt-12">
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-1 items-start"
            >
              {/* Wallet Address */}
              <span className="text-[9px] text-[#00F0FF]/80 font-mono">
                {message.walletAddress}
              </span>
              
              <div className={cn(
                "max-w-[80%] px-3 py-2 rounded text-xs font-medium",
                message.sender === 'user' 
                  ? 'bg-[#9945FF]/30 text-white border border-[#9945FF]/30'
                  : message.type === 'system'
                  ? 'bg-[#00F0FF]/20 text-white border border-[#00F0FF]/30 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                  : message.type === 'analysis'
                  ? 'bg-[#9945FF]/20 text-white border border-[#9945FF]/30 shadow-[0_0_8px_rgba(153,69,255,0.2)]'
                  : message.type === 'beat'
                  ? 'bg-white/95 text-black border border-[#00F0FF]/50 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                  : 'bg-[#00F0FF]/20 text-white border border-[#00F0FF]/30'
              )}>
                {message.text}
                {message.stats && (
                  <div className="mt-1 pt-1 border-t border-[#9945FF]/30 text-[9px] text-[#9945FF]">
                    {message.stats.confidence && (
                      <span>CONF: {(message.stats.confidence * 100).toFixed(1)}% | </span>
                    )}
                    {message.stats.responseTime && (
                      <span>TIME: {message.stats.responseTime.toFixed(3)}s</span>
                    )}
                  </div>
                )}
                {message.beatData && (
                  <div className="mt-1 pt-1 border-t border-[#00F0FF]/30 text-[9px] text-[#9945FF] font-bold">
                    <div>BPM: {message.beatData.bpm} | Key: {message.beatData.key} | Genre: {message.beatData.genre}</div>
                    {message.beatData.neural_harmony && (
                      <div>Neural Harmony: {(message.beatData.neural_harmony * 100).toFixed(1)}%</div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Enhanced input section with styled send button */}
        <div className="border-t border-[#9945FF]/20 p-4 bg-black/40">
          <div className="relative flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-black/60 border border-[#9945FF]/30 rounded px-4 py-2 text-xs text-white font-medium"
              placeholder="Chat with FLIPZ AI..."
            />
            <div className="relative group">
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-[#9945FF]/20 border border-[#9945FF]/30 rounded text-xs text-white font-bold 
                  hover:bg-[#9945FF]/30 hover:border-[#9945FF]/50 hover:text-[#00F0FF] transition-all duration-200
                  shadow-[0_0_10px_rgba(153,69,255,0.2)] hover:shadow-[0_0_15px_rgba(153,69,255,0.3)]"
              >
                Send
              </button>
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 -z-10 rounded opacity-50"
                style={{
                  background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* More subtle background animation */}
      <motion.div
        className="absolute inset-0 -z-20 rounded-lg opacity-10"
        style={{
          background: `radial-gradient(circle, rgba(153, 69, 255, 0.2) 0%, rgba(0, 240, 255, 0.2) 50%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

export default ChatBox; 