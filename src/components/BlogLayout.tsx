
import React from "react";
import { blogConfig } from "@/config/blog.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface BlogLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const BlogLayout = ({ children, className }: BlogLayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col bg-background ${`theme-${blogConfig.design.accentColor || 'indigo'}`}`}>
      <Navbar />
      <main className={cn("flex-1 transition-all duration-300 animate-fade-in", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BlogLayout;
