"use client";

import React, { useState, useCallback } from 'react';
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

  const generateHook = useCallback(() => {
    const randomHook = HOOKS[Math.floor(Math.random() * HOOKS.length)];
    setHook(randomHook);
  }, []);

  const generateLyrics = async () => {
    setGenerating(true);
    generateHook();
    
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

  return (
    <div className="cyber-container w-full h-[280px] relative flex flex-col">
      <div className="cyber-corner cyber-corner-tl" />
      <div className="cyber-corner cyber-corner-tr" />
      <div className="cyber-corner cyber-corner-bl" />
      <div className="cyber-corner cyber-corner-br" />
      
      <div className="cyber-header p-3 flex items-center justify-between bg-black/40 border-b border-[#9945FF]/20">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#00F0FF]"
            animate={{ 
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 10px #00F0FF",
                "0 0 5px #00F0FF",
                "0 0 10px #00F0FF"
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-white font-mono tracking-wider">FLIPZ_LYRIC_GENERATOR.exe</span>
        </div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="cyber-input bg-black/30 text-white text-sm px-2 py-1 rounded focus:outline-none border border-[#9945FF]/30 hover:border-[#00F0FF]/40"
        >
          {GENRES.map(genre => (
            <option key={genre} value={genre} className="bg-black">{genre}</option>
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
            className={cn(
              "relative px-6 py-2 rounded overflow-hidden",
              "bg-black/40 backdrop-blur-sm",
              "border border-[#9945FF]/40",
              "text-[#00F0FF] font-mono text-sm",
              "transition-all duration-200",
              "hover:border-[#00F0FF]/60 hover:bg-[#9945FF]/10",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "whitespace-nowrap min-w-[120px]",
              "flex items-center justify-center"
            )}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  "inset 0 0 15px rgba(153, 69, 255, 0.3), 0 0 15px rgba(153, 69, 255, 0.3)",
                  "inset 0 0 20px rgba(0, 240, 255, 0.4), 0 0 20px rgba(0, 240, 255, 0.4)",
                  "inset 0 0 15px rgba(153, 69, 255, 0.3), 0 0 15px rgba(153, 69, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative z-10 flex items-center justify-center gap-2">
              {generating ? (
                <>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#00F0FF]"
                    animate={{ 
                      opacity: [1, 0.3, 1],
                      boxShadow: [
                        "0 0 8px rgba(0, 240, 255, 0.8)",
                        "0 0 12px rgba(0, 240, 255, 0.9)",
                        "0 0 8px rgba(0, 240, 255, 0.8)"
                      ]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(0, 240, 255, 0.8)",
                        "0 0 12px rgba(0, 240, 255, 0.9)",
                        "0 0 8px rgba(0, 240, 255, 0.8)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    GENERATING...
                  </motion.span>
                </>
              ) : (
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(0, 240, 255, 0.8)",
                      "0 0 12px rgba(0, 240, 255, 0.9)",
                      "0 0 8px rgba(0, 240, 255, 0.8)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  GENERATE
                </motion.span>
              )}
            </div>
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
                className="font-mono text-sm relative p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Core text with enhanced glow */}
                <motion.span
                  className="text-[#9945FF] relative z-10 tracking-widest text-lg"
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(153, 69, 255, 0.8), 0 0 12px rgba(0, 240, 255, 0.4)",
                      "0 0 15px rgba(153, 69, 255, 0.9), 0 0 20px rgba(0, 240, 255, 0.5)",
                      "0 0 8px rgba(153, 69, 255, 0.8), 0 0 12px rgba(0, 240, 255, 0.4)"
                    ],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  AWAITING PROMPT INPUT
                </motion.span>

                {/* Animated dots with gradient */}
                <motion.span
                  className="ml-1 bg-gradient-to-r from-[#9945FF] to-[#00F0FF] text-transparent bg-clip-text"
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, 4, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ...
                </motion.span>

                {/* Circular pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(153, 69, 255, 0.2), inset 0 0 20px rgba(0, 240, 255, 0.2)",
                      "0 0 40px rgba(153, 69, 255, 0.3), inset 0 0 40px rgba(0, 240, 255, 0.3)",
                      "0 0 20px rgba(153, 69, 255, 0.2), inset 0 0 20px rgba(0, 240, 255, 0.2)"
                    ],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Rotating border effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-transparent"
                  style={{
                    background: `linear-gradient(90deg, #9945FF, #00F0FF, #9945FF) border-box`
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Corner accents */}
                {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((position, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-3 h-3 ${position}`}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[#9945FF] to-[#00F0FF] rounded-sm" />
                  </motion.div>
                ))}

                {/* Vertical scan lines */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
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

                {/* Background gradient pulse */}
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
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 