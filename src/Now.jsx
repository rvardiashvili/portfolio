import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, GraduationCap, BookOpen, Coffee, Activity, GitCommit, GitMerge } from 'lucide-react';
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
                      <h3 className="text-xl font-bold text-white mb-2">University Thesis & Graduation</h3>
                      <p className="text-slate-300 leading-relaxed mb-4">
                        My primary focus right now is completing my Bachelor's thesis. I am in the final stretch of my degree at Constructor University and preparing for graduation in <strong>January 2026</strong>.
                      </p>
                      <div className="flex gap-2">
                         <span className="text-[10px] px-2 py-1 bg-white/5 border border-white/5 rounded text-slate-400 font-mono uppercase">Deadline: Dec 2025</span>
                         <span className="text-[10px] px-2 py-1 bg-white/5 border border-white/5 rounded text-slate-400 font-mono uppercase">Status: Writing</span>
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
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs text-purple-400">{item.date}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1">
                            <GitMerge size={12} /> {item.commits} Commits
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">
                        {item.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {item.repos.map((repo) => (
                          <span key={repo} className="text-[10px] px-2 py-0.5 bg-slate-800/50 border border-white/5 rounded-full text-slate-400 font-mono">
                            {repo}
                          </span>
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
