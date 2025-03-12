
/**
 * Blog configuration file
 * 
 * Edit this file to customize your blog. The changes will be applied
 * throughout the application.
 */

export const blogConfig = {
  // Basic information
  title: "Simple Blog",
  description: "A clean, minimalist blog at simpleblog.md",
  author: {
    name: "John Doe",
    bio: "Writing about design, technology, and ideas that matter.",
    avatar: "/avatar.png", // Place your avatar image in the public folder
    social: {
      twitter: "https://twitter.com/yourusername",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
    },
  },
  
  // Site configuration
  baseUrl: "https://simpleblog.md",
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
  
  // Design configuration
  design: {
    accentColor: "indigo", // Options: "indigo", "blue", "green", "amber"
  },
  
  // Footer
  footer: {
    text: "© 2023 Simple Blog. All rights reserved.",
    links: [
      { name: "Privacy", path: "/privacy" },
      { name: "Terms", path: "/terms" },
    ],
  },
};

export type BlogConfig = typeof blogConfig;
