
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
      <section className="pt-32 pb-12 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <h1 className="title-badge">BREAKDOWN</h1>
          </div>
          <div className="paper-note accent-purple">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-primary">
              {blogConfig.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              {blogConfig.description}
            </p>
            <p className="text-muted-foreground mb-4">
              {blogConfig.author.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="paper-note accent-green pl-12 mb-6">
            <h2 className="text-xl font-bold text-green-600">Title</h2>
            <p className="text-sm text-muted-foreground">Include key search terms that readers will most likely search for</p>
          </div>
          
          {loading ? (
            <div className="h-96 rounded-lg bg-white animate-pulse" />
          ) : featuredPost ? (
            <PostCard post={featuredPost} featured />
          ) : (
            <p className="text-muted-foreground paper-note">No posts yet. Create your first post!</p>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="paper-note accent-blue pl-12 mb-6">
            <h2 className="text-xl font-bold text-blue-600">Intro</h2>
            <p className="text-sm text-muted-foreground">Quickly highlight the benefits and give some reasons why</p>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Recent Posts</h2>
            {recentPosts.length > 0 && (
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
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground paper-note">No recent posts available.</p>
          )}
        </div>
      </section>
    </BlogLayout>
  );
};

export default Home;
