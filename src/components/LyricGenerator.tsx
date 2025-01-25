"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LyricGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [lyrics, setLyrics] = useState('');

  const generateLyrics = async () => {
    setGenerating(true);
    // TODO: Add API integration
    setTimeout(() => {
      setLyrics(`Verse 1:
In the digital maze, where neurons dance
FLIPZ algorithm takes its chance
Neural waves flowing through the night
Creating melodies that feel just right

Chorus:
We're riding on the blockchain wave
Every beat we make, we save
FLIPZ token rising high
Taking music to the sky`);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="terminal-container p-4 w-full h-[300px] border border-[#0ff]/20 bg-black/40 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0ff]/0 via-[#0ff]/5 to-[#0ff]/0" />
      
      <div className="text-[#0ff] font-mono text-sm mb-4 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#0ff]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        FLIPZ_LYRIC_GENERATOR.exe
      </div>

      <div className="space-y-3 h-full flex flex-col">
        <div className="relative flex-none">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your lyric prompt here..."
            className="w-full h-24 bg-black/30 border border-[#0ff]/20 rounded-lg p-3 
                     text-white font-mono text-sm placeholder:text-white/30 focus:outline-none
                     focus:border-[#0ff]/50"
          />
        </div>

        <button
          onClick={generateLyrics}
          disabled={generating || !prompt}
          className="flex-none px-4 py-2 bg-[#0ff]/10 border border-[#0ff]/30 rounded-lg
                   font-mono text-sm text-[#0ff] hover:bg-[#0ff]/20 disabled:opacity-50
                   disabled:cursor-not-allowed flex items-center gap-2"
        >
          {generating ? (
            <>
              <motion.div
                className="w-2 h-2 rounded-full bg-[#0ff]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              GENERATING...
            </>
          ) : (
            'GENERATE LYRICS'
          )}
        </button>

        {lyrics && (
          <div className="flex-1 overflow-auto mt-2 p-3 bg-black/30 border border-[#0ff]/20 rounded-lg">
            <pre className="font-mono text-white text-sm whitespace-pre-wrap">{lyrics}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 