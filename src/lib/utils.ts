
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { blogConfig } from "@/config/blog.config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date using the blogConfig date format settings
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(
    blogConfig.dateFormat.locale,
    blogConfig.dateFormat.options as Intl.DateTimeFormatOptions
  )
}

// Helper to create a title with the blog name
export function createPageTitle(title?: string): string {
  if (!title) return blogConfig.title
  return `${title} | ${blogConfig.title}`
}
