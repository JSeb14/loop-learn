'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          {/* Error icon */}
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Unable to Load Your Sets
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            We encountered an error while loading your flashcard sets. 
            This is usually temporary.
          </p>

          {/* Error details */}
          <div className="card-modern p-4 text-left max-w-lg mx-auto mb-8">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-red-800 text-sm">
                  {error.message || "Failed to fetch flashcard sets from the server."}
                </p>
                {error.digest && process.env.NODE_ENV === 'development' && (
                  <p className="text-red-600 text-xs mt-1">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="btn-primary"
            >
              Try Again
            </button>
            
            <a
              href="/protected/sets/create"
              className="btn-secondary"
            >
              Create New Set
            </a>
            
            <a
              href="/protected/search-sets"
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Browse Public Sets
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
