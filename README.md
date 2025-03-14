# Simple Blog - A Minimalist Markdown Blog

![Simple Blog](public/og-image.png)

A clean, minimalist blog built with React, TypeScript, and Tailwind CSS. This project makes it easy to create and manage a personal blog with markdown content.

## 📚 Features

- **Markdown Support** - Write your blog posts in Markdown with support for all common Markdown features
- **Syntax Highlighting** - Code blocks are automatically highlighted
- **Responsive Design** - Looks great on desktop, tablet, and mobile devices
- **Customizable Theme** - Easily change the accent color and other design elements
- **SEO Friendly** - Built with SEO best practices in mind
- **Fast Performance** - Built with performance in mind

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/simple-blog.git
cd simple-blog
```

2. Install dependencies:
```sh
npm install
# or
yarn
```

3. Start the development server:
```sh
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:8080`

## 📝 Creating Blog Posts

Blog posts are written in Markdown format and stored in the `src/posts` directory. Each post should have a `.md` extension and include frontmatter at the top of the file.

### Frontmatter

Frontmatter is used to define metadata for your blog posts. It's written at the top of your markdown file between triple-dashed lines.

Example:

```md
---
title: Hello World
date: 2023-06-15
excerpt: This is my first blog post
tags: ["hello", "introduction"]
coverImage: "/images/hello-world.jpg"
---

# Hello World

This is my first blog post...
```

### Available Frontmatter Fields

| Field | Description | Required |
|-------|-------------|----------|
| `title` | The title of your post | Yes |
| `date` | Publication date (YYYY-MM-DD) | Yes |
| `excerpt` | A short summary of your post | Yes |
| `tags` | An array of tags | No |
| `coverImage` | URL to the cover image | No |

### Markdown Features

The blog supports standard Markdown features plus GitHub Flavored Markdown (GFM) through `remark-gfm`, including:

- Headers
- Lists (ordered and unordered)
- Links
- Images
- Code blocks with syntax highlighting
- Tables
- Blockquotes
- And more!

## 🎨 Customization

### Blog Configuration

You can easily customize the blog by editing the configuration file at `src/config/blog.config.ts`. This file contains settings for:

- Blog title and description
- Author information
- Navigation links
- Date formatting
- Theme colors
- And more!

Example configuration:

```typescript
export const blogConfig = {
  title: "Simple Blog",
  description: "A clean, minimalist blog at simpleblog.md",
  author: {
    name: "John Doe",
    bio: "Writing about design, technology, and ideas that matter.",
    avatar: "/avatar.png",
    social: {
      twitter: "https://twitter.com/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
    },
  },
  // ... other configuration options
};
```

### Styling

The blog uses Tailwind CSS for styling. You can customize the styles by:

1. Editing the `tailwind.config.ts` file to change the theme
2. Modifying the CSS classes in the components
3. Adding your own styles to the `src/index.css` file

## 🧩 Project Structure

```
simple-blog/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── config/          # Configuration files
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── posts/           # Markdown blog posts
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.tsx         # Application entry point
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 📦 Key Components

- **MarkdownRenderer** - Renders Markdown content with syntax highlighting
- **BlogLayout** - Main layout component for the blog
- **PostCard** - Card component for displaying post previews
- **Navbar** - Navigation bar component
- **Footer** - Footer component

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Remark GFM](https://github.com/remarkjs/remark-gfm)
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [Gray Matter](https://github.com/jonschlinkert/gray-matter)

## 📱 Responsive Design

The blog is fully responsive and works well on all device sizes:

- **Desktop** - Full layout with sidebar
- **Tablet** - Adjusted layout for medium screens
- **Mobile** - Optimized layout for small screens with collapsible menu

## 🔍 SEO

The blog includes basic SEO features:

- Page titles and meta descriptions
- Open Graph meta tags
- Semantic HTML
- Proper heading structure

## 🌐 Deployment

You can deploy this blog to any static hosting service:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Unsplash](https://unsplash.com/) - Free high-quality images
