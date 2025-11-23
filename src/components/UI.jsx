import React, { useState, useEffect, useRef } from 'react';

/* --- BACKGROUND: TWILIGHT STUDIO --- */
export const ArtsyBackground = () => {
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
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#1e1b29]">
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[120px] animate-slow-pan mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-[120px] animate-slow-pan mix-blend-screen" style={{animationDelay: '5s'}}></div>
      <div className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-rose-500/10 rounded-full blur-[100px] animate-slow-pan mix-blend-screen" style={{animationDelay: '10s'}}></div>
      <img 
        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
        alt="Art Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay scale-105 animate-slow-pan grayscale"
      />
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay pointer-events-none z-20" />
    </div>
  );
};

/* --- LIQUID GLASS UI --- */
export const LiquidCard = ({ children, className = "", href }) => {
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

export const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-white/10 text-white border border-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
  >
    <Icon size={16} />
    <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export const TechTile = ({ icon: Icon, label, color = "text-slate-300" }) => (
  <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all duration-200 cursor-default">
    <Icon size={18} className={color} />
    <span className="text-[10px] font-mono font-bold text-slate-400">{label}</span>
  </div>
);

export const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6 pl-1 opacity-90">
    {Icon && <Icon size={16} className="text-purple-400" />}
    <h2 className="text-sm font-bold font-mono uppercase tracking-widest text-white">{title}</h2>
    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
  </div>
);

export const SocialButton = ({ icon: Icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="text-slate-400 hover:text-white hover:scale-110 transition-all p-2"
  >
    <Icon size={20} />
  </a>
);
