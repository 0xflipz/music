"use client";

import React, { useState, useRef, useEffect } from 'react';
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
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-[#0ff]/20 backdrop-blur-lg p-4">
      <div className="flex items-center gap-6">
        {/* Controls and Track Info Combined */}
        <div className="flex items-center gap-4">
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

          {/* Track Info - Next to Controls */}
          <div>
            <div className="text-sm font-mono text-white">{currentTrack.title}</div>
            <div className="text-xs font-mono text-[#0ff]/70">{currentTrack.artist}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="progress-bar h-1 rounded-full">
            <motion.div 
              className="progress-fill h-full rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-mono text-white/50 mt-1">
            <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
            <span>{currentTrack.duration}</span>
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