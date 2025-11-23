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

export default function App() {
  const location = useLocation();
  const [retroMode, setRetroMode] = useState(false);

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

  // --- EASTER EGG 2: Konami Code (Retro Mode) ---
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
          setRetroMode(prev => !prev);
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
        /* Custom Scrollbar for the whole app */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        /* --- RETRO MODE STYLES --- */
        ${retroMode ? `
          * {
            font-family: 'Courier New', Courier, monospace !important;
            color: #00ff00 !important;
            border-color: #00ff00 !important;
            background-color: #000000 !important;
            background-image: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            text-shadow: 0 0 5px #00ff00;
          }
          img, canvas {
            display: none !important;
          }
          ::selection {
            background: #00ff00 !important;
            color: #000000 !important;
          }
          /* Scanline effect */
          body::before {
            content: " ";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            z-index: 9999;
            background-size: 100% 2px, 3px 100%;
            pointer-events: none;
          }
        ` : ''}
      `}</style>

      <ArtsyBackground />
      <CommandPalette />

      <div id="main-scroll-container" className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar">
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
           <ScrollToTop containerId="main-scroll-container" />
         </>
      </div>
    </div>
  );
}