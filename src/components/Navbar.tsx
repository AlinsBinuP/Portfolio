import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ABLogo } from './ABLogo';
import { Magnetic } from './Magnetic';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Education', path: '/education' },
  { name: 'Contact', path: '/contact' }
];

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 -translate-x-1/2 w-[min(94%,1200px)] z-50 h-20 cinematic-glass flex items-center justify-between px-10 border-white/5"
    >
      <NavLink to="/" className="flex items-center gap-3 group">
        <Magnetic strength={10}>
          <ABLogo size={36} inverted={true} />
        </Magnetic>
      </NavLink>

      <div className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <Magnetic key={link.name} strength={10}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `relative text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7dd3fc] shadow-[0_0_6px_#38bdf8]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.name}
                </>
              )}
            </NavLink>
          </Magnetic>
        ))}
      </div>

      <Magnetic strength={20}>
        <NavLink 
          to="/contact"
          className="bg-white text-midnight px-8 py-3.5 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-sky-blue-glow transition-all"
        >
          Hire Me →
        </NavLink>
      </Magnetic>
    </motion.nav>
  );
};

