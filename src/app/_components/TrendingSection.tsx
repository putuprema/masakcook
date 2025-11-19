import { FireIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";
import { getTrendingRecipes } from "@/lib/recipes";
import { RecipeCard } from "@/shared-components/RecipeCard";

export async function TrendingSection() {
  return (
    <section className="w-full bg-gray-50 px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 flex items-center gap-3">
          <FireIcon className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Trending Now
          </h2>
        </div>

        {/* Horizontal Scrollable Container */}
        <Suspense fallback={<TrendingSkeleton />}>
          <TrendingItemsContainer />
        </Suspense>

        {/* Mobile scroll hint text */}
        <p className="mt-4 text-center text-sm text-gray-500 md:hidden">
          Swipe to see more recipes →
        </p>
      </div>
    </section>
  );
}

async function TrendingItemsContainer() {
  const trendingRecipes = await getTrendingRecipes(12);

  return (
    <div className="relative">
      <div className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth pb-4">
        {trendingRecipes.map((recipe) => (
          <div key={recipe.id} className="w-[280px] shrink-0 sm:w-[320px]">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      {/* Scroll Hint - Only visible on larger screens */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-24 bg-linear-to-l from-gray-50 to-transparent md:block" />
    </div>
  );
}

function TrendingSkeleton() {
  const skeletonIds = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"];
  return (
    <div className="flex gap-6 overflow-hidden">
      {skeletonIds.map((id) => (
        <div
          key={id}
          className="h-96 w-[280px] shrink-0 animate-pulse rounded-lg bg-gray-300 sm:w-[320px]"
        />
      ))}
    </div>
  );
}
