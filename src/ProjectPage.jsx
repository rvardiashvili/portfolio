import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { ArrowLeft, Github, AlignLeft } from 'lucide-react';
import { projects } from './projects';
import { PROJECTS } from './data';
import SEO from './components/SEO';
import ProgressBar from './components/ProgressBar';

const slugify = (text) => {
  if (!text) return '';
  
  const toString = (node) => {
    if (typeof node === 'string' || typeof node === 'number') return node;
    if (Array.isArray(node)) return node.map(toString).join('');
    if (node?.props?.children) return toString(node.props.children);
    return String(node);
  };

  return toString(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start
    .replace(/-+$/, '');      // Trim - from end
};

export default function ProjectPage() {
  const { slug } = useParams();
  const projectContent = projects.find(p => p.slug === slug);
  const projectMeta = PROJECTS.find(p => p.link.endsWith(`/${slug}`));
  const [headings, setHeadings] = useState([]);

  const project = {
      ...projectContent,
      ...projectMeta,
      tags: projectMeta?.tags || []
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Parse headings with numbering
  useEffect(() => {
    if (projectContent?.content) {
      const lines = projectContent.content.split('\n');
      const extracted = [];
      let inCodeBlock = false;
      let h1 = 0, h2 = 0, h3 = 0;

      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('```')) { inCodeBlock = !inCodeBlock; return; }
        if (!inCodeBlock) {
          const match = trimmedLine.match(/^(#{1,3})\s+(.+)$/);
          if (match) {
            const level = match[1].length;
            const title = match[2].trim();
            const id = slugify(title);
            let number = '';
            if (level === 1) { h1++; h2 = 0; h3 = 0; number = `${h1}.`; } 
            else if (level === 2) { h2++; h3 = 0; number = `${h1}.${h2}`}
            else if (level === 3) { h3++; number = `${h1}.${h2}.${h3}`}
            extracted.push({ id, title, level, number });
          }
        }
      });
      setHeadings(extracted);
    }
  }, [projectContent]);

  if (!projectContent) return <div className="text-white p-8">Project not found</div>;

  const content = project.content.replace(/---[\s\S]*?---/, '').trim();
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1b29] text-white">
      <ProgressBar containerId="main-scroll-container" />
      <SEO title={project.title} description={project.description} type="article" />
      
      {/* FIXED SIDEBAR */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 w-80 h-screen border-r border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl z-20">
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-10 text-left">
                <ArrowLeft size={16} /> Back to Home
            </Link>

            <div className="mb-8">
                <h1 className="text-xl font-serif font-bold text-white mb-2">{project.title}</h1>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full uppercase">
                    {project.category}
                </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 mb-4 border-b border-white/10 pb-2">
                <AlignLeft size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Contents</span>
            </div>

            <nav>
                <ul className="space-y-2">
                    {headings.map(heading => (
                        <li key={heading.id} className={heading.level === 1 ? 'mt-4' : ''}>
                            <button
                                onClick={() => scrollToHeading(heading.id)}
                                className="group flex items-start text-left w-full transition-all text-xs font-mono text-zinc-500 hover:text-zinc-300"
                            >
                                <span className="mr-2 mt-1 w-1 h-1 rounded-full shrink-0 bg-transparent group-hover:bg-zinc-700"></span>
                                <span className="opacity-50 mr-1">{heading.number}</span>
                                <span>{heading.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
      </aside>

      {/* SCROLLABLE CONTENT AREA */}
      <main className="lg:ml-80 min-h-screen">
          <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-20">
              <div className="mb-16 border-b border-white/10 pb-10">
                  <div className="lg:hidden mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft size={16} /> Back
                    </Link>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{project.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                      {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-slate-300">
                              {tag}
                          </span>
                      ))}
                  </div>

                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-xl text-sm font-bold transition-all">
                        <Github size={20} />
                        <span>View Repository</span>
                    </a>
                  )}
              </div>

              <article className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        h1: ({node, ...props}) => <h1 id={slugify(props.children)} className="text-3xl font-bold text-white mt-16 mb-8 font-serif border-b border-white/5 pb-4 scroll-mt-28" {...props} />,
                        h2: ({node, ...props}) => <h2 id={slugify(props.children)} className="text-2xl font-bold text-white mt-12 mb-6 font-serif scroll-mt-28" {...props} />,
                        h3: ({node, ...props}) => <h3 id={slugify(props.children)} className="text-xl font-bold text-white mt-10 mb-4 font-serif scroll-mt-28" {...props} />,
                        p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-8" {...props} />,
                        table: ({node, ...props}) => <div className="overflow-x-auto my-10 rounded-xl border border-white/10 shadow-2xl"><table className="min-w-full divide-y divide-white/10" {...props} /></div>,
                        thead: ({node, ...props}) => <thead className="bg-white/5" {...props} />,
                        th: ({node, ...props}) => <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-widest" {...props} />,
                        td: ({node, ...props}) => <td className="px-6 py-4 text-sm text-slate-400 border-t border-white/5" {...props} />,
                        img: ({node, ...props}) => {
                            let src = props.src;
                            if (src?.startsWith('/')) src = `${import.meta.env.BASE_URL}${src.slice(1)}`;
                            return <figure className="my-14"><img {...props} src={src} className="rounded-2xl border border-white/10 shadow-2xl w-full" />{props.alt && <figcaption className="text-center text-xs text-slate-500 mt-4 font-mono">{props.alt}</figcaption>}</figure>;
                        },
                        pre: ({children}) => {
                            const codeText = React.isValidElement(children) ? (Array.isArray(children.props.children) ? children.props.children.join('') : children.props.children) : "";
                            const [copied, setCopied] = React.useState(false);
                            return <div className="relative group mb-10"><button onClick={() => {navigator.clipboard.writeText(codeText); setCopied(true); setTimeout(() => setCopied(false), 2000);}} className="absolute right-4 top-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-all border border-white/5 text-[10px] font-bold uppercase">{copied ? 'Copied!' : 'Copy'}</button><pre className="block bg-[#0d0c12] border border-white/5 p-6 rounded-2xl text-sm font-mono text-slate-300 overflow-x-auto [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit leading-relaxed">{children}</pre></div>;
                        },
                        code: ({children}) => <code className="bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded text-sm font-mono text-purple-200">{children}</code>
                    }}
                >
                    {content}
                </ReactMarkdown>
              </article>
          </div>
      </main>
    </div>
  );
}
