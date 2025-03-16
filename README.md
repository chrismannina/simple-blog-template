# Simple Blog Template

A clean, minimalist blog template built with React, Vite, and Markdown for content. This template allows you to simply add markdown files to the `posts` directory and have them automatically displayed as blog entries.

## Features

- 📝 Write blog posts in Markdown
- 🎨 Clean, responsive design
- 🚀 Fast loading with Vite
- 🏷️ Tag support
- 📱 Mobile-friendly
- 🖼️ Cover image support
- 🔍 SEO-friendly
- 🌙 Dark mode (optional)

## Getting Started

### Installation

1. Clone this repository
2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open http://localhost:5173 in your browser to see the blog

## Adding Blog Posts

To add a new blog post, simply create a markdown file in the `src/posts` directory. The filename will be used as the URL slug.

### Frontmatter

Each blog post must include frontmatter at the very top of the file. Frontmatter is YAML metadata surrounded by triple-dash lines (`---`).

**Example:**

```markdown
---
title: My Awesome Blog Post
date: 2023-08-15
excerpt: This is a short summary of my blog post that will appear in the blog listing.
tags: ['react', 'javascript', 'tutorial']
coverImage: https://example.com/path/to/image.jpg
---

# My Awesome Blog Post

Your content goes here...
```

### Required Fields

- `title`: The title of your blog post
- `date`: The publication date (YYYY-MM-DD format)

### Recommended Fields

- `excerpt`: A short summary shown in the post list
- `tags`: An array of tags
- `coverImage`: URL to your cover image

### Important Notes About Frontmatter

1. The frontmatter **must** be at the very top of the file with no blank lines before it
2. You can include an H1 title after the frontmatter that matches your frontmatter title - it will be automatically removed from the content since the title is displayed separately in the blog layout
3. All frontmatter fields are parsed using the `gray-matter` library

## Customizing Your Blog

You can customize your blog by editing the `src/config/blog.config.ts` file. This file contains configuration options such as:

- Blog title and description
- Author information
- Navigation links
- Date formatting
- And more!

## Building for Production

To build your blog for production, run:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist` directory, which you can deploy to any static hosting service.

## License

MIT

---

Feel free to customize this template for your own blog! If you find any issues or have suggestions for improvements, please open an issue or pull request.
