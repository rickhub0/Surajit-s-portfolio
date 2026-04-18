import { motion } from 'motion/react';
import { Github, Instagram, Mail, MessageSquare } from 'lucide-react';

export function Contact() {
  return (
    <footer id="contact" className="py-24 px-6 md:px-12 relative z-10 max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="glass-dark rounded-[3rem] p-12 md:p-24 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple" />
        
        <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 tracking-tighter">
          Let's Build Something <br /> <span className="text-gradient">Legendary.</span>
        </h2>
        
        <p className="text-gray-400 max-w-xl mx-auto mb-12 font-light">
          Currently taking on new projects and architectural challenges.
          Reach out for collaborations or just to say hi.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="mailto:suosoumyajit@gmail.com"
            className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105"
          >
            <Mail size={18} />
            Email Me
          </a>
          <a
            href="https://github.com/royrk3369"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-8 py-3 glass rounded-full font-bold text-white hover:bg-white/10 transition-all hover:scale-105"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">
            © 2026 SURAJIT DAS • ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/royrk3369" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
