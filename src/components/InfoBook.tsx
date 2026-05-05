import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, ChevronLeft, X } from 'lucide-react';

interface Page {
  title: string;
  content: string;
  image?: string;
}

const BOOK_PAGES: Page[] = [
  {
    title: "The Genesis",
    content: "Beginning as a vision for digital excellence, this portfolio represents the convergence of high-end aesthetics and technical precision. Every line of code is a brushstroke in the digital canvas.",
  },
  {
    title: "The Vision",
    content: "Crafting boutique experiences that defy conventional web standards. We don't just build websites; we architect digital dimensions where user experience meets editorial design.",
  },
  {
    title: "The Mastery",
    content: "From React and TypeScript to Three.js and Framer Motion. The toolkit is vast, the execution is surgical. We prioritize performance without compromising on visual splendor.",
  }
];

export const InfoBook: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % BOOK_PAGES.length);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + BOOK_PAGES.length) % BOOK_PAGES.length);

  return (
    <div className="relative flex flex-col items-center justify-center py-20">
      {/* Book Preview (Closed State) */}
      {!isOpen && (
        <motion.div
          whileHover={{ scale: 1.05, rotateY: -15 }}
          onClick={() => setIsOpen(true)}
          className="relative h-[400px] w-[300px] cursor-pointer rounded-r-lg bg-gradient-to-br from-purple-900 to-black shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 perspective-1000"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Spine */}
          <div className="absolute left-0 top-0 h-full w-8 bg-purple-950 rounded-l-sm border-r border-white/10 shadow-inner" />
          
          {/* Cover Content */}
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10">
              <BookOpen size={40} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-black tracking-[0.2em] text-white uppercase mb-2">The Archives</h2>
            <p className="text-[10px] tracking-widest text-white/40 uppercase">Journal of a Digital Architect</p>
          </div>

          {/* Page Edges */}
          <div className="absolute right-0 top-2 h-[calc(100%-16px)] w-2 bg-white/10 rounded-r-sm" />
        </motion.div>
      )}

      {/* Opened Book View */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-8"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
            >
              <X size={32} />
            </button>

            <div className="relative flex h-[600px] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              {/* Left Side (Image or Visual) */}
              <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-r border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[12rem] font-black text-white/5 select-none"
                >
                  0{currentPage + 1}
                </motion.div>
              </div>

              {/* Right Side (Content) */}
              <div className="w-full md:w-1/2 flex flex-col p-8 md:p-16 relative">
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.5em] text-purple-400 uppercase font-bold">Document {currentPage + 1}</span>
                  <div className="flex gap-2">
                    <button onClick={prevPage} className="p-2 text-white/30 hover:text-white transition-colors border border-white/10 rounded-full">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextPage} className="p-2 text-white/30 hover:text-white transition-colors border border-white/10 rounded-full">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="flex-1"
                  >
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight italic uppercase tracking-tighter">
                      {BOOK_PAGES[currentPage].title}
                    </h3>
                    <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                      {BOOK_PAGES[currentPage].content}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] tracking-widest text-white/30 uppercase">
                  <span>Digital Archives v1.0</span>
                  <span>Page {currentPage + 1} of {BOOK_PAGES.length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
