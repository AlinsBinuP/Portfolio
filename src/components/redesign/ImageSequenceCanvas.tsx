import React, { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, MotionValue, useSpring, motion } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
  className?: string;
}

const TOTAL_FRAMES = 252;
const IMAGE_DIR = '/processed-f-c-be-b-e-b-mp';

export const ImageSequenceCanvas: React.FC<Props> = ({ progress, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastFrameRef = useRef<number>(-1);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  // Performance-optimized spring settings
  const smoothProgress = useSpring(progress, {
    damping: 40,
    stiffness: 150,
    restDelta: 0.001
  });

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      let fileName = '';
      
      if (i < 91) {
        fileName = (i + 1).toString().padStart(4, '0') + '.jpg';
      } else {
        const abIndex = i - 90;
        fileName = `ab (${abIndex}).jpg`;
      }
      
      img.src = `${IMAGE_DIR}/${fileName}`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === TOTAL_FRAMES) {
          setAllLoaded(true);
        }
      };
      images[i] = img;
    }
    imagesRef.current = images;
  }, []);

  const drawImage = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !allLoaded) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const isAbSeries = frameIndex >= 91;
      let sy = 0;
      let sHeight = imgHeight;

      if (isAbSeries) {
        const cropAmount = imgHeight * 0.18; 
        sy = cropAmount;
        sHeight = imgHeight - (cropAmount * 2);
      }

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / sHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = sHeight * scale;
      const x = (canvasWidth - drawWidth) / 2;
      const y = (canvasHeight - drawHeight) / 2;

      // Restoring High-Quality Smoothing to prevent pixelation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, sy, imgWidth, sHeight, x, y, drawWidth, drawHeight);
      lastFrameRef.current = frameIndex;
    }
  };

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!allLoaded) return;
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1)))
    );
    
    if (frameIndex !== lastFrameRef.current) {
      requestAnimationFrame(() => drawImage(frameIndex));
    }
  });

  useEffect(() => {
    if (!allLoaded) return;
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.2); // Ultra-optimized for zero lag

        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        const currentFrame = Math.floor(smoothProgress.get() * (TOTAL_FRAMES - 1));
        drawImage(currentFrame);
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [smoothProgress, allLoaded]);

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {!allLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/10 backdrop-blur-3xl transition-opacity duration-500">
          <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${(imagesLoaded / TOTAL_FRAMES) * 100}%` }}
               className="h-full bg-indigo-600"
             />
          </div>
          <span className="text-[10px] font-black text-indigo-600 mt-4 uppercase tracking-[0.4em]">Finalizing Visuals {Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ 
          display: allLoaded ? 'block' : 'none',
          imageRendering: 'auto', // Back to smooth rendering
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)'
        }}
      />
    </div>
  );
};

export default ImageSequenceCanvas;
