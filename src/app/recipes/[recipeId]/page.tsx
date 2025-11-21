import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IngredientsCard } from "@/app/recipes/[recipeId]/_components/IngredientsCard";
import { InstructionsCard } from "@/app/recipes/[recipeId]/_components/InstructionsCard";
import { RecipeHeader } from "@/app/recipes/[recipeId]/_components/RecipeHeader";
import { RecipeMetadata } from "@/app/recipes/[recipeId]/_components/RecipeMetadata";
import { getRecipeById } from "@/lib/recipes";
import { Breadcrumb } from "@/shared-components/Breadcrumb";

interface RecipePageProps {
  params: Promise<{
    recipeId: string;
  }>;
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { recipeId } = await params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    return {
      title: "Recipe Not Found | MasakCook",
    };
  }

  return {
    title: `${recipe.title} | MasakCook`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { recipeId } = await params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb recipeTitle={recipe.title} />

        {/* Recipe Header with Image */}
        <RecipeHeader recipe={recipe} />

        {/* Metadata Card */}
        <RecipeMetadata recipe={recipe} />

        {/* Two-column layout for Ingredients and Instructions on desktop */}
        <div className="grid gap-6 md:grid-cols-2">
          <IngredientsCard ingredients={recipe.ingredients} />
          <InstructionsCard instructions={recipe.instructions} />
        </div>
      </div>
    </div>
  );
}
