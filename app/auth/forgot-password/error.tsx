'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md space-y-6">
        {/* Error icon */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-600"
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
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Password Reset Error
          </h1>
          
          <p className="text-muted-foreground">
            We couldn't process your password reset request.
          </p>
        </div>
        
        {/* Error message */}
        <div className="card-modern p-4 border-red-200 bg-red-50">
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
                {error.message || "An unexpected error occurred while resetting your password."}
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
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full btn-primary"
          >
            Try Again
          </button>
          
          <div className="text-center space-y-2">
            <a
              href="/auth/login"
              className="block text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Back to Login
            </a>
            <a
              href="/auth/sign-up"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Create a new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
