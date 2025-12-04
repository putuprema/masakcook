"use client";

import { BookmarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { useSavedRecipes } from "@/contexts/SavedRecipesContext";
import { SavedRecipesModal } from "./SavedRecipesModal";

export function Navbar() {
  const { getSavedCount } = useSavedRecipes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const savedCount = getSavedCount();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-white/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8 lg:px-12">
          {/* Left: Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 transition-colors hover:text-blue-600"
          >
            MasakCook
          </Link>

          {/* Right: Bookmark Button with Badge */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="relative rounded-full p-2 text-gray-800 transition-colors hover:bg-white/50"
            aria-label={`View saved recipes (${savedCount})`}
          >
            <BookmarkIcon className="h-6 w-6" />
            {savedCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {savedCount > 99 ? "99+" : savedCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Modal */}
      <SavedRecipesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
