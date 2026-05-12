import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music, Volume2, VolumeX, SkipForward, SkipBack, Minimize2, Headphones, ChevronLeft } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

type PlayerView = 'orb' | 'pill' | 'full';

export const MusicPlayer: React.FC = () => {
  const { 
    isPlaying, setIsPlaying, 
    isMuted, setIsMuted, 
    currentTrack, progress, seek, 
    nextTrack, prevTrack,
    setCurrentTrackIndex,
    TRACKS
  } = useMusic();

  const [viewState, setViewState] = useState<PlayerView>('orb');

  const cycleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewState === 'orb') setViewState('pill');
    else if (viewState === 'pill') setViewState('full');
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    seek(percent);
  };

  return (
    <>
      {/* GLOBAL FLOATING MUTE ORB (Bottom Right - Shifted Up to avoid Chatbot) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-32 right-8 z-[150] w-14 h-14 rounded-2xl bg-[#0c0a28]/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-2xl transition-all group overflow-hidden"
      >
         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
         <AnimatePresence mode="wait">
            {isMuted ? (
              <motion.div key="muted" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
                 <VolumeX size={20} className="text-red-400" />
              </motion.div>
            ) : (
              <motion.div key="unmuted" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
                 <Volume2 size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              </motion.div>
            )}
         </AnimatePresence>
         <div className={`absolute top-0 right-0 w-2 h-2 rounded-full m-3 ${isMuted ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`} />
      </motion.button>

      {/* STAGE 3: FULL PAGE EXPANSION */}
      <AnimatePresence>
        {viewState === 'full' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewState('pill')} 
            className="fixed inset-0 z-[160] bg-[#0c0a28]/80 backdrop-blur-3xl flex items-center justify-center p-6"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               onClick={(e) => e.stopPropagation()} 
               className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[64px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative"
             >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                   <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px] overflow-hidden">
                      <img src={currentTrack.cover} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a28] to-transparent opacity-60" />
                      <div className="absolute bottom-10 left-10">
                         <span className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.6em] mb-4 block leading-none">Global Archive</span>
                         <h2 className="text-5xl font-display font-black text-white tracking-tighter leading-none mb-2">{currentTrack.title}</h2>
                         <p className="text-xl font-bold text-white/40 uppercase tracking-widest">{currentTrack.artist}</p>
                      </div>
                   </div>

                   <div className="p-16 flex flex-col justify-between bg-white/[0.02]">
                      <div className="flex justify-between items-center mb-12">
                         <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40">
                            <Headphones size={24} />
                         </div>
                         <button onClick={() => setViewState('pill')} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                            <Minimize2 size={24} />
                         </button>
                      </div>

                      <div className="space-y-12">
                         <div className="flex items-center justify-center gap-10">
                            <button onClick={prevTrack} className="text-white/40 hover:text-white transition-all"><SkipBack size={32} fill="currentColor" /></button>
                            <button onClick={() => setIsPlaying(!isPlaying)} className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#0c0a28] shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all">
                               {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
                            </button>
                            <button onClick={nextTrack} className="text-white/40 hover:text-white transition-all"><SkipForward size={32} fill="currentColor" /></button>
                         </div>

                         <div className="space-y-4">
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden group cursor-pointer relative" onClick={handleSeek}>
                               <motion.div animate={{ width: `${progress}%` }} className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Progress Archive</span>
                               <button 
                                 onClick={() => setIsMuted(!isMuted)}
                                 className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                               >
                                  {isMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} />}
                                  <span className="text-[10px] font-bold uppercase tracking-widest">{isMuted ? 'Muted' : 'Unmuted'}</span>
                               </button>
                            </div>
                         </div>
                      </div>

                      <div className="mt-12 flex gap-4">
                         {TRACKS.map((t, i) => (
                           <button 
                             key={i}
                             onClick={() => setCurrentTrackIndex(i)}
                             className={`w-12 h-12 rounded-2xl border transition-all overflow-hidden ${currentTrack.title === t.title ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/20' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                           >
                              <img src={t.cover} className="w-full h-full object-cover" alt="" />
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 1 & 2: THE MODERN GLOWING ORB AND PILL */}
      <AnimatePresence>
        {viewState !== 'full' && (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className={`fixed z-[140] flex items-center gap-4 transition-all duration-500 ${viewState === 'orb' ? 'bottom-8 left-8' : 'bottom-8 left-1/2 -translate-x-1/2'}`}
          >
             <motion.button 
               layout
               onClick={cycleView}
               className={`relative flex items-center justify-center group overflow-hidden shadow-2xl transition-all duration-500 ${viewState === 'orb' ? 'w-16 h-16 rounded-[24px] bg-[#0c0a28]' : 'w-12 h-12 rounded-full bg-[#0c0a28]'}`}
               style={{ 
                  boxShadow: viewState === 'orb' ? `0 0 40px ${currentTrack.color}33, inset 0 0 20px ${currentTrack.color}22` : 'none',
                  border: `1px solid ${currentTrack.color}33`
               }}
             >
                <AnimatePresence>
                   {isPlaying && viewState === 'orb' && (
                     <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-[24px]" style={{ border: `2px solid ${currentTrack.color}` }} />
                   )}
                </AnimatePresence>
                <motion.div animate={{ scale: isPlaying ? [1, 1.1, 1] : 1, rotate: isPlaying ? 360 : 0 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at center, ${currentTrack.color} 0%, transparent 70%)` }} />
                <Music size={viewState === 'orb' ? 24 : 18} className="relative z-10 text-white" style={{ filter: isPlaying ? `drop-shadow(0 0 8px ${currentTrack.color})` : 'none' }} />
             </motion.button>

             {viewState === 'pill' && (
               <motion.div initial={{ opacity: 0, x: -20, width: 0 }} animate={{ opacity: 1, x: 0, width: 'auto' }} exit={{ opacity: 0, x: -20, width: 0 }} className="bg-[#0c0a28]/80 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 min-w-[340px] shadow-2xl shadow-indigo-900/20">
                  <div className="flex-1 flex flex-col min-w-0 cursor-pointer" onClick={() => setViewState('full')}>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none" style={{ color: currentTrack.color }}>Live Signal</span>
                        {isPlaying && (
                          <div className="flex gap-0.5 items-end h-2">
                             {[...Array(3)].map((_, i) => (
                               <motion.div key={i} animate={{ height: [2, 8, 2] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} className="w-0.5 rounded-full" style={{ backgroundColor: currentTrack.color }} />
                             ))}
                          </div>
                        )}
                     </div>
                     <h4 className="text-sm font-bold text-white tracking-tight truncate max-w-[140px] mt-1">{currentTrack.title}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                     <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 transition-all">
                        {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
                     </button>
                     <button onClick={() => setIsMuted(!isMuted)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                        {isMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} />}
                     </button>
                     <button onClick={() => setViewState('orb')} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                        <ChevronLeft size={16} />
                     </button>
                  </div>
               </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
