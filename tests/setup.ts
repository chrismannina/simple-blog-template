import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';

// Extend Vitest's expect method with React Testing Library methods
expect.extend(matchers);

// Run cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia - used by ThemeContext
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true
});

// Mock the ThemeContext
vi.mock('@/contexts/ThemeContext', () => {
  const setThemeMock = vi.fn((theme) => {
    // When setTheme is called, update the stored theme value
    if (typeof localStorage.setItem === 'function') {
      localStorage.setItem('theme', theme);
    }
  });

  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => {
      return React.createElement('div', null, children);
    },
    useTheme: () => {
      // Get theme from localStorage if available
      const storedTheme = typeof localStorage.getItem === 'function' 
        ? localStorage.getItem('theme') 
        : null;
      
      return {
        theme: storedTheme || 'light',
        setTheme: setThemeMock,
      };
    },
  };
});

// Mock the import.meta.glob functionality used for loading posts
vi.mock('@/posts/hello-world.md?raw', async () => {
  return {
    default: `---
title: Welcome to Simple Blog Template
date: 2025-07-15
excerpt: Get started with this minimal, fast-loading blog template built with React, Vite, and Markdown.
tags: ['getting-started', 'overview']
coverImage: https://images.unsplash.com/photo-1499750310107-5fef28a66643
---

# Welcome to Simple Blog Template

This demo site lets you experience the Simple Blog Template in action. Browse around to see the features, performance, and design options available to you.

## Key Features

- 🚀 Fast loading with Vite
- 📝 Write content in Markdown
- 🎨 Clean, minimalist design
- 🌙 Dark mode with system detection
- 📱 Fully responsive layout

Check out the other posts to learn more about customization options and how to make this template your own!`
  }
});

vi.mock('@/posts/markdown-guide.md?raw', async () => {
  return {
    default: `---
title: How to Format Your Blog Posts
date: 2025-07-10
excerpt: Learn how to use Markdown to create beautifully formatted blog posts with code snippets, lists, and more.
tags: ['markdown', 'tutorial']
coverImage: https://images.unsplash.com/photo-1455390582262-044cdead277a
---

# How to Format Your Blog Posts

This template uses Markdown for formatting your blog posts, making it easy to create rich content without dealing with HTML.

## Basic Formatting

**Bold text** is created with \`**double asterisks**\`

*Italic text* uses \`*single asterisks*\`

## Code Blocks

\`\`\`javascript
// Syntax highlighted code blocks
function sayHello() {
  console.log("Hello, blog reader!");
}
\`\`\`

## Lists

- Create lists with hyphens
- Add as many items as needed
  - Indent with two spaces for nested items

1. Numbered lists use numbers
2. They'll automatically stay in sequence

See the [Markdown Guide](https://www.markdownguide.org/) for more formatting options.`
  }
});

// Mock other posts in the same way
vi.mock('@/posts/simplicity-in-design.md?raw', async () => {
  return {
    default: `---
title: Customizing Your Blog Theme
date: 2025-06-20
excerpt: Learn how to personalize your blog with custom colors, fonts, and layout tweaks.
tags: ['customization', 'design']
coverImage: https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85
---

# Customizing Your Blog Theme

This template is designed to be easily customizable without diving deep into code.

## Theme Colors

Change your blog's accent color in \`blog.config.ts\`:

\`\`\`typescript
design: {
  accentColor: "blue", // Options: "indigo", "blue", "green", "amber"
  // Other settings...
}
\`\`\`

## Dark Mode Options

Configure dark mode behavior:

\`\`\`typescript
darkMode: {
  enabled: true,
  default: 'system', // Options: 'light', 'dark', 'system'
},
\`\`\`

## Typography and Layout

The template uses Tailwind CSS for styling, making it easy to tweak the design by modifying CSS classes in the component files.`
  }
});

vi.mock('@/posts/web-development-trends.md?raw', async () => {
  return {
    default: `---
title: Adding Images and Media to Posts
date: 2025-05-15
excerpt: Learn how to include images, videos, and other media in your blog posts for a richer reader experience.
tags: ['tutorial', 'media']
coverImage: https://images.unsplash.com/photo-1547658719-da2b51169166
---

# Adding Images and Media to Posts

Rich media makes your blog posts more engaging. Here's how to include different types of media.

## Images

Add images using standard Markdown syntax:

\`![Alt text for the image](https://example.com/path/to/image.jpg)\`

## Cover Images

Each post can have a cover image by adding the \`coverImage\` property to the frontmatter:

\`\`\`yaml
---
title: My Post Title
coverImage: https://example.com/path/to/image.jpg
---
\`\`\`

## Embedding Video

While Markdown doesn't directly support video embedding, you can use HTML within your Markdown:

\`\`\`html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allowfullscreen>
</iframe>
\`\`\`

The template's Markdown renderer is configured to allow HTML, making it easy to embed various media types.`
  }
});

vi.mock('@/posts/minimalist-workspace.md?raw', async () => {
  return {
    default: `---
title: Deploying Your Blog
date: 2025-04-10
excerpt: Step-by-step guide to deploying your Simple Blog to various hosting platforms like Vercel, Netlify, or GitHub Pages.
tags: ['deployment', 'tutorial']
coverImage: https://images.unsplash.com/photo-1497215728101-856f4ea42174
---

# Deploying Your Blog

Once you've customized your blog, you'll want to share it with the world. Here's how to deploy it to various platforms.

## Building for Production

First, build your project:

\`\`\`bash
npm run build
\`\`\`

This creates optimized files in the \`dist\` directory.

## Deployment Options

### Vercel (Recommended)

1. Install Vercel CLI: \`npm install -g vercel\`
2. Run: \`vercel\`

### Netlify

1. Install Netlify CLI: \`npm install -g netlify-cli\`
2. Run: \`netlify deploy\`

### GitHub Pages

Add this to your \`vite.config.ts\`:

\`\`\`typescript
export default defineConfig({
  base: '/your-repo-name/',
  // other config...
})
\`\`\`

Then deploy using GitHub Actions or the gh-pages package.

## Custom Domain

All these platforms support custom domains. Check their documentation for setting up your domain name with your deployed blog.`
  }
});

// Mock for react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      slug: 'hello-world',
    }),
    useNavigate: () => vi.fn(),
    BrowserRouter: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children),
  };
}); 