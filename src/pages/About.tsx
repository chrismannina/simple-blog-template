
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { blogConfig } from "@/config/blog.config";
import { createPageTitle } from "@/lib/utils";
import BlogLayout from "@/components/BlogLayout";

const About = () => {
  return (
    <BlogLayout>
      <Helmet>
        <title>{createPageTitle("About")}</title>
        <meta name="description" content={`About the author of ${blogConfig.title}`} />
      </Helmet>

      <section className="pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 animate-slide-up">About</h1>
          
          <div className="bg-secondary/30 rounded-lg p-8 mb-12 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={blogConfig.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt={blogConfig.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-2">{blogConfig.author.name}</h2>
                <p className="text-muted-foreground mb-4">{blogConfig.author.bio}</p>
                
                <div className="flex gap-4">
                  {Object.entries(blogConfig.author.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={platform}
                    >
                      {/* Simple placeholder for social icons */}
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="sr-only">{platform}</span>
                        <span className="text-xs uppercase">{platform.charAt(0)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose-custom animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">About This Blog</h2>
            <p>
              This blog was created using a minimal, elegant blog template designed with simplicity and readability in mind.
              It features a clean design, responsive layout, and markdown support for easy content creation.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">How to Use This Template</h2>
            <p>
              This template is designed to be easy to customize and use. Simply edit the <code>blog.config.ts</code> file to change
              the blog title, description, author information, and other settings. Then, add your blog posts as markdown files in
              the <code>posts</code> directory.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Clean, minimal design inspired by modern design principles</li>
              <li>Responsive layout that looks great on all devices</li>
              <li>Markdown support for easy content creation</li>
              <li>Syntax highlighting for code blocks</li>
              <li>Easy customization through a central configuration file</li>
              <li>Fast performance and SEO-friendly</li>
            </ul>
            
            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
};

export default About;
