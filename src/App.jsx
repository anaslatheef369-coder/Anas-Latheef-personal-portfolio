import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Code, Mail, ArrowRight, ExternalLink, Code2, Database, Layout, Terminal } from 'lucide-react';
import { GlassCard } from './components/GlassCard';
import { StatusBadge } from './components/StatusBadge';
import { Button } from './components/Button';
import { cn } from './lib/utils';

const DockNav = () => (
  <motion.div 
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1, duration: 0.5 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl"
  >
    {['Home', 'Skills', 'Work', 'Experience'].map((item) => (
      <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-text-muted hover:text-white transition-colors">
        {item}
      </a>
    ))}
  </motion.div>
);

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-20">
      <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay"></div>
      
      {/* Abstract background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-gradient/20 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatusBadge className="mb-6" />
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
            Crafting <span className="text-gradient">Next-Gen</span> <br />
            Digital Experiences.
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-text-muted max-w-2xl leading-relaxed"
        >
          Lead UI/UX Designer & Frontend Engineer specializing in award-winning, highly polished web architectures and bento grid interfaces.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <Button variant="primary">
            View My Work <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="secondary">
            <Mail className="mr-2 h-4 w-4" /> Let's Talk
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const SkillsBento = () => (
  <section id="skills" className="py-24 relative z-10">
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Core <span className="text-gradient">Architecture</span></h2>
      <p className="text-text-muted">The technologies and frameworks I use to build.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
      <GlassCard className="md:col-span-2 flex flex-col justify-between group">
        <div>
          <Layout className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Frontend Engineering</h3>
          <p className="text-text-muted">React, Next.js, Vite, Tailwind CSS, Framer Motion, and Three.js for immersive 3D experiences.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['React', 'Next.js', 'Tailwind', 'Framer'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono">{tag}</span>
          ))}
        </div>
      </GlassCard>
      
      <GlassCard className="flex flex-col justify-between bg-primary/5">
        <div>
          <Code2 className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
          <p className="text-text-muted text-sm">Figma, Prototyping, Wireframing, and Design Systems.</p>
        </div>
      </GlassCard>

      <GlassCard className="flex flex-col justify-between">
        <div>
          <Database className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Backend Integration</h3>
          <p className="text-text-muted text-sm">Node.js, PostgreSQL, RESTful APIs, GraphQL.</p>
        </div>
      </GlassCard>

      <GlassCard className="md:col-span-2 flex flex-col justify-between overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/10 pointer-events-none" />
        <div className="relative z-10">
          <Terminal className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Performance Optimization</h3>
          <p className="text-text-muted">99+ Lighthouse Scores, Web Vitals, SSR/SSG, Code Splitting.</p>
        </div>
      </GlassCard>
    </div>
  </section>
);

const Projects = () => {
  const projects = [
    { title: "Data Pipeline Dashboard", desc: "Real-time analytics interface with glowing bento layouts.", img: "/legacy/project_kpi_dashboard.png" },
    { title: "Wealthsync Finance", desc: "Fintech web app featuring secure data visualization.", img: "/legacy/project_wealthsync.png" },
    { title: "Fleet Routing System", desc: "Interactive mapping and real-time logistics tracking.", img: "/legacy/project_fleet_routing.png" }
  ];

  return (
    <section id="work" className="py-24 relative z-10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Selected <span className="text-gradient">Works</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <GlassCard key={i} className="group p-0" glow={false}>
            <div className="h-48 overflow-hidden bg-white/5 relative">
              <img src={proj.img} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas to-transparent opacity-80"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{proj.title}</h3>
              <p className="text-text-muted text-sm mb-4">{proj.desc}</p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-white hover:text-primary transition-colors">
                View Case Study <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24 relative z-10 border-t border-border mt-24 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
    
    <div className="text-center max-w-2xl mx-auto space-y-8">
      <h2 className="text-4xl md:text-5xl font-bold">Let's Build <span className="text-gradient">Together</span></h2>
      <p className="text-text-muted">Currently open for new opportunities and freelance projects. Let's create something extraordinary.</p>
      
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="primary" onClick={() => navigator.clipboard.writeText('hello@example.com')}>
          <Mail className="mr-2 h-4 w-4" /> Copy Email
        </Button>
      </div>

      <div className="flex justify-center gap-6 pt-12">
        <a href="#" className="text-text-muted hover:text-white transition-colors"><Code className="h-6 w-6" /></a>
        <a href="#" className="text-text-muted hover:text-white transition-colors"><Globe className="h-6 w-6" /></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <DockNav />
      <Hero />
      <SkillsBento />
      <Projects />
      <Footer />
    </div>
  );
}
