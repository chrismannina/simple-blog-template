import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  coverImage?: string;
}

// Get all post files using Vite's import.meta.glob
const postFiles = import.meta.glob('/src/posts/*.md', { query: '?raw', eager: false });

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    // Load all posts dynamically
    const posts: PostMeta[] = [];
    
    // Process each post file
    for (const path in postFiles) {
      try {
        // Extract slug from filename
        const slug = path.split('/').pop()?.replace('.md', '');
        
        if (!slug) continue;
        
        // Load the post content
        const content = await postFiles[path]() as { default: string };
        
        // Parse frontmatter
        const { data } = matter(content.default);
        
        // Add to posts array
        posts.push({
          slug,
          title: data.title || "Untitled Post",
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          excerpt: data.excerpt || "",
          tags: Array.isArray(data.tags) ? data.tags : [],
          coverImage: data.coverImage || "",
        });
      } catch (error) {
        console.error(`Error processing post file ${path}:`, error);
      }
    }
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; content: string }> {
  try {
    // Find the path for the requested slug
    const postPath = Object.keys(postFiles).find(path => {
      return path.split('/').pop()?.replace('.md', '') === slug;
    });
    
    if (!postPath) {
      throw new Error(`Post not found: ${slug}`);
    }
    
    // Load the post content
    const module = await postFiles[postPath]() as { default: string };
    const postContent = module.default;
    
    // Parse the frontmatter and content
    const { data, content } = matter(postContent);
    
    const title = String(data.title || "Untitled Post");
    
    // Remove duplicate H1 title from content if it exists
    let cleanedContent = content.trim();
    const titlePattern = new RegExp(`^\\s*# ${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*?\n`, 'i');
    cleanedContent = cleanedContent.replace(titlePattern, '');
    
    return {
      meta: {
        slug,
        title: title,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        excerpt: String(data.excerpt || ""),
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: String(data.coverImage || ""),
      },
      content: cleanedContent,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw new Error(`Post not found: ${slug}`);
  }
}
