import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar } from 'lucide-react';
import { posts } from './posts';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <div className="text-white p-8">Post not found</div>;
  }

  // Simple frontmatter stripper
  const content = post.content.replace(/---[\s\S]*?---/, '').trim();

  return (
    <div className="max-w-3xl mx-auto p-8 text-white min-h-screen">
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Blog
      </Link>
      
      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-8 border-b border-white/10 pb-8">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
        </div>
        
        <ReactMarkdown 
            components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mt-8 mb-4 font-serif" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-white mt-8 mb-4 font-serif" {...props} />,
                p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="ml-4" {...props} />,
                a: ({node, ...props}) => <a className="text-purple-400 hover:text-purple-300 underline underline-offset-4" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                code: ({node, inline, ...props}) => 
                    inline 
                    ? <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-purple-300" {...props} />
                    : <code className="block bg-[#1e1b29] border border-white/10 p-4 rounded-lg text-sm font-mono text-slate-300 overflow-x-auto mb-4" {...props} />
            }}
        >
            {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
