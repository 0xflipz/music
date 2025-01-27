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
    <div className="component-container chat-box relative h-[550px] w-full bg-black/20 backdrop-blur-sm border border-[#9945FF]/20 rounded-lg overflow-hidden">
      {/* Network Wave background */}
      <div className="absolute inset-0 -z-10">
        <NetworkWave
          total={40}
          columns={8}
          rows={5}
          className="w-full h-full opacity-20"
        />
      </div>

      <div className="absolute inset-x-0 top-0 p-2 flex items-center justify-between border-b border-[#9945FF]/20 bg-black/10">
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

      <div className="h-[calc(100%-96px)] overflow-y-auto scrollbar-none p-4 pt-16">
        <div className="space-y-4">
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
                  ? 'bg-white/10 text-white border border-white/20'
                  : message.type === 'system'
                  ? 'bg-white/20 text-white border border-white/30 shadow-[0_0_8px_rgba(255,255,255,0.2)]'
                  : message.type === 'analysis'
                  ? 'bg-white/15 text-white border border-white/25 shadow-[0_0_8px_rgba(255,255,255,0.15)]'
                  : message.type === 'beat'
                  ? 'bg-white/95 text-black border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                  : 'bg-white/20 text-white border border-white/30'
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
      </div>

      {/* Input section */}
      <div className="absolute inset-x-0 bottom-0 border-t border-[#9945FF]/20 p-4 bg-black/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSendMessage}
            placeholder="Chat with FLIPZ AI..."
            className="w-full bg-black/20 text-white placeholder-white/30 px-4 py-2 rounded border border-[#9945FF]/20 focus:outline-none focus:border-[#9945FF]/40"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 text-xs bg-[#9945FF]/20 hover:bg-[#9945FF]/30 text-white rounded border border-[#9945FF]/30 transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      {/* Beat pulse visualization */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center gap-1 overflow-hidden bg-gradient-to-t from-black/40 to-transparent"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-0.5 bg-gradient-to-t from-[#9945FF] to-[#00F0FF]"
            animate={{
              height: isAnalyzing 
                ? [10, 20 + (Math.random() * 5), 10] 
                : 4,
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default ChatBox; 