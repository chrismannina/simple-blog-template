import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getAllPosts, PostMeta } from "@/lib/posts";
import { formatDate, createPageTitle } from "@/lib/utils";
import BlogLayout from "@/components/BlogLayout";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort();

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts;

  // Group posts by year
  const postsByYear = filteredPosts.reduce<Record<string, PostMeta[]>>(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {}
  );

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <BlogLayout>
      <Helmet>
        <title>{createPageTitle("Posts")}</title>
        <meta name="description" content="Browse all blog posts" />
      </Helmet>

      <section className="pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-serif font-medium mb-3">Posts</h1>
            <p className="text-sm text-muted-foreground">
              All posts {selectedTag && <span>tagged with <span className="font-medium text-foreground">#{selectedTag}</span></span>}
            </p>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    selectedTag === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  All
                </button>
                
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                      tag === selectedTag
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Posts by year */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 bg-muted rounded w-20"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-10">
              {sortedYears.map((year) => (
                <div key={year}>
                  <h2 className="text-lg font-medium font-serif mb-3">{year}</h2>
                  <div className="space-y-4 divide-y divide-border/60">
                    {postsByYear[year].map((post) => (
                      <div key={post.slug} className="pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-base font-medium hover:text-accent transition-colors"
                          >
                            {post.title}
                          </Link>
                          <time className="text-xs text-muted-foreground mt-1 sm:mt-0">
                            {formatDate(post.date)}
                          </time>
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {post.tags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-secondary/20 rounded-sm">
              <p className="text-sm text-muted-foreground mb-4">No posts found matching your criteria.</p>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-xs font-medium px-3 py-1.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Clear filter
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </BlogLayout>
  );
};

export default Posts;
