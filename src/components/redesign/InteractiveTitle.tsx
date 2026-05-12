import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveTitleProps {
  text: string;
  highlight?: string;
  className?: string;
  isGradient?: boolean;
  color?: string;
  gradient?: 'purple-pink' | 'blue-cyan' | 'orange-red' | 'blue-teal' | 'indigo-violet' | 'purple-blue' | 'cyan-teal' | 'yellow-orange' | 'green-yellow' | 'blue-indigo' | 'rose-pink' | 'ocean-blue';
}

const GRADIENTS = {
  'purple-pink': 'from-[#8b5cf6] to-[#ec4899]',
  'blue-cyan': 'from-[#3b82f6] to-[#06b6d4]',
  'orange-red': 'from-[#f97316] to-[#ef4444]',
  'blue-teal': 'from-[#2563eb] to-[#14b8a6]',
  'indigo-violet': 'from-[#6366f1] to-[#8b5cf6]',
  'purple-blue': 'from-[#a855f7] to-[#3b82f6]',
  'cyan-teal': 'from-[#06b6d4] to-[#14b8a6]',
  'yellow-orange': 'from-[#facc15] to-[#f97316]',
  'green-yellow': 'from-[#22c55e] to-[#eab308]',
  'blue-indigo': 'from-[#2563eb] to-[#4f46e5]',
  'rose-pink': 'from-[#f43f5e] to-[#fb7185]',
  'ocean-blue': 'from-[#0ea5e9] to-[#2563eb]'
};

export const InteractiveTitle: React.FC<InteractiveTitleProps> = ({ 
  text, 
  highlight, 
  className = "", 
  isGradient = true, 
  color = "#0c0a28",
  gradient = 'purple-pink'
}) => {
  const [hoveredWordIndex, setHoveredWordIndex] = React.useState<number | null>(null);
  const [hoveredCharIndex, setHoveredCharIndex] = React.useState<number | null>(null);
  
  const words = text.split(" ");
  const highlightWords = highlight ? highlight.toUpperCase().split(" ") : [];
  const gradientClasses = GRADIENTS[gradient] || GRADIENTS['purple-pink'];

  let globalCharCount = 0;

  // Group adjacent highlighted words
  const groupedElements: { type: 'plain' | 'gradient', words: string[], originalIndex: number }[] = [];
  
  words.forEach((word, index) => {
    const isHighlighted = highlightWords.some(hw => word.toUpperCase().includes(hw));
    const lastElement = groupedElements[groupedElements.length - 1];

    if (isHighlighted && isGradient) {
      if (lastElement && lastElement.type === 'gradient') {
        lastElement.words.push(word);
      } else {
        groupedElements.push({ type: 'gradient', words: [word], originalIndex: index });
      }
    } else {
      groupedElements.push({ type: 'plain', words: [word], originalIndex: index });
    }
  });

  return (
    <div className={`flex flex-wrap gap-x-[0.3em] gap-y-2 ${className}`}>
      {groupedElements.map((element, groupIndex) => {
        if (element.type === 'gradient') {
          const phrase = element.words.join(" ");
          return (
            <motion.span
              key={`group-${groupIndex}`}
              onMouseEnter={() => setHoveredWordIndex(groupIndex)}
              onMouseLeave={() => setHoveredWordIndex(null)}
              animate={{
                scale: hoveredWordIndex === groupIndex ? 1.1 : 1,
                y: hoveredWordIndex === groupIndex ? -5 : 0,
              }}
              className={`inline-block pb-1 px-1 bg-gradient-to-r ${gradientClasses} bg-clip-text text-transparent select-none cursor-default`}
            >
              {phrase}
            </motion.span>
          );
        }

        const word = element.words[0];
        const chars = word.split("");
        return (
          <span key={`word-plain-${element.originalIndex}`} className="inline-flex">
            {chars.map((char, charIndex) => {
              const currentIndex = globalCharCount++;
              return (
                <motion.span
                  key={`${element.originalIndex}-${charIndex}`}
                  onMouseEnter={() => setHoveredCharIndex(currentIndex)}
                  onMouseLeave={() => setHoveredCharIndex(null)}
                  animate={{
                    scale: hoveredCharIndex === currentIndex ? 1.4 : 1,
                    y: hoveredCharIndex === currentIndex ? -10 : 0,
                    rotate: hoveredCharIndex === currentIndex ? (currentIndex % 2 === 0 ? 10 : -10) : 0,
                    color: hoveredCharIndex === currentIndex ? "#6366f1" : color,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 12,
                    mass: 0.8
                  }}
                  className="inline-block cursor-default select-none"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};
