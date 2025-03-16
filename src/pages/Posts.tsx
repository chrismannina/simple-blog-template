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

      <section className="pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl font-bold mb-6">Posts</h1>
            <p className="text-muted-foreground">
              Browse all {filteredPosts.length} post{filteredPosts.length !== 1 && "s"}
              {selectedTag && <> tagged with <span className="font-medium text-foreground">#{selectedTag}</span></>}
            </p>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="mb-10 animate-fade-in">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
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
                    className={`text-sm px-3 py-1 rounded-full transition-colors ${
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
            <div className="space-y-6 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-6 bg-muted rounded w-24"></div>
                  <div className="h-14 bg-muted rounded w-full"></div>
                  <div className="h-14 bg-muted rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-12 animate-fade-in">
              {sortedYears.map((year) => (
                <div key={year}>
                  <h2 className="text-xl font-bold mb-4">{year}</h2>
                  <div className="space-y-4 divide-y divide-border">
                    {postsByYear[year].map((post) => (
                      <div key={post.slug} className="pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-lg font-medium hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                          <time className="text-sm text-muted-foreground mt-1 sm:mt-0">
                            {formatDate(post.date)}
                          </time>
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {post.tags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
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
            <div className="text-center py-12 bg-secondary/30 rounded-lg animate-fade-in">
              <p className="text-muted-foreground mb-4">No posts found matching your criteria.</p>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
