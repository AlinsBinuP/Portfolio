import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy } from 'lucide-react';

const ICONS = [
  { name: 'flutter', pos: '0% 0%' },
  { name: 'firebase', pos: '20% 0%' },
  { name: 'react', pos: '40% 0%' },
  { name: 'typescript', pos: '60% 0%' },
  { name: 'python', pos: '80% 0%' },
  { name: 'threejs', pos: '100% 0%' }
];

export const TechMemoryGame = () => {
  const [cards, setCards] = useState<{ id: number; name: string; pos: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  const initGame = () => {
    const deck = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        name: icon.name,
        pos: icon.pos,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlipped([]);
    setMatches(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleFlip = (id: number) => {
    setCards(prev => {
      const currentCards = [...prev];
      if (flipped.length === 2 || currentCards[id].isFlipped || currentCards[id].isMatched) return prev;

      const newCards = [...currentCards];
      newCards[id].isFlipped = true;

      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        const [first, second] = newFlipped;
        if (newCards[first].name === newCards[second].name) {
          setTimeout(() => {
            setCards(innerPrev => {
              const matchedCards = [...innerPrev];
              matchedCards[first].isMatched = true;
              matchedCards[second].isMatched = true;
              return matchedCards;
            });
            setFlipped([]);
            setMatches(m => m + 1);
          }, 500);
        } else {
          setTimeout(() => {
            setCards(innerPrev => {
              const resetCards = [...innerPrev];
              resetCards[first].isFlipped = false;
              resetCards[second].isFlipped = false;
              return resetCards;
            });
            setFlipped([]);
          }, 1000);
        }
      }
      return newCards;
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Memory Lab</span>
          <span className="text-[12px] font-bold text-[#0c0a28]">{matches === ICONS.length ? 'System Optimized!' : `Matches: ${matches}/${ICONS.length}`}</span>
        </div>
        <button onClick={initGame} className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-indigo-600 transition-colors">
          <RefreshCw size={14} className={flipped.length === 0 && matches === 0 ? '' : 'animate-spin-slow'} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05, rotateY: card.isFlipped || card.isMatched ? 180 : 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFlip(card.id)}
            className={`aspect-square rounded-2xl cursor-pointer relative transition-all duration-700 [transform-style:preserve-3d] ${
              card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''
            }`}
          >
            {/* Front (Hidden state) */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-white border border-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center [backface-visibility:hidden] overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
               <div className="w-8 h-8 rounded-full bg-white/80 border border-indigo-100 flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 animate-pulse" />
               </div>
            </div>

            {/* Back (Icon revealed) */}
            <div className={`absolute inset-0 rounded-2xl bg-white border flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] ${
              card.isMatched 
                ? 'border-emerald-200 shadow-[0_0_25px_rgba(52,211,153,0.2)]' 
                : 'border-indigo-100 shadow-[0_15px_35px_rgba(99,102,241,0.1)]'
            }`}>
               {/* Inner Glow */}
               <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                 card.isMatched ? 'bg-emerald-50/30' : 'bg-gradient-to-tr from-indigo-50/20 to-transparent'
               }`} />
               
               <div 
                 style={{ 
                   backgroundImage: 'url(/memory_game_icons.png)',
                   backgroundPosition: card.pos,
                   backgroundSize: '600% 100%'
                 }}
                 className={`w-12 h-12 relative z-10 transition-all duration-500 ${card.isMatched ? 'scale-110 rotate-0' : 'scale-100 -rotate-6'}`}
               />
            </div>
          </motion.div>

        ))}
      </div>
    </div>
  );
};

