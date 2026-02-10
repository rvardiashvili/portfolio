import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { ArrowLeft, Calendar } from 'lucide-react';
import { posts } from './posts';
import SEO from './components/SEO';
import ProgressBar from './components/ProgressBar';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    if (container) container.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <>
        <SEO title="Post Not Found" />
        <div className="text-white p-8">Post not found</div>
      </>
    );
  }

  // Simple frontmatter stripper
  const content = post.content.replace(/---[\s\S]*?---/, '').trim();

  return (
    <div className="max-w-3xl mx-auto p-8 text-white min-h-screen">
      <ProgressBar containerId="main-scroll-container" />
      <SEO 
        title={post.title} 
        description={post.description} 
        type="article"
      />
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest text-left">
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
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mt-8 mb-4 font-serif" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold text-white mt-8 mb-4 font-serif" {...props} />,
                p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="ml-4" {...props} />,
                a: ({node, ...props}) => <a className="text-purple-400 hover:text-purple-300 underline underline-offset-4" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-8 rounded-lg border border-white/10">
                        <table className="min-w-full divide-y divide-white/10" {...props} />
                    </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-white/5" {...props} />,
                th: ({node, ...props}) => <th className="px-4 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider" {...props} />,
                td: ({node, ...props}) => <td className="px-4 py-3 text-sm text-slate-400 border-t border-white/5" {...props} />,
                img: ({node, ...props}) => {
                    let src = props.src;
                    if (src && src.startsWith('/') && !src.startsWith('//')) {
                        src = `${import.meta.env.BASE_URL}${src.slice(1)}`;
                    }
                    return <img {...props} src={src} className="rounded-lg border border-white/10 shadow-lg my-8 w-full" />;
                },
                pre: ({children, ...props}) => {
                    // Extract text for copy button
                    let codeText = "";
                    if (React.isValidElement(children)) {
                         if (typeof children.props.children === 'string') {
                             codeText = children.props.children;
                         } else if (Array.isArray(children.props.children)) {
                             codeText = children.props.children.join('');
                         }
                    }

                    const [copied, setCopied] = React.useState(false);
                    const handleCopy = () => {
                        navigator.clipboard.writeText(codeText);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    };

                    return (
                        <div className="relative group mb-4">
                            <button 
                                onClick={handleCopy}
                                className="absolute right-2 top-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 text-xs font-bold uppercase tracking-wider"
                                title="Copy code"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <pre className="block bg-[#1e1b29] border border-white/10 p-4 rounded-lg text-sm font-mono text-slate-300 overflow-x-auto [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit" {...props}>
                                {children}
                            </pre>
                        </div>
                    );
                },
                code: ({node, inline, className, children, ...props}) => {
                    return <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-purple-300" {...props}>{children}</code>;
                }
            }}
        >
            {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
