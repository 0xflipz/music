"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const HOOKS = [
  "Digital dreams in a neon stream",
  "Crypto beats in the neural heat",
  "Binary flows where the bass grows",
  "Algorithm rhythm in the system",
  "Neural waves in the digital cave",
  "Cyber flows where the code glows"
];

const GENRES = ["Cyberpunk", "Neural Trap", "Digital Drill", "Tech House", "AI Pop", "Quantum Beat"];

export default function LyricGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Cyberpunk');
  const [hook, setHook] = useState('');

  const generateHook = useCallback(() => {
    const randomHook = HOOKS[Math.floor(Math.random() * HOOKS.length)];
    setHook(randomHook);
  }, []);

  const generateLyrics = async () => {
    setGenerating(true);
    generateHook();
    
    // Simulate API call with more dynamic response
    setTimeout(() => {
      setLyrics(`[Verse 1]
${hook}
${prompt} in the digital night
Neural networks amplify the light
FLIPZ algorithm takes control
Converting emotions into code

[Chorus]
${hook}
We're riding on the blockchain wave
Every beat we make, we save
In this ${selectedGenre.toLowerCase()} paradise
Taking music to the cyber skies

[Verse 2]
Digital flows in the matrix glow
AI patterns start to grow
Breaking barriers, setting trends
Where human art and machine transcends`);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="w-full h-[280px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0ff]/0 via-[#0ff]/5 to-[#0ff]/0" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="sticky top-0 bg-black p-3 border-b border-[#0ff]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#0ff]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="terminal-text-primary text-sm">FLIPZ_LYRIC_GENERATOR.exe</span>
          </div>
          
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-black/30 border border-[#0ff]/20 rounded px-2 py-1
                     text-[#0ff] font-mono text-xs focus:outline-none
                     focus:border-[#0ff]/50"
          >
            {GENRES.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="flex gap-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your lyric theme or concept..."
              className="flex-1 h-16 bg-black/20 border border-[#0ff]/15 rounded-lg p-2
                       text-white font-mono text-sm placeholder:text-white/20
                       focus:outline-none focus:border-[#0ff]/30 resize-none"
            />
            <button
              onClick={generateLyrics}
              disabled={generating || !prompt}
              className="px-4 bg-[#0ff]/5 border border-[#0ff]/15 rounded-lg
                       text-[#0ff] font-mono text-sm hover:bg-[#0ff]/10 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       whitespace-nowrap h-16 flex items-center justify-center"
            >
              {generating ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#0ff]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <span>GENERATING...</span>
                </div>
              ) : (
                'GENERATE'
              )}
            </button>
          </div>

          {lyrics ? (
            <div className="bg-black/30 border border-[#0ff]/20 rounded-lg p-3">
              <pre className="font-mono text-white text-sm whitespace-pre-wrap">{lyrics}</pre>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <motion.div 
                className="text-[#0ff]/50 font-mono text-sm"
                animate={{ opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AWAITING PROMPT INPUT...
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 