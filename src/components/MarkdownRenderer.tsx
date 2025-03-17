import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs as lightTheme, vscDarkPlus as darkTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  // Remove any leading or trailing whitespace
  const contentToRender = content?.trim() || "";
  
  // Check if the content still has any frontmatter (it shouldn't)
  // This is a safety check in case the grey-matter didn't remove it
  const cleanedContent = contentToRender.replace(/^---\s*[\s\S]*?---\s*/m, '');
  
  // Get current theme
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
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
              style={isDarkMode ? darkTheme : lightTheme}
              customStyle={{
                margin: "1.5rem 0",
                padding: "1.25rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                border: isDarkMode ? "1px solid #2d3748" : "1px solid #cbd5e0",
                backgroundColor: isDarkMode ? "#1a202c" : "#f0f4f8",
                boxShadow: isDarkMode 
                  ? "none" 
                  : "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                lineHeight: "1.6",
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontWeight: 500,
                }
              }}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={cn(
                isDarkMode 
                  ? "bg-gray-800 text-gray-100" 
                  : "bg-gray-200 text-gray-800 border border-gray-300",
                "px-2 py-1 rounded text-sm font-mono",
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
        }
      }}
    >
      {cleanedContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
