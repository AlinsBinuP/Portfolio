import React, { useEffect, useRef, useState } from 'react';

export const ScrollPhoto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const midRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDistance = window.innerHeight * 0.8;
      const progress = Math.max(0, Math.min(1, scrollY / scrollDistance));

      // Layer 1: Background (alinsbinuimg.jpg) - Base layer, slow zoom
      if (bgRef.current) {
        const scale = 1 + (progress * 0.1);
        const yOffset = -(progress * 50);
        bgRef.current.style.transform = `scale(${scale}) translateY(${yOffset}px)`;
      }

      // Layer 2: Midground (1cr.png) - Medium parallax
      if (midRef.current) {
        const scale = 1 + (progress * 0.25);
        const yOffset = -(progress * 120); // Faster than bg
        midRef.current.style.transform = `scale(${scale}) translateY(${yOffset}px)`;
      }

      // Layer 3: Foreground (2cr.png) - Extreme parallax
      if (fgRef.current) {
        const scale = 1 + (progress * 0.5);
        const yOffset = -(progress * 250); // Fastest layer
        fgRef.current.style.transform = `scale(${scale}) translateY(${yOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="hero-photo absolute right-0 bottom-0 z-[5] pointer-events-none group"
      style={{
        width: '60%',
        height: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 60% 40%, rgba(168, 85, 247, 0.1) 0%, transparent 80%)',
        // High-end mask for edge smoothening and blending
        WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black 30%, transparent 90%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
        maskImage: 'radial-gradient(ellipse at 70% 40%, black 30%, transparent 90%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
        WebkitMaskComposite: 'source-in',
        maskComposite: 'intersect',
      }}
    >
      {/* Layer 1: Background */}
      <img 
        ref={bgRef}
        src="/alinsbinuimg.jpg" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover brightness-[1.2] contrast-[1.1] transition-transform duration-75 ease-out"
        style={{ transformOrigin: 'center 30%', objectPosition: 'center 20%' }}
      />
      
      {/* Layer 2: Midground */}
      <img 
        ref={midRef}
        src="/1cr.png" 
        alt="Midground" 
        className="absolute inset-0 w-full h-full object-cover brightness-[1.15] contrast-[1.2] transition-transform duration-75 ease-out"
        style={{ transformOrigin: 'center 30%', objectPosition: 'center 20%', filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.8))' }}
      />

      {/* Layer 3: Foreground */}
      <img 
        ref={fgRef}
        src="/2cr.png" 
        alt="Foreground" 
        className="absolute inset-0 w-full h-full object-cover brightness-[1.1] contrast-[1.3] transition-transform duration-75 ease-out"
        style={{ transformOrigin: 'center 30%', objectPosition: 'center 20%', filter: 'drop-shadow(0 0 50px rgba(0,0,0,0.9))' }}
      />

      {/* Technical Overlays - Purple Theme */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between p-12 mix-blend-overlay opacity-60">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="mono-label text-purple-400 font-bold tracking-widest">SCAN_REF // 099-B</span>
            <span className="mono-label text-[7px] text-white/40">SENSOR_MULTI_LAYER</span>
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="w-12 h-0.5 bg-purple-500/50" />
             <span className="mono-label text-[8px]">DEPTH_SYNC // ACTIVE</span>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="mono-label text-[7px]">CAPTURE_POINT: 09.28.76.31</span>
            <span className="mono-label text-[7px] text-purple-400">COORD_Z: 142.09</span>
          </div>
          <div className="w-8 h-8 border-r border-b border-purple-500/30" />
        </div>
      </div>
      
      {/* Cinematic Blending Overlays */}
      <div className="absolute inset-0 z-25 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 z-25 bg-gradient-to-r from-[#030303] via-[#030303]/20 to-transparent opacity-60" />
    </div>
  );
};
