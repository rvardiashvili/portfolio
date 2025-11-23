import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import SEO from './components/SEO';

export default function NotFound() {
  return (
    <>
    <SEO title="404 Not Found" description="This page could not be found in this sector of the galaxy." />
    <div className="h-full w-full flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] animate-pulse"></div>
         <div className="absolute bottom-[20%] right-[20%] w-64 h-64 bg-blue-600/10 rounded-full blur-[96px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="text-center relative z-10 max-w-lg">
        <div className="inline-block mb-6 relative">
             <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 rounded-full"></div>
             <h1 className="text-9xl font-bold font-serif text-white opacity-90 relative z-10">404</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4 font-serif">Lost in the Void</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The coordinates you entered seem to point to an uncharted sector. 
          This page has either been moved to another dimension or never existed at all.
        </p>

        <div className="flex justify-center gap-4">
             <Link 
               to="/" 
               className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest hover:bg-purple-50 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
             >
                <Home size={16} />
                Return Home
             </Link>
        </div>
      </div>

      {/* Decorative Code overlay */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-slate-700 hidden md:block">
        <p>{`> SYSTEM_ERROR: NAVIGATION_FAILURE`}</p>
        <p>{`> LOCATION: UNKNOWN_SECTOR`}</p>
        <p>{`> ADVICE: REROUTE_TO_HOME`}</p>
      </div>
    </div>
    </>
  );
}
