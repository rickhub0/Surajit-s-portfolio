import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'Benglishify',
    description: 'An advanced AI-powered translator specifically designed for Bengali-English transliteration and contextual translation.',
    tags: ['AI', 'React', 'NLP'],
    github: 'https://github.com/royrk3369',
  },
  {
    title: 'ReelsSaver Pro',
    description: 'High-performance media extractor for various social platforms with built-in compression and batch downloading.',
    tags: ['Next.js', 'Automation', 'API'],
  },
  {
    title: 'Clickors ecosystem',
    description: 'A comprehensive suite of tools for digital marketers and content creators to manage cross-platform presence.',
    tags: ['SaaS', 'Fullstack', 'Scale'],
  },
  {
    title: 'Clickors VPN',
    description: 'Privacy-first VPN service with decentralized nodes and military-grade encryption for secure browsing.',
    tags: ['Cybersecurity', 'Go', 'Networking'],
  },
  {
    title: 'NightFlow Neural OS',
    description: 'Experimental desktop OS interface concept built with neural design principles and immersive glassmorphism.',
    tags: ['UI/UX', 'Design', 'OS'],
  },
  {
    title: 'AI Multi-Agent System',
    description: 'Coordinated swarm of AI agents working together to solve complex reasoning tasks and automate workflows.',
    tags: ['AI Swarm', 'Python', 'Intelligence'],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
      <div className="mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-neon-purple text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
        >
          Selected Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-8"
        >
          Creative <br /> <span className="text-neon-blue italic">Explorations.</span>
        </motion.h2>

        <div className="flex gap-4 items-center mb-16">
             <div className="h-px flex-1 bg-gradient-to-r from-neon-blue/50 to-transparent" />
             <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_#3b82f6]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
