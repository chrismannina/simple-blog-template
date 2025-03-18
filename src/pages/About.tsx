import { Helmet } from "react-helmet";
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

      <section className="pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-serif font-medium mb-6">About</h1>
          
          <div className="bg-secondary/20 rounded-sm p-5 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={blogConfig.author.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt={blogConfig.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-xl font-serif font-medium mb-2">{blogConfig.author.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{blogConfig.author.bio}</p>
                
                <div className="flex gap-3">
                  {Object.entries(blogConfig.author.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent/80 transition-colors capitalize"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose-custom">
            <h2>About This Blog</h2>
            <p>
              This blog was created using a minimal, elegant blog template designed with simplicity and readability in mind.
              It features a clean design, responsive layout, and markdown support for easy content creation.
            </p>

            <h2>How to Use This Template</h2>
            <p>
              This template is designed to be easy to customize and use. Simply edit the <code>blog.config.ts</code> file to change
              the blog title, description, author information, and other settings. Then, add your blog posts as markdown files in
              the <code>posts</code> directory.
            </p>
            
            <h3>Key Features</h3>
            <ul>
              <li>Clean, minimal design inspired by modern design principles</li>
              <li>Responsive layout that looks great on all devices</li>
              <li>Markdown support for easy content creation</li>
              <li>Syntax highlighting for code blocks</li>
              <li>Easy customization through a central configuration file</li>
              <li>Fast performance and SEO-friendly</li>
              <li>Dark mode support with system preference detection</li>
            </ul>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
};

export default About;
