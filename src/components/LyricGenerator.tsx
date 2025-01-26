"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

const GENRES = [
  "Trap", 
  "Drill", 
  "Boom Bap",
  "Web3 Rap",
  "Cloud Rap",
  "Phonk",
  "Hyperpop",
  "Lo-fi Hip Hop"
];

const HOOKS = [
  "Stack my ETH up in the metaverse (yeah)",
  "NFT money got me feeling cursed (sheesh)",
  "Mining blocks while these ops rehearse (what)",
  "Smart contracts make my pockets burst (facts)",
  "Web3 gang, we don't fuck with banks (nah)",
  "Blockchain life got unlimited ranks (up)",
  "DeFi money hit different ways (cash)",
  "Crypto life, we don't see no days (never)"
];

const VERSE_STRUCTURES = {
  trap: {
    flow: "triplet",
    lineCount: 16,
    rhymeScheme: "AABB"
  },
  drill: {
    flow: "sliding",
    lineCount: 12,
    rhymeScheme: "ABAB"
  },
  boomBap: {
    flow: "steady",
    lineCount: 16,
    rhymeScheme: "ABAB"
  }
};

const AD_LIBS = [
  "skrrt!", 
  "yeah!", 
  "what!", 
  "sheesh!", 
  "gang!", 
  "facts!",
  "no cap!",
  "talk!"
];

const THEMES = {
  web3: [
    "blockchain", "crypto", "NFT", "smart contracts",
    "DeFi", "metaverse", "mining", "tokens"
  ],
  flex: [
    "racks", "bands", "chains", "whips",
    "drip", "ice", "stack", "flex"
  ],
  tech: [
    "algorithm", "neural", "digital", "cyber",
    "quantum", "virtual", "binary", "matrix"
  ]
};

