import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, GraduationCap, BookOpen, Coffee, Activity, GitCommit, GitMerge, FolderGit2 } from 'lucide-react';
import { SectionHeader, LiquidCard } from './components/UI';
import SEO from './components/SEO';
import timelineData from './timeline.json';

export default function Now() {
  return (
    <>
      <SEO 
        title="Now" 
        description="What Rati Vardiashvili is currently focused on." 
      />
      <div className="max-w-4xl mx-auto p-8 text-white min-h-screen">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest w-fit">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-serif mb-4">Now</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">Derek Sivers</a>, this page tracks what I'm currently focused on.
          </p>
          <p className="text-xs font-mono text-slate-500 mt-4 uppercase tracking-widest">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Primary Focus */}
          <section>
             <SectionHeader title="The Main Mission" icon={Clock} />
             <LiquidCard className="p-8">
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                      <GraduationCap size={32} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2">Research Assistant @ Constructor University</h3>
                      <p className="text-slate-300 leading-relaxed mb-4">
                        I am now working full-time as a Research Assistant in Prof. Dr. Peter Baumann's research group. My focus is on advancing high-performance geospatial systems and contributing to scientific publications in the field.
                      </p>
                      <div className="flex gap-2">
                         <span className="text-[10px] px-2 py-1 bg-white/5 border border-white/5 rounded text-slate-400 font-mono uppercase">Status: Researching</span>
                         <span className="text-[10px] px-2 py-1 bg-white/5 border border-white/5 rounded text-slate-400 font-mono uppercase">Focus: Geospatial Systems</span>
                      </div>
                   </div>
                </div>
             </LiquidCard>
          </section>

          {/* Activity Timeline */}
          {timelineData.length > 0 && (
            <section>
              <SectionHeader title="Coding Activity" icon={Activity} />
              <div className="relative border-l border-slate-800 ml-3 space-y-8 pb-4">
                {timelineData.slice(0, 7).map((item, index) => (
                  <div key={index} className="ml-8 relative group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[41px] top-1 p-1 bg-slate-900 rounded-full border border-slate-800 group-hover:border-purple-500/50 transition-colors">
                      <GitCommit size={14} className="text-slate-500 group-hover:text-purple-400" />
                    </div>
                    
                    <LiquidCard className="p-5">
                      <div className="flex flex-col gap-2 mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-base text-purple-400">{item.date}</span>
                          <span className="text-sm font-bold text-white flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
                            <GitMerge size={14} className="text-purple-400" /> {item.commits} Commits
                          </span>
                        </div>
                        {(item.additions > 0 || item.deletions > 0) && (
                           <span className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 justify-end">
                              <Activity size={12} className="text-slate-500" /> 
                              <span className="text-green-400 font-bold">+{item.additions}</span> / <span className="text-red-400 font-bold">-{item.deletions}</span> Lines
                           </span>
                        )}
                      </div>
                      
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 pl-1 border-l-2 border-purple-500/20">
                        {item.summary}
                      </p>
                      
                      <div className="flex flex-col gap-2 mt-3">
                        {item.repos.map((repo) => (
                          <a 
                            key={repo} 
                            href={`https://github.com/${repo}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group w-fit flex items-center gap-2 text-[11px] px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-md text-purple-300 font-mono font-medium tracking-wide hover:bg-purple-500/20 hover:border-purple-500 transition-colors cursor-pointer"
                          >
                            <FolderGit2 size={12} className="text-purple-400/80 group-hover:text-purple-300" />
                            {repo}
                          </a>
                        ))}
                      </div>
                    </LiquidCard>
                  </div>
                ))}
              </div>
              {timelineData.length > 5 && (
                 <div className="ml-8 mt-4">
                    <p className="text-xs text-slate-600 italic">...and more history on GitHub.</p>
                 </div>
              )}
            </section>
          )}

          {/* Secondary */}
          <section className="grid md:grid-cols-2 gap-6">
             <div>
                <SectionHeader title="Reading" icon={BookOpen} />
                <LiquidCard className="p-6 h-full">
                   <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></div>
                         <div>
                            <p className="text-white font-bold text-sm">Academic Papers</p>
                            <p className="text-slate-400 text-xs">Deep diving into distributed systems literature for my thesis.</p>
                         </div>
                      </li>
                      <li className="flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2"></div>
                         <div>
                            <p className="text-white font-bold text-sm">Sci-Fi / Fantasy</p>
                            <p className="text-slate-400 text-xs">Reading "V for Vendetta".</p>
                         </div>
                      </li>
                   </ul>
                </LiquidCard>
             </div>

             <div>
                <SectionHeader title="Life" icon={Coffee} />
                 <LiquidCard className="p-6 h-full">
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                       Outside of academic crunch time, I'm exploring:
                    </p>
                    <ul className="list-disc list-inside text-slate-400 text-xs space-y-2 ml-2">
                       <li>Photography in Bremen's old town</li>
                       <li>Optimizing my Vim configuration (again)</li>
                       <li>Drinking too much coffee</li>
                    </ul>
                 </LiquidCard>
             </div>
          </section>

        </div>
      </div>
    </>
  );
}
