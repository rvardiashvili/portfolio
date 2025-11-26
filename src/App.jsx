import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ArtsyBackground } from './components/UI';
import Home from './Home';
import Blog from './Blog';
import BlogPostPage from './BlogPostPage';
import Uses from './Uses';
import Contact from './Contact';
import NotFound from './NotFound';
import Now from './Now';
import ScrollToTop from './components/ScrollToTop';
import CommandPalette from './components/CommandPalette';
import SnakeGame from './components/SnakeGame';

export default function App() {
  const location = useLocation();
  const [partyMode, setPartyMode] = useState(false);
  const [showSnake, setShowSnake] = useState(false);

  // --- EASTER EGG 1: Console Greeting ---
  useEffect(() => {
    console.log(
      "%c👋 Hey there, fellow dev!",
      "color: #a855f7; font-size: 20px; font-weight: bold; font-family: monospace;"
    );
    console.log(
      "%cCurious about the code? It's React + Vite + Tailwind. \nFound a bug? Let me know at vardiashvilirati33@gmail.com",
      "color: #e2e8f0; font-size: 12px; font-family: monospace;"
    );
    console.log(
      "%cTry entering the Konami Code...", 
      "color: #4ade80; font-size: 10px; font-style: italic;"
    );
  }, []);

  // --- LISTEN FOR CUSTOM EVENTS (FROM COMMAND PALETTE) ---
  useEffect(() => {
    const toggleSnake = () => setShowSnake(prev => !prev);

    window.addEventListener('toggle-snake', toggleSnake);
    return () => {
      window.removeEventListener('toggle-snake', toggleSnake);
    };
  }, []);

  // --- EASTER EGG 2: Konami Code (Party Mode) ---
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];
    let cursor = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[cursor]) {
        cursor++;
        if (cursor === konamiCode.length) {
          setPartyMode(prev => !prev);
          cursor = 0;
        }
      } else {
        cursor = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen font-sans text-white selection:bg-purple-500/30 selection:text-white flex bg-[#1e1b29] custom-scrollbar">
      
      <style>{`
        /* --- PARTY MODE STYLES --- */
        ${partyMode ? `
          @keyframes rainbow { 
            0% { filter: hue-rotate(0deg) contrast(1.2); }
            100% { filter: hue-rotate(360deg) contrast(1.2); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          body {
            animation: rainbow 2s linear infinite;
            overflow-x: hidden;
          }
          div, section, p, h1, h2, h3, img {
            animation: float 3s ease-in-out infinite;
            animation-delay: calc(var(--order, 0) * 0.1s);
          }
          #main-scroll-container {
             animation: none;
          }
        ` : ''}
      `}</style>
      
      {partyMode && <ConfettiCanvas />}
      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
      
      <ArtsyBackground />
      <CommandPalette />

      <div id="main-scroll-container" className="relative z-10 w-full">
         <>
           <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/uses" element={<Uses />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/now" element={<Now />} />
              <Route path="*" element={<NotFound />} />
           </Routes>
           <ScrollToTop />
         </>
      </div>
    </div>
  );
}

const ConfettiCanvas = () => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 4 - 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5
    });

    // Create initial burst
    for(let i=0; i<100; i++) {
        particles.push({
            ...createParticle(),
            y: Math.random() * canvas.height, // Start everywhere
        });
    }

    let animationId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles occasionally
      if (Math.random() < 0.1) particles.push(createParticle());

      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();

        if (p.y > canvas.height) {
           p.y = -10;
           p.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};