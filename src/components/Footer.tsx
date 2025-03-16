import { Link } from "react-router-dom";
import { blogConfig } from "@/config/blog.config";

const Footer = () => {
  return (
    <footer className="py-10 px-4 md:px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blog Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {blogConfig.description}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {Object.entries(blogConfig.author.social).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors capitalize"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-1 md:items-end">
            {blogConfig.navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {blogConfig.footer.links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          {blogConfig.footer.text}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
