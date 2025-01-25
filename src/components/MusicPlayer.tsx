"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: '1',
    title: 'Neural Flow',
    artist: 'FLIPZ A.I.',
    duration: '3:45',
    cover: '/track-cover.png',
    audioUrl: '/demo-track.mp3'
  });

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-[#0ff]/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Waveform Visualizer */}
          <motion.div 
            className="w-1/3 h-12 bg-black/50 rounded-lg overflow-hidden"
            animate={{
              boxShadow: isPlaying 
                ? ['0 0 10px rgba(0,255,255,0.2)', '0 0 20px rgba(0,255,255,0.4)']
                : '0 0 10px rgba(0,255,255,0.1)'
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            {/* Add waveform visualization here */}
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button className="text-[#0ff]/70 hover:text-[#0ff]">
              <BackwardIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-[#0ff]/10 border border-[#0ff]/30 
                       flex items-center justify-center hover:bg-[#0ff]/20"
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5 text-[#0ff]" />
              ) : (
                <PlayIcon className="w-5 h-5 text-[#0ff]" />
              )}
            </button>
            <button className="text-[#0ff]/70 hover:text-[#0ff]">
              <ForwardIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Track Info */}
          <div className="flex-1">
            <div className="text-sm font-mono text-white">{currentTrack.title}</div>
            <div className="text-xs font-mono text-[#0ff]/70">{currentTrack.artist}</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md">
            <div className="progress-bar h-1 rounded-full">
              <motion.div 
                className="progress-fill h-full rounded-full"
                style={{ width: `${(currentTime / 100) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-white/50 mt-1">
              <span>0:00</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>
        </div>
      </div>
      <audio 
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
      />
    </div>
  );
} 