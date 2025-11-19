"use client";

import { ClockIcon, EyeIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import type { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Save Button Overlay */}
        <button
          type="button"
          onClick={() => setIsSaved(!isSaved)}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow-md transition-colors hover:bg-white"
          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
        >
          {isSaved ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            {recipe.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
          {recipe.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-600">
          {recipe.description}
        </p>

        {/* Meta Info */}
        <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            <span>{totalTime} min</span>
          </div>
          <div className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">
            {recipe.difficulty}
          </div>
        </div>

        {/* View Details Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <EyeIcon className="h-4 w-4" />
          View Recipe
        </button>
      </div>
    </div>
  );
}
