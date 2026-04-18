import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export function ProjectCard({ title, description, tags, link, github, image }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['20deg', '-20deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-20deg', '20deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 45px rgba(168, 85, 247, 0.6)',
        borderColor: 'rgba(168, 85, 247, 0.8)'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full h-full rounded-3xl group h-[400px]",
        "glass-dark p-8 flex flex-col justify-between"
      )}
    >
      <div style={{ transform: 'translateZ(50px)' }} className="mb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {github && (
              <a href={github} className="text-gray-400 hover:text-white transition-colors">
                <Github size={18} />
              </a>
            )}
            {link && (
              <a href={link} className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
          {title}
        </h3>
        <p className="text-base text-gray-400/90 leading-relaxed font-light">
          {description}
        </p>
      </div>

      <div style={{ transform: 'translateZ(30px)' }} className="relative mt-4 h-full flex items-end">
         <div className="w-full h-1 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-full" />
      </div>

      {/* Decorative Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10" />
    </motion.div>
  );
}
