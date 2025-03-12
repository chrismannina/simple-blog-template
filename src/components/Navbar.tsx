
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { blogConfig } from "@/config/blog.config";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8",
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Blog Title */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          {blogConfig.title}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {blogConfig.navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-all hover:text-primary relative",
                location.pathname === item.path
                  ? "text-black"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full transform origin-left animate-slide-up" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 items-center justify-center w-8 h-8"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "w-5 h-0.5 bg-foreground rounded-full transition-transform duration-300",
              mobileMenuOpen && "transform rotate-45 translate-y-2"
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
              mobileMenuOpen && "transform -rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 pt-20 bg-white/95 backdrop-blur-lg md:hidden z-40 transition-transform duration-300 transform",
          mobileMenuOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
          {blogConfig.navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-lg font-medium transition-colors",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
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
