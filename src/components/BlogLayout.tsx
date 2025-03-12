
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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className={cn("flex-1 transition-all duration-300 animate-fade-in pb-16", className)}>
          <div className="w-full max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogLayout;
