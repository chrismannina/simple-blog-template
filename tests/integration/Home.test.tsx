import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import Home from '../../src/pages/Home';
import { getAllPosts } from '../../src/lib/posts';

// Mock the getAllPosts function
vi.mock('../../src/lib/posts', () => ({
  getAllPosts: vi.fn(),
}));

// Set up a mock for the Helmet component to avoid errors
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
}));

describe('Home Page', () => {
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();
    
    // Mock the getAllPosts function to return test data
    (getAllPosts as any).mockResolvedValue([
      {
        slug: 'hello-world',
        title: 'Hello World',
        date: new Date('2025-07-15').toISOString(),
        excerpt: 'Get started with your new blog',
        tags: ['getting-started', 'tutorial'],
        coverImage: 'https://example.com/image.jpg'
      },
      {
        slug: 'second-post',
        title: 'Second Post',
        date: new Date('2025-07-10').toISOString(),
        excerpt: 'Another great post',
        tags: ['general'],
        coverImage: 'https://example.com/image2.jpg'
      }
    ]);
  });

  it('should render the blog title', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        </MemoryRouter>
      );
    });

    // Wait for the component to load posts
    await waitFor(() => {
      expect(getAllPosts).toHaveBeenCalledTimes(1);
    });

    // Blog title should be visible (we don't know the exact title, so we check that any heading is rendered)
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeDefined();
  });

  it('should display loading state initially', async () => {
    // Mock delay for the getAllPosts function
    (getAllPosts as any).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([]);
        }, 100);
      });
    });
    
    // Render without awaiting act completion to catch the loading state
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    
    // Check that the loading state (skeleton) is initially visible
    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
    
    // Wait for any pending updates to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });
  });

  it('should display posts after loading', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        </MemoryRouter>
      );
    });

    // Wait for posts to load
    await waitFor(() => {
      expect(getAllPosts).toHaveBeenCalledTimes(1);
    });

    // Should display post titles
    const helloWorldElement = await screen.findByText('Hello World');
    const secondPostElement = await screen.findByText('Second Post');
    expect(helloWorldElement).toBeDefined();
    expect(secondPostElement).toBeDefined();
  });
}); 