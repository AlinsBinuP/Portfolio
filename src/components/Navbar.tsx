import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ABLogo } from './ABLogo';
import { Magnetic } from './Magnetic';

import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Works', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Labs', path: '/skills' },
  { label: 'History', path: '/education' }
];

const SOCIALS = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/alinsbinu' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/alinsbinu' },
  { icon: Twitter, label: 'Twitter', url: '#' }
];

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
        height: isScrolled ? '72px' : '96px',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.88)'
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-[20px] border-b border-black/5 flex items-center justify-between px-8 md:px-20"
    >
      <NavLink to="/" className="flex items-center gap-3 group">
        <span className="font-serif italic text-[22px] font-bold tracking-tight text-[#0a0a0a] group-hover:text-sky-700 transition-colors">Alins.</span>
      </NavLink>

      <div className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            className={({ isActive }) =>
              `relative text-[11px] font-mono font-bold tracking-[0.3em] uppercase transition-all py-1 overflow-hidden group
              ${isActive ? 'text-sky-700' : 'text-[#6b7280]'}`
            }
          >
            <div className="relative overflow-hidden h-[14px]">
               <div className="flex flex-col transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-[14px]">
                  <span>{link.label}</span>
                  <span className="text-sky-700">{link.label}</span>
               </div>
            </div>
          </NavLink>
        ))}
        
        <div className="h-4 w-[1px] bg-black/10 mx-2" />
        
        <div className="flex gap-4">
           {SOCIALS.map(social => (
             <motion.a 
               key={social.label}
               href={social.url}
               whileHover={{ scale: 1.1, y: -2 }}
               className="p-2 border border-black/5 rounded-full bg-black/[0.02] hover:bg-black hover:text-white transition-all duration-300"
             >
                <social.icon size={13} strokeWidth={2.5} />
             </motion.a>
           ))}
        </div>
      </div>

      <Magnetic strength={20}>
        <NavLink 
          to="/contact"
          className="bg-[#0a0a0a] text-white px-6 py-2.5 rounded-full font-mono font-bold text-[10px] tracking-widest uppercase hover:bg-sky-700 transition-all shadow-md"
        >
          Contact
        </NavLink>
      </Magnetic>
    </motion.nav>
  );
};

