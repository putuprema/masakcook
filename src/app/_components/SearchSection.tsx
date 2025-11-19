"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/recipes";
import { RecipeCard } from "@/shared-components/RecipeCard";
import type { Recipe, SearchFilters } from "@/types/recipe";

export function SearchSection() {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    category: "All",
  });
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = getCategories();

  useEffect(() => {
    // Only search if there's a keyword or category is not "All"
    if (filters.keyword.trim() || filters.category !== "All") {
      setIsLoading(true);
      setHasSearched(true);

      // Call API endpoint to search recipes
      const searchParams = new URLSearchParams({
        keyword: filters.keyword,
        category: filters.category,
      });

      fetch(`/api/recipes/search?${searchParams.toString()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Search failed");
          }
          return response.json();
        })
        .then((data) => {
          setRecipes(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setRecipes([]);
          setIsLoading(false);
        });
    } else if (hasSearched) {
      // Clear results if search is cleared
      setRecipes([]);
      setHasSearched(false);
    }
  }, [filters, hasSearched]);

  return (
    <section className="w-full bg-white px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Find Your Perfect Recipe
          </h2>
          <p className="text-gray-600">
            Search by keyword or filter by category
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or keywords..."
              value={filters.keyword}
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Filter by Category:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilters({ ...filters, category: "All" })}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filters.category === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilters({ ...filters, category })}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filters.category === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          {isLoading ? (
            // Loading State
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
              <span className="ml-3 text-gray-600">Searching recipes...</span>
            </div>
          ) : hasSearched && recipes.length === 0 ? (
            // No Results
            <div className="py-12 text-center">
              <p className="text-xl font-semibold text-gray-900">
                No recipes found
              </p>
              <p className="mt-2 text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : hasSearched ? (
            // Results Grid
            <>
              <p className="mb-4 text-sm text-gray-600">
                Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          ) : (
            // Initial State
            <div className="py-12 text-center text-gray-500">
              <p>Start typing or select a category to search recipes</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
