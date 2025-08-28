export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="h-12 bg-muted rounded-lg animate-pulse mx-auto max-w-md mb-4" />
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="h-5 bg-muted rounded animate-pulse" />
            <div className="h-5 bg-muted rounded animate-pulse mx-auto max-w-lg" />
          </div>
        </div>

        {/* Create New Set Button */}
        <div className="flex justify-center mb-12">
          <div className="h-12 w-48 bg-muted rounded-lg animate-pulse" />
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="card-modern p-6 hover:shadow-xl transition-all duration-300 group">
              {/* Set header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="h-6 bg-muted rounded animate-pulse mb-2 max-w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse max-w-1/2" />
                </div>
                <div className="w-8 h-8 bg-muted rounded animate-pulse" />
              </div>

              {/* Set description */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse max-w-4/5" />
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-8" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-12" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <div className="h-9 bg-muted rounded animate-pulse flex-1" />
                <div className="h-9 w-20 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty state skeleton (for when no sets) */}
        <div className="text-center py-16 hidden">
          <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6 animate-pulse" />
          <div className="h-8 bg-muted rounded animate-pulse mx-auto max-w-sm mb-4" />
          <div className="h-5 bg-muted rounded animate-pulse mx-auto max-w-md" />
        </div>
      </div>
    </div>
  );
}
