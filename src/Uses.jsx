import React from 'react';
import { Monitor, Cpu, HardDrive, Terminal, Type, Command, Coffee, MousePointer, Layers, ArrowLeft, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';

const UsesSection = ({ title, icon: Icon, items }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6 opacity-90 border-b border-white/10 pb-4">
      {Icon && <Icon size={20} className="text-purple-400" />}
      <h2 className="text-lg font-bold font-mono uppercase tracking-widest text-white">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all group">
          <h3 className="font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{item.name}</h3>
          <p className="text-sm text-slate-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function Uses() {
  const hardware = [
    { name: "ASUS TUF F15 Laptop", desc: "Gaming Laptop with Intel Core Processor, NVIDIA GeForce RTX GPU, 15.6-inch 144Hz display, 16GB+ RAM, 512GB+ SSD." }
  ];

  const software = [
    { name: "VS Code", desc: "My primary code editor. Customized with the Dracula theme." },
    { name: "IntelliJ IDEA", desc: "Go-to IDE for Java/JVM development." },
    { name: "Postman", desc: "For API development, testing, and documentation." },
    { name: "Gemini", desc: "AI assistant for coding and problem-solving." },
    { name: "Stack Overflow", desc: "Invaluable resource for programming Q&A and problem-solving." },
    { name: "Alacritty", desc: "GPU-accelerated terminal emulator for speed and simplicity." }
  ];

  const os = [
    { name: "Manjaro Linux", desc: "My daily driver operating system." },
    { name: "Kali Linux", desc: "For penetration testing and ethical hacking." }
  ];

  const everyday = [
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 text-white min-h-screen">
      <SEO 
        title="Uses" 
        description="Hardware, software, and tools I use to build software." 
      />
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-serif mb-4">Uses</h1>
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
          A curated list of the hardware, software, and tools I use to build software and stay productive.
        </p>
      </div>

      <UsesSection title="Hardware" icon={Monitor} items={hardware} />
      <UsesSection title="Operating System" icon={HardDrive} items={os} />
      <UsesSection title="Software" icon={Terminal} items={software} />
      {everyday.length > 0 && <UsesSection title="Everyday Essentials" icon={Coffee} items={everyday} />}
    </div>
  );
}
