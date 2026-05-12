/**
 * InteractiveTitle.tsx
 * Required by Skills.tsx — renders large title with gradient highlight on a word.
 * Place in src/components/redesign/InteractiveTitle.tsx
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Gradient = 'purple-pink' | 'blue-cyan' | 'orange-red';

const GRADIENTS: Record<Gradient, string> = {
  'purple-pink': 'linear-gradient(135deg, #7c3aed, #ec4899)',
  'blue-cyan':   'linear-gradient(135deg, #2563eb, #06b6d4)',
  'orange-red':  'linear-gradient(135deg, #f97316, #ef4444)',
};

interface Props {
  text: string;
  highlight: string;
  gradient?: Gradient;
  className?: string;
}

export const InteractiveTitle = ({ text, highlight, gradient = 'purple-pink', className = '' }: Props) => {
  const [hovered, setHovered] = useState(false);
  const parts = text.split(highlight);

  return (
    <h1 className={className} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {parts[0]}
      <motion.span
        animate={{ letterSpacing: hovered ? '0.02em' : '0em' }}
        transition={{ duration: 0.3 }}
        style={{ background: GRADIENTS[gradient], WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
      >
        {highlight}
      </motion.span>
      {parts[1]}
    </h1>
  );
};
