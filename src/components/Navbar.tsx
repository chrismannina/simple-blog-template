import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { blogConfig } from "@/config/blog.config";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Use the configured accent color
  const themeClass = `theme-${blogConfig.design.accentColor || 'blue'}`;
  
  // Apply theme class to html element
  useEffect(() => {
    document.documentElement.className = document.documentElement.className + ' ' + themeClass;
  }, [themeClass]);

  // Handle scroll event to add a background to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-3 px-4 md:px-6 border-b",
        scrolled 
          ? "bg-white/95 dark:bg-background/95 backdrop-blur-sm border-border" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {/* Logo/Blog Title */}
        <Link
          to="/"
          className="text-lg font-medium font-serif tracking-tight hover:text-accent transition-colors"
        >
          {blogConfig.title}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {blogConfig.navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link",
                location.pathname === item.path && "active"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button and Theme Toggle (shown side by side on mobile) */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          
          <button
            className="flex flex-col space-y-1 items-center justify-center w-8 h-8 button-reset"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-5 h-0.5 bg-foreground rounded-full transition-transform duration-300",
                mobileMenuOpen && "transform rotate-45 translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-foreground rounded-full transition-opacity duration-300",
                mobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-foreground rounded-full transition-transform duration-300",
                mobileMenuOpen && "transform -rotate-45 -translate-y-1.5"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 pt-16 bg-white/95 dark:bg-background/95 backdrop-blur-sm md:hidden z-40 transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
          {blogConfig.navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-base font-medium transition-colors",
                location.pathname === item.path
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
