import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Code, Mail, ExternalLink, Package, BarChart2, Brain, Wrench, FileSpreadsheet, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';
import { IridiumCard } from './components/IridiumCard';
import { ElementalUniverse } from './components/ElementalUniverse';
import { Button } from './components/Button';
import { CustomCursor } from './components/CustomCursor';

const TopNav = () => (
  <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-end px-6 md:px-12 py-6 bg-gradient-to-b from-canvas/90 to-transparent pointer-events-auto">
    <nav className="hidden md:flex items-center gap-8 bg-surface/50 px-8 py-3 rounded-full border border-border backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      {['Home', 'About', 'Skills', 'Projects', 'Articles', 'Contact'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-display font-bold text-text-muted hover:text-status-green transition-colors uppercase tracking-widest">
          {item}
        </a>
      ))}
    </nav>
  </header>
);

const Hero = () => {
  return (
    <section id="home" className="min-h-[100svh] w-full relative overflow-hidden px-4 pt-20 pb-10">
      <div className="absolute top-20 md:top-32 right-6 md:right-16 z-10 text-right pointer-events-none flex flex-col items-end max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-[6vw] font-display font-black leading-none uppercase tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        >
          Anas <br className="md:hidden" /> Latheef
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-xs sm:text-sm md:text-xl text-status-green font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]"
        >
          Logistics, Inventory & AI Specialist
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-text-muted"
      >
        <div className="w-[1px] h-12 md:h-16 bg-white/10 overflow-hidden relative">
          <motion.div 
            className="w-full h-1/2 bg-status-red absolute top-0 filter drop-shadow-[0_0_5px_#FF003C]"
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
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto md:mx-0"
      >
        <div className="absolute inset-[-5%] rounded-2xl border border-status-red/40 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute inset-[-2%] rounded-2xl border border-white/20"></div>
        
        <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-surface shadow-[0_0_30px_rgba(255,255,255,0.2)] relative z-10 bg-canvas">
          <img 
            src="/legacy/profile.jpg" 
            alt="Anas Latheef" 
            className="w-full h-full object-cover filter contrast-125 saturate-50 hover:saturate-100 transition-all duration-500"
          />
        </div>
      </motion.div>

      <div>
        <motion.h2 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-6 text-white uppercase"
        >
          About <span className="text-status-red filter drop-shadow-[0_0_10px_rgba(255,0,60,0.8)]">Me</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-base md:text-lg leading-relaxed border-l-2 border-status-red/50 pl-4 md:pl-6 bg-surface/30 backdrop-blur-sm p-4 rounded-r-xl"
        >
          As a self-taught Inventory Leader, I've mastered the art of organizing, scaling, and optimizing complex supply chains. Bridging the gap between traditional logistics and cutting-edge artificial intelligence to build smarter, faster, and highly reactive systems.
        </motion.p>
      </div>
    </div>

    <div id="skills" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[250px]">
      <IridiumCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between" glowColor="rgba(0, 240, 255, 0.3)">
        <div>
          <Brain className="h-8 w-8 text-status-green mb-4" />
          <h3 className="text-xl md:text-2xl font-display font-bold mb-2">AI Automation</h3>
          <p className="text-white text-sm md:text-base">Deploying intelligent bots powered by Advanced AI (Anthropic, Claude, Gemini, OpenAI, Meta), automated data flow, and predictive analytics.</p>
        </div>
        <div className="flex gap-2 flex-wrap mt-6">
          {['OpenAI', 'Claude', 'Gemini', 'Python', 'Zapier'].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono font-bold text-status-green">{tag}</span>
          ))}
        </div>
      </IridiumCard>
      
      <IridiumCard className="flex flex-col justify-between" glowColor="rgba(255, 0, 127, 0.3)">
        <div>
          <Package className="h-8 w-8 text-status-red mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Inventory Management</h3>
          <p className="text-white text-sm">Demand planning, stock optimization, warehouse layout design, and supply chain synergy.</p>
        </div>
      </IridiumCard>

      <IridiumCard className="flex flex-col justify-between" glowColor="rgba(255, 255, 255, 0.3)">
        <div>
          <BarChart2 className="h-8 w-8 text-white mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Logistics Strategy</h3>
          <p className="text-white text-sm">Routing, fleet management, cost reduction, and process streamlining from end to end.</p>
        </div>
      </IridiumCard>

      <IridiumCard className="flex flex-col justify-between" glowColor="rgba(0, 240, 255, 0.3)">
        <div>
          <Wrench className="h-8 w-8 text-status-green mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Tech Stack & Tools</h3>
          <p className="text-white text-sm">ERP Systems (Odoo, Zoho), Warehouse Management Systems (WMS), IMS, Next-Gen SaaS APIs.</p>
        </div>
      </IridiumCard>

      <IridiumCard className="flex flex-col justify-between md:col-span-2 lg:col-span-1" glowColor="rgba(255, 0, 127, 0.3)">
        <div>
          <FileSpreadsheet className="h-8 w-8 text-status-red mb-4" />
          <h3 className="text-xl font-display font-bold mb-2">Data Analysis & BI</h3>
          <p className="text-white text-sm">Advanced Microsoft Excel (Power Pivot, XLOOKUP), Power BI, KPI Dashboarding.</p>
        </div>
      </IridiumCard>
    </div>
  </section>
);

