/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <BackgroundCanvas />
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <Navbar />
          <main>
            <Hero />
            
            <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-dark p-12 md:p-24 rounded-[3rem] text-center"
              >
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 tracking-tighter">
                  Engineering specifically for the <span className="text-neon-blue italic">Next Wave</span> of tech.
                </h2>
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                  I specialize in building full-stack applications with a focus on real-time data, 
                  AI integration, and high-fidelity 3D user interfaces. My goal is to create 
                  software that doesn't just work, but feels like an extension of the human mind.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  <div className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-white/60">TypeScript</div>
                  <div className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-white/60">React / Next.js</div>
                  <div className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-white/60">Three.js</div>
                  <div className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-white/60">Node.js</div>
                  <div className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-white/60">Python</div>
                </div>
              </motion.div>
            </section>

            <Skills />
            <Projects />
            <Contact />
          </main>
        </motion.div>
      )}

      {/* Background Decorative Gradients (Interactive) */}
      <InteractiveBackgroundGlows />
    </div>
  );
}

function InteractiveBackgroundGlows() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  useState(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <motion.div 
        style={{
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%'
        }}
        className="absolute w-[80vw] h-[80vw] bg-neon-purple/5 blur-[150px] rounded-full" 
      />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/20 blur-[120px] rounded-full" />
    </div>
  );
}
