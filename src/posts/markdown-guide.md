---
title: Writing Content with Markdown
date: 2025-07-15
excerpt: Learn how to write and format blog posts using Markdown syntax with examples of all supported features.
tags: ['markdown', 'content', 'tutorial']
coverImage: https://images.unsplash.com/photo-1455390582262-044cdead277a
---

# Writing Content with Markdown

This template uses Markdown for all blog content, making it easy to write rich, formatted posts without dealing with HTML. This guide covers everything you need to know about writing content for your blog.

## Creating a New Post

1. Create a new `.md` file in the `src/posts` directory
2. Add frontmatter at the top (metadata about your post)
3. Write your content using Markdown syntax

### Frontmatter Requirements

Every post needs frontmatter at the very top of the file between triple dashes:

```yaml
---
title: Your Post Title
date: 2025-07-15
excerpt: A brief summary of your post
tags: ['tag1', 'tag2']
coverImage: https://example.com/image.jpg
---
```

**Important Frontmatter Fields:**

- `title` (required): The title of your post
- `date` (required): Publication date in YYYY-MM-DD format
- `excerpt` (recommended): A short summary shown in post listings
- `tags` (optional): Categories for your post
- `coverImage` (optional): Featured image URL

The frontmatter **must** be at the very top of the file with no blank lines before it.

## Basic Text Formatting

Markdown makes it easy to format your text:

### Headings

Create headings with hashtags:

```markdown
# Heading 1 (usually the post title)
## Heading 2
### Heading 3
#### Heading 4
```

### Emphasis

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
[Link with title](https://example.com "Title appears on hover")
```

[Link text](https://example.com)

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3
```

- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
```

1. First item
2. Second item
3. Third item

## Code

### Inline Code

Use backticks for `inline code` like this: `` `inline code` ``

### Code Blocks

For multi-line code with syntax highlighting, use triple backticks with the language name:

````markdown
```javascript
function greeting(name) {
  return `Hello, ${name}!`;
}

console.log(greeting('World'));
```
````

```javascript
function greeting(name) {
  return `Hello, ${name}!`;
}

console.log(greeting('World'));
```

## Blockquotes

Create blockquotes with the > symbol:

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> It can also have multiple paragraphs.
```

> This is a blockquote.
> It can span multiple lines.
>
> It can also have multiple paragraphs.

## Images

Add images with a similar syntax to links, but with an exclamation mark at the beginning:

```markdown
![Alt text for the image](https://example.com/image.jpg)
![Alt text](https://example.com/image.jpg "Optional title")
```

## Horizontal Rules

Create horizontal separators with three or more hyphens, asterisks, or underscores:

```markdown
---
***
___
```

---

## Tables

Create tables with pipes and hyphens:

```markdown
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Advanced Features

This blog template also supports GitHub Flavored Markdown (GFM) through the `remark-gfm` plugin, which adds:

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
```

- [x] Completed task
- [ ] Incomplete task

### Footnotes

```markdown
Here's a sentence with a footnote reference.[^1]

[^1]: This is the footnote content.
```

## HTML in Markdown

You can also use HTML directly in your Markdown files for more advanced formatting:

```markdown
<div style="padding: 20px; background-color: #f0f0f0; border-radius: 5px;">
  This is a custom formatted div with HTML.
</div>
```

## Writing Tips

1. **Start with structure**: Outline your post with headings before filling in content
2. **Use formatting sparingly**: Too much bold or italic text reduces its impact
3. **Break up content**: Use headings, lists and images to make long content more digestible
4. **Include examples**: Show, don't just tell
5. **Be consistent**: Use similar formatting patterns across your posts

By mastering these Markdown techniques, you can create beautiful, well-formatted blog posts that engage your readers.
