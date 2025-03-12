
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createPageTitle } from "@/lib/utils";
import BlogLayout from "@/components/BlogLayout";

const NotFound = () => {
  return (
    <BlogLayout>
      <Helmet>
        <title>{createPageTitle("Page Not Found")}</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-6 md:px-8">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-6xl font-bold mb-6 animate-slide-up">404</h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors animate-fade-in"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Return Home
          </Link>
        </div>
      </div>
    </BlogLayout>
  );
};

export default NotFound;
