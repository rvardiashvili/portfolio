import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Briefcase, 
  Hash, 
  GraduationCap, 
  Activity, 
  FileText, 
  Monitor, 
  Send, 
  Clock, 
  Github, 
  Linkedin, 
  Mail,
  Copy,
  Check,
  ArrowUp,
  Trophy
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Toggle with Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <>
      {/* Helper hint visible on desktop */}
      <div className="fixed bottom-4 left-4 z-50 hidden md:flex items-center gap-2 text-[10px] text-slate-500 font-mono bg-black/40 px-2 py-1 rounded border border-white/5 pointer-events-none">
        <span className="bg-white/10 px-1 rounded">⌘</span>
        <span>K</span>
        <span>to command</span>
      </div>

      <Command.Dialog 
        open={open} 
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] bg-[#1e1b29]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[9999] p-2 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-3 pb-2 mb-2">
             <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
             <Command.Input 
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500 text-sm font-mono py-2"
             />
        </div>
        
        <Command.List className="max-h-[300px] overflow-y-auto custom-scrollbar px-1">
          <Command.Empty className="py-6 text-center text-slate-500 text-sm">No results found.</Command.Empty>

          <Command.Group heading="Navigation" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">
            <CommandItem icon={Home} onSelect={() => runCommand(() => navigate('/'))}>Home</CommandItem>
            <CommandItem icon={Clock} onSelect={() => runCommand(() => navigate('/now'))}>Now</CommandItem>
            <CommandItem icon={FileText} onSelect={() => runCommand(() => navigate('/blog'))}>Blog</CommandItem>
            <CommandItem icon={Monitor} onSelect={() => runCommand(() => navigate('/uses'))}>Uses</CommandItem>
            <CommandItem icon={Send} onSelect={() => runCommand(() => navigate('/contact'))}>Contact</CommandItem>
          </Command.Group>

          <Command.Group heading="Social" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2 mt-4">
            <CommandItem icon={Github} onSelect={() => runCommand(() => window.open(PERSONAL_INFO.github, '_blank'))}>GitHub</CommandItem>
            <CommandItem icon={Linkedin} onSelect={() => runCommand(() => window.open(PERSONAL_INFO.linkedin, '_blank'))}>LinkedIn</CommandItem>
            <CommandItem 
                icon={copied ? Check : Mail} 
                onSelect={(e) => { e.preventDefault(); copyEmail(); }}
            >
                {copied ? 'Email Copied!' : 'Copy Email Address'}
            </CommandItem>
          </Command.Group>

          <Command.Group heading="Sections" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2 mt-4">
             <CommandItem icon={User} onSelect={() => runCommand(() => { navigate('/'); setTimeout(() => document.getElementById('profile')?.scrollIntoView({behavior:'smooth'}), 100); })}>Profile</CommandItem>
             <CommandItem icon={Briefcase} onSelect={() => runCommand(() => { navigate('/'); setTimeout(() => document.getElementById('experience')?.scrollIntoView({behavior:'smooth'}), 100); })}>Experience</CommandItem>
             <CommandItem icon={Hash} onSelect={() => runCommand(() => { navigate('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}), 100); })}>Projects</CommandItem>
             <CommandItem icon={GraduationCap} onSelect={() => runCommand(() => { navigate('/'); setTimeout(() => document.getElementById('education')?.scrollIntoView({behavior:'smooth'}), 100); })}>Education</CommandItem>
          </Command.Group>

          <Command.Group heading="System" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2 mt-4">
             <CommandItem icon={Activity} onSelect={() => runCommand(() => {
                document.body.style.transition = 'transform 1s ease-in-out';
                document.body.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                  document.body.style.transition = 'none';
                  document.body.style.transform = 'none';
                }, 1000);
             })}>Do a Barrel Roll</CommandItem>

             <CommandItem icon={({size}) => <div style={{transform: 'rotate(180deg)'}}><ArrowUp size={size} /></div>} onSelect={() => runCommand(() => {
                const elements = document.querySelectorAll('div, p, h1, h2, h3, span, img, a, button');
                elements.forEach(el => {
                    // Don't affect the command palette itself immediately so it doesn't glitch out
                    if (el.closest('[role="dialog"]')) return;
                    
                    const randomRotation = Math.random() * 360;
                    const randomDuration = 0.5 + Math.random() * 1.5;
                    const randomDelay = Math.random() * 0.5;
                    
                    el.style.transition = `transform ${randomDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${randomDelay}s`;
                    el.style.transform = `translateY(${window.innerHeight + 200}px) rotate(${randomRotation}deg)`;
                });
             })}>Gravity (Chaos Mode)</CommandItem>
          </Command.Group>

          <Command.Group heading="Extras" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2 mt-4">
            <CommandItem icon={Trophy} onSelect={() => runCommand(() => window.dispatchEvent(new CustomEvent('toggle-snake')))}>Play Snake</CommandItem>
          </Command.Group>
        </Command.List>

        <div className="border-t border-white/10 mt-2 pt-2 px-2 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-mono">Use arrow keys to navigate</span>
            <span className="text-[10px] text-slate-500 font-mono">ESC to close</span>
        </div>
      </Command.Dialog>
    </>
  );
}

const CommandItem = ({ children, icon: Icon, onSelect }) => {
  return (
    <Command.Item 
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-all mb-1"
    >
      <Icon size={14} />
      <span>{children}</span>
    </Command.Item>
  );
};
