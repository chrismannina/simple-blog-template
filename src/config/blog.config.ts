/**
 * Blog configuration file
 * 
 * Edit this file to customize your blog. The changes will be applied
 * throughout the application.
 */

export const blogConfig = {
  // Basic information
  title: "Simple Blog Template",
  description: "A clean, minimal blog template built with React, TypeScript, and Tailwind CSS.",
  author: {
    name: "Chris Mannina",
    bio: "Software developer passionate about creating lightweight, easy-to-use blog templates.",
    avatar: "/avatar.png", // Place your avatar image in the public folder
    social: {
      twitter: "https://twitter.com/chrismannina",
      github: "https://github.com/chrismannina/blogmaker-template",
      linkedin: "https://linkedin.com/in/chrismannina",
    },
  },
  
  // Site configuration
  baseUrl: "https://blogmaker-template.vercel.app",
  locale: "en-US",
  
  // Navigation
  navigation: [
    { name: "Home", path: "/" },
    { name: "Posts", path: "/posts" },
    { name: "About", path: "/about" },
    { name: "GitHub", path: "https://github.com/chrismannina/blogmaker-template" },
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
    text: "© 2025 Simple Blog Template. Built with React, TypeScript, and Tailwind CSS.",
    links: [
      { name: "GitHub", path: "https://github.com/chrismannina/blogmaker-template" },
      { name: "License", path: "https://github.com/chrismannina/blogmaker-template/blob/main/LICENSE" },
    ],
  },
};

export type BlogConfig = typeof blogConfig;
