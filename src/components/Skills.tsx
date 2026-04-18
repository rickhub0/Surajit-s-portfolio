import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Code2, Cpu, Globe2, Layout, Sparkles, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const skills = [
  { name: 'Backend', icon: Terminal, color: 'text-neon-purple', glow: 'rgba(168, 85, 247, 0.4)' },
  { name: 'Frontend', icon: Layout, color: 'text-neon-blue', glow: 'rgba(59, 130, 246, 0.4)' },
  { name: 'AI Models', icon: Cpu, color: 'text-purple-400', glow: 'rgba(192, 132, 252, 0.4)' },
  { name: 'Architecture', icon: Code2, color: 'text-blue-400', glow: 'rgba(96, 165, 250, 0.4)' },
  { name: 'Cloud', icon: Globe2, color: 'text-cyan-400', glow: 'rgba(34, 211, 238, 0.4)' },
  { name: 'Experience', icon: Sparkles, color: 'text-yellow-400', glow: 'rgba(250, 204, 21, 0.4)' },
];

function SkillCard({ name, icon: Icon, color, glow, index }: typeof skills[0] & { index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 200 });
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 200 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 0 40px ${glow.replace('0.4', '0.2')}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative glass-dark p-8 rounded-xl border border-white/5 group transition-colors cursor-pointer overflow-hidden"
    >
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      {/* Item Index (Technical Label) */}
      <div className="absolute top-4 left-6 flex items-baseline gap-2">
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-tighter">Module</span>
        <span className="font-mono text-[10px] text-white/40">0{index + 1}</span>
      </div>

      {/* Decorative Corner Brackets */}
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10 group-hover:border-neon-blue/40 transition-colors" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10 group-hover:border-neon-purple/40 transition-colors" />

      <div className="flex flex-col items-center justify-center py-6">
        <div 
          style={{ transform: 'translateZ(60px)' }}
          className={cn(color, "mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]")}
        >
          <Icon size={48} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500 ease-out" />
        </div>
        
        <h4 
          style={{ transform: 'translateZ(30px)' }}
          className="text-white font-display text-lg font-bold tracking-tight uppercase"
        >
          {name}
        </h4>
        
        <div 
           style={{ transform: 'translateZ(10px)' }}
           className="mt-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
        >
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className={cn("w-3 h-1 rounded-full bg-white/10", i < 4 && "bg-gradient-to-r from-neon-purple to-neon-blue")} />
           ))}
        </div>
      </div>
      
      {/* Bloom Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10" 
      />
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/3">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-neon-blue text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Technical Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tighter leading-[0.9]"
          >
            Core Competencies & <span className="text-neon-purple italic">Specializations.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 text-lg leading-relaxed font-light mb-8"
          >
            I architect digital ecosystems where performance meets aesthetic precision. 
            Leveraging AI and modern cloud infrastructure to build the next generation 
            of intelligent web experiences.
          </motion.p>
          
          <div className="flex gap-4 items-center py-4">
             <div className="h-px flex-1 bg-gradient-to-r from-neon-purple/50 to-transparent" />
             <div className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_10px_#a855f7]" />
          </div>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
