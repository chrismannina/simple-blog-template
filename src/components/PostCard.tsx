
import { Link } from "react-router-dom";
import { blogConfig } from "@/config/blog.config";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
  delay?: number;
}

const PostCard = ({ post, featured = false, delay = 0 }: PostCardProps) => {
  return (
    <article 
      className={`reveal-on-scroll ${featured ? "featured-post-card" : "blog-card newspaper-border"}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className={`${featured ? "" : "p-6"}`}>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={tag} className="blog-tag" style={{ transitionDelay: `${index * 50}ms` }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className={`${featured ? "newspaper-headline mb-3" : "font-serif text-xl md:text-2xl font-bold mb-3 hover:text-accent transition-colors"}`}>
            {post.title}
          </h2>
        </Link>
        
        <time className="newspaper-date inline-block">
          {formatDate(post.date)}
        </time>
        
        {post.coverImage && (
          <Link
            to={`/blog/${post.slug}`}
            className={`block overflow-hidden ${featured ? "mb-6" : "mb-4"} mt-4 newspaper-image`}
          >
            <img 
              src={post.coverImage} 
              alt={post.title}
              className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
                featured ? "h-[400px]" : "h-[220px]"
              }`}
            />
          </Link>
        )}
        
        {blogConfig.showExcerptInList && (
          <p className={`text-muted-foreground line-clamp-3 mb-5 leading-relaxed font-garamond ${featured ? "newspaper-dropcap text-lg" : ""}`}>
            {post.excerpt}
          </p>
        )}
        
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-accent hover:underline group"
        >
          Continue reading
          <svg
            className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
