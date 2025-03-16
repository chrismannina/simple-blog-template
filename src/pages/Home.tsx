import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getAllPosts } from "@/lib/posts";
import { blogConfig } from "@/config/blog.config";
import { createPageTitle } from "@/lib/utils";
import BlogLayout from "@/components/BlogLayout";
import PostCard from "@/components/PostCard";
import { PostMeta } from "@/lib/posts";

const Home = () => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const recentPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <BlogLayout>
      <Helmet>
        <title>{createPageTitle()}</title>
        <meta name="description" content={blogConfig.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-14 pb-8">
        <div className="blog-container">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-medium mb-3">
              {blogConfig.title}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {blogConfig.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-8">
          <div className="blog-container">
            <h2 className="section-title mb-5">Latest Post</h2>
            
            {loading ? (
              <div className="h-64 bg-muted rounded-sm animate-pulse" />
            ) : (
              <PostCard post={featuredPost} featured />
            )}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-10">
        <div className="blog-container">
          <div className="flex justify-between items-center mb-5">
            <h2 className="section-title">Recent Posts</h2>
            {recentPosts.length > blogConfig.postsPerPage && (
              <Link
                to="/posts"
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center"
              >
                View all
                <svg
                  className="ml-1 w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </Link>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-56 bg-muted rounded-sm animate-pulse" />
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.slice(0, 4).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground bg-muted p-4 rounded-sm border border-border">
              No recent posts available.
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 border-t border-border">
        <div className="blog-container">
          <div className="bg-secondary/30 dark:bg-secondary/20 rounded-sm p-5 md:p-6">
            <h2 className="section-title">About</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {blogConfig.author.avatar && (
                <img 
                  src={blogConfig.author.avatar} 
                  alt={blogConfig.author.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="font-serif text-lg font-medium mb-2">{blogConfig.author.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{blogConfig.author.bio}</p>
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
        </div>
      </section>
    </BlogLayout>
  );
};

export default Home;
