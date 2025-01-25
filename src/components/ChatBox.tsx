"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TokenHolder {
  address: string;
  balance: number;
  title: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'holder' | 'flipz';
  timestamp: Date;
  holderInfo?: TokenHolder;
}

// Token holder titles based on balance
const getTitleByBalance = (balance: number): string => {
  if (balance >= 100000) return "WHALE";
  if (balance >= 50000) return "SHARK";
  if (balance >= 10000) return "DOLPHIN";
  if (balance >= 5000) return "FISH";
  return "MINNOW";
};

// Mock market updates
const MARKET_UPDATES = [
  "FLIPZ token showing strong momentum with 24h volume up 23%",
  "New partnership announcement incoming. Stay tuned holders!",
  "Whale alert: Large accumulation detected in the last hour",
  "Market sentiment analysis: Bullish divergence forming",
  "Network activity reaching new ATH with 1.2M transactions"
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentHolder, setCurrentHolder] = useState<TokenHolder>({
    address: '0x742...3f9',
    balance: 15000,
    title: 'DOLPHIN'
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate periodic market updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUpdate = MARKET_UPDATES[Math.floor(Math.random() * MARKET_UPDATES.length)];
      const marketUpdate: Message = {
        id: Date.now().toString(),
        text: `[MARKET UPDATE] ${randomUpdate}`,
        sender: 'flipz',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, marketUpdate]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const holderMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'holder',
      timestamp: new Date(),
      holderInfo: currentHolder
    };

    setMessages(prev => [...prev, holderMessage]);
    setInput('');

    // AI response with context awareness
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, currentHolder);
      const flipzMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'flipz',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, flipzMessage]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string, holder: TokenHolder): string => {
    if (userInput.toLowerCase().includes('price')) {
      return `Current FLIPZ price: $1.291 (+2.5%). As a ${holder.title}, you're in a great position!`;
    }
    if (userInput.toLowerCase().includes('market')) {
      return "Market analysis: Strong buy signals detected. Network activity up 31% this week.";
    }
    if (userInput.toLowerCase().includes('volume')) {
      return "24h Volume: $847,169 | Top pairs: FLIPZ/ETH (76%), FLIPZ/USDT (24%)";
    }
    return `Thanks for being a valuable ${holder.title} in our ecosystem! How can I assist you with FLIPZ today?`;
  };

  return (
    <div className="terminal-container w-full h-[300px] flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0ff]/0 via-[#0ff]/5 to-[#0ff]/0" />
      
      <div className="relative z-10">
        <div className="p-3 border-b border-[#0ff]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#0ff]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="terminal-text-primary text-sm">FLIPZ_CHAT.exe</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#0ff]/70">{currentHolder.address}</span>
            <span className="px-2 py-0.5 bg-[#0ff]/10 border border-[#0ff]/30 rounded text-xs text-[#0ff]">
              {currentHolder.title}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[200px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'holder' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-lg ${
                  message.sender === 'holder'
                    ? 'bg-[#0ff]/5 border border-[#0ff]/15'
                    : 'bg-[#ff4400]/5 border border-[#ff4400]/15'
                }`}
              >
                {message.holderInfo && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#0ff]/70">{message.holderInfo.address}</span>
                    <span className="px-1.5 py-0.5 bg-[#0ff]/10 rounded text-xs text-[#0ff]">
                      {message.holderInfo.title}
                    </span>
                  </div>
                )}
                <p className="text-white font-mono text-sm">{message.text}</p>
                <p className="text-xs text-white/50 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-[#0ff]/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about FLIPZ market, price, or volume..."
              className="flex-1 bg-black/30 border border-[#0ff]/20 rounded-lg px-3 py-2
                       text-white font-mono text-sm placeholder:text-white/30 focus:outline-none
                       focus:border-[#0ff]/50"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-[#0ff]/10 border border-[#0ff]/30 rounded-lg
                       font-mono text-sm text-[#0ff] hover:bg-[#0ff]/20
                       flex items-center gap-2"
            >
              <span>SEND</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 