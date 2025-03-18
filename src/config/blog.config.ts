/**
 * Blog configuration file
 * 
 * Edit this file to customize your blog. The changes will be applied
 * throughout the application.
 */

export const blogConfig = {
  // Basic information
  title: "Simple Blog",
  description: "A clean, minimal blog template built with React, TypeScript, and Tailwind CSS.",
  author: {
    name: "Chris Mannina",
    bio: "Software developer passionate about creating lightweight, easy-to-use blog templates.",
    avatar: "/author-silhouette.svg",
    social: {
      twitter: "https://twitter.com/ccmannina",
      github: "https://github.com/chrismannina/simple-blog-template",
      linkedin: "https://linkedin.com/in/chrismannina",
    },
  },
  
  // Site configuration
  baseUrl: "https://simple-blog-beta-lilac.vercel.app",
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
    text: "© 2025 Simple Blog. Built with React, TypeScript, and Tailwind CSS.",
    links: [
      { name: "License", path: "https://github.com/chrismannina/simple-blog-template/blob/main/LICENSE" },
    ],
  },
};

export type BlogConfig = typeof blogConfig;
