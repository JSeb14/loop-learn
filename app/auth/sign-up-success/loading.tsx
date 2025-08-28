export default function Loading() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-8 bg-muted rounded animate-pulse mx-auto max-w-48" />
          <div className="h-5 bg-muted rounded animate-pulse mx-auto max-w-72" />
        </div>
        
        {/* Success message skeleton */}
        <div className="card-modern p-6 border-green-200 bg-green-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-green-300 rounded-full animate-pulse" />
            <div className="h-5 bg-green-300 rounded animate-pulse flex-1" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-green-300 rounded animate-pulse" />
            <div className="h-4 bg-green-300 rounded animate-pulse max-w-4/5" />
          </div>
        </div>
        
        {/* Action button skeleton */}
        <div className="h-10 bg-muted rounded-md animate-pulse" />
      </div>
    </div>
  );
}
