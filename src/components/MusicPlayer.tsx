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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentTrack, setCurrentTrack] = useState<Track>({
    id: '1',
    title: '',
    artist: '',
    duration: '0:00',
    cover: '/track-cover.png',
    audioUrl: '/young-flipz.wav'
  });
  const [volume, setVolume] = useState(0.75);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleMetadata = () => {
      const duration = audio.duration;
      setDuration(duration);
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      setCurrentTrack(prev => ({
        ...prev,
        duration: `${minutes}:${seconds.toString().padStart(2, '0')}`
      }));
    };

    audio.addEventListener('loadedmetadata', handleMetadata);
    return () => audio.removeEventListener('loadedmetadata', handleMetadata);
  }, []);

  useEffect(() => {
    const initializeAudio = async () => {
      if (!audioRef.current) return;
      
      try {
        audioRef.current.volume = volume;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (error) {
        console.log("Initial autoplay failed:", error);
        setIsPlaying(false);
        
        // Add click-to-play fallback
        const handleFirstInteraction = async () => {
          try {
            if (audioRef.current) {
              await audioRef.current.play();
              setIsPlaying(true);
              document.removeEventListener('click', handleFirstInteraction);
            }
          } catch (err) {
            console.log("Play on click failed:", err);
          }
        };
        
        document.addEventListener('click', handleFirstInteraction, { once: true });
      }
    };

    initializeAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener('click', () => {});
    };
  }, []); // Empty dependency array so it only runs once on mount

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

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !volumeBarRef.current) return;
    
    const rect = volumeBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const newVolume = Math.max(0, Math.min(1, x / width));
    
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const VolumeIcon = () => {
    if (volume === 0) {
      return (
        <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </svg>
      );
    }
    if (volume < 0.5) {
      return (
        <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </svg>
    );
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="music-player-wrapper">
      <div className="music-player-content">
        {/* Left side - Play button only */}
        <div className="flex items-center justify-end w-[120px] px-4">
          <button 
            onClick={togglePlay}
            className="play-button text-white hover:text-white/90 transition-colors p-2 rounded-full border border-white/20 hover:border-white/50 relative group"
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(0, 240, 255, 0.3)",
                  "0 0 20px rgba(0, 240, 255, 0.5)",
                  "0 0 10px rgba(0, 240, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {isPlaying ? <PauseIcon className="w-6 h-6 relative z-10" /> : <PlayIcon className="w-6 h-6 relative z-10" />}
          </button>
        </div>

        {/* Center Controls and Progress */}
        <div className="flex flex-col flex-1 max-w-[500px]">
          <div className="w-full space-y-1">
            <div 
              ref={progressBarRef}
              className="h-1.5 rounded-full overflow-hidden cursor-pointer progress-bar"
              onClick={handleProgressBarClick}
            >
              <motion.div 
                className="h-full progress-indicator relative"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(0, 240, 255, 0.5)",
                    "0 0 20px rgba(0, 240, 255, 0.7)",
                    "0 0 10px rgba(0, 240, 255, 0.5)"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <motion.div
                  className="progress-lightning"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scaleY: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-white/50">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Right side - Volume Control */}
        <div className="flex items-center gap-3 w-[120px] px-4">
          <button 
            onClick={() => {
              const newVolume = volume === 0 ? 0.75 : 0;
              setVolume(newVolume);
              if (audioRef.current) audioRef.current.volume = newVolume;
            }}
            className="volume-control hover:text-white/70 transition-colors relative group"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  "0 0 5px rgba(0, 240, 255, 0.2)",
                  "0 0 10px rgba(0, 240, 255, 0.4)",
                  "0 0 5px rgba(0, 240, 255, 0.2)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <VolumeIcon />
          </button>
          <div 
            ref={volumeBarRef}
            className="volume-slider w-24 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group"
            onClick={handleVolumeChange}
            onMouseMove={(e) => e.buttons === 1 && handleVolumeChange(e)}
          >
            <motion.div 
              className="h-full bg-white/50 relative"
              style={{ width: `${volume * 100}%` }}
              animate={{
                boxShadow: [
                  "0 0 5px rgba(0, 240, 255, 0.3)",
                  "0 0 10px rgba(0, 240, 255, 0.5)",
                  "0 0 5px rgba(0, 240, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget;
          setDuration(audio.duration);
          audio.volume = volume;
        }}
        preload="auto"
      />
    </div>
  );
} 