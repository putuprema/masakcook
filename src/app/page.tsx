import { Suspense } from "react";
import {
  RecipeOfTheDaySection,
  RecipeOfTheDaySkeleton,
} from "@/app/_components/RecipeOfTheDaySection";
import { SearchSection } from "@/app/_components/SearchSection";
import { TrendingSection } from "@/app/_components/TrendingSection";
import { FrontendObservability } from "@/shared-components/FrontendObservability";

export default function Home() {
  return (
    <>
      <FrontendObservability />
      <div className="min-h-screen">
        <Suspense fallback={<RecipeOfTheDaySkeleton />}>
          <RecipeOfTheDaySection />
        </Suspense>
        <TrendingSection />
        <SearchSection />
      </div>
    </>
  );
}
