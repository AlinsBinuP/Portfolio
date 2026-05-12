import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export const TRACKS = [
  { 
    title: 'Starboy', 
    artist: 'The Weeknd ft. Daft Punk', 
    url: '/The Weeknd - Starboy (Lyrics) ft. Daft Punk.mp3', 
    color: '#6366f1',
    cover: 'https://i.scdn.co/image/ab67616d0000b273471d6977ae067f18c57f2333'
  },
  { 
    title: 'Where We Started', 
    artist: 'Lost Sky ft. Jex', 
    url: '/Lost Sky - Where We Started (feat. Jex)  Melodic Dubstep  NCS - Copyright Free Music.mp3', 
    color: '#ec4899',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop'
  },
  { 
    title: 'Clocks', 
    artist: 'Coldplay', 
    url: '/@coldplay - Clocks (Lyrics).mp3', 
    color: '#06b6d4',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop'
  },
  { 
    title: 'Superhero', 
    artist: 'Unknown Brain ft. Chris Linton', 
    url: '/Unknown Brain - Superhero (feat. Chris Linton)  Trap  NCS - Copyright Free Music.mp3', 
    color: '#f97316',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop'
  }
];

interface MusicContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (index: number) => void;
  progress: number;
  seek: (percent: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  currentTrack: typeof TRACKS[0];
  TRACKS: typeof TRACKS;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Persistent instance outside React to avoid double-init in StrictMode
const globalAudio = new Audio();
globalAudio.autoplay = true;

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const audio = globalAudio;

  useEffect(() => {
    // Initial Track Setup
    audio.src = TRACKS[0].url;
    audio.muted = true; // Start muted to ensure autoplay works 100%
    
    const playAudio = () => {
      audio.play().catch(e => console.log("Autoplay blocked by browser policy"));
    };

    // Attempt immediately
    playAudio();

    // Interaction handler to unmute
    const handleInteraction = () => {
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => {});
      
      // Cleanup
      ['click', 'keydown', 'touchstart', 'scroll', 'wheel'].forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };

    ['click', 'keydown', 'touchstart', 'scroll', 'wheel'].forEach(event => {
      window.addEventListener(event, handleInteraction, { once: true });
    });

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => nextTrack();

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    const currentUrl = new URL(TRACKS[currentTrackIndex].url, window.location.origin).href;
    if (audio.src !== currentUrl) {
      audio.src = TRACKS[currentTrackIndex].url;
      if (isPlaying) {
        audio.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  const prevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  
  const seek = (percent: number) => {
    const time = (percent / 100) * audio.duration;
    audio.currentTime = time;
    setProgress(percent);
  };

  const currentTrack = TRACKS[currentTrackIndex];

  return (
    <MusicContext.Provider value={{
      isPlaying, setIsPlaying,
      isMuted, setIsMuted,
      currentTrackIndex, setCurrentTrackIndex,
      progress, seek,
      nextTrack, prevTrack,
      currentTrack,
      TRACKS
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within a MusicProvider');
  return context;
};
