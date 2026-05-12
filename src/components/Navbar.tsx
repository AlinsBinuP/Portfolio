import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { ABLogo } from './ABLogo';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Arsenal', path: '/skills' },
  { label: 'History', path: '/education' },
  { label: 'Contact', path: '/contact' }
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
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent'
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-[12px] border-b border-[var(--glass-border)] flex items-center justify-between px-8 md:px-20"
    >
      <Magnetic strength={20}>
        <NavLink to="/" className="flex items-center gap-3 group">
          <ABLogo size={36} />
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-[16px] tracking-tighter text-[#0c0a28] uppercase">ALINS</span>
            <span className="font-display font-black text-[16px] tracking-tighter text-[#0c0a28] uppercase opacity-40">BINU</span>
          </div>
        </NavLink>
      </Magnetic>

      <div className="hidden lg:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            onMouseEnter={() => {
              // Warm up the lazy component
              if (link.path === '/about') import('../pages/About');
              if (link.path === '/skills') import('../pages/Skills');
              if (link.path === '/projects') import('../pages/Projects');
            }}
            className={({ isActive }) =>
              `relative text-[11px] font-black tracking-[0.15em] transition-all py-1 overflow-hidden group uppercase
              ${isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-[#0c0a28]'}`
            }
          >
            {link.label}
            {/* Active indicator */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-indigo-600 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: link.path === window.location.pathname ? 1 : 0 }}
            />
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <motion.button
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 rounded-full bg-gray-50 border border-gray-100 text-[#0c0a28] hover:border-indigo-600 transition-all shadow-sm"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </motion.button>

        <Magnetic strength={20}>
          <NavLink
            to="/contact"
            className="bg-[#0c0a28] text-white px-8 py-3 rounded-xl font-black text-[10px] tracking-[0.1em] uppercase flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
          >
            Let's Connect <ArrowRight size={14} />
          </NavLink>
        </Magnetic>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-indigo-600 origin-left"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />
    </motion.nav>
  );
};
