import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Code,
  BookOpen,
  Activity,
  Database,
  Terminal,
  Layers,
  Cpu,
  Server,
  Camera,
  Globe,
  Download,
  GraduationCap,
  Briefcase,
  Hash,
  Box,
  User,
  FileText,
  Monitor,
  Send,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiquidCard, NavItem, TechTile, SectionHeader, SocialButton } from './components/UI';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE, PROJECTS, BOOKS, PHOTOS } from './data';
import SEO from './components/SEO';

export default function Home() {
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
    <div className="relative z-10 w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:p-12 h-full flex gap-8 items-start h-screen">
      <SEO />
      
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
                     <div className="absolute inset-0 rounded-full border-2 border-emerald-500/50 animate-pulse"></div>
                  </div>
                  
                  <h1 className="text-2xl font-serif tracking-tight text-white mb-1">
                     Rati Vardiashvili
                  </h1>
                  <p className="text-xs font-mono text-slate-300 uppercase tracking-widest mb-4">
                     Software Engineer
                  </p>
                  
                  <div className="mb-4 h-[20px]"> 
                    <div className="typewriter inline-block text-xs font-mono text-orange-400">
                        {PERSONAL_INFO.tagline}
                    </div>
                  </div>
                  
                  <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 inline-flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                     <span className="text-[10px] font-mono text-slate-200 uppercase tracking-widest">Available</span>
                  </div>
               </div>

               {/* Navigation */}
               <nav className="space-y-1 mb-6">
                 <NavItem icon={User} label="Profile" active={activeSection === 'profile'} onClick={() => scrollToSection('profile')} />
                 <NavItem icon={Briefcase} label="Experience" active={activeSection === 'experience'} onClick={() => scrollToSection('experience')} />
                 <NavItem icon={Hash} label="Projects" active={activeSection === 'projects'} onClick={() => scrollToSection('projects')} />
                 <NavItem icon={GraduationCap} label="Education" active={activeSection === 'education'} onClick={() => scrollToSection('education')} />
                 <NavItem icon={Activity} label="Personal" active={activeSection === 'personal'} onClick={() => scrollToSection('personal')} />
               </nav>

               {/* New Pages Nav */}
               <div className="pt-4 border-t border-white/10 space-y-1">
                    <Link to="/now" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                        <Clock size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Now</span>
                    </Link>
                    <Link to="/blog" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                        <FileText size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Blog</span>
                    </Link>
                    <Link to="/uses" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                        <Monitor size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Uses</span>
                    </Link>
                    <Link to="/contact" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                        <Send size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Contact</span>
                    </Link>
               </div>
             </div>

             {/* Connect Section - Fixed to Bottom */}
             <div className="space-y-6">
                {/* Clean Social Icons */}
                <div className="flex gap-6 justify-center">
                  <SocialButton href={PERSONAL_INFO.github} icon={Github} label="GitHub Profile" />
                  <SocialButton href={PERSONAL_INFO.linkedin} icon={Linkedin} label="LinkedIn Profile" />
                  <SocialButton href={`mailto:${PERSONAL_INFO.email}`} icon={Mail} label="Email Me" />
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

          {/* --- MOBILE HEADER --- */}
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
              
              {/* Mobile Nav Links */}
              <div className="flex gap-4 mt-4">
                  <Link to="/now" className="text-xs font-bold uppercase tracking-widest text-purple-400">Now</Link>
                  <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-purple-400">Blog</Link>
                  <Link to="/uses" className="text-xs font-bold uppercase tracking-widest text-purple-400">Uses</Link>
                  <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-purple-400">Contact</Link>
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
            <div className="relative pl-6 border-l border-white/10 space-y-8 ml-2">
              {EXPERIENCE.map((job, idx) => (
                <div key={idx} className="relative">
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
              
              {/* Spotify Embed */}
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

              {/* Reading */}
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
                  {[...PHOTOS, ...PHOTOS].map((photo, index) => (
                    <div key={index} className="relative h-64 shrink-0 border-r border-white/5 last:border-0">
                       <img 
                         src={photo.src} 
                         alt={photo.desc} 
                         className="h-full w-auto object-cover opacity-100 transition-all duration-500"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       
                       <div className="absolute bottom-4 left-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 shadow-xl">
                            {photo.desc}
                          </span>
                       </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_20px_0_20px_-10px_#000,inset_-20px_0_20px_-10px_#000] opacity-50"></div>
              </LiquidCard>
            </div>
          </section>

          {/* --- MOBILE CONNECT --- */}
          <div className="lg:hidden mt-8 mb-8 space-y-8 border-t border-white/10 pt-8">
              <div className="flex gap-6 justify-center">
                <SocialButton href={PERSONAL_INFO.github} icon={Github} label="GitHub Profile" />
                <SocialButton href={PERSONAL_INFO.linkedin} icon={Linkedin} label="LinkedIn Profile" />
                <SocialButton href={`mailto:${PERSONAL_INFO.email}`} icon={Mail} label="Email Me" />
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
  );
}
