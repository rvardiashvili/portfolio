import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  MapPin, 
  Code,
  BookOpen,
  Music,
  Activity,
  Database,
  Terminal,
  Layers,
  Zap,
  Cpu,
  Server,
  Camera,
  Globe,
  Download,
  GraduationCap,
  Briefcase,
  Hash,
  Radio,
  Box,
  User,
  Layout
} from 'lucide-react';

/* --- Data --- */

const PERSONAL_INFO = {
  name: "Rati Vardiashvili",
  role: "Software Engineer",
  location: "Bremen, Germany",
  email: "vardiashvilirati33@gmail.com",
  github: "https://github.com/rvardiashvili",
  linkedin: "https://www.linkedin.com/in/rvardiashvili",
  spotify: "https://open.spotify.com/user/gze4xxzme1e1f1ty1kt32kuot?si=d7afc329aef74d1d",
  cv_link: "https://drive.google.com/uc?export=download&id=14wRpsiVqvTm4ykE0_I3yxFO6BjdnYV0x",
  about: "I engineer high-performance systems where precision meets scale. Blending academic depth with practical backend expertise, I bridge the gap between raw system efficiency and modern cloud infrastructure. From optimizing gigapixel satellite data pipelines to building robust enterprise integrations, I design solutions that solve complex problems with elegance and speed.",
  tagline: "Engineering Intelligence."
};

const EDUCATION = [
  {
    school: "Constructor University",
    degree: "B.Sc. Computer Science",
    location: "Bremen, Germany",
    period: "2022 - 2026",
    desc: "Focus on Software Engineering, Distributed Systems, and Data Engineering."
  },
  {
    school: "Buckswood International",
    degree: "High School Diploma",
    location: "Tbilisi, Georgia",
    period: "2022",
    desc: "Mathematics & Physics concentration."
  }
];

const EXPERIENCE = [
  {
    company: "Softgen",
    role: "Backend Developer",
    period: "Jul 2025 - Sep 2025",
    location: "Tbilisi",
    description: "Engineered Java-based integration solutions to automate interactions with the Georgian Revenue Service. Streamlined data exchange processes and collaborated with cross-functional teams to integrate secure APIs.",
    tags: ["Java", "Spring Boot", "REST APIs", "Integration"]
  },
  {
    company: "FINA LLC",
    role: "Systems Intern",
    period: "Aug 2023 - Dec 2024",
    location: "Georgia",
    description: "Developed an internal security system using Raspberry Pi clusters. Administered the company's main web platform and received in-depth training on Java EE backend architectures.",
    tags: ["Python", "IoT", "Linux Ops", "NGINX"]
  }
];

const PROJECTS = [
  {
    title: "GeoTiff Pipeline",
    category: "AI / Data",
    description: "Memory-efficient pipeline for gigapixel satellite image processing. Optimized for high-throughput analysis using multi-threaded producer-consumer architecture.",
    tech: "Python",
    tags: ["PyTorch", "Rasterio", "NumPy"],
    link: "https://github.com/rvardiashvili/GeoTiff-Scalable-Analysis-Pipeline"
  },
  {
    title: "RSGE API Wrapper",
    category: "Integration",
    description: "Robust Java integration for automating interactions with the Georgian Revenue Service.",
    tech: "Java",
    tags: ["Java", "API", "Automation"],
    link: "https://github.com/rvardiashvili/rsge-api-java"
  },
  {
    title: "Web Dev Course",
    category: "Education",
    description: "Comprehensive collection of web development resources and coursework.",
    tech: "Web",
    tags: ["React", "JS"],
    link: "https://github.com/rvardiashvili/web-development-course"
  }
];

const BOOKS = [
  { title: "Mistborn", author: "B. Sanderson" },
  { title: "Tress of Emerald Sea", author: "B. Sanderson" },
  { title: "Metro 2033", author: "D. Glukhovsky" }
];

