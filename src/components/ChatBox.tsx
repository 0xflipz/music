"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'flipz';
  timestamp: Date;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const flipzMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm FLIPZ, your AI music companion. Let's create something amazing together!",
        sender: 'flipz',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, flipzMessage]);
    }, 1000);
  };

  return (
    <div className="terminal-container w-full h-[300px] flex flex-col border border-[#0ff]/20 bg-black/40 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0ff]/0 via-[#0ff]/5 to-[#0ff]/0" />
      
      <div className="p-3 border-b border-[#0ff]/20 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#0ff]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[#0ff] font-mono text-sm">FLIPZ_CHAT.exe</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-[#0ff]/10 border border-[#0ff]/20'
                  : 'bg-[#ff4400]/10 border border-[#ff4400]/20'
              }`}
            >
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
            placeholder="Type your message..."
            className="flex-1 bg-black/30 border border-[#0ff]/20 rounded-lg px-3 py-2
                     text-white font-mono text-sm placeholder:text-white/30 focus:outline-none
                     focus:border-[#0ff]/50"
          />
          <button
            onClick={sendMessage}
            className="px-3 py-2 bg-[#0ff]/10 border border-[#0ff]/30 rounded-lg
                     font-mono text-sm text-[#0ff] hover:bg-[#0ff]/20"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
} 