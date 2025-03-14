
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  coverImage?: string;
}

// This is a mock function that simulates loading posts from markdown files
// In a real implementation, you would use a library like 'import.meta.glob'
// or a Node.js-based solution to read files from the filesystem
export async function getAllPosts(): Promise<PostMeta[]> {
  // In a real implementation, this would read files from the file system
  const mockPosts = [
    {
      slug: "hello-world",
      content: await import("@/posts/hello-world.md?raw").then(module => module.default),
    },
    {
      slug: "markdown-guide",
      content: await import("@/posts/markdown-guide.md?raw").then(module => module.default),
    },
    {
      slug: "simplicity-in-design",
      content: await import("@/posts/simplicity-in-design.md?raw").then(module => module.default),
    },
    {
      slug: "web-development-trends",
      content: await import("@/posts/web-development-trends.md?raw").then(module => module.default),
    },
    {
      slug: "minimalist-workspace",
      content: await import("@/posts/minimalist-workspace.md?raw").then(module => module.default),
    },
  ];

  // Parse frontmatter from each post
  const posts = mockPosts.map(({ slug, content }) => {
    try {
      // Properly parse the markdown content with gray-matter
      const { data } = matter(content);
      
      // Ensure we extract and format metadata correctly
      return {
        slug,
        title: data.title || "Untitled Post",
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        excerpt: data.excerpt || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage || "",
      };
    } catch (error) {
      console.error(`Error parsing frontmatter for ${slug}:`, error);
      return {
        slug,
        title: "Untitled Post",
        date: new Date().toISOString(),
        excerpt: "",
        tags: [],
        coverImage: "",
      };
    }
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; content: string }> {
  try {
    let postContent;
    
    // In a real implementation, you would dynamically import the post file
    if (slug === "hello-world") {
      postContent = await import("@/posts/hello-world.md?raw").then(module => module.default);
    } else if (slug === "markdown-guide") {
      postContent = await import("@/posts/markdown-guide.md?raw").then(module => module.default);
    } else if (slug === "simplicity-in-design") {
      postContent = await import("@/posts/simplicity-in-design.md?raw").then(module => module.default);
    } else if (slug === "web-development-trends") {
      postContent = await import("@/posts/web-development-trends.md?raw").then(module => module.default);
    } else if (slug === "minimalist-workspace") {
      postContent = await import("@/posts/minimalist-workspace.md?raw").then(module => module.default);
    } else {
      throw new Error(`Post not found: ${slug}`);
    }
    
    // Parse the frontmatter and content using gray-matter
    const { data, content } = matter(postContent);
    
    // Extract the actual content without any frontmatter
    // The content returned by gray-matter should already have frontmatter removed,
    // but let's ensure we're not including any part of the frontmatter in the content
    return {
      meta: {
        slug,
        title: String(data.title || "Untitled Post"),
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        excerpt: String(data.excerpt || ""),
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: String(data.coverImage || ""),
      },
      // Return only the content part without any frontmatter
      // Remove any duplicate h1 title that might be in the content if it matches the meta title
      content: content.trim(),
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw new Error(`Post not found: ${slug}`);
  }
}
