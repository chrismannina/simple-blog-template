---
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

```bash
npm run build
```

This creates optimized files in the `dist` directory.

## Deployment Options

### Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`

### Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy`

### GitHub Pages

Add this to your `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // other config...
})
```

Then deploy using GitHub Actions or the gh-pages package.

## Custom Domain

All these platforms support custom domains. Check their documentation for setting up your domain name with your deployed blog.
