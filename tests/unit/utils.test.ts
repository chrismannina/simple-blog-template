import { describe, it, expect } from 'vitest';
import { createPageTitle } from '@/lib/utils';
import { blogConfig } from '@/config/blog.config';

describe('Utility functions', () => {
  describe('createPageTitle', () => {
    it('should return the blog title when no page title is provided', () => {
      const title = createPageTitle();
      expect(title).toBe(blogConfig.title);
    });

    it('should combine page title and blog title when page title is provided', () => {
      const pageTitle = 'About';
      const title = createPageTitle(pageTitle);
      expect(title).toBe(`${pageTitle} | ${blogConfig.title}`);
    });
  });
}); 