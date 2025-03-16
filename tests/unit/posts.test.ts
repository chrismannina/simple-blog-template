import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

describe('Posts utility functions', () => {
  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const posts = await getAllPosts();
      
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('should return posts with the required properties', async () => {
      const posts = await getAllPosts();
      const firstPost = posts[0];
      
      expect(firstPost).toHaveProperty('slug');
      expect(firstPost).toHaveProperty('title');
      expect(firstPost).toHaveProperty('date');
      expect(firstPost).toHaveProperty('excerpt');
      expect(firstPost).toHaveProperty('tags');
      expect(firstPost).toHaveProperty('coverImage');
    });

    it('should sort posts by date in descending order', async () => {
      const posts = await getAllPosts();
      
      // Check if dates are in descending order
      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].date).getTime();
        const nextDate = new Date(posts[i + 1].date).getTime();
        expect(currentDate).toBeGreaterThanOrEqual(nextDate);
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