
import { Link } from "react-router-dom";
import { blogConfig } from "@/config/blog.config";

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-8 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{blogConfig.title}</h3>
            <p className="text-sm text-muted-foreground">
              {blogConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <div className="flex flex-col space-y-2">
              {blogConfig.navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex flex-col space-y-2">
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
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          {blogConfig.footer.text}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
