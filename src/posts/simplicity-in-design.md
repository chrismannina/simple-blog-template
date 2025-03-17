---
title: Customizing Your Blog Theme
date: 2025-06-20
excerpt: Learn how to personalize your blog with custom colors, fonts, and layout tweaks.
tags: ['customization', 'design']
coverImage: https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85
---

# Customizing Your Blog Theme

This template is designed to be easily customizable without diving deep into code.

## Theme Colors

Change your blog's accent color in `blog.config.ts`:

```typescript
design: {
  accentColor: "blue", // Options: "indigo", "blue", "green", "amber"
  // Other settings...
}
```

## Dark Mode Options

Configure dark mode behavior:

```typescript
darkMode: {
  enabled: true,
  default: 'system', // Options: 'light', 'dark', 'system'
},
```

## Typography and Layout

The template uses Tailwind CSS for styling, making it easy to tweak the design by modifying CSS classes in the component files.
