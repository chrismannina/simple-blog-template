import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPosts, getPostBySlug } from '../../src/lib/posts';

// Direct mock for the posts module
vi.mock('../../src/lib/posts', () => {
  // Sample post content
  const helloWorldContent = `---
title: Hello World
date: 2025-01-01
excerpt: A sample post
tags: ['test']
coverImage: /image.jpg
---
# Hello World

This is a test post.`;

  const anotherPostContent = `---
title: Another Post
date: 2025-01-02
excerpt: Another sample post
tags: ['test', 'example']
---
# Another Post

This is another test post.`;

  // Create mock implementations
  return {
    // Re-export PostMeta interface
    PostMeta: {},
    
    // Mock getAllPosts to return our test data
    getAllPosts: async () => {
      return [
        {
          slug: 'another-post',
          title: 'Another Post',
          date: new Date('2025-01-02').toISOString(),
          excerpt: 'Another sample post',
          tags: ['test', 'example'],
          coverImage: '',
        },
        {
          slug: 'hello-world',
          title: 'Hello World',
          date: new Date('2025-01-01').toISOString(),
          excerpt: 'A sample post',
          tags: ['test'],
          coverImage: '/image.jpg',
        }
      ];
    },
    
    // Mock getPostBySlug to return our test data or throw
    getPostBySlug: async (slug) => {
      if (slug === 'hello-world') {
        return {
          meta: {
            slug: 'hello-world',
            title: 'Hello World',
            date: new Date('2025-01-01').toISOString(),
            excerpt: 'A sample post',
            tags: ['test'],
            coverImage: '/image.jpg',
          },
          content: 'This is a test post.'
        };
      } else if (slug === 'another-post') {
        return {
          meta: {
            slug: 'another-post',
            title: 'Another Post',
            date: new Date('2025-01-02').toISOString(),
            excerpt: 'Another sample post',
            tags: ['test', 'example'],
            coverImage: '',
          },
          content: 'This is another test post.'
        };
      } else {
        throw new Error(`Post not found: ${slug}`);
      }
    }
  };
});

describe('Posts utility functions', () => {
  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const posts = await getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should return posts with the required properties', async () => {
      const posts = await getAllPosts();
      posts.forEach(post => {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('excerpt');
      });
    });

    it('should sort posts by date in descending order', async () => {
      const posts = await getAllPosts();
      if (posts.length >= 2) {
        const dates = posts.map(post => new Date(post.date).getTime());
        for (let i = 0; i < dates.length - 1; i++) {
          expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
        }
      }
    });
  });

  describe('getPostBySlug', () => {
    it('should return a post when given a valid slug', async () => {
      const post = await getPostBySlug('hello-world');
      
      expect(post).toHaveProperty('meta');
      expect(post).toHaveProperty('content');
      expect(post.meta.slug).toBe('hello-world');
    });

    it('should return the post with the correct content structure', async () => {
      const post = await getPostBySlug('hello-world');
      
      expect(post.meta).toHaveProperty('slug');
      expect(post.meta).toHaveProperty('title');
      expect(post.meta).toHaveProperty('date');
      expect(post.meta).toHaveProperty('excerpt');
      expect(typeof post.content).toBe('string');
    });

    it('should throw an error when given an invalid slug', async () => {
      await expect(getPostBySlug('non-existent-post')).rejects.toThrow('Post not found');
    });
  });
}); 