import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Globe, Code, Mail, ArrowRight, ExternalLink, Database, Layout, Terminal, Package, BarChart2, Brain, Wrench, FileSpreadsheet, MessageSquare } from 'lucide-react';
import { IridiumCard } from './components/IridiumCard';
import { ElementalUniverse } from './components/ElementalUniverse';
import { Button } from './components/Button';
import { CustomCursor } from './components/CustomCursor';

const DockNav = () => (
  <motion.div 
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1, duration: 0.5 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface/80 border border-border rounded-full px-4 md:px-6 py-3 flex items-center gap-4 md:gap-6 shadow-2xl shadow-primary/20 backdrop-blur-xl w-max max-w-[90vw]"
  >
    {['Home', 'About', 'Skills', 'Projects'].map((item) => (
      <a key={item} href={`#${item.toLowerCase()}`} className="text-xs md:text-sm font-medium text-text-muted hover:text-white transition-colors">
        {item}
      </a>
    ))}
  </motion.div>
);

const Hero = () => {
  return (
    <section id="home" className="min-h-[100svh] w-full relative flex items-center justify-center overflow-hidden px-4 pt-20 pb-10">
      {/* Hero Content */}
      <div className="relative z-10 text-center pointer-events-none flex flex-col items-center justify-center max-w-5xl mx-auto mt-10 md:mt-0">
        
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-[8vw] font-black leading-none uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 filter drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]"
        >
          Anas <br className="md:hidden" /> Latheef
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-sm sm:text-lg md:text-2xl text-primary font-medium tracking-widest uppercase filter drop-shadow-[0_0_8px_rgba(57,255,20,0.5)] px-4"
        >
          Logistics, Inventory & AI Specialist
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-text-muted"
      >
        <div className="w-[1px] h-12 md:h-16 bg-white/10 overflow-hidden relative">
          <motion.div 
            className="w-full h-1/2 bg-status-green absolute top-0 filter drop-shadow-[0_0_5px_#39FF14]"
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

const SkillsAndAbout = () => (
  <section id="about" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* Profile Image with 4D Iridium/Promethium Styling */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto md:mx-0"
      >
        {/* Radioactive glowing rings */}
        <div className="absolute inset-[-10%] rounded-2xl border border-primary/40 animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-[-5%] rounded-2xl border border-status-green/30"></div>
        
        <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-surface shadow-[0_0_30px_rgba(139,92,246,0.5)] relative z-10 bg-canvas">
          <img 
            src="/legacy/profile.jpg" 
            alt="Anas Latheef" 
            className="w-full h-full object-cover filter contrast-125 saturate-50 hover:saturate-100 transition-all duration-500"
          />
        </div>
      </motion.div>

      {/* About Content */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6 text-white"
        >
          About <span className="text-primary filter drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">Me</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-muted text-base md:text-lg leading-relaxed border-l-2 border-primary/50 pl-4 md:pl-6 bg-surface/30 backdrop-blur-sm p-4 rounded-r-xl"
        >
          As a self-taught Inventory Leader, I've mastered the art of organizing, scaling, and optimizing complex supply chains. Bridging the gap between traditional logistics and cutting-edge artificial intelligence to build smarter, faster, and highly reactive systems.
        </motion.p>
      </div>
    </div>

    <div id="skills" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[250px]">
      <IridiumCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between" glowColor="rgba(57, 255, 20, 0.3)">
        <div>
          <Brain className="h-8 w-8 text-status-green mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-2">AI Automation</h3>
          <p className="text-text-muted text-sm md:text-base">Deploying intelligent bots powered by Advanced AI (Anthropic, Claude, Gemini, OpenAI, Meta), automated data flow, and predictive analytics.</p>
        </div>
        <div className="flex gap-2 flex-wrap mt-6">
          {['OpenAI', 'Claude', 'Gemini', 'Python', 'Zapier'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-status-green">{tag}</span>
          ))}
        </div>
      </IridiumCard>
      
      <IridiumCard className="flex flex-col justify-between">
        <div>
          <Package className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
          <p className="text-text-muted text-sm">Demand planning, stock optimization, warehouse layout design, and supply chain synergy.</p>
        </div>
      </IridiumCard>

      <IridiumCard className="flex flex-col justify-between">
        <div>
          <BarChart2 className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Logistics Strategy</h3>
          <p className="text-text-muted text-sm">Routing, fleet management, cost reduction, and process streamlining from end to end.</p>
        </div>
      </IridiumCard>

      <IridiumCard className="flex flex-col justify-between">
        <div>
          <Wrench className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Tech Stack & Tools</h3>
          <p className="text-text-muted text-sm">ERP Systems (Odoo, Zoho), Warehouse Management Systems (WMS), IMS, Next-Gen SaaS APIs.</p>
        </div>
      </IridiumCard>

      <IridiumCard className="flex flex-col justify-between md:col-span-2 lg:col-span-1">
        <div>
          <FileSpreadsheet className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Data Analysis & BI</h3>
          <p className="text-text-muted text-sm">Advanced Microsoft Excel (Power Pivot, XLOOKUP), Power BI, KPI Dashboarding.</p>
        </div>
      </IridiumCard>
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
    <section id="projects" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Systems <span className="text-primary filter drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">Deployed</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((proj, i) => (
          <IridiumCard key={i} className="group p-0 flex flex-col" glowColor="rgba(6, 182, 212, 0.4)">
            <div className="h-48 md:h-56 w-full overflow-hidden bg-white/5 relative shrink-0">
              <img src={proj.img} alt={proj.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            </div>
            <div className="p-6 relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors">{proj.title}</h3>
                <p className="text-text-muted text-sm md:text-base mb-6">{proj.desc}</p>
              </div>
              <a href="#" className="inline-flex items-center text-sm font-medium text-white hover:text-status-green transition-colors mt-auto">
                Initialize Sequence <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </IridiumCard>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="py-24 relative z-10 border-t border-border mt-24 overflow-hidden bg-surface/80 backdrop-blur-md">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-status-green to-transparent opacity-50"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 bg-status-green/10 blur-[100px] rounded-full pointer-events-none"></div>
    
    <div className="text-center max-w-3xl mx-auto space-y-8 px-4">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-status-green to-primary">Contact</span></h2>
      <p className="text-text-muted text-sm md:text-base">Ready to synthesize logistics and artificial intelligence for your operations? Transmit a message to my secure terminal.</p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 items-center">
        <Button variant="primary" onClick={() => window.open('https://docs.google.com/forms/u/0/d/e/1FAIpQLSf1ympkMUXgh4KR5ll1M7aBzLGDx3RIGP2Wwr80wPJjQpOSeg/viewform', '_blank')} className="bg-status-green text-black hover:bg-status-green/80 hover:text-black w-full sm:w-auto">
          <Mail className="mr-2 h-4 w-4" /> Transmit Message
        </Button>
      </div>

      <div className="flex justify-center gap-8 pt-12">
        <a href="https://github.com/anaslatheef369-coder" target="_blank" className="text-text-muted hover:text-primary transition-colors transform hover:scale-110"><Code className="h-8 w-8" /></a>
        <a href="https://wa.me/971564878321" target="_blank" className="text-text-muted hover:text-status-green transition-colors transform hover:scale-110"><MessageSquare className="h-8 w-8" /></a>
      </div>
      
      <p className="pt-8 text-xs text-text-muted/50 uppercase tracking-widest">
        System Operational // Anas Latheef © 2026
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas selection:bg-primary/30 selection:text-white font-sans text-text-main pb-20 md:pb-0">
      
      {/* Global 4D/5D Antimatter Background - Persists across ALL sections */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#39FF14" />
          <pointLight position={[-10, -10, -5]} intensity={3} color="#8B5CF6" />
          <Suspense fallback={null}>
            <ElementalUniverse />
          </Suspense>
        </Canvas>
      </div>

      <CustomCursor />
      <DockNav />
      
      {/* Content Layers */}
      <Hero />
      <SkillsAndAbout />
      <Projects />
      <Footer />
    </div>
  );
}
