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
    <div className="cyber-container w-full h-[280px] relative flex flex-col">
      <div className="cyber-corner cyber-corner-tl" />
      <div className="cyber-corner cyber-corner-tr" />
      <div className="cyber-corner cyber-corner-bl" />
      <div className="cyber-corner cyber-corner-br" />
      
      <div className="cyber-header p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full bg-white"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-white text-sm">FLIPZ_LYRIC_GENERATOR.exe</span>
        </div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="cyber-input bg-black/30 text-white text-sm px-2 py-1 rounded focus:outline-none"
        >
          {GENRES.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col flex-1 p-3 space-y-2 overflow-hidden">
        <div className="flex gap-3 shrink-0">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your lyric theme or concept..."
            className="cyber-input w-full p-2 h-[50px] text-white text-sm placeholder:text-white/30 focus:outline-none resize-none"
          />
          <button
            onClick={generateLyrics}
            disabled={generating || !prompt}
            className="cyber-button px-3 py-2 text-white text-sm disabled:opacity-50 whitespace-nowrap"
          >
            {generating ? (
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
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

        <div className="flex-1 overflow-y-auto min-h-0 max-h-[160px]">
          {lyrics ? (
            <div className="bg-black/30 border border-white/20 rounded-lg p-3">
              <pre className="font-mono text-white text-sm whitespace-pre-wrap">{lyrics}</pre>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <motion.div 
                className="text-white/50 font-mono text-sm"
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