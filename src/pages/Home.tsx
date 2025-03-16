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
      <section className="pt-16 pb-12">
        <div className="blog-container">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              {blogConfig.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {blogConfig.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-secondary/30">
          <div className="blog-container">
            <h2 className="section-title">Featured Post</h2>
            
            {loading ? (
              <div className="h-96 rounded-lg bg-white animate-pulse" />
            ) : (
              <PostCard post={featuredPost} featured />
            )}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16">
        <div className="blog-container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title">Recent Articles</h2>
            {recentPosts.length > blogConfig.postsPerPage && (
              <Link
                to="/archive"
                className="text-sm font-medium text-accent hover:underline flex items-center"
              >
                View all posts
                <svg
                  className="ml-1 w-4 h-4"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 rounded-lg bg-white animate-pulse" />
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.slice(0, 4).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground bg-white p-6 rounded-lg shadow-sm border border-border">
              No recent posts available.
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-secondary/30">
        <div className="blog-container">
          <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-border p-8">
            <h2 className="section-title">About the Author</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {blogConfig.author.avatar && (
                <img 
                  src={blogConfig.author.avatar} 
                  alt={blogConfig.author.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-card shadow-md"
                />
              )}
              <div>
                <h3 className="font-serif text-xl font-semibold mb-3">{blogConfig.author.name}</h3>
                <p className="text-muted-foreground mb-4">{blogConfig.author.bio}</p>
                <div className="flex gap-4">
                  {Object.entries(blogConfig.author.social).map(([platform, url]) => (
                    <a 
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline capitalize"
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
