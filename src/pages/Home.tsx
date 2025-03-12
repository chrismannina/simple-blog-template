
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
      <section className="pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4 animate-fade-in">
            Welcome to {blogConfig.title}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            {blogConfig.description}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up [animation-delay:200ms]">
            {blogConfig.author.bio}
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up [animation-delay:400ms]">
            <Link
              to="/archive"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse All Posts
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              About the Author
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Post</h2>
          {loading ? (
            <div className="h-96 rounded-lg bg-muted animate-pulse" />
          ) : featuredPost ? (
            <PostCard post={featuredPost} featured />
          ) : (
            <p className="text-muted-foreground">No posts yet. Create your first post!</p>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            {recentPosts.length > 0 && (
              <Link
                to="/archive"
                className="text-sm font-medium text-primary hover:underline flex items-center"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recent posts available.</p>
          )}
        </div>
      </section>
    </BlogLayout>
  );
};

export default Home;
