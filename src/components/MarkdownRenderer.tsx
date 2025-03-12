
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      className={cn("prose-custom", className)}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: "1.5rem 0",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={cn(
                "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
        a({ node, className, children, ...props }) {
          return (
            <a
              className={cn(
                "text-primary underline-offset-4 hover:underline",
                className
              )}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          );
        },
        img({ node, className, ...props }) {
          return (
            <img
              className={cn(
                "rounded-lg my-8 w-full object-cover", 
                className
              )}
              loading="lazy"
              {...props}
            />
          );
        },
        blockquote({ node, className, children, ...props }) {
          return (
            <blockquote
              className={cn(
                "border-l-4 border-primary/30 pl-4 italic text-muted-foreground",
                className
              )}
              {...props}
            >
              {children}
            </blockquote>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
