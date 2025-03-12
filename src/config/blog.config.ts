
/**
 * Blog configuration file
 * 
 * Edit this file to customize your blog. The changes will be applied
 * throughout the application.
 */

export const blogConfig = {
  // Basic information
  title: "Minimal Blog",
  description: "A beautifully designed, minimal blog template",
  author: {
    name: "John Doe",
    bio: "Product designer and developer based in San Francisco. Writing about design, technology, and productivity.",
    avatar: "/avatar.png", // Place your avatar image in the public folder
    social: {
      twitter: "https://twitter.com/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
    },
  },
  
  // Site configuration
  baseUrl: "https://yourblog.com",
  locale: "en-US",
  
  // Navigation
  navigation: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Archive", path: "/archive" },
  ],
  
  // Date formatting
  dateFormat: {
    locale: "en-US",
    options: {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  },
  
  // Post configuration
  postsPerPage: 6,
  showExcerptInList: true,
  excerptLength: 160,
  
  // Footer
  footer: {
    text: "© 2023 Minimal Blog. All rights reserved.",
    links: [
      { name: "Privacy", path: "/privacy" },
      { name: "Terms", path: "/terms" },
    ],
  },
};

export type BlogConfig = typeof blogConfig;
