import { Suspense } from "react";
import {
  RecipeOfTheDaySection,
  RecipeOfTheDaySkeleton,
} from "@/app/_components/RecipeOfTheDaySection";
import { SearchSection } from "@/app/_components/SearchSection";
import { TrendingSection } from "@/app/_components/TrendingSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<RecipeOfTheDaySkeleton />}>
        <RecipeOfTheDaySection />
      </Suspense>
      <TrendingSection />
      <SearchSection />
    </div>
  );
}
