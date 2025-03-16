/**
 * Blog configuration file
 * 
 * Edit this file to customize your blog. The changes will be applied
 * throughout the application.
 */

export const blogConfig = {
  // Basic information
  title: "Simple Blog",
  description: "A clean, minimalist blog for your thoughts.",
  author: {
    name: "Chris Mannina",
    bio: "Creator of Simple Blog. Writing about design, technology, and ideas that matter.",
    avatar: "/avatar.png", // Place your avatar image in the public folder
    social: {
      twitter: "https://twitter.com/chrismannina",
      github: "https://github.com/chrismannina",
      linkedin: "https://linkedin.com/in/chrismannina",
    },
  },
  
  // Site configuration
  baseUrl: "https://simpleblog.md",
  locale: "en-US",
  
  // Navigation
  navigation: [
    { name: "Home", path: "/" },
    { name: "Posts", path: "/posts" },
    { name: "About", path: "/about" },
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
  
  // Design configuration
  design: {
    accentColor: "blue", // Options: "indigo", "blue", "green", "amber"
    darkMode: {
      enabled: true,
      default: 'system', // Options: 'light', 'dark', 'system'
    },
  },
  
  // Footer
  footer: {
    text: "© 2025 Simple Blog. All rights reserved.",
    links: [
      { name: "Privacy", path: "/privacy" },
      { name: "Terms", path: "/terms" },
    ],
  },
};

export type BlogConfig = typeof blogConfig;
