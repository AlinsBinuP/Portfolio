import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, VolumeX } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const AudioPlayer = () => {
  const { 
    isPlaying, setIsPlaying, 
    isMuted, setIsMuted, 
    currentTrack, progress, seek, 
    nextTrack, prevTrack 
  } = useMusic();

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    seek(percent);
  };

  return (
    <div className="w-full h-full flex flex-col p-10 relative overflow-hidden bg-[#0c0a28]/40 backdrop-blur-3xl border border-white/5">
      {/* Dynamic Background Glow */}
      <div 
        className="absolute inset-0 opacity-20 blur-[100px] transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at center, ${currentTrack.color} 0%, transparent 70%)` }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-12 relative z-10">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/40">
               <Music size={18} />
            </div>
            <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Personal Archive</span>
         </div>
         <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-white/20'}`} />
            <span className="text-[9px] font-black text-emerald-500/80 uppercase tracking-widest leading-none">High Fidelity</span>
         </div>
      </div>

      {/* Vinyl Record Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center relative mb-12">
         <div className="relative w-48 h-48">
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-[#0c0a28] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[8px] border-[#1a1a3a] relative overflow-hidden"
            >
               <div className="absolute inset-2 rounded-full border border-white/5 opacity-20" />
               <div className="absolute inset-4 rounded-full border border-white/5 opacity-20" />
               <div className="absolute inset-8 rounded-full border border-white/5 opacity-20" />
               
               <div 
                 className="absolute inset-[35%] rounded-full shadow-inner border border-white/10 flex items-center justify-center transition-colors duration-1000"
                 style={{ backgroundColor: currentTrack.color }}
               >
                  <div className="w-4 h-4 rounded-full bg-[#0c0a28] border-2 border-white/20" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />
            </motion.div>

            <motion.div 
              animate={{ rotate: isPlaying ? 25 : 0 }}
              transition={{ type: "spring", stiffness: 50 }}
              className="absolute -top-4 -right-4 w-24 h-4 origin-right z-20"
            >
               <div className="w-full h-full bg-gradient-to-l from-gray-400 to-gray-600 rounded-full relative shadow-lg">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-6 bg-gray-300 rounded-sm" />
               </div>
            </motion.div>
         </div>

         <div className="mt-12 flex items-end gap-1 h-8">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: isPlaying ? [8, Math.random() * 24 + 8, 8] : 4 }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                className="w-1.5 bg-white/20 rounded-full"
                style={{ backgroundColor: isPlaying ? currentTrack.color : 'rgba(255,255,255,0.1)' }}
              />
            ))}
         </div>
      </div>

      {/* Info & Controls */}
      <div className="relative z-10 text-center mb-8">
         <h3 className="text-xl font-display font-black text-white tracking-tighter leading-none mb-2 line-clamp-1">{currentTrack.title}</h3>
         <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] line-clamp-1">{currentTrack.artist}</p>
      </div>

      {/* Progress Bar - Seekable */}
      <div 
        className="relative z-10 w-full h-1.5 bg-white/5 rounded-full mb-10 overflow-hidden group cursor-pointer"
        onClick={handleSeek}
      >
         <motion.div 
           animate={{ width: `${progress}%` }}
           className="h-full bg-white transition-all duration-300"
           style={{ backgroundColor: currentTrack.color }}
         />
      </div>

      {/* Player Controls */}
      <div className="relative z-10 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <button onClick={prevTrack} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
               <SkipBack size={18} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full flex items-center justify-center text-[#0c0a28] shadow-2xl transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: currentTrack.color }}
            >
               {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={nextTrack} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
               <SkipForward size={18} />
            </button>
         </div>

         <button 
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 text-white/40 hover:text-white transition-all"
         >
            {isMuted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} />}
            <span className="text-[9px] font-bold uppercase tracking-widest">{isMuted ? 'Muted' : 'Live'}</span>
         </button>
      </div>
    </div>
  );
};
