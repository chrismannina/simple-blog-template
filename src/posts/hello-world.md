---
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

Check out the other posts to learn more about customization options and how to make this template your own!

## Getting Started

To add a new blog post, simply create a new markdown file in the `src/posts` directory. The file should have a `.md` extension and include front matter at the top of the file.

Front matter is a YAML block that contains metadata about your post. It must be placed at the very top of the file between triple-dash lines (`---`). For example:

```yaml
---
title: Hello, World! Welcome to Your New Blog
date: 2025-07-15
excerpt: Get started with your new blog template and learn how to customize it to make it your own.
tags: ['getting-started', 'tutorial']
coverImage: https://images.unsplash.com/photo-1499750310107-5fef28a66643
---
```

**Important**: The frontmatter must be at the very top of the file with no blank lines before it. After the frontmatter, you can include an H1 title that matches your frontmatter title - it will be automatically removed from the content since the title is displayed separately in the blog layout.

## Available Frontmatter Fields

You can use these fields in your frontmatter:

- `title` (required): The title of your blog post
- `date` (required): The publication date (YYYY-MM-DD format)
- `excerpt` (recommended): A short summary shown in the post list
- `tags` (optional): An array of tags
- `coverImage` (optional): URL to your cover image

## Customizing Your Blog

You can customize your blog by editing the `blog.config.ts` file in the `src/config` directory. This file contains all the configuration options for your blog, such as:

- Blog title and description
- Author information
- Navigation links
- Date formatting
- And more!

## Markdown Features

This blog template supports all standard Markdown features, plus a few extras:

### Code Blocks

```javascript
function greeting(name) {
  return `Hello, ${name}!`;
}

console.log(greeting('World'));
```

### Blockquotes

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

### Images

![Sample Image](https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)

## Happy Blogging!

Now that you know the basics, you're ready to start writing your own blog posts. Happy blogging!
