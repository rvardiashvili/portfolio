const modules = import.meta.glob('./*.md', { as: 'raw', eager: true });

export const projects = Object.entries(modules).map(([path, content]) => {
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
  const filenameSlug = path.split('/').pop().replace('.md', '');

  return {
    slug: frontmatter.slug || filenameSlug,
    title: frontmatter.title || 'Untitled',
    category: frontmatter.category || 'Project',
    description: frontmatter.description || '',
    repo: frontmatter.repo || '',
    content: content
  };
}); // No sorting needed for now, or sort by title? Default is fine.
