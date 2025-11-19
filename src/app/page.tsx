import { Suspense } from "react";
import { HeroSection, HeroSkeleton } from "@/app/_components/HeroSection";
import { SearchSection } from "@/app/_components/SearchSection";
import { TrendingSection } from "@/app/_components/TrendingSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <TrendingSection />
      <SearchSection />
    </div>
  );
}
