export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
          <div className="h-8 bg-muted rounded animate-pulse w-48" />
        </div>

        {/* Form container */}
        <div className="card-modern p-8">
          {/* Form header */}
          <div className="mb-8">
            <div className="h-8 bg-muted rounded animate-pulse mb-3 max-w-xs" />
            <div className="h-5 bg-muted rounded animate-pulse max-w-lg" />
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            {/* Set name field */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-20" />
              <div className="h-12 bg-muted rounded-md animate-pulse" />
            </div>

            {/* Description field */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-24" />
              <div className="h-24 bg-muted rounded-md animate-pulse" />
            </div>

            {/* Category field */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-20" />
              <div className="h-12 bg-muted rounded-md animate-pulse" />
            </div>

            {/* Visibility field */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-20" />
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-16" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-16" />
                </div>
              </div>
            </div>

            {/* Tags field */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-16" />
              <div className="h-12 bg-muted rounded-md animate-pulse" />
              <div className="h-3 bg-muted rounded animate-pulse max-w-sm" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-border">
            <div className="h-12 w-24 bg-muted rounded-md animate-pulse" />
            <div className="h-12 w-32 bg-muted rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
