
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { blogConfig } from "@/config/blog.config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date using the blogConfig date format settings
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString)
      return 'Invalid date'
    }
    return date.toLocaleDateString(
      blogConfig.dateFormat.locale,
      blogConfig.dateFormat.options as Intl.DateTimeFormatOptions
    )
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Date error'
  }
}

// Helper to create a title with the blog name
export function createPageTitle(title?: string): string {
  if (!title) return blogConfig.title
  return `${title} | ${blogConfig.title}`
}
