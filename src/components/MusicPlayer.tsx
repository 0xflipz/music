"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';
import { cn } from '@/utils/utils';

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
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: '1',
    title: 'young $FLIPZ',
    artist: 'FLIPZ A.I.',
    duration: '0:00',
    cover: '/track-cover.png',
    audioUrl: '/young-flipz.wav'
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
        const minutes = Math.floor(audioRef.current!.duration / 60);
        const seconds = Math.floor(audioRef.current!.duration % 60);
        setCurrentTrack(prev => ({
          ...prev,
          duration: `${minutes}:${seconds.toString().padStart(2, '0')}`
        }));
      });
    }
  }, []);

  useEffect(() => {
    // Check if file exists
    fetch(currentTrack.audioUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Audio file not found');
        }
        console.log('Audio file exists');
      })
      .catch(error => {
        console.error('Error loading audio file:', error);
      });
  }, [currentTrack.audioUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-[#9945FF]/20 backdrop-blur-lg">
      <div className="max-w-[1600px] mx-auto px-8 py-4">
        <div className="flex items-center gap-6">
          {/* Controls and Track Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button className="text-[#00F0FF]/70 hover:text-[#00F0FF] transition-colors">
                <BackwardIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-[#9945FF]/10 border border-[#9945FF]/30 
                          flex items-center justify-center hover:bg-[#00F0FF]/20 transition-all"
              >
                {isPlaying ? (
                  <PauseIcon className="w-5 h-5 text-[#00F0FF]" />
                ) : (
                  <PlayIcon className="w-5 h-5 text-[#00F0FF]" />
                )}
              </button>
              <button className="text-[#00F0FF]/70 hover:text-[#00F0FF] transition-colors">
                <ForwardIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Track Info */}
            <div>
              <div className="text-sm font-mono text-[#00F0FF]">{currentTrack.title}</div>
              <div className="text-xs font-mono text-[#9945FF]/70">{currentTrack.artist}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="h-1 bg-black/40 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
                style={{ width: `${progressPercentage}%` }}
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(153, 69, 255, 0.5)",
                    "0 0 20px rgba(0, 240, 255, 0.5)",
                    "0 0 10px rgba(153, 69, 255, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono mt-1">
              <span className="text-[#00F0FF]/70">
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-[#00F0FF]/70">{currentTrack.duration}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#9945FF]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <div className="w-20 h-1 bg-black/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#9945FF] to-[#00F0FF]"
                style={{ width: '75%' }}
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(153, 69, 255, 0.5)",
                    "0 0 20px rgba(0, 240, 255, 0.5)",
                    "0 0 10px rgba(153, 69, 255, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
            const minutes = Math.floor(audioRef.current.duration / 60);
            const seconds = Math.floor(audioRef.current.duration % 60);
            setCurrentTrack(prev => ({
              ...prev,
              duration: `${minutes}:${seconds.toString().padStart(2, '0')}`
            }));
          }
        }}
        preload="auto"
      />
    </div>
  );
} 