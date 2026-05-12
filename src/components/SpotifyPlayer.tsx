import React from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';

export const SpotifyPlayer = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full bg-[#121212] rounded-[32px] p-6 shadow-2xl relative overflow-hidden group"
    >
      {/* Spotify Header */}
      <div className="flex items-center justify-between mb-6 px-2">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1DB954]/10 flex items-center justify-center">
               <Music size={16} className="text-[#1DB954]" />
            </div>
            <span className="text-[10px] font-black text-[#b3b3b3] uppercase tracking-[0.4em]">Official Player</span>
         </div>
         <a 
           href="https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM3M" 
           target="_blank" 
           rel="noopener noreferrer"
           className="text-[#b3b3b3] hover:text-[#1DB954] transition-colors"
         >
            <ExternalLink size={16} />
         </a>
      </div>

      {/* Spotify Official Embed */}
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-black/40 border border-white/5">
         <iframe 
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM3M?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen={false} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
         ></iframe>
      </div>

      {/* Footer Branding */}
      <div className="mt-6 flex items-center justify-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
         <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
         <span className="text-[9px] font-bold text-white uppercase tracking-widest">Powered by Spotify</span>
      </div>

      {/* Background Bloom */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1DB954] opacity-5 blur-[80px] pointer-events-none" />
    </motion.div>
  );
};
