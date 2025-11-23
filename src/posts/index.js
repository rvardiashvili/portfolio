const modules = import.meta.glob('./*.md', { as: 'raw', eager: true });

export const posts = Object.entries(modules).map(([path, content]) => {
  // 1. Extract Frontmatter (YAML-like header)
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = content.match(frontmatterRegex);
  const frontmatter = {};

  if (match) {
    const frontmatterString = match[1];
    
    // Simple parser for "key: value" lines
    frontmatterString.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'" ) && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        frontmatter[key.trim()] = value;
      }
    });
  }

  // 2. Derive slug from filename if not provided
  // Example: "./my-post.md" -> "my-post"
  const filenameSlug = path.split('/').pop().replace('.md', '');

  return {
    slug: frontmatter.slug || filenameSlug,
    title: frontmatter.title || 'Untitled',
    date: frontmatter.date || '1970-01-01',
    description: frontmatter.description || '',
    content: content // We pass the raw content; the Page component handles stripping frontmatter
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first