const PHOTOS = [
  { id: 1, src: "/portfolio/media/unnamed.jpg", desc: "Night Market", color: "bg-red-900" },
  { id: 2, src: "/portfolio/media/unnamed (1).jpg", desc: "Silhouette", color: "bg-orange-900" },
  { id: 3, src: "/portfolio/media/unnamed (2).jpg", desc: "Fog", color: "bg-slate-800" },
  { id: 4, src: "/portfolio/media/unnamed (3).jpg", desc: "Archives", color: "bg-yellow-900" },
  { id: 5, src: "/portfolio/media/DSC01653.JPG", desc: "Perspective", color: "bg-blue-900" },
  { id: 6, src: "/portfolio/media/IMG_1097.JPG", desc: "Moment", color: "bg-green-900" }
];

/* --- BACKGROUND: TWILIGHT STUDIO (Colorful but Balanced) --- */
const ArtsyBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const nodes = [];
    const nodeCount = window.innerWidth < 768 ? 35 : 70;
    const connectionDist = 180;
    const mouseDist = 250;
    let mouse = { x: null, y: null };

    const createNode = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1
    });

    for (let i = 0; i < nodeCount; i++) nodes.push(createNode());

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            const opacity = 1 - (dist / connectionDist);
            // Brighter lines for visibility against colorful background
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`; 
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        if (mouse.x !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDist) {
            const force = (mouseDist - dist) / mouseDist;
            node.vx -= (dx / dist) * force * 0.05;
            node.vy -= (dy / dist) * force * 0.05;
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + (Math.random() * 0.2)})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(animationId);
    };
  }, [dimensions]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#1e1b29]"> {/* Deep Violet/Slate Base */}
      
      {/* Artistic Gradient Blobs - Brighter but not blinding */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[120px] animate-slow-pan mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-[120px] animate-slow-pan mix-blend-screen" style={{animationDelay: '5s'}}></div>
      <div className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-rose-500/10 rounded-full blur-[100px] animate-slow-pan mix-blend-screen" style={{animationDelay: '10s'}}></div>
      
      {/* Art Layer - Overlay */}
      <img 
        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
        alt="Art Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay scale-105 animate-slow-pan grayscale"
      />
      
      {/* Dynamic Network Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      
      {/* Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay pointer-events-none z-20" />
    </div>
  );
};

/* --- LIQUID GLASS UI --- */
const LiquidCard = ({ children, className = "", href }) => {
  const Wrapper = href ? 'a' : 'div';
  const props = href ? { href, target: "_blank", rel: "noreferrer" } : {};
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Wrapper 
      {...props} 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`
        group relative block overflow-hidden rounded-xl
        bg-white/5 border border-white/10
        backdrop-blur-xl shadow-lg
        transition-all duration-300
        ${href ? 'hover:-translate-y-1 cursor-pointer hover:bg-white/10' : ''}
        ${className}
      `}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px transition opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
      <div className="relative z-10 h-full">{children}</div>
    </Wrapper>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-white/10 text-white border border-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
  >
    <Icon size={16} />
    <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
  </button>
);

const TechTile = ({ icon: Icon, label, color = "text-slate-300" }) => (
  <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all duration-200 cursor-default">
    <Icon size={18} className={color} />
    <span className="text-[10px] font-mono font-bold text-slate-400">{label}</span>
  </div>
);

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6 pl-1 opacity-90">
    {Icon && <Icon size={16} className="text-purple-400" />}
    <h2 className="text-sm font-bold font-mono uppercase tracking-widest text-white">{title}</h2>
    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
  </div>
);

const SocialButton = ({ icon: Icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="text-slate-400 hover:text-white hover:scale-110 transition-all p-2"
  >
    <Icon size={20} />
  </a>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('profile');
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: contentRef.current, threshold: 0.3, rootMargin: "-10% 0px -45% 0px" }
    );

    const sections = ['profile', 'experience', 'projects', 'education', 'personal'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen font-sans text-white selection:bg-purple-500/30 selection:text-white overflow-hidden flex bg-[#1e1b29]">
      
      <style>{`
        @keyframes pan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.1) translate(-1%, -1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-slow-pan {
          animation: pan 60s ease-in-out infinite alternate;
        }
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-music-bar {
          animation: music-bar 1s ease-in-out infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <ArtsyBackground />

      {/* CONTAINER FOR 2 COLUMNS */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:p-12 h-full flex gap-8 items-start">
        
        {/* --- LEFT SIDEBAR (Sticky, No Scroll) --- */}
        <div className="hidden lg:flex w-80 shrink-0 flex-col gap-6 h-full">
          <LiquidCard className="h-full p-8">
             <div className="flex flex-col h-full justify-between">
               {/* Top Section: Header & Nav */}
               <div>
                 {/* REWORKED HEADER: Centered Identity */}
                 <div className="flex flex-col items-center text-center mb-8">
                    <div className="relative mb-4 group cursor-pointer">
                       <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-black border-2 border-white/10 flex items-center justify-center shadow-xl overflow-hidden relative z-10">
                          <img 
                            src="/portfolio/media/pfp.png" 
                            alt="Rati Vardiashvili" 
                            className="w-full h-full object-cover"
                          />
                       </div>
                       {/* Status Indicator Integrated into Avatar border */}
                       <div className="absolute inset-0 rounded-full border-2 border-emerald-500/50 animate-pulse"></div>
                    </div>
                    
                    <h1 className="text-2xl font-serif tracking-tight text-white mb-1">
                       Rati Vardiashvili
                    </h1>
                    <p className="text-xs font-mono text-slate-300 uppercase tracking-widest mb-4">
                       Software Engineer
                    </p>
                    
                    <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 inline-flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                       <span className="text-[10px] font-mono text-slate-200 uppercase tracking-widest">Available</span>
                    </div>
                 </div>

                 {/* Navigation */}
                 <nav className="space-y-1">
                   <NavItem icon={User} label="Profile" active={activeSection === 'profile'} onClick={() => scrollToSection('profile')} />
                   <NavItem icon={Briefcase} label="Experience" active={activeSection === 'experience'} onClick={() => scrollToSection('experience')} />
                   <NavItem icon={Hash} label="Projects" active={activeSection === 'projects'} onClick={() => scrollToSection('projects')} />
                   <NavItem icon={GraduationCap} label="Education" active={activeSection === 'education'} onClick={() => scrollToSection('education')} />
                   <NavItem icon={Activity} label="Personal" active={activeSection === 'personal'} onClick={() => scrollToSection('personal')} />
                 </nav>
               </div>

               {/* Connect Section - Fixed to Bottom */}
               <div className="space-y-6">
                  {/* Clean Social Icons */}
                  <div className="flex gap-6 justify-center">
                    <SocialButton href={PERSONAL_INFO.github} icon={Github} />
                    <SocialButton href={PERSONAL_INFO.linkedin} icon={Linkedin} />
                    <SocialButton href={`mailto:${PERSONAL_INFO.email}`} icon={Mail} />
                  </div>
                  {/* Clean Resume Button */}
                  <a href={PERSONAL_INFO.cv_link} className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 rounded-lg transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-lg group">
                    <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" /> 
                    <span>Download Resume</span>
                  </a>
               </div>
             </div>
          </LiquidCard>
        </div>

        {/* --- RIGHT CONTENT (Scrollable Area) --- */}
        <div 
          ref={contentRef}
          className="flex-1 h-full overflow-y-auto rounded-2xl scroll-smooth custom-scrollbar"
        >
          <div className="max-w-4xl mx-auto flex flex-col gap-16 pb-20 pt-2">

            {/* --- MOBILE HEADER (Visible only on small screens) --- */}
            <div className="lg:hidden flex flex-col items-center text-center mb-8 mt-8">
                <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-800 to-black border-2 border-white/10 flex items-center justify-center shadow-xl overflow-hidden">
                        <img src="/portfolio/media/pfp.png" alt="Rati Vardiashvili" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500/50 animate-pulse"></div>
                </div>
                <h1 className="text-3xl font-serif tracking-tight text-white mb-2">Rati Vardiashvili</h1>
                <p className="text-sm font-mono text-slate-300 uppercase tracking-widest mb-4">Software Engineer</p>
                
                <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 inline-flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-slate-200 uppercase tracking-widest">Available</span>
                </div>
            </div>

            {/* 1. Profile & Tech Stack */}
            <section id="profile">
              <LiquidCard className="p-8" href={null}>
                <div className="mb-8">
                  <h2 className="text-3xl font-serif text-white mb-4">About</h2>
                  <p className="text-sm text-slate-300 leading-relaxed font-light max-w-2xl">
                    {PERSONAL_INFO.about}
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-4">Technical Arsenal</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <TechTile icon={Code} label="Java" color="text-orange-400" />
                    <TechTile icon={Terminal} label="Python" color="text-blue-400" />
                    <TechTile icon={Cpu} label="C++" color="text-purple-400" />
                    <TechTile icon={Layers} label="Spring Boot" color="text-green-400" />
                    <TechTile icon={Server} label="AWS" color="text-yellow-400" />
                    <TechTile icon={Box} label="Docker" color="text-blue-400" />
                    <TechTile icon={Database} label="PostgreSQL" color="text-indigo-400" />
                    <TechTile icon={Globe} label="React" color="text-cyan-400" />
                  </div>
                </div>
              </LiquidCard>
            </section>

            {/* 2. EXPERIENCE */}
            <section id="experience">
              <SectionHeader title="Experience" icon={Briefcase} />
              {/* Added padding left (pl-6) to container to prevent cut-off circles */}
              <div className="relative pl-6 border-l border-white/10 space-y-8 ml-2">
                {EXPERIENCE.map((job, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Dot - Adjusted positioning */}
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-[#1e1b29] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                      <h3 className="text-lg font-serif text-white">{job.role}</h3>
                      <span className="text-xs font-mono text-slate-300">{job.period}</span>
                    </div>
                    <div className="text-sm font-bold text-purple-400 mb-3">{job.company} <span className="text-slate-400 font-normal">• {job.location}</span></div>
                    
                    <LiquidCard className="p-6">
                      <p className="text-sm text-slate-200 leading-relaxed mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/5 text-slate-400 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </LiquidCard>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. PROJECTS */}
            <section id="projects">
              <SectionHeader title="Selected Works" icon={Hash} />
              <div className="grid md:grid-cols-2 gap-4">
                {PROJECTS.map((project, idx) => (
                  <LiquidCard 
                    key={idx} 
                    href={project.link} 
                    className={`p-6 flex flex-col justify-between h-full ${idx === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-lg bg-white/5 text-purple-400 border border-white/5 shadow-sm">
                          {project.tech === 'Java' ? <Server size={18} /> : project.tech === 'Python' ? <Terminal size={18} /> : <Globe size={18} />}
                        </div>
                        <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className={`font-bold text-white mb-2 ${idx === 0 ? 'text-2xl' : 'text-base'}`}>{project.title}</h3>
                      <span className="text-[10px] font-mono text-slate-400 uppercase mb-3 block">{project.category}</span>
                      <p className="text-xs text-slate-200 leading-relaxed mb-4 flex-grow font-medium">{project.description}</p>
                    </div>
                    <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
                      {project.tags.slice(0, idx === 0 ? 4 : 2).map(tag => (
                        <span key={tag} className="text-[9px] px-2 py-1 bg-white/5 border border-white/5 rounded text-slate-400 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </LiquidCard>
                ))}
              </div>
            </section>

            {/* 4. EDUCATION */}
            <section id="education">
              <SectionHeader title="Education" icon={GraduationCap} />
              <div className="grid md:grid-cols-2 gap-4">
                {EDUCATION.map((edu, idx) => (
                  <LiquidCard key={idx} className="p-6" href={null}>
                    <h3 className="text-base font-bold text-white mb-1">{edu.degree}</h3>
                    <div className="text-xs text-purple-400 mb-2 font-mono">{edu.school}</div>
                    <span className="text-[10px] text-slate-300 bg-white/5 px-2 py-1 rounded border border-white/5 block w-fit mb-3">{edu.period}</span>
                    <p className="text-xs text-slate-200 leading-relaxed">{edu.desc}</p>
                  </LiquidCard>
                ))}
              </div>
            </section>

            {/* 5. B-SIDE */}
            <section id="personal">
              <SectionHeader title="The B-Side" icon={Activity} />
              
              {/* Top Row: Spotify & Books */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                
                {/* Spotify Embed - Compact */}
                <LiquidCard className="p-0 overflow-hidden h-[152px]" href={null}>
                   <iframe 
                     style={{borderRadius: '12px'}} 
                     src="https://open.spotify.com/embed/playlist/5vd63wCCLtkvFiwjX5NRTa?utm_source=generator&theme=0" 
                     width="100%" 
                     height="152" 
                     frameBorder="0" 
                     allowFullScreen="" 
                     allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                     loading="lazy"
                   ></iframe>
                </LiquidCard>

                {/* Reading - Compact to match */}
                <LiquidCard className="p-5 h-[152px] flex flex-col" href={null}>
                  <div className="flex items-center gap-2 mb-3 text-slate-500 shrink-0">
                    <BookOpen size={14} />
                    <span className="text-[10px] font-bold uppercase">Library Status</span>
                  </div>
                  <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                    {BOOKS.map((book, i) => (
                      <div key={i} className="flex justify-between text-xs border-b border-white/5 pb-1 last:border-0">
                        <span className="text-slate-200 font-medium truncate mr-2">{book.title}</span>
                        <span className="text-slate-400 whitespace-nowrap">{book.author}</span>
                      </div>
                    ))}
                  </div>
                </LiquidCard>
              </div>

              {/* Bottom Row: Photography */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3 px-1">
                    <Camera size={14} className="text-slate-500" />
                    <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Photography</span>
                </div>
                
                {/* Infinite Scroll Carousel */}
                <LiquidCard className="p-0 overflow-hidden group" href={null}>
                  <div className="flex w-max animate-scroll">
                    {/* Duplicate list for seamless loop */}
                    {[...PHOTOS, ...PHOTOS].map((photo, index) => (
                      <div key={index} className="relative h-64 shrink-0 border-r border-white/5 last:border-0">
                         <img 
                           src={photo.src} 
                           alt={photo.desc} 
                           className="h-full w-auto object-cover opacity-100 transition-all duration-500"
                         />
                         {/* Overlay gradient for better text readability */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         
                         <div className="absolute bottom-4 left-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 shadow-xl">
                              {photo.desc}
                            </span>
                         </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Vignette Overlay to fade edges */}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_20px_0_20px_-10px_#000,inset_-20px_0_20px_-10px_#000] opacity-50"></div>
                </LiquidCard>
              </div>
            </section>

            {/* --- MOBILE CONNECT (Visible only on small screens) --- */}
            <div className="lg:hidden mt-8 mb-8 space-y-8 border-t border-white/10 pt-8">
                <div className="flex gap-6 justify-center">
                  <SocialButton href={PERSONAL_INFO.github} icon={Github} />
                  <SocialButton href={PERSONAL_INFO.linkedin} icon={Linkedin} />
                  <SocialButton href={`mailto:${PERSONAL_INFO.email}`} icon={Mail} />
                </div>
                <a href={PERSONAL_INFO.cv_link} className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 rounded-lg transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-lg group">
                     <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" /> 
                     <span>Download Resume</span>
                </a>
            </div>

            <footer className="text-center text-[10px] text-slate-400 font-mono uppercase tracking-widest pt-12">
               © 2025 Rati Vardiashvili.
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
}