export default function LyricGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Cyberpunk');
  const [hook, setHook] = useState('');
  const [structure, setStructure] = useState(VERSE_STRUCTURES.trap);
  const [useAdLibs, setUseAdLibs] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [bpm, setBpm] = useState(Math.floor(Math.random() * 40) + 120); // 120-160 BPM
  const [key, setKey] = useState(['Am', 'Cm', 'Gm', 'Fm'][Math.floor(Math.random() * 4)]);
  const [mood, setMood] = useState(['Energetic', 'Dark', 'Melodic', 'Aggressive'][Math.floor(Math.random() * 4)]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateHook = useCallback(() => {
    const randomHook = HOOKS[Math.floor(Math.random() * HOOKS.length)];
    setHook(randomHook);
  }, []);

  const generateLyrics = async () => {
    setGenerating(true);
    generateHook();
    
    // Update music stats
    setBpm(Math.floor(Math.random() * 40) + 120);
    setKey(['Am', 'Cm', 'Gm', 'Fm'][Math.floor(Math.random() * 4)]);
    setMood(['Energetic', 'Dark', 'Melodic', 'Aggressive'][Math.floor(Math.random() * 4)]);
    
    // Generate random ad-libs
    const getAdLib = () => AD_LIBS[Math.floor(Math.random() * AD_LIBS.length)];
    
    // Get random theme words
    const getThemeWord = (theme: keyof typeof THEMES) => 
      THEMES[theme][Math.floor(Math.random() * THEMES[theme].length)];

    setTimeout(() => {
      setLyrics(`[Intro]
${hook} ${useAdLibs ? `(${getAdLib()})` : ''}
Yeah, FLIPZ on the beat (let's go!)

[Verse 1]
Stacking ${getThemeWord('web3')} while they sleeping on me ${useAdLibs ? `(${getAdLib()})` : ''}
${prompt} got the whole game freezing homie
Digital flows, yeah I keep it going ${useAdLibs ? `(${getAdLib()})` : ''}
${getThemeWord('tech')} mind, keep the beats flowing

[Chorus]
${hook} ${useAdLibs ? `(${getAdLib()})` : ''}
Got that ${getThemeWord('flex')} up in my wallet (facts)
Can't stop won't stop, better call it ${useAdLibs ? `(${getAdLib()})` : ''}
Web3 gang, yeah we ball it

[Verse 2]
${getThemeWord('web3')} life got me feeling blessed ${useAdLibs ? `(${getAdLib()})` : ''}
While they sleeping we don't need no rest
Flipping ${getThemeWord('flex')}, yeah we doing fine ${useAdLibs ? `(${getAdLib()})` : ''}
AI flows dropping every line

[Bridge]
They don't know (what!)
How we flow (yeah!)
Getting paid in crypto (facts!)
Watch it grow (up!)

[Outro]
${hook} ${useAdLibs ? `(${getAdLib()})` : ''}
FLIPZ A.I., yeah we out this bitch (gang!)`);
      
      setGenerating(false);
    }, 2000);
  };

  // Add this function to generate rain drops
  const renderRainDrops = () => {
    const drops = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 0.8 + Math.random() * 0.6, // Faster rain
      width: Math.random() < 0.3 ? 3 : 2,
      height: 30 + Math.random() * 50, // Longer streaks
      opacity: 0.4 + Math.random() * 0.4, // More visible
      glow: Math.random() < 0.4, // More glowing drops
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            className={cn(
              "absolute bg-gradient-to-b from-[#00F0FF]/60 via-[#00F0FF]/40 to-[#9945FF]/30",
              drop.glow && "shadow-[0_0_15px_rgba(0,240,255,0.6)]"
            )}
            style={{
              left: drop.left,
              width: drop.width,
              height: `${drop.height}px`,
              opacity: drop.opacity,
            }}
            animate={{
              y: ['-10vh', '110vh'],
              opacity: [0, drop.opacity, 0]
            }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              delay: drop.delay,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative h-[238px] w-[520px] bg-black/20 backdrop-blur-sm border border-[#9945FF]/20 rounded-lg overflow-hidden">
      {/* Enhanced Header */}
      <div className="absolute inset-x-0 top-0 p-2 flex items-center justify-between border-b border-[#9945FF]/20">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white tracking-wider font-mono">FLIPZ_LYRIC_GENERATOR.exe</span>
          <div className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]"></div>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-1.5 py-0.5 text-[10px] bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF] focus:outline-none"
          >
            {GENRES.map((genre) => (
              <option key={genre} value={genre} className="bg-black">
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white">STATUS</span>
          <div className="px-1.5 py-0.5 text-[10px] bg-[#9945FF]/20 rounded border border-[#9945FF]/30 text-[#00F0FF]">
            {generating ? 'GENERATING' : 'READY'}
          </div>
        </div>
      </div>

      {/* Main Content Area - Updated to match HolographicVideo */}
      <div className="flex flex-col h-full pt-14">
        <div className="relative flex-1 overflow-hidden p-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your lyric theme or concept..."
            className="w-full bg-black/40 border border-[#9945FF]/20 rounded px-3 py-1.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#9945FF]/40"
          />
          
          <div className="mt-2 flex justify-end">
            <button
              onClick={generateLyrics}
              disabled={generating}
              className={cn(
                "px-3 py-1 text-xs rounded border",
                "bg-[#9945FF]/20 border-[#9945FF]/30 text-[#00F0FF]",
                "hover:bg-[#9945FF]/30 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              GENERATE
            </button>
          </div>

          {/* Generated Content - Updated for better scrolling */}
          {lyrics && (
            <motion.div
              className="mt-2 overflow-y-auto max-h-[110px] scrollbar-hide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={cn(
                "rounded-lg p-3",
                "bg-gradient-to-r from-[#9945FF]/20 to-[#00F0FF]/20",
                "border border-[#9945FF]/30",
                "shadow-[0_0_15px_rgba(153,69,255,0.2)]"
              )}>
                <div className="text-xs text-white/90 whitespace-pre-line">
                  {lyrics}
                </div>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-[#00F0FF]/70">
                  <span>BPM: {bpm}</span>
                  <span>•</span>
                  <span>KEY: {key}</span>
                  <span>•</span>
                  <span>MOOD: {mood}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Add the same glow effects as HolographicVideo */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-lg"
        style={{
          background: `radial-gradient(
            circle at center,
            rgba(153, 69, 255, 0.2) 0%,
            rgba(0, 240, 255, 0.15) 50%,
            transparent 70%
          )`
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute inset-0 -z-20 rounded-lg opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(153, 69, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) 50%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Replace existing background effect with this updated one */}
      <motion.div
        className="absolute inset-0 overflow-hidden -z-10"
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
    </div>
  );
} 