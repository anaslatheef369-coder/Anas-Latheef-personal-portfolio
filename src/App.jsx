import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code, Mail, ArrowRight, ExternalLink, Database, Layout, Terminal, Package, BarChart2, Brain, Wrench, FileSpreadsheet, TrendingUp, MessageSquare } from 'lucide-react';
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
    {['Home', 'About', 'Skills', 'Projects'].map((item) => (
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
          <StatusBadge className="mb-6" text="Available for new opportunities" />
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
            <span className="text-gradient">Anas Latheef</span> <br />
            Logistics, Inventory & AI Automation Specialist.
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-text-muted max-w-2xl leading-relaxed"
        >
          Passionate Logistics & Inventory Specialist with over 6 years of experience. I leverage innovative leadership and AI automation to transform complex supply chains and drive industry-wide efficiency.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <a href="#projects">
            <Button variant="primary">
              View My Work <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="#contact">
            <Button variant="secondary">
              <Mail className="mr-2 h-4 w-4" /> Let's Talk
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24 relative z-10">
    <div className="mb-12 max-w-3xl">
      <h2 className="text-3xl font-bold mb-4">About <span className="text-gradient">Me</span></h2>
      <p className="text-text-muted text-lg leading-relaxed">
        My journey is driven by an unquenchable thirst for knowledge. As a self-taught Inventory Leader, I've mastered the art of organizing, scaling, and optimizing complex supply chains. But my passion doesn't stop there. I am deeply enthusiastic about AI Automation—bridging the gap between traditional logistics and cutting-edge artificial intelligence to build smarter, faster, and more efficient systems.
      </p>
    </div>
  </section>
);

const SkillsBento = () => (
  <section id="skills" className="py-12 relative z-10">
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-4">My <span className="text-gradient">Skills</span></h2>
      <p className="text-text-muted">The expertise and frameworks I use to optimize supply chains.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
      <GlassCard className="md:col-span-2 flex flex-col justify-between group">
        <div>
          <Brain className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Automation</h3>
          <p className="text-text-muted">Deploying intelligent bots powered by Advanced AI (Anthropic, Claude, Gemini, OpenAI, Meta), automated data flow, and predictive analytics.</p>
        </div>
        <div className="flex gap-2 flex-wrap mt-4">
          {['OpenAI', 'Claude', 'Gemini', 'Python', 'Zapier'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono">{tag}</span>
          ))}
        </div>
      </GlassCard>
      
      <GlassCard className="flex flex-col justify-between bg-primary/5">
        <div>
          <Package className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
          <p className="text-text-muted text-sm">Demand planning, stock optimization, warehouse layout design, and supply chain synergy.</p>
        </div>
      </GlassCard>

      <GlassCard className="flex flex-col justify-between">
        <div>
          <BarChart2 className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Logistics Strategy</h3>
          <p className="text-text-muted text-sm">Routing, fleet management, cost reduction, and process streamlining from end to end.</p>
        </div>
      </GlassCard>

      <GlassCard className="flex flex-col justify-between overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/10 pointer-events-none" />
        <div className="relative z-10">
          <Wrench className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Tech Stack & Tools</h3>
          <p className="text-text-muted text-sm">ERP Systems (Odoo, Zoho), Warehouse Management Systems (WMS), IMS, Next-Gen SaaS APIs.</p>
        </div>
      </GlassCard>

      <GlassCard className="flex flex-col justify-between">
        <div>
          <FileSpreadsheet className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Data Analysis & BI</h3>
          <p className="text-text-muted text-sm">Advanced Microsoft Excel (Power Pivot, XLOOKUP), Power BI, KPI Dashboarding.</p>
        </div>
      </GlassCard>
    </div>
  </section>
);

const Projects = () => {
  const projects = [
    { title: "Predictive Analytics AI", desc: "Designed a forecasting model predicting inventory shortages 3 weeks in advance.", img: "/legacy/project2_enhanced.png" },
    { title: "Executive Freight Dashboard", desc: "Interactive data suite tracking transit times, bottlenecks, and shrinkage.", img: "/legacy/project_kpi_dashboard.png" },
    { title: "Zero-Stock Automation Trigger", desc: "Webhook system monitoring IMS to proactively alert procurement before stockouts.", img: "/legacy/project_automation_alert.png" },
    { title: "Dynamic Fleet Routing Engine", desc: "Predictive model to optimize multi-stop routes and minimize fuel consumption.", img: "/legacy/project_fleet_routing.png" },
    { title: "Velocity-Based Warehouse Slotting", desc: "Strategic planning tool reorganizing SKUs based on pick-velocity.", img: "/legacy/project_warehouse_slotting.png" },
    { title: "WealthSync", desc: "Smart personal finance application to sync and track wealth portfolios.", img: "/legacy/project_wealthsync.png" }
  ];

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Latest <span className="text-gradient">Projects</span></h2>
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
  <footer id="contact" className="py-24 relative z-10 border-t border-border mt-24 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
    
    <div className="text-center max-w-2xl mx-auto space-y-8">
      <h2 className="text-4xl md:text-5xl font-bold">Let's Connect <span className="text-gradient">& Collaborate</span></h2>
      <p className="text-text-muted">Transforming complex supply chains with AI and innovative leadership. Reach out to see how we can streamline your operations.</p>
      
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="primary" onClick={() => window.open('https://docs.google.com/forms/u/0/d/e/1FAIpQLSf1ympkMUXgh4KR5ll1M7aBzLGDx3RIGP2Wwr80wPJjQpOSeg/viewform', '_blank')}>
          <Mail className="mr-2 h-4 w-4" /> Send Message
        </Button>
      </div>

      <div className="flex justify-center gap-6 pt-12">
        <a href="https://github.com/anaslatheef369-coder" target="_blank" className="text-text-muted hover:text-white transition-colors"><Code className="h-6 w-6" /></a>
        <a href="https://wa.me/971564878321" target="_blank" className="text-text-muted hover:text-white transition-colors"><MessageSquare className="h-6 w-6" /></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <DockNav />
      <Hero />
      <About />
      <SkillsBento />
      <Projects />
      <Footer />
    </div>
  );
}
