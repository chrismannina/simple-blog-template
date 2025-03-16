import React from "react";
import { blogConfig } from "@/config/blog.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface BlogLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const BlogLayout = ({ children, className }: BlogLayoutProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      `theme-${blogConfig.design.accentColor || 'indigo'}`
    )}>
      <Navbar />
      <div className="w-full mx-auto pt-20">
        <main className={cn("flex-1 transition-all duration-300 animate-fade-in pb-16", className)}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogLayout;
