import React, { useEffect, useRef } from 'react';

export const ScrollPhoto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const midRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const hero = document.getElementById('hero-section');
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5);
      targetY = (e.clientY / window.innerHeight - 0.5);
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = () => {
      // Smooth mouse lerp (butter smooth 60fps)
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      // Calculate progress through the pinned 400vh section
      let progress = 0;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const scrollDistance = rect.height - window.innerHeight;
        if (scrollDistance > 0) {
          progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
        }
      }

      // Base Layer (alinsbinuimg.jpg) - Anchored, slow zoom
      if (bgRef.current) {
        // Zoom slightly and drift up organically
        const scale = 1 + (progress * 0.1); 
        const translateY = -(progress * 20); 
        bgRef.current.style.transform = `scale(${scale}) translate(${currentX * -10}px, ${translateY + (currentY * -10)}px)`;
        bgRef.current.style.opacity = "1";
      }

      // Midground Layer (1cr.png) - Medium separation
      if (midRef.current) {
        const scale = 1 + (progress * 0.25); 
        const translateY = -(progress * 40); 
        midRef.current.style.transform = `scale(${scale}) translate(${currentX * -25}px, ${translateY + (currentY * -20)}px)`;
        midRef.current.style.opacity = "1";
      }

      // Foreground Layer (2cr.png) - Extreme separation, flying through
      if (fgRef.current) {
        const scale = 1 + (progress * 0.6); 
        const translateY = -(progress * 80); 
        // Foreground moves WITH the mouse to maximize depth perception against background
        fgRef.current.style.transform = `scale(${scale}) translate(${currentX * 25}px, ${translateY + (currentY * 30)}px)`;
        fgRef.current.style.opacity = "1";
      }

      const nameLayer = document.querySelector('.name-layer') as HTMLElement;
      if (nameLayer) {
        nameLayer.style.transform = `translate(${currentX * 15}px, ${currentY * 10 - (progress * 150)}px)`;
        nameLayer.style.opacity = (1 - progress * 1.5).toString();
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="hero-photo absolute right-0 bottom-0 z-[5] pointer-events-none"
      style={{
        width: '48%',
        height: '95vh',
        overflow: 'hidden',
        borderRadius: 0,
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 80%, transparent 100%), linear-gradient(to top, transparent 0%, black 20%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 80%, transparent 100%), linear-gradient(to top, transparent 0%, black 20%)',
        WebkitMaskComposite: 'source-in',
        maskComposite: 'intersect',
      }}
    >
      <style>{`
        @keyframes photoReveal {
          from { opacity: 0; filter: blur(12px) brightness(1.2); }
          to { opacity: 1; filter: blur(0) brightness(1); }
        }
        .hero-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transform-origin: center 30%;
          will-change: transform;
          animation: photoReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
        }
      `}</style>

      {/* Base Background Layer */}
      <img ref={bgRef} src="/alinsbinuimg.jpg" alt="Background Layer" className="hero-layer z-0" />
      
      {/* Midground Element Layer */}
      <img ref={midRef} src="/1cr.png" alt="Midground Layer" className="hero-layer z-10" />

      {/* Extreme Foreground Layer */}
      <img ref={fgRef} src="/2cr.png" alt="Foreground Layer" className="hero-layer z-20" />
    </div>
  );
};
