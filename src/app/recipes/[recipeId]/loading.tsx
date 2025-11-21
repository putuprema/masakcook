export default function RecipeLoading() {
  // Predefined IDs for skeleton items to avoid index-based keys
  const metadataItems = [
    "prep",
    "cook",
    "total",
    "servings",
    "difficulty",
    "rating",
  ];
  const ingredientItems = [
    "ing-1",
    "ing-2",
    "ing-3",
    "ing-4",
    "ing-5",
    "ing-6",
  ];
  const instructionItems = ["inst-1", "inst-2", "inst-3", "inst-4", "inst-5"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-300" />
          <div className="h-4 w-12 animate-pulse rounded bg-gray-300" />
          <div className="h-4 w-4 animate-pulse rounded bg-gray-300" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
        </div>

        {/* Recipe Header Skeleton */}
        <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Hero Image Skeleton */}
          <div className="h-64 w-full animate-pulse bg-gray-300 md:h-96" />

          {/* Content Skeleton */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* Left: Title and Author */}
              <div className="flex-1">
                {/* Category Badge */}
                <div className="mb-3 h-7 w-24 animate-pulse rounded-full bg-gray-300" />

                {/* Title */}
                <div className="mb-4 space-y-2">
                  <div className="h-8 w-3/4 animate-pulse rounded bg-gray-300" />
                  <div className="h-8 w-1/2 animate-pulse rounded bg-gray-300" />
                </div>

                {/* Description */}
                <div className="mb-4 space-y-2">
                  <div className="h-5 w-full animate-pulse rounded bg-gray-300" />
                  <div className="h-5 w-5/6 animate-pulse rounded bg-gray-300" />
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
                  <div className="space-y-2">
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-300" />
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
                  </div>
                </div>
              </div>

              {/* Right: Save Button */}
              <div className="h-12 w-36 animate-pulse rounded-lg bg-gray-300" />
            </div>
          </div>
        </div>

        {/* Recipe Metadata Skeleton */}
        <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            {/* Title */}
            <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-300" />

            {/* Grid of metadata items */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {metadataItems.map((id) => (
                <div key={id} className="flex items-start gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-300" />
                  <div className="space-y-2">
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-300" />
                    <div className="h-4 w-12 animate-pulse rounded bg-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two-column layout for Ingredients and Instructions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Ingredients Card Skeleton */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-pulse rounded bg-gray-300" />
                <div className="h-5 w-24 animate-pulse rounded bg-gray-300" />
              </div>
            </div>

            {/* List Items */}
            <div className="p-6">
              <div className="space-y-3">
                {ingredientItems.map((id) => (
                  <div key={id} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-gray-300" />
                    <div
                      className="h-4 animate-pulse rounded bg-gray-300"
                      style={{ width: `${60 + Math.random() * 30}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions Card Skeleton */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-pulse rounded bg-gray-300" />
                <div className="h-5 w-28 animate-pulse rounded bg-gray-300" />
              </div>
            </div>

            {/* List Items */}
            <div className="p-6">
              <div className="space-y-4">
                {instructionItems.map((id) => (
                  <div key={id} className="flex gap-4">
                    <div className="h-8 w-8 flex-shrink-0 animate-pulse rounded-full bg-gray-300" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
                      <div
                        className="h-4 animate-pulse rounded bg-gray-300"
                        style={{ width: `${70 + Math.random() * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
