export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="h-10 bg-muted rounded-lg animate-pulse mx-auto max-w-sm mb-4" />
          <div className="h-5 bg-muted rounded animate-pulse mx-auto max-w-md" />
        </div>

        {/* Search bar */}
        <div className="card-modern p-6 mb-8">
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded animate-pulse w-32" />
            <div className="h-12 bg-muted rounded-md animate-pulse" />
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-8 w-20 bg-muted rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Search results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="card-modern p-6 hover:shadow-xl transition-all duration-300">
              {/* Set header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="h-6 bg-muted rounded animate-pulse mb-2 max-w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse max-w-1/2" />
                </div>
                <div className="w-6 h-6 bg-muted rounded animate-pulse" />
              </div>

              {/* Author */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-muted rounded-full animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-20" />
              </div>

              {/* Description */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse max-w-4/5" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {Array.from({ length: 3 }).map((_, tagIndex) => (
                  <div key={tagIndex} className="h-5 w-16 bg-muted rounded-full animate-pulse" />
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse w-8" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse w-12" />
                  </div>
                </div>
                <div className="h-4 bg-muted rounded animate-pulse w-16" />
              </div>

              {/* Action button */}
              <div className="h-9 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-muted rounded animate-pulse" />
            <div className="w-10 h-10 bg-muted rounded animate-pulse" />
            <div className="w-10 h-10 bg-muted rounded animate-pulse" />
            <div className="w-4 h-10 bg-muted rounded animate-pulse" />
            <div className="w-10 h-10 bg-muted rounded animate-pulse" />
            <div className="w-10 h-10 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Empty state skeleton */}
        <div className="text-center py-16 hidden">
          <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-muted rounded animate-pulse mx-auto max-w-sm mb-2" />
          <div className="h-4 bg-muted rounded animate-pulse mx-auto max-w-md" />
        </div>
      </div>
    </div>
  );
}
