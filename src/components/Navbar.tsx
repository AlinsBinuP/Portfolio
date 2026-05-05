import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ABLogo } from './ABLogo';
import { Magnetic } from './Magnetic';

import { Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Works', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Labs', path: '/skills' },
  { label: 'History', path: '/education' }
];

const SOCIALS = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/AlinsBinuP' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/alinsbinu/' },
  { icon: Mail, label: 'Email', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=alinsbinukochuthovala@gmail.com' }
];

export const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
        height: isScrolled ? '64px' : '88px',
        backgroundColor: isScrolled ? 'var(--glass-bg)' : 'transparent'
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-[12px] border-b border-[var(--glass-border)] flex items-center justify-between px-8 md:px-20"
    >
      <Magnetic strength={20}>
        <NavLink to="/" className="flex items-center gap-3 group">
          <span className="font-display font-black text-[24px] tracking-tighter text-[var(--text-primary)] uppercase transition-all duration-500">Alins Binu</span>
        </NavLink>
      </Magnetic>

      <div className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            className={({ isActive }) =>
              `relative text-[11px] font-mono font-bold tracking-[0.2em] transition-all py-1 overflow-hidden group uppercase
              ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`
            }
          >
            <div className="relative overflow-hidden h-[18px]">
               <div className="flex flex-col transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-[18px]">
                  <span>{link.label}</span>
                  <span className="text-[var(--accent-primary)]">{link.label}</span>
               </div>
            </div>
          </NavLink>
        ))}
        
        <div className="h-4 w-[1px] bg-[var(--glass-border)] mx-2" />
        
        <div className="flex gap-4">
           {SOCIALS.map(social => (
             <motion.a 
               key={social.label}
               href={social.url}
               whileHover={{ scale: 1.1, y: -2 }}
               className="p-2 border border-[var(--glass-border)] rounded-full bg-[var(--text-primary)]/5 hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 text-[var(--text-primary)]"
             >
                <social.icon size={13} strokeWidth={2.5} />
             </motion.a>
           ))}
        </div>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all shadow-sm"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </motion.button>
      </div>

      <Magnetic strength={20}>
        <NavLink 
          to="/contact"
          className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-2.5 rounded-full font-mono font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-lg"
        >
          CONNECT
        </NavLink>
      </Magnetic>

      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent origin-center"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />
    </motion.nav>
  );
};
