
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
      className={`group paper-note ${
        featured 
          ? "accent-purple lg:flex gap-8 items-center py-8" 
          : "accent-blue hover:shadow-lg transition-all duration-300"
      }`}
    >
      {post.coverImage && (
        <Link
          to={`/blog/${post.slug}`}
          className={`block overflow-hidden ${featured ? "lg:w-1/2" : "mb-5"}`}
        >
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105 border-2 border-gray-200 rounded-md shadow-sm"
            style={{ 
              height: featured ? '320px' : '220px',
              objectFit: 'cover'
            }}
          />
        </Link>
      )}
      
      <div className={`flex flex-col ${featured ? "lg:w-1/2" : ""}`}>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs font-medium px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className={`${featured ? "text-2xl md:text-3xl" : "text-xl"} font-bold mb-3 group-hover:text-accent transition-colors`}>
            {post.title}
          </h2>
        </Link>
        
        <time className="text-sm text-muted-foreground mb-3 italic">
          {formatDate(post.date)}
        </time>
        
        {blogConfig.showExcerptInList && (
          <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">{post.excerpt}</p>
        )}
        
        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center text-sm font-medium text-accent hover:underline"
        >
          Read more
          <svg
            className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1"
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
