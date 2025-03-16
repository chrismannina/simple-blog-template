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
title: Hello, World! Welcome to Your New Blog
date: 2023-07-15
excerpt: Get started with your new blog template and learn how to customize it to make it your own.
tags: ['getting-started', 'tutorial']
coverImage: https://images.unsplash.com/photo-1499750310107-5fef28a66643
---

# Hello, World! Welcome to Your New Blog

This is your first blog post. Edit or delete it, then start writing!`
  }
});

vi.mock('@/posts/markdown-guide.md?raw', async () => {
  return {
    default: `---
title: Markdown Guide
date: 2023-07-10
excerpt: A quick reference to the Markdown syntax used in this blog platform.
tags: ['markdown', 'reference']
coverImage: https://images.unsplash.com/photo-1455390582262-044cdead277a
---

# Markdown Guide

This is a quick reference to the Markdown syntax.`
  }
});

// Mock other posts in the same way
vi.mock('@/posts/simplicity-in-design.md?raw', async () => {
  return {
    default: `---
title: Simplicity in Design
date: 2023-06-20
excerpt: Understanding why less is often more in modern design principles.
tags: ['design', 'principles']
coverImage: https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85
---

# Simplicity in Design

Understanding why less is often more in modern design principles.`
  }
});

vi.mock('@/posts/web-development-trends.md?raw', async () => {
  return {
    default: `---
title: Web Development Trends
date: 2023-05-15
excerpt: Exploring the latest trends in web development for 2023 and beyond.
tags: ['web-development', 'trends']
coverImage: https://images.unsplash.com/photo-1547658719-da2b51169166
---

# Web Development Trends

Exploring the latest trends in web development for 2023 and beyond.`
  }
});

vi.mock('@/posts/minimalist-workspace.md?raw', async () => {
  return {
    default: `---
title: Creating a Minimalist Workspace
date: 2023-04-10
excerpt: How to design a clean, distraction-free workspace for maximum productivity.
tags: ['productivity', 'workspace']
coverImage: https://images.unsplash.com/photo-1497215728101-856f4ea42174
---

# Creating a Minimalist Workspace

How to design a clean, distraction-free workspace for maximum productivity.`
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