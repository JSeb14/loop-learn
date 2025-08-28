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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Search Error
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            We encountered an error while searching for flashcard sets. 
            Please try again.
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
                  {error.message || "Failed to search for public flashcard sets."}
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
              href="/protected/sets"
              className="btn-secondary"
            >
              My Flashcard Sets
            </a>
            
            <a
              href="/protected/sets/create"
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Create New Set
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
