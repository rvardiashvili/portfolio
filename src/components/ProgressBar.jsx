import React, { useEffect, useState, useCallback } from 'react';

export default function ProgressBar({ containerId }) {
  const [width, setWidth] = useState(0);

  const handleScroll = useCallback(() => {
    let scrollTop, scrollHeight, clientHeight;
    
    const container = containerId ? document.getElementById(containerId) : null;
    
    if (container && container.scrollHeight > container.clientHeight) {
      scrollTop = container.scrollTop;
      scrollHeight = container.scrollHeight;
      clientHeight = container.clientHeight;
    } else {
      scrollTop = window.scrollY;
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = window.innerHeight;
    }

    const totalScroll = scrollHeight - clientHeight;
    const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;

    setWidth(currentProgress);
  }, [containerId]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [handleScroll]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent pointer-events-none">
      <div 
        className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
        style={{ width: `${width}%`, transition: 'width 0.1s ease-out' }}
      />
    </div>
  );
}
