import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { posts } from './posts';

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-white min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-serif mb-4">Blog</h1>
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
          Thoughts on software engineering, distributed systems, and my journey as a developer.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link 
            to={`/blog/${post.slug}`} 
            key={post.slug}
            className="block group"
          >
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               
               <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                 <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors font-serif">{post.title}</h2>
                 <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mt-2 md:mt-0">
                   <Calendar size={12} />
                   <span>{post.date}</span>
                 </div>
               </div>
               
               <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-2xl">
                 {post.description}
               </p>
               
               <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                 Read Article <ArrowRight size={12} />
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
