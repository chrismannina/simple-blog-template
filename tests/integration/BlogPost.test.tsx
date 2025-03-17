import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import BlogPost from '@/pages/BlogPost';
import { getPostBySlug } from '@/lib/posts';

// Mock the getPostBySlug function
vi.mock('@/lib/posts', () => ({
  getPostBySlug: vi.fn(),
}));

// Set up a mock for the Helmet component
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
}));

// Mock react-markdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => <div data-testid="markdown">{children}</div>,
}));

// Mock remark-gfm
vi.mock('remark-gfm', () => ({
  default: () => ({}),
}));

describe('BlogPost Component', () => {
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();
    
    // Mock the getPostBySlug function to return test data
    (getPostBySlug as any).mockResolvedValue({
      meta: {
        slug: 'hello-world',
        title: 'Hello World',
        date: new Date('2025-07-15').toISOString(),
        excerpt: 'Get started with your new blog',
        tags: ['getting-started', 'tutorial'],
        coverImage: 'https://example.com/image.jpg'
      },
      content: 'This is the post content.'
    });
  });

  it('should render the blog post title', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <BlogPost />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Wait for the post to load
    await waitFor(() => {
      expect(getPostBySlug).toHaveBeenCalledTimes(1);
    });
    
    // Post title should be visible
    expect(await screen.findByText('Hello World')).toBeInTheDocument();
  });

  it('should display loading state initially', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <BlogPost />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Check that the loading state (skeleton) is initially visible
    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('should render the content using Markdown', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <BlogPost />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Wait for the post to load
    await waitFor(() => {
      expect(getPostBySlug).toHaveBeenCalledTimes(1);
    });
    
    // Check that the markdown component is rendered
    const markdownElement = await screen.findByTestId('markdown');
    expect(markdownElement).toBeInTheDocument();
    expect(markdownElement.textContent).toBe('This is the post content.');
  });

  it('should handle error state', async () => {
    // Mock an error for this test
    (getPostBySlug as any).mockRejectedValue(new Error('Post not found'));
    
    render(
      <MemoryRouter>
        <ThemeProvider>
          <BlogPost />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Wait for the error state
    await waitFor(() => {
      expect(getPostBySlug).toHaveBeenCalledTimes(1);
    });
    
    // Should display the not found message
    expect(await screen.findByText('Post Not Found')).toBeInTheDocument();
  });
}); 