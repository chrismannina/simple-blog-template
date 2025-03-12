
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  // Ensure we're only rendering the actual content, not the frontmatter
  const contentToRender = content || "";
  
  return (
    <ReactMarkdown
      className={cn("prose-custom", className)}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: "1.5rem 0",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                border: "1px solid #e2e8f0",
              }}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={cn(
                "bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono",
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
                "text-accent underline-offset-4 hover:underline",
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
                "rounded-lg my-8 w-full object-cover border border-gray-200 shadow-sm", 
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
                "paper-note accent-blue my-6 not-italic",
                className
              )}
              {...props}
            >
              {children}
            </blockquote>
          );
        },
        h2({ node, className, children, ...props }) {
          return (
            <h2
              className={cn(
                "text-2xl font-bold mt-8 mb-4 text-primary",
                className
              )}
              {...props}
            >
              {children}
            </h2>
          );
        },
        h1({ node, className, children, ...props }) {
          return (
            <h1
              className={cn(
                "text-3xl font-bold mb-6 mt-8 text-primary",
                className
              )}
              {...props}
            >
              {children}
            </h1>
          );
        },
      }}
    >
      {contentToRender}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
