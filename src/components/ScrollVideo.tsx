import React, { useEffect, useRef } from 'react';

export const ScrollVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection || !videoRef.current) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = heroSection.getBoundingClientRect();
          // Total scroll distance before the element leaves
          const scrollDistance = rect.height - window.innerHeight;
          
          let progress = 0;
          if (scrollDistance > 0) {
            // How far we have scrolled past the top of the element
            progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
          }

          if (videoRef.current && videoRef.current.duration) {
            // Scrub the video by setting currentTime based on progress
            // We use a slight ease or just direct mapping
            videoRef.current.currentTime = videoRef.current.duration * progress;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleLoadedMetadata = () => handleScroll();
    videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  return (
    <div 
      className="hero-video absolute right-0 bottom-0 z-[5] pointer-events-none"
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
      <video
        ref={videoRef}
        src="/alins-portrait.mp4"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{
          objectPosition: 'center top',
        }}
      />
    </div>
  );
};
