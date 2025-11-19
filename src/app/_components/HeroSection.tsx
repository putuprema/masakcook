import {
  ClockIcon,
  FireIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { getRecipeOfTheDay } from "@/lib/recipes";

// Loading components for Suspense boundaries
export function HeroSkeleton() {
  return (
    <div className="h-[500px] w-full animate-pulse bg-gray-300 md:h-[600px]" />
  );
}

export async function HeroSection() {
  const recipe = await getRecipeOfTheDay();
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <section className="relative h-[500px] w-full overflow-hidden md:h-[600px]">
      {/* Background Image */}
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="w-full px-4 py-8 md:px-8 md:py-12 lg:px-12">
          <div className="mx-auto max-w-7xl">
            {/* Badge */}
            <div className="mb-4 flex items-center gap-2">
              <FireIcon className="h-5 w-5 text-orange-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                Recipe of the Day
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {recipe.title}
            </h1>

            {/* Description */}
            <p className="mb-6 max-w-2xl text-lg text-gray-200 md:text-xl">
              {recipe.description}
            </p>

            {/* Stats */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-white md:gap-6 md:text-base">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-300" />
                <span>{totalTime} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-gray-300" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span>
                  {recipe.ratings.average} ({recipe.ratings.count} reviews)
                </span>
              </div>
              <div className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                {recipe.difficulty}
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-gray-900 transition-transform hover:scale-105 hover:shadow-lg"
            >
              View Full Recipe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
