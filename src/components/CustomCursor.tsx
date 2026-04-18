import { motion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 20, stiffness: 100 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"]'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          scale: isHovering ? 2 : 1,
        }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
      >
        <div className="w-full h-full border border-neon-blue/30 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-[2px]">
           <div className="w-1 h-1 bg-white shadow-[0_0_10px_white] rounded-full" />
        </div>
      </motion.div>
      
      {/* Bloom Trail */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 3 : 1.5,
        }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] hidden md:block opacity-20"
      >
        <div className="w-full h-full bg-neon-purple blur-[20px] rounded-full" />
      </motion.div>
    </>
  );
}
