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
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4 px-4 py-3 bg-black/80 border-t border-white/20 backdrop-blur-md">
        <div className="flex items-center text-sm font-mono">
          <span className="text-white">young $FLIPZ</span>
          <span className="text-white/50 mx-2">•</span>
          <span className="text-white/50">FLIPZ A.I.</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            className="text-white/70 hover:text-white transition-colors"
            onClick={() => {/* Previous track logic */}}
          >
            <BackwardIcon className="w-4 h-4" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 
                     flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <PauseIcon className="w-4 h-4 text-white" />
            ) : (
              <PlayIcon className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>
          
          <button 
            className="text-white/70 hover:text-white transition-colors"
            onClick={() => {/* Next track logic */}}
          >
            <ForwardIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 flex-grow">
          <div className="text-xs text-white/50 font-mono">
            {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60).toString().padStart(2, '0')}
          </div>
          
          <div className="flex-grow h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="text-xs text-white/50 font-mono">{currentTrack.duration}</div>
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