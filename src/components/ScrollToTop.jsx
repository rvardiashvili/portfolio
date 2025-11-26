import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ containerId }) {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  // 1. Auto-scroll to top on route change
  useEffect(() => {
    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        container.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, containerId]);

  // 2. Show/Hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      let scrollTop = 0;
      if (containerId) {
        const container = document.getElementById(containerId);
        if (container) scrollTop = container.scrollTop;
      } else {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
      }

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const target = containerId ? document.getElementById(containerId) : window;
    if (target) {
      target.addEventListener('scroll', toggleVisibility);
      return () => target.removeEventListener('scroll', toggleVisibility);
    }
  }, [containerId]);

  const scrollToTop = () => {
    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-110 border border-white/10"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
