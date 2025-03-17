---
title: Writing Content with Markdown
date: 2025-03-16
excerpt: A comprehensive guide to creating beautiful blog posts with Markdown, including formatting, media embedding, and best practices.
tags: ['markdown', 'content', 'tutorial']
coverImage: https://images.unsplash.com/photo-1517842645767-c639042777db
---

# Writing Content with Markdown

This blog template uses Markdown for formatting blog posts. Markdown is a lightweight markup language that allows you to write formatted content using a plain-text editor. This guide will show you how to use Markdown to create beautifully formatted blog posts.

## Creating a New Blog Post

To create a new blog post:

1. Add a new Markdown file (`.md`) to the `src/posts` directory with a numbered prefix (e.g., `06-my-post.md`)
2. Include frontmatter at the top of the file
3. Write your content using Markdown syntax

## Understanding Frontmatter

Frontmatter is metadata about your post, enclosed in triple dashes (`---`). Here's an example:

```yaml
---
title: My Amazing Blog Post
date: 2025-08-01
excerpt: A short description of your post that will appear in previews.
tags: ['react', 'javascript', 'tutorial']
coverImage: https://images.unsplash.com/photo-example
---
```

### Required Frontmatter Fields

- **title**: The title of your blog post
- **date**: The publication date (YYYY-MM-DD format)
- **excerpt**: A brief summary of the post

### Optional Frontmatter Fields

- **tags**: An array of tags related to your post
- **coverImage**: A URL to the cover image for your post
- **author**: Override the default author (defined in config)

## Markdown Basics

### Headings

Use `#` symbols for headings:

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

### Text Formatting

```markdown
*Italic text* or _italic text_
**Bold text** or __bold text__
***Bold and italic text***
~~Strikethrough text~~
```

*Italic text* or _italic text_  
**Bold text** or __bold text__  
***Bold and italic text***  
~~Strikethrough text~~

### Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
[Link to another post](/blog/04-customizing)
```

### Lists

Unordered lists:

```markdown
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3
```

Ordered lists:

```markdown
1. First item
2. Second item
3. Third item
```

### Images

```markdown
![Alt text](https://example.com/image.jpg)
![Alt text](https://example.com/image.jpg "Optional title")
```

To control image size, you can use HTML:

```markdown
<img src="https://example.com/image.jpg" alt="Alt text" width="300" />
```

## Advanced Markdown Features

### Code Blocks

For inline code, use backticks:

```markdown
Use the `console.log()` function to debug.
```

For code blocks, use triple backticks with an optional language identifier:

```markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
```

Supported languages for syntax highlighting include:
- javascript/jsx
- typescript/tsx
- html
- css
- json
- bash/shell
- python
- ruby
- and many more...

### Blockquotes

```markdown
> This is a blockquote.
> 
> It can span multiple lines.
```

> This is a blockquote.
> 
> It can span multiple lines.

### Horizontal Rules

Create a horizontal rule with three hyphens, asterisks, or underscores:

```markdown
---
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
```

## Including Media

### Images

As mentioned earlier, images can be included using the Markdown syntax:

```markdown
![Alt text](https://example.com/image.jpg)
```

For responsive images, you can use HTML with CSS classes:

```html
<img 
  src="https://example.com/image.jpg" 
  alt="Alt text" 
  class="rounded-lg shadow-md max-w-full"
/>
```

### Videos

Embed videos using HTML (supports YouTube, Vimeo, etc.):

```html
<div class="aspect-w-16 aspect-h-9">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
  ></iframe>
</div>
```

## SEO Optimization

To optimize your blog posts for search engines:

1. Use descriptive titles that include keywords
2. Write comprehensive excerpts
3. Include relevant tags
4. Use heading tags (`#`, `##`, etc.) appropriately
5. Add descriptive alt text to images

## Best Practices

### General Writing Tips

- Use clear, concise language
- Break content into logical sections with headings
- Use visual elements (images, code blocks, lists) to enhance readability
- Proofread your content for errors

### Markdown-Specific Tips

- Maintain consistent heading levels (don't skip from `#` to `###`)
- Leave a blank line before and after blocks like lists and code blocks
- Use reference-style links for better readability in complex documents

## Troubleshooting

### Common Issues

- **Markdown not rendering properly**: Ensure there's a blank line between different elements
- **Frontmatter errors**: Check for proper YAML formatting (indentation matters)
- **Images not displaying**: Verify the image URL is correct and accessible

## Example: Tutorial-Style Post

Here's an example of how you might structure a tutorial:

```markdown
---
title: How to Build a React Component
date: 2025-08-15
excerpt: Learn how to create a reusable button component in React
tags: ['react', 'tutorial', 'components']
coverImage: https://example.com/image.jpg
---

# How to Build a React Component

In this tutorial, we'll create a simple React button component.

## Prerequisites

- Basic knowledge of React
- Node.js installed

## Step 1: Create a New Component File

Create a file named `Button.jsx`:

```jsx
import React from 'react';

const Button = ({ text, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
```

## Step 2: Import and Use the Component

```jsx
import Button from './Button';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Button 
        text="Click me" 
        onClick={() => alert('Button clicked!')} 
      />
    </div>
  );
}
```
```

## Next Steps

Now that you know how to write content:

1. Learn how to [customize your blog](/blog/04-customizing) with themes and layouts
2. Explore [deploying your blog](/blog/05-deploying) to various hosting platforms

By following this guide, you'll be able to create rich, well-formatted blog posts that engage your readers and showcase your content in the best possible way.
