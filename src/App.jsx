import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ArtsyBackground } from './components/UI';
import Home from './Home';
import Blog from './Blog';
import BlogPostPage from './BlogPostPage';
import Uses from './Uses';
import Contact from './Contact';

export default function App() {
  const location = useLocation();

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
      `}</style>

      <ArtsyBackground />

      <div className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar">
         <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/uses" element={<Uses />} />
            <Route path="/contact" element={<Contact />} />
         </Routes>
      </div>
    </div>
  );
}