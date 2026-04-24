import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface BentoCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  className, 
  children,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "glass glass-hover p-6 flex flex-col group overflow-hidden relative",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">
          {Icon ? <Icon className="w-4 h-4 inline-block mr-2 -mt-1" /> : null}
          {title}
        </span>
        
        {description && (
          <h3 className="text-xl font-semibold text-white leading-tight mb-2">
            {description}
          </h3>
        )}
      </div>
      
      <div className="mt-auto relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

