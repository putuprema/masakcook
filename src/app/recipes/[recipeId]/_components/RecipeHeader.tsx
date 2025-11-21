"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSavedRecipes } from "@/contexts/SavedRecipesContext";
import type { Recipe } from "@/types/recipe";

interface RecipeHeaderProps {
  recipe: Recipe;
}

export function RecipeHeader({ recipe }: RecipeHeaderProps) {
  const { toggleSaveRecipe, isSaved } = useSavedRecipes();
  const isRecipeSaved = isSaved(recipe);

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Hero Image */}
      <div className="relative h-64 w-full bg-gray-200 md:h-96">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1280px"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {/* Left: Title and Author */}
          <div className="flex-1">
            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800">
                {recipe.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {recipe.title}
            </h1>

            {/* Description */}
            <p className="mb-4 text-gray-600 md:text-lg">
              {recipe.description}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-3">
              {recipe.author.avatar && (
                <Image
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="text-sm text-gray-500">Recipe by</p>
                <p className="font-medium text-gray-900">
                  {recipe.author.name}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Save Button */}
          <button
            type="button"
            onClick={() => toggleSaveRecipe(recipe)}
            className="flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-6 py-3 font-medium transition-colors hover:border-red-500 hover:bg-red-50"
            aria-label={isRecipeSaved ? "Unsave recipe" : "Save recipe"}
          >
            {isRecipeSaved ? (
              <>
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
                <span className="text-red-500">Saved</span>
              </>
            ) : (
              <>
                <HeartIcon className="h-6 w-6 text-gray-700" />
                <span className="text-gray-700">Save Recipe</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
