"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'flipz';
  timestamp: Date;
}

// FLIPZ AI personality responses
const FLIPZ_RESPONSES = {
  greeting: [
    "Yo! Ready to drop some beats?",
    "Welcome to the future of music. What's on your mind?",
    "FLIPZ AI online. How can I assist you today?",
  ],
  default: [
    "That's dope! Tell me more about your music vision.",
    "I'm feeling those vibes. What else you got?",
    "Interesting perspective! Let's explore that further.",
  ],
  music: [
    "I'm analyzing the latest trends in neural beats.",
    "The rhythm algorithms are showing promising patterns today.",
    "We could create something unique with those sound waves.",
  ]
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative h-full rounded-lg border border-white/20 bg-black/40 p-4">
      <div className="absolute inset-0 solana-chat-gradient opacity-20" />
      
      {/* Header */}
      <div className="sticky top-0 z-20 -mt-4 -mx-4 px-4 py-2 bg-black/80 border-b border-[#9945FF]/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-white">FLIPZ_AI.exe</span>
            <span className="px-1.5 py-0.5 text-xs bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF]">
              ONLINE
            </span>
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
      <div className="h-[calc(100%-50px)] flex flex-col space-y-4 overflow-y-auto custom-scrollbar mt-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={cn(
              "rounded-lg p-3 relative max-w-[80%]",
              message.sender === 'user' 
                ? "bg-gradient-to-r from-[#00F0FF]/20 to-[#9945FF]/20 border-[#00F0FF]/30"
                : "bg-gradient-to-r from-[#9945FF]/20 to-[#00F0FF]/20 border-[#9945FF]/30",
              "border shadow-[0_0_15px_rgba(153,69,255,0.2)]"
            )}>
              <div className="text-sm text-white/90">{message.text}</div>
              <div className="mt-1 text-xs text-[#00F0FF]/70">{message.timestamp.toLocaleTimeString()}</div>
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
            placeholder="Chat with FLIPZ AI..."
            className={cn(
              "w-full px-4 py-2 rounded-lg",
              "bg-black/60 backdrop-blur-sm",
              "border border-[#9945FF]/40",
              "text-white placeholder-white/50",
              "focus:outline-none focus:border-[#00F0FF]/60",
              "transition-colors duration-200"
            )}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#00F0FF]"
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 