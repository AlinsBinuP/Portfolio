import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, ListMusic, ChevronRight, ChevronLeft } from 'lucide-react';

const TRACKS = [
  {
    title: "Celestial Resonance",
    artist: "Atmospheric Intelligence",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Placeholder
    duration: "4:20"
  },
  {
    title: "Neon Horizon",
    artist: "Synth Explorer",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Placeholder
    duration: "3:45"
  }
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex items-center">
      <motion.div
        layout
        initial={false}
        animate={{ width: isExpanded ? '320px' : '64px', height: '64px' }}
        className="relative overflow-hidden rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-2xl flex items-center p-2 group"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--text-primary)]/5 text-[var(--text-primary)] hover:bg-[var(--text-primary)]/10 transition-colors z-10"
        >
          <Music size={20} className={isPlaying ? 'animate-pulse text-[var(--accent-primary)]' : ''} />
        </button>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex w-full items-center justify-between px-4"
            >
              <div className="flex flex-col min-w-0 pr-4">
                <h4 className="text-[11px] font-bold text-[var(--text-primary)] truncate uppercase tracking-widest">{currentTrack.title}</h4>
                <p className="text-[10px] text-[var(--text-secondary)] truncate uppercase tracking-tighter opacity-60">{currentTrack.artist}</p>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={prevTrack} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <SkipBack size={16} />
                </button>
                <button 
                  onClick={togglePlay}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-105 transition-transform shadow-md"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <button onClick={nextTrack} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <SkipForward size={16} />
                </button>
              </div>

              {/* Volume Slider (Compact) */}
              <div className="hidden md:flex items-center gap-2 ml-4 border-l border-[var(--glass-border)] pl-4">
                <Volume2 size={14} className="text-[var(--text-secondary)] opacity-40" />
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-[var(--text-primary)]/10 rounded-full appearance-none cursor-pointer accent-[var(--accent-primary)]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <audio
          ref={audioRef}
          src={currentTrack.url}
          onEnded={nextTrack}
        />
      </motion.div>

      {/* Expand Hint */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="ml-3 hidden md:block"
        >
          <div className="bg-[var(--glass-bg)] backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--glass-border)] text-[10px] text-[var(--text-primary)] uppercase tracking-widest pointer-events-none shadow-xl">
            Music System
          </div>
        </motion.div>
      )}
    </div>
  );
};
