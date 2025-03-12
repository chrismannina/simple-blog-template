
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getPostBySlug, PostMeta } from "@/lib/posts";
import { formatDate, createPageTitle } from "@/lib/utils";
import BlogLayout from "@/components/BlogLayout";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<{ meta: PostMeta; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const postData = await getPostBySlug(slug);
        setPost(postData);
        setError(null);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <BlogLayout>
        <div className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-16 animate-pulse">
          <div className="paper-note">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </BlogLayout>
    );
  }

  if (error || !post) {
    return (
      <BlogLayout>
        <div className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-16 text-center">
          <div className="paper-note">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <Helmet>
        <title>{createPageTitle(post.meta.title)}</title>
        <meta name="description" content={post.meta.excerpt} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back
          </button>
        </div>

        <article className="paper-note accent-purple animate-fade-in">
          {/* Header */}
          <header className="mb-8">
            {post.meta.tags && post.meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.meta.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{post.meta.title}</h1>
            
            <time className="text-muted-foreground">
              {formatDate(post.meta.date)}
            </time>
          </header>

          {/* Featured Image */}
          {post.meta.coverImage && (
            <div className="mb-8">
              <img
                src={post.meta.coverImage}
                alt={post.meta.title}
                className="w-full rounded-sm object-cover max-h-96 border border-gray-200"
              />
            </div>
          )}

          {/* Content */}
          <MarkdownRenderer content={post.content} />
        </article>
      </div>
    </BlogLayout>
  );
};

export default BlogPost;
