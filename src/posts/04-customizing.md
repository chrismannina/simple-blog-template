---
title: Customizing Your Blog
date: 2025-03-16
excerpt: Learn how to personalize your blog's appearance, layout, and behavior by modifying theme settings and configuration files.
tags: ['customization', 'theme', 'configuration']
coverImage: https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85
---

# Customizing Your Blog

One of the key advantages of this template is how easy it is to customize. This guide explores the various ways you can make the blog your own without diving deep into code.

## Configuration File

The main configuration file is located at `src/config/blog.config.ts`. This single file controls most of the blog's appearance and behavior.

### Basic Information

```typescript
// Basic information
title: "My Awesome Blog",
description: "Thoughts on technology and life",
author: {
  name: "Your Name",
  bio: "Software developer and writer",
  avatar: "/avatar.png", // Place in the public folder
  social: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
},
```

### Site Configuration

```typescript
// Site configuration
baseUrl: "https://yourblog.com",
locale: "en-US",

// Navigation
navigation: [
  { name: "Home", path: "/" },
  { name: "Posts", path: "/posts" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" }, // Add new pages
],
```

### Date and Display Options

```typescript
// Date formatting
dateFormat: {
  locale: "en-US",
  options: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
},

// Post configuration
postsPerPage: 6,
showExcerptInList: true,
excerptLength: 160,
```

### Theme Customization

```typescript
// Design configuration
design: {
  accentColor: "blue", // Options: "indigo", "blue", "green", "amber"
  darkMode: {
    enabled: true,
    default: 'system', // Options: 'light', 'dark', 'system'
  },
},
```

### Footer Configuration

```typescript
// Footer
footer: {
  text: "© 2025 My Blog. All rights reserved.",
  links: [
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
  ],
},
```

## Styling with Tailwind CSS

This template uses Tailwind CSS for styling, making it easy to customize the appearance without writing custom CSS.

### Modifying Colors

To customize the color palette, edit the `tailwind.config.js` file:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#3b82f6', // Blue
        dark: '#2563eb',
        light: '#60a5fa',
      },
      // Add your custom colors
    },
  },
},
```

### Custom Fonts

To use a custom font:

1. Add the font to the `public/fonts` directory or import it from Google Fonts
2. Update the `tailwind.config.js` file:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Your Font Name', 'system-ui', 'sans-serif'],
      serif: ['Your Serif Font', 'Georgia', 'serif'],
      mono: ['Your Mono Font', 'monospace'],
    },
  },
},
```

3. Update the font reference in your CSS

## Adding Custom Pages

To add a new page to your blog:

1. Create a new component in the `src/pages` directory
2. Add the route to the page in `App.tsx`
3. Add a link to the page in the navigation array in `blog.config.ts`

Example of a custom page component:

```jsx
import React from "react";
import { Helmet } from "react-helmet";
import BlogLayout from "@/components/BlogLayout";
import { createPageTitle } from "@/lib/utils";

const CustomPage = () => {
  return (
    <BlogLayout>
      <Helmet>
        <title>{createPageTitle("Custom Page")}</title>
        <meta name="description" content="Description of your custom page" />
      </Helmet>
      
      <div className="prose-custom">
        <h1>Custom Page</h1>
        <p>This is a custom page for your blog.</p>
      </div>
    </BlogLayout>
  );
};

export default CustomPage;
```

## Customizing Components

You can modify individual components in the `src/components` directory to change their appearance and behavior.

### Modifying the Navbar

Edit `src/components/Navbar.tsx` to customize the navigation bar's appearance and behavior.

### Customizing the Footer

Edit `src/components/Footer.tsx` to modify the footer's content and appearance.

### Blog Post Layout

Edit `src/components/BlogLayout.tsx` to change the overall layout of your blog posts.

## Advanced Theme Customization

### Dark Mode

Dark mode is implemented using the `next-themes` package and Tailwind CSS classes. You can customize the dark mode appearance by:

1. Using the `dark:` prefix with Tailwind classes
2. Adjusting the dark mode values in the theme configuration

Example of dark mode styling:

```jsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Dark mode compatible content
</div>
```

### Responsive Design

The template is fully responsive by default. You can customize the responsive behavior using Tailwind's responsive modifiers:

```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text that changes size based on screen width
</div>
```

## SEO Optimization

Each page uses React Helmet for SEO. You can customize the SEO settings by modifying the Helmet components:

```jsx
<Helmet>
  <title>{createPageTitle("Page Title")}</title>
  <meta name="description" content="Your page description" />
  <meta name="keywords" content="keyword1, keyword2, keyword3" />
  <meta property="og:title" content="Your page title for social media" />
  <meta property="og:description" content="Your page description for social media" />
  <meta property="og:image" content="https://yourblog.com/og-image.jpg" />
</Helmet>
```

## Next Steps

Now that you've learned how to customize your blog:

1. Learn about [deploying your blog](/blog/05-deploying) to share it with the world
2. Return to [writing content](/blog/03-writing-content) to create more engaging posts

By following this guide, you can fully customize your blog to match your personal style and requirements without needing to modify complex code. The template's modular design makes it easy to change only what you need while keeping the rest of the functionality intact.
