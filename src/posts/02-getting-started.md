---
title: Getting Started Guide
date: 2025-03-16
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

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/simple-blog-template.git my-blog
```

2. **Navigate to the project directory**:

```bash
cd my-blog
```

3. **Install dependencies**:

```bash
npm install
# or
yarn install
```

4. **Start the development server**:

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser** and navigate to `http://localhost:8080`

Congratulations! Your blog is now running locally.

## Project Structure

Understanding the project structure will help you navigate and customize your blog:

```
simple-blog-template/
├── public/               # Static assets (favicon, images, etc.)
├── src/
│   ├── components/       # React components
│   │   ├── ui/           # UI components (from shadcn/ui)
│   │   └── ...           # Custom components
│   ├── config/           # Configuration files
│   ├── contexts/         # React contexts
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── posts/            # Markdown blog posts
│   ├── styles/           # CSS files
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── tests/                # Test files
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

### Key Directories and Files

- **src/posts/**: This is where all your blog posts are stored as Markdown files
- **src/config/blog.config.ts**: Main configuration file for your blog
- **src/components/**: Reusable components that make up your blog
- **src/pages/**: Page components for different routes
- **src/lib/**: Utility functions and helpers

## Creating Your First Blog Post

1. **Create a new Markdown file** in the `src/posts` directory. For example, `06-my-first-post.md`.

2. **Add frontmatter** at the top of the file:

```markdown
title: My First Blog Post
date: 2025-03-16
excerpt: This is my first blog post using the Simple Blog template.
tags: ['first', 'blog']
coverImage: https://images.unsplash.com/photo-example-url
```

3. **Write your content** using Markdown syntax below the frontmatter.

4. **Save the file** and your new post will automatically appear on your blog.

## Understanding the Core Components

### BlogLayout

The `BlogLayout` component (`src/components/BlogLayout.tsx`) provides a consistent layout for all pages with:

- Navigation bar at the top
- Main content area
- Footer at the bottom

### MarkdownRenderer

The `MarkdownRenderer` component renders Markdown content with syntax highlighting, responsive images, and other formatting features.

### ThemeContext

The `ThemeContext` provides dark/light mode functionality throughout the application.

## Routes and Navigation

The blog uses React Router for navigation. The main routes are defined in `App.tsx`:

- `/`: Home page showing a list of blog posts
- `/blog/:slug`: Individual blog post page
- `/posts`: Page showing all blog posts
- `/about`: About page

## Development Workflow

A typical development workflow looks like this:

1. **Make changes** to your code or content
2. **Preview changes** in real-time in your browser
3. **Commit changes** to your repository
4. **Deploy** to your hosting platform

## Common Customizations

### Changing the Blog Title and Description

Edit the `blog.config.ts` file:

```typescript
title: "Your Blog Title",
description: "Your blog description goes here",
```

### Updating Author Information

```typescript
author: {
  name: "Your Name",
  bio: "Your bio goes here",
  avatar: "/your-avatar.png", // Place in the public folder
  social: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
  },
},
```

### Modifying the Navigation Menu

```typescript
navigation: [
  { name: "Home", path: "/" },
  { name: "Posts", path: "/posts" },
  { name: "About", path: "/about" },
  { name: "Your New Page", path: "/new-page" },
],
```

## Building for Production

When you're ready to deploy your blog:

1. **Build the production version**:

```bash
npm run build
# or
yarn build
```

2. The built files will be in the `dist` directory, which you can deploy to any static hosting service.

## Troubleshooting

### Common Issues

- **Posts not showing up**: Ensure your frontmatter is properly formatted and at the very top of the file.
- **Styling issues**: Check your Tailwind classes and make sure they're properly applied.
- **Build errors**: Check the console for specific error messages.

### Getting Help

If you encounter issues not covered in this guide:

1. Check the documentation
2. Look for similar issues in the repository
3. Open a new issue with a detailed description of your problem

## Next Steps

Now that you're set up, here are some suggestions for next steps:

1. Explore how to write content with our [Writing Content guide](/blog/03-writing-content)
2. Learn how to customize your blog with our [Customization guide](/blog/04-customizing)
3. When you're ready to publish, check out our [Deployment guide](/blog/05-deploying)

With this guide, you should be well on your way to creating a beautiful, functional blog with the Simple Blog Template. Happy blogging!
