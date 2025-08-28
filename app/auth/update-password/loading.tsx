export default function Loading() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-8 bg-muted rounded animate-pulse mx-auto max-w-56" />
          <div className="h-4 bg-muted rounded animate-pulse mx-auto max-w-72" />
        </div>
        
        {/* Form skeleton */}
        <div className="space-y-4">
          {/* Current Password field */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-32" />
            <div className="h-10 bg-muted rounded-md animate-pulse" />
          </div>
          
          {/* New Password field */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-28" />
            <div className="h-10 bg-muted rounded-md animate-pulse" />
          </div>
          
          {/* Confirm Password field */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-36" />
            <div className="h-10 bg-muted rounded-md animate-pulse" />
          </div>
          
          {/* Submit button */}
          <div className="h-10 bg-muted rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}
