import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '../src/posts');
const PUBLIC_DIR = path.join(__dirname, '../public');
const BASE_URL = 'https://rvardiashvili.github.io/portfolio';

// Ensure public dir exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

// 1. Get all posts
const getPosts = () => {
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  return files.map(filename => {
    const content = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = content.match(frontmatterRegex);
    
    let metadata = {};
    if (match) {
      match[1].split('\n').forEach(line => {
        const [key, ...value] = line.split(':');
        if (key && value.length) {
            let val = value.join(':').trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            metadata[key.trim()] = val;
        }
      });
    }

    // Use slug from frontmatter or filename
    const slug = metadata.slug || filename.replace('.md', '');
    return {
      ...metadata,
      slug,
      filename
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
};

const posts = getPosts();

// 2. Generate Sitemap
const generateSitemap = () => {
  const date = new Date().toISOString().split('T')[0];
  
  const staticRoutes = ['', 'blog', 'uses', 'contact', 'now'];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${BASE_URL}/#/${route}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${posts.map(post => `  <url>
    <loc>${BASE_URL}/#/blog/${post.slug}</loc>
    <lastmod>${post.date || date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');
};

// 3. Generate RSS Feed
const generateRSS = () => {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Rati Vardiashvili's Blog</title>
  <link>${BASE_URL}</link>
  <description>Thoughts on software engineering, distributed systems, and data engineering.</description>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts.map(post => `  <item>
    <title><![CDATA[${post.title || 'Untitled'}]]></title>
    <link>${BASE_URL}/#/blog/${post.slug}</link>
    <guid isPermaLink="true">${BASE_URL}/#/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${post.description || ''}]]></description>
  </item>`).join('\n')}
</channel>
</rss>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss);
  console.log('✅ Generated rss.xml');
};

generateSitemap();
generateRSS();
