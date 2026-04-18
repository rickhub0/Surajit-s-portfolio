import { motion } from 'motion/react';
import { Github, Instagram, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-display font-bold text-white tracking-tighter"
      >
        SUR<span className="text-neon-purple text-3xl">.</span>AJIT
      </motion.div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center glass-dark px-8 py-3 rounded-full">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="hidden md:flex gap-4 items-center">
        <a href="https://github.com/royrk3369" target="_blank" rel="noreferrer" className="p-2 glass rounded-full hover:bg-white/10 transition-all">
          <Github size={20} />
        </a>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-6 right-6 glass-dark rounded-2xl p-8 flex flex-col gap-6 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-display text-gray-300 border-b border-white/5 pb-2"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-4 pt-4">
            <a href="https://github.com/royrk3369" target="_blank" rel="noreferrer" className="text-gray-300">
              <Github />
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
