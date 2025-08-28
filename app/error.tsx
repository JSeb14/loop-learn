'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Error Icon */}
          <div className="mx-auto w-24 h-24 relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
            <div className="relative bg-card rounded-full p-6 shadow-2xl border border-red-200">
              <svg
                className="w-12 h-12 text-red-500"
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
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Something went wrong!
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              We encountered an unexpected error while loading the page. 
              Don't worry, this is usually temporary.
            </p>
          </div>

          {/* Error details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="card-modern p-4 text-left max-w-lg mx-auto">
              <h3 className="font-semibold text-red-600 mb-2">Error Details:</h3>
              <code className="text-sm text-muted-foreground break-words">
                {error.message}
              </code>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="btn-primary"
            >
              Try Again
            </button>
            
            <a
              href="/"
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
