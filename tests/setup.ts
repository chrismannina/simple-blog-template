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
title: Welcome to Simple Blog
date: 2025-07-15
excerpt: Get started with this minimal, fast-loading blog template built with React, Vite, and Markdown.
tags: ['getting-started', 'overview']
coverImage: https://images.unsplash.com/photo-1499750310107-5fef28a66643
---

# Welcome to Simple Blog

This demo site lets you experience the Simple Blog in action. Browse around to see the features, performance, and design options available to you.

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
title: Customizing Your Blog
date: 2025-07-10
excerpt: Learn how to personalize your blog's appearance, layout, and behavior by modifying theme settings and configuration files.
tags: ['customization', 'theme', 'configuration']
coverImage: https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85
---

# Customizing Your Blog

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
title: Getting Started Guide
date: 2025-07-17
excerpt: A step-by-step guide to setting up your blog, understanding the project structure, and making your first customizations.
tags: ['setup', 'tutorial', 'beginner']
coverImage: https://images.unsplash.com/photo-1547658719-da2b51169166
---

# Getting Started Guide

This guide will walk you through the process of setting up your blog, understanding the project structure, and making your first customizations.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or later)
- **npm** or **yarn**
- A code editor (VS Code recommended)
- Basic knowledge of JavaScript/TypeScript and React
`
  }
});

vi.mock('@/posts/minimalist-workspace.md?raw', async () => {
  return {
    default: `---
title: Writing Content with Markdown
date: 2025-07-15
excerpt: Learn how to format your blog posts with Markdown, add images, code blocks, and other elements to create rich, engaging content.
tags: ['markdown', 'tutorial', 'content']
coverImage: https://images.unsplash.com/photo-1517842645767-c639042777db
---

# Writing Content with Markdown

This blog template uses Markdown for formatting blog posts. Markdown is a lightweight markup language that allows you to write formatted content using a plain-text editor. This guide will show you how to use Markdown to create beautifully formatted blog posts.

## Creating a New Blog Post

To create a new blog post:

1. Add a new Markdown file (.md) to the src/posts directory
2. Include frontmatter at the top of the file
3. Write your content using Markdown syntax
`
  }
});

vi.mock('@/posts/welcome.md?raw', async () => {
  return {
    default: `---
title: Welcome to Simple Blog
date: 2025-07-15
excerpt: Get started with this minimal, fast-loading blog template built with React, Vite, and Markdown.
tags: ['getting-started', 'overview']
coverImage: https://images.unsplash.com/photo-1499750310107-5fef28a66643
---

# Welcome to Simple Blog

This demo site lets you experience the Simple Blog in action. Browse around to see the features, performance, and design options available to you.

## Key Features

- 🚀 Fast loading with Vite
- 📝 Write content in Markdown
- 🎨 Clean, minimalist design
- 🌙 Dark mode with system detection
- 📱 Fully responsive layout

Check out the other posts to learn more about customization options and how to make this template your own!`
  }
});