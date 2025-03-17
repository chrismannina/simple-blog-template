# Using Simple Blog

This guide provides detailed instructions for using and customizing the Simple Blog.

## Table of Contents

- [Project Structure](#project-structure)
- [Creating Content](#creating-content)
- [Customizing the Blog](#customizing-the-blog)
- [Working with Styles](#working-with-styles)
- [SEO Optimization](#seo-optimization)
- [Troubleshooting](#troubleshooting)

## Project Structure

```
simple-blog-template/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   ├── config/           # Configuration files
│   ├── contexts/         # React contexts
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── posts/            # Markdown blog posts
│   ├── styles/           # CSS files
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── index.html            # HTML template
└── package.json          # Dependencies and scripts
```

## Creating Content

### Adding a New Post

1. Create a new Markdown file in the `src/posts/` directory with a descriptive name, e.g., `my-first-post.md`.
2. Add frontmatter at the top of the file:

```markdown
---
title: My First Blog Post
date: 2025-09-15
excerpt: A brief summary of what this post is about.
tags: ['beginners', 'tutorial']
coverImage: https://example.com/image.jpg
---

# My First Blog Post

Your content goes here...
```

### Formatting Your Posts

This template supports standard Markdown features plus a few extras:

#### Code Blocks with Syntax Highlighting

````markdown
```javascript
function hello() {
  console.log("Hello, world!");
}
```
````

#### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

#### Images

```markdown
![Alt text](https://example.com/image.jpg)
```

## Customizing the Blog

### Configuration File

The main configuration file is located at `src/config/blog.config.ts`. Here you can customize:

```typescript
// Example configuration changes
export const blogConfig = {
  title: "My Awesome Blog",
  description: "Thoughts on technology and life",
  author: {
    name: "Your Name",
    bio: "Software developer and writer",
    social: {
      twitter: "https://twitter.com/yourusername",
      github: "https://github.com/yourusername",
    },
  },
  // Other settings...
};
```

### Navigation

To add or modify navigation links, edit the `navigation` array in the config file:

```typescript
navigation: [
  { name: "Home", path: "/" },
  { name: "Posts", path: "/posts" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" }, // New page
],
```

Note: For new pages, you'll also need to create the corresponding component in the `src/pages/` directory.

## Working with Styles

### Global Styles

Global styles are defined in `src/index.css` using Tailwind CSS. The main theme colors are defined as CSS variables.

### Component-Specific Styles

Components use Tailwind CSS classes for styling. To modify the appearance of a specific component, edit the CSS classes in that component's file.

### Theme Colors

You can change the theme colors by editing the CSS variables in `src/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  
  /* Other variables */
  
  --accent: 200 98% 39%; /* Primary accent color */
}
```

## SEO Optimization

Each page uses the React Helmet component for SEO. To improve SEO for a specific page, edit the Helmet component:

```jsx
<Helmet>
  <title>{createPageTitle("About")}</title>
  <meta name="description" content="About me and my work" />
  <meta name="keywords" content="blog, development, programming" />
</Helmet>
```

## Troubleshooting

### Common Issues

#### Images Not Loading

Make sure your image paths are correct. For local images, place them in the `public` directory and reference them with a leading slash:

```markdown
![Alt text](/images/my-image.jpg)
```

#### Styling Not Applying

If custom styles aren't being applied:

1. Check browser console for errors
2. Verify that you're using the correct Tailwind CSS classes
3. Clear your browser cache

#### Posts Not Showing Up

If your posts aren't appearing:

1. Verify the frontmatter syntax (no spaces before first `---`)
2. Check that the date format is correct (YYYY-MM-DD)
3. Look for console errors related to post parsing

For more help, please open an issue on GitHub. 