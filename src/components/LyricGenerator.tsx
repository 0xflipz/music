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
  "Lo-fi Hip Hop",
  "Synthwave Rap",
  "Cyber Punk",
  "Future Bass",
  "Glitch Hop"
];

const HOOKS = [
  "Stack my ETH up in the metaverse (yeah)",
  "NFT money got me feeling cursed (sheesh)",
  "Mining blocks while these ops rehearse (what)",
  "Smart contracts make my pockets burst (facts)",
  "Web3 gang, we don't fuck with banks (nah)",
  "Blockchain life got unlimited ranks (up)",
  "DeFi money hit different ways (cash)",
  "Crypto life, we don't see no days (never)",
  "Digital dreams in my neural space (plug)",
  "Quantum flows got me levitating (float)",
  "AI mind, human heart collide (sync)",
  "Cyber streets where the data flows (hack)",
  "Neural nets got my mind enhanced (boost)",
  "Virtual worlds in my DNA (code)"
];

const VERSE_STRUCTURES = {
  trap: {
    flow: "triplet",
    lineCount: 16,
    rhymeScheme: "AABB",
    tempo: "fast",
    adLibFrequency: "high"
  },
  drill: {
    flow: "sliding",
    lineCount: 12,
    rhymeScheme: "ABAB",
    tempo: "aggressive",
    adLibFrequency: "medium"
  },
  boomBap: {
    flow: "steady",
    lineCount: 16,
    rhymeScheme: "ABAB",
    tempo: "classic",
    adLibFrequency: "low"
  },
  synthwave: {
    flow: "melodic",
    lineCount: 14,
    rhymeScheme: "AABBA",
    tempo: "atmospheric",
    adLibFrequency: "minimal"
  },
  cyberPunk: {
    flow: "glitch",
    lineCount: 18,
    rhymeScheme: "AABAAB",
    tempo: "erratic",
    adLibFrequency: "high"
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
    "DeFi", "metaverse", "mining", "tokens",
    "smart wallet", "gas fees", "web3 social", "DAO life",
    "governance", "yield farming", "liquidity", "staking"
  ],
  cyberpunk: [
    "neural link", "cyber implants", "digital dreams",
    "neon streets", "quantum code", "virtual reality",
    "data streams", "neural networks", "binary soul"
  ],
  future: [
    "AI fusion", "quantum leap", "digital ascension",
    "cyber enhancement", "neural upgrade", "virtual essence",
    "digital transformation", "synthetic evolution"
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

// Add status types for better state management
type GeneratorStatus = 'idle' | 'ready' | 'generating' | 'error';

// Add this type at the top with other interfaces
interface LyricsModalProps {
  lyrics: string;
  onClose: () => void;
}

// Add these SVG components at the top of the file
const CloseIcon = () => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className="text-[#00F0FF]"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DownloadIcon = () => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className="text-[#00F0FF]"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Update the LyricsModal component
function LyricsModal({ lyrics, onClose }: LyricsModalProps) {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([lyrics], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "flipz_lyrics.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] overflow-y-auto p-4"
    >
      <div className="min-h-full flex items-center justify-center py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-black/90 border border-[#9945FF]/30 rounded-lg w-full max-w-md"
        >
          <div className="p-4 flex flex-col">
            {/* Lyrics Display */}
            <div 
              className="bg-black/40 rounded p-3 mb-4 text-xs text-white/90 
                       whitespace-pre-line max-h-[60vh] overflow-y-auto custom-scrollbar"
            >
              {lyrics}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-2 px-4 bg-[#9945FF]/20 hover:bg-[#9945FF]/30 
                         border border-[#9945FF]/30 hover:border-[#9945FF]/50 
                         rounded text-white font-medium text-xs transition-all duration-200"
              >
                DOWNLOAD LYRICS
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 px-4 bg-[#9945FF]/20 hover:bg-[#9945FF]/30 
                         border border-[#9945FF]/30 hover:border-[#9945FF]/50 
                         rounded text-white font-medium text-xs transition-all duration-200"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

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
  const [status, setStatus] = useState<GeneratorStatus>('idle');
  const [selectedTheme, setSelectedTheme] = useState('web3');
  const [complexity, setComplexity] = useState(50);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateHook = useCallback(() => {
    const randomHook = HOOKS[Math.floor(Math.random() * HOOKS.length)];
    setHook(randomHook);
  }, []);

  const generateLyrics = async () => {
    setStatus('generating');
    setGenerating(true);
    generateHook();
    
    // Update music stats
    setBpm(Math.floor(Math.random() * 40) + 120);
    setKey(['Am', 'Cm', 'Gm', 'Fm'][Math.floor(Math.random() * 4)]);
    setMood(['Energetic', 'Dark', 'Melodic', 'Aggressive'][Math.floor(Math.random() * 4)]);
    
    // Helper functions for generation
    const getAdLib = () => AD_LIBS[Math.floor(Math.random() * AD_LIBS.length)];
    const getThemeWord = (theme: keyof typeof THEMES) => 
      THEMES[theme][Math.floor(Math.random() * THEMES[theme].length)];

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const generatedLyrics = `[Verse 1]
${getThemeWord(selectedTheme)} in my veins, I'm feeling blessed ${useAdLibs ? `(${getAdLib()})` : ''}
Digital dreams while they're catching rest ${useAdLibs ? `(${getAdLib()})` : ''}
${getThemeWord('tech')} flow, yeah I'm in my zone ${useAdLibs ? `(${getAdLib()})` : ''}
Virtual reality is where I roam

[Hook]
${hook}
${hook.split('(')[0]} // Repeat hook without ad-lib

[Verse 2]
${getThemeWord(selectedTheme)} life got me levitating high ${useAdLibs ? `(${getAdLib()})` : ''}
While they sleeping, watch my tokens multiply ${useAdLibs ? `(${getAdLib()})` : ''}
${getThemeWord('flex')}, yeah we doing fine ${useAdLibs ? `(${getAdLib()})` : ''}
Every bar I drop becomes a power line

[Bridge]
They don't know (what!)
How we flow (yeah!)
Getting paid in crypto (facts!)
Watch it grow (up!)

[Outro]
${hook}`;

      setLyrics(generatedLyrics);
      setShowModal(true);
      setStatus('ready');
    } catch (err) {
      setError('Generation failed. Please try again.');
      setStatus('error');
    } finally {
      setGenerating(false);
    }
  };

  // Update input handler to change status immediately when text is entered
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrompt = e.target.value;
    setPrompt(newPrompt);
    // Update status based on input presence
    setStatus(newPrompt.trim().length > 0 ? 'ready' : 'idle');
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
    <div className="component-container lyric-generator relative h-[238px] w-[520px] bg-black/20 backdrop-blur-sm border border-[#9945FF]/20 rounded-lg overflow-hidden">
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
            {status}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col h-full pt-14 p-2">
        {/* Controls Section */}
        <div className="space-y-2">
          {/* Theme and Genre Selectors */}
          <div className="flex gap-2 mb-2">
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value as keyof typeof THEMES)}
              className="flex-1 bg-black/40 border border-[#9945FF]/20 rounded px-2 py-1.5 text-xs text-[#00F0FF] focus:outline-none"
            >
              {Object.keys(THEMES).map((theme) => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="flex-1 bg-black/40 border border-[#9945FF]/20 rounded px-2 py-1.5 text-xs text-[#00F0FF] focus:outline-none"
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Complexity Slider */}
          <div className="mb-2">
            <div className="flex justify-between text-[10px] text-white/70 mb-1">
              <span>Complexity</span>
              <span>{complexity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={complexity}
              onChange={(e) => setComplexity(parseInt(e.target.value))}
              className="w-full h-1 bg-[#9945FF]/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Input or Lyrics Display */}
          <div className="relative h-[80px]">
            {!lyrics ? (
              <input
                type="text"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter your lyric theme or concept..."
                className="w-full bg-black/40 border border-[#9945FF]/20 rounded px-3 py-1.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#9945FF]/40"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full overflow-y-auto scrollbar-hide"
              >
                <div className={cn(
                  "rounded-lg p-3 h-full",
                  "bg-gradient-to-r from-[#9945FF]/10 to-[#00F0FF]/10",
                  "border border-[#9945FF]/30",
                  "text-xs text-white/90 whitespace-pre-line"
                )}>
                  {lyrics}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-[#9945FF]/20 bg-black/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={useAdLibs}
                  onChange={(e) => setUseAdLibs(e.target.checked)}
                  className="accent-[#9945FF]"
                />
                Ad-libs
              </label>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span>Flow:</span>
                <span className="text-[#00F0FF]">
                  {VERSE_STRUCTURES[selectedGenre.toLowerCase()]?.flow || 'standard'}
                </span>
              </div>
            </div>

            <button
              onClick={generateLyrics}
              disabled={status === 'generating' || status === 'idle'}
              className={cn(
                "relative px-4 py-1.5 text-xs rounded border transition-all duration-200",
                {
                  // Ready state - green glow effect
                  "bg-[#00FF94]/20 border-[#00FF94]/30 text-[#00FF94] hover:bg-[#00FF94]/30 hover:shadow-[0_0_15px_rgba(0,255,148,0.3)]": 
                    status === 'ready',
                  // Generating state - purple pulse
                  "bg-[#9945FF]/30 border-[#9945FF]/40 text-[#00F0FF] animate-pulse":
                    status === 'generating',
                  // Idle state - disabled look
                  "bg-[#9945FF]/20 border-[#9945FF]/30 text-white/50 cursor-not-allowed":
                    status === 'idle',
                }
              )}
            >
              {status === 'generating' ? 'GENERATING...' : 'GENERATE'}
            </button>
          </div>
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

      {/* Add Modal */}
      {showModal && lyrics && (
        <LyricsModal
          lyrics={lyrics}
          onClose={() => {
            setShowModal(false);
            setLyrics('');
          }}
        />
      )}
    </div>
  );
}

// Enhanced WaveformVisualizer
function WaveformVisualizer({ isGenerating, complexity }: { isGenerating: boolean; complexity: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center gap-1 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-gradient-to-t from-[#9945FF] to-[#00F0FF]"
          animate={{
            height: isGenerating 
              ? [10, 20 + (Math.random() * complexity / 5), 10] 
              : 4,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
} 