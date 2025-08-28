export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header section with back button */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
          <div className="h-8 bg-muted rounded animate-pulse w-48" />
        </div>

        {/* Set details header */}
        <div className="card-modern p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-8 bg-muted rounded animate-pulse mb-3 max-w-md" />
              <div className="h-5 bg-muted rounded animate-pulse max-w-lg mb-2" />
              <div className="h-4 bg-muted rounded animate-pulse max-w-sm" />
            </div>
            <div className="w-10 h-10 bg-muted rounded animate-pulse" />
          </div>

          {/* Set stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-16" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-20" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-28 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Add new card button */}
        <div className="flex justify-center mb-8">
          <div className="h-12 w-40 bg-muted rounded-lg animate-pulse" />
        </div>

        {/* Flashcards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="card-modern p-6 group">
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="h-5 bg-muted rounded animate-pulse w-16" />
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-muted rounded animate-pulse" />
                  <div className="w-6 h-6 bg-muted rounded animate-pulse" />
                </div>
              </div>

              {/* Card content */}
              <div className="space-y-4">
                {/* Front side */}
                <div>
                  <div className="h-4 bg-muted rounded animate-pulse w-12 mb-2" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse max-w-4/5" />
                  </div>
                </div>

                {/* Back side */}
                <div>
                  <div className="h-4 bg-muted rounded animate-pulse w-12 mb-2" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse max-w-3/4" />
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                <div className="h-3 bg-muted rounded animate-pulse w-20" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                  <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state skeleton */}
        <div className="text-center py-16 hidden">
          <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-muted rounded animate-pulse mx-auto max-w-xs mb-2" />
          <div className="h-4 bg-muted rounded animate-pulse mx-auto max-w-sm" />
        </div>
      </div>
    </div>
  );
}
