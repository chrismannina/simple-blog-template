---
title: Adding Images and Media to Posts
date: 2025-05-15
excerpt: Learn how to include images, videos, and other media in your blog posts for a richer reader experience.
tags: ['tutorial', 'media']
coverImage: https://images.unsplash.com/photo-1547658719-da2b51169166
---

# Adding Images and Media to Posts

Rich media makes your blog posts more engaging. Here's how to include different types of media.

## Images

Add images using standard Markdown syntax:

`![Alt text for the image](https://example.com/path/to/image.jpg)`

## Cover Images

Each post can have a cover image by adding the `coverImage` property to the frontmatter:

```yaml
---
title: My Post Title
coverImage: https://example.com/path/to/image.jpg
---
```

## Embedding Video

While Markdown doesn't directly support video embedding, you can use HTML within your Markdown:

```html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

The template's Markdown renderer is configured to allow HTML, making it easy to embed various media types.
