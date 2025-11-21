import {
  ClockIcon,
  FireIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import type { Recipe } from "@/types/recipe";

interface RecipeMetadataProps {
  recipe: Recipe;
}

export function RecipeMetadata({ recipe }: RecipeMetadataProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Recipe Info</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Prep Time */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <ClockIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Prep Time</p>
              <p className="font-semibold text-gray-900">
                {recipe.prepTime} min
              </p>
            </div>
          </div>

          {/* Cook Time */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-orange-50 p-2">
              <FireIcon className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cook Time</p>
              <p className="font-semibold text-gray-900">
                {recipe.cookTime} min
              </p>
            </div>
          </div>

          {/* Total Time */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-green-50 p-2">
              <ClockIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Time</p>
              <p className="font-semibold text-gray-900">{totalTime} min</p>
            </div>
          </div>

          {/* Servings */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-purple-50 p-2">
              <UserGroupIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Servings</p>
              <p className="font-semibold text-gray-900">{recipe.servings}</p>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-yellow-50 p-2">
              <FireIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="font-semibold text-gray-900">{recipe.difficulty}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-amber-50 p-2">
              <StarIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="font-semibold text-gray-900">
                {recipe.ratings.average}/5
              </p>
              <p className="text-xs text-gray-500">
                ({recipe.ratings.count} reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
