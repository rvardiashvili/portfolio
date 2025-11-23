import React, { useEffect, useState } from 'react';

export default function ProgressBar({ containerId }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      const totalScroll = scrollHeight - clientHeight;
      const currentProgress = (scrollTop / totalScroll) * 100;

      setWidth(currentProgress);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerId]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent pointer-events-none">
      <div 
        className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
        style={{ width: `${width}%`, transition: 'width 0.1s ease-out' }}
      />
    </div>
  );
}
