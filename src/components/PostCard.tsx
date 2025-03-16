import { Link } from "react-router-dom";
import { blogConfig } from "@/config/blog.config";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  return (
    <article 
      className={featured ? "featured-post-card" : "blog-card"}
    >
      <div className={`${featured ? "" : "p-5"}`}>
        {post.coverImage && (
          <Link
            to={`/blog/${post.slug}`}
            className={`block overflow-hidden ${featured ? "mb-5" : "mb-4"}`}
          >
            <img 
              src={post.coverImage} 
              alt={post.title}
              className={`w-full object-cover transition-transform duration-300 hover:scale-[1.02] rounded-sm ${
                featured ? "h-[300px]" : "h-[180px]"
              }`}
            />
          </Link>
        )}
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className={`${featured ? "text-xl md:text-2xl" : "text-lg"} font-serif font-medium mb-2 hover:text-accent transition-colors`}>
            {post.title}
          </h2>
        </Link>
        
        <time className="text-xs text-muted-foreground mb-3 block">
          {formatDate(post.date)}
        </time>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {blogConfig.showExcerptInList && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
        )}
        
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-xs font-medium text-accent hover:underline"
        >
          Read more
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
      </div>
    </article>
  );
};

export default PostCard;
