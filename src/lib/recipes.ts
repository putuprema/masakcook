import { connection } from "next/server";
import { recipes } from "@/data/recipes";
import { Category, type Recipe, type SearchFilters } from "@/types/recipe";

// Simulate database latency
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get the recipe of the day
 * Simulates fetching from a database with a delay
 */
export async function getRecipeOfTheDay(): Promise<Recipe> {
  await connection();
  await simulateDelay(1000);

  // For demo purposes, use date to consistently show same recipe each day
  const today = new Date().toDateString();
  const dayIndex = today
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const recipeIndex = (dayIndex + 1) % recipes.length;

  return recipes[recipeIndex];
}

/**
 * Get trending recipes sorted by popularity (saves + likes)
 * Simulates fetching from a database with a delay
 */
export async function getTrendingRecipes(
  limit: number = 10,
): Promise<Recipe[]> {
  await connection();
  await simulateDelay(2000);

  // Sort by popularity (combination of saves and likes)
  const trendingRecipes = [...recipes].sort((a, b) => {
    const popularityA = a.saves + a.likes;
    const popularityB = b.saves + b.likes;
    return popularityB - popularityA;
  });

  return trendingRecipes.slice(0, limit);
}

/**
 * Search recipes by keyword and/or category
 * Simulates fetching from a database with a delay
 */
export async function searchRecipes(filters: SearchFilters): Promise<Recipe[]> {
  await connection();
  await simulateDelay(700);

  let results = [...recipes];

  // Filter by category if not "All"
  if (filters.category !== "All") {
    results = results.filter((recipe) => recipe.category === filters.category);
  }

  // Filter by keyword (searches in title, description, and ingredients)
  if (filters.keyword.trim()) {
    const keyword = filters.keyword.toLowerCase().trim();
    results = results.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(keyword) ||
        recipe.description.toLowerCase().includes(keyword) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(keyword),
        ),
    );
  }

  return results;
}

/**
 * Get a recipe by ID
 * Simulates fetching from a database with a delay
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  await connection();
  await simulateDelay(800);
  return recipes.find((recipe) => recipe.id === id) || null;
}

/**
 * Get all available categories
 */
export function getCategories(): Category[] {
  return Object.values(Category);
}
