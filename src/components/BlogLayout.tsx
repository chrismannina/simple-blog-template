
import React, { useEffect } from "react";
import { blogConfig } from "@/config/blog.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface BlogLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const BlogLayout = ({ children, className }: BlogLayoutProps) => {
  // Add scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const element = revealElements[i];
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${`theme-${blogConfig.design.accentColor || 'indigo'}`}`}>
      <Navbar />
      <div className="w-full mx-auto pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="newspaper-headline text-center py-8 border-b-2 border-t-2 border-primary my-6">
            {blogConfig.title}
          </div>
          <div className="newspaper-date text-center">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <main className={cn("flex-1 transition-all duration-300 animate-fade-in pb-16", className)}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogLayout;
