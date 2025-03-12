
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
      className={`group flex flex-col rounded-lg overflow-hidden transition-all duration-300 ${
        featured 
          ? "lg:flex-row bg-secondary/50 hover:bg-secondary" 
          : "hover:translate-y-[-4px] hover:shadow-md border border-border hover:border-muted-foreground/20"
      }`}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={`block overflow-hidden ${featured ? "lg:w-1/2" : "aspect-video"}`}
      >
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ 
            backgroundImage: post.coverImage 
              ? `url(${post.coverImage})` 
              : "url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80)" 
          }}
        />
      </Link>
      
      <div className={`flex flex-col p-6 ${featured ? "lg:w-1/2" : ""}`}>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className={`${featured ? "text-2xl md:text-3xl" : "text-xl"} font-semibold mb-2 group-hover:text-primary transition-colors`}>
            {post.title}
          </h2>
        </Link>
        
        <time className="text-sm text-muted-foreground mb-3">
          {formatDate(post.date)}
        </time>
        
        {blogConfig.showExcerptInList && (
          <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
        )}
        
        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Read more
          <svg
            className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
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