const ProjectsSlideshow = () => {
  const projects = [
    { title: "Predictive Analytics AI", desc: "Designed a forecasting model predicting inventory shortages 3 weeks in advance.", img: "/legacy/project2_enhanced.png" },
    { title: "Executive Freight Dashboard", desc: "Interactive data suite tracking transit times, bottlenecks, and shrinkage.", img: "/legacy/project_kpi_dashboard.png" },
    { title: "Zero-Stock Automation Trigger", desc: "Webhook system monitoring IMS to proactively alert procurement before stockouts.", img: "/legacy/project_automation_alert.png" },
    { title: "Dynamic Fleet Routing Engine", desc: "Predictive model to optimize multi-stop routes and minimize fuel consumption.", img: "/legacy/project_fleet_routing.png" },
    { title: "Velocity-Based Warehouse Slotting", desc: "Strategic planning tool reorganizing SKUs based on pick-velocity.", img: "/legacy/project_warehouse_slotting.png" },
    { title: "WealthSync", desc: "Smart personal finance application to sync and track wealth portfolios.", img: "/legacy/project_wealthsync.png" }
  ];

  const scrollRef = React.useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white">Systems <span className="text-status-red filter drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]">Deployed</span></h2>
        <div className="flex gap-4">
          <button onClick={() => scroll('left')} className="p-3 rounded-full bg-surface/80 border border-border hover:bg-white/10 transition-colors text-white">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={() => scroll('right')} className="p-3 rounded-full bg-surface/80 border border-border hover:bg-white/10 transition-colors text-white">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-12 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((proj, i) => (
          <IridiumCard key={i} className="group p-0 flex flex-col w-[300px] md:w-[400px] shrink-0 snap-center" glowColor="rgba(255, 0, 127, 0.4)">
            <div className="h-48 md:h-56 w-full overflow-hidden bg-surface relative shrink-0">
              <img src={proj.img} alt={proj.title} className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            </div>
            <div className="p-6 relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-display font-bold mb-2 group-hover:text-status-red transition-colors text-white">{proj.title}</h3>
                <p className="text-white text-sm md:text-base mb-6">{proj.desc}</p>
              </div>
              <a href="#" className="inline-flex items-center text-sm font-bold text-status-green hover:text-white transition-colors mt-auto uppercase tracking-widest">
                Initialize Sequence <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </IridiumCard>
        ))}
      </div>
    </section>
  );
};

const Articles = () => {
  const articles = [
    { cat: "Global Trade", title: "Tariff Wars in 2026: How Supply Chains Are Being Reshaped", read: "12 min read" },
    { cat: "Technology", title: "AI-Powered Demand Forecasting: The 2026 Revolution", read: "15 min read" },
    { cat: "Technology", title: "Building a Digital Twin of Your Inventory: Strategy", read: "13 min read" },
    { cat: "Supply Chain", title: "Sustainable Logistics: Optimizing Routes for Lower Emissions", read: "10 min read" }
  ];

  return (
    <section id="articles" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white">Latest <span className="text-status-green filter drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">Articles</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art, i) => (
          <IridiumCard key={i} className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300" glowColor="rgba(255, 255, 255, 0.2)">
            <span className="text-xs font-mono font-bold text-status-red mb-3 block uppercase tracking-widest">{art.cat}</span>
            <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-status-green transition-colors">{art.title}</h3>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <span className="text-sm text-text-muted">{art.read}</span>
              <ExternalLink className="h-5 w-5 text-text-muted group-hover:text-white transition-colors" />
            </div>
          </IridiumCard>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="py-24 relative z-10 border-t border-border mt-24 overflow-hidden bg-surface/80 backdrop-blur-md">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-status-red to-transparent opacity-50"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 bg-status-red/10 blur-[100px] rounded-full pointer-events-none"></div>
    
    <div className="text-center max-w-3xl mx-auto space-y-8 px-4">
      <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-white">Initiate <span className="text-status-red">Contact</span></h2>
      <p className="text-white text-sm md:text-base">Ready to synthesize logistics and artificial intelligence for your operations? Transmit a message to my secure terminal.</p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 items-center">
        <Button variant="primary" onClick={() => window.open('https://docs.google.com/forms/u/0/d/e/1FAIpQLSf1ympkMUXgh4KR5ll1M7aBzLGDx3RIGP2Wwr80wPJjQpOSeg/viewform', '_blank')} className="bg-status-red text-white hover:bg-white hover:text-black w-full sm:w-auto font-display font-bold uppercase tracking-wider">
          <Mail className="mr-2 h-4 w-4" /> Transmit Message
        </Button>
      </div>

      <div className="flex justify-center gap-8 pt-12">
        <a href="https://github.com/anaslatheef369-coder" target="_blank" className="text-white hover:text-status-green transition-colors transform hover:scale-110"><Code className="h-8 w-8" /></a>
        <a href="https://wa.me/971564878321" target="_blank" className="text-white hover:text-status-green transition-colors transform hover:scale-110"><MessageSquare className="h-8 w-8" /></a>
      </div>
      
      <p className="pt-8 text-xs text-text-muted/50 font-mono uppercase tracking-widest">
        System Operational // Anas Latheef © 2026
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas selection:bg-status-red/30 selection:text-white font-sans text-text-main pb-20 md:pb-0">
      
      {/* Global 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ElementalUniverse />
          </Suspense>
        </Canvas>
      </div>

      <CustomCursor />
      <TopNav />
      
      <Hero />
      <SkillsAndAbout />
      <ProjectsSlideshow />
      <Articles />
      <Footer />
    </div>
  );
}
