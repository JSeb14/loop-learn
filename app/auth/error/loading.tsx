export default function Loading() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-8 bg-muted rounded animate-pulse mx-auto max-w-40" />
          <div className="h-4 bg-muted rounded animate-pulse mx-auto max-w-56" />
        </div>
        
        {/* Error message skeleton */}
        <div className="card-modern p-4 border-red-200 bg-red-50">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-300 rounded animate-pulse" />
            <div className="h-4 bg-red-300 rounded animate-pulse flex-1" />
          </div>
        </div>
        
        {/* Action button skeleton */}
        <div className="h-10 bg-muted rounded-md animate-pulse" />
      </div>
    </div>
  );
}
