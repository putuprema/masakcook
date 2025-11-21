"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSavedRecipes } from "@/contexts/SavedRecipesContext";

interface SavedRecipesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SavedRecipesModal({ isOpen, onClose }: SavedRecipesModalProps) {
  const { savedRecipes, toggleSaveRecipe } = useSavedRecipes();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/20"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed right-4 top-20 z-60 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900">Saved Recipes</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {savedRecipes.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <HeartSolidIcon className="mb-3 h-12 w-12 text-gray-300" />
              <p className="text-sm font-medium text-gray-900">
                No saved recipes yet
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Start saving recipes to see them here
              </p>
            </div>
          ) : (
            // Recipe List
            <div className="divide-y divide-gray-100">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex gap-3 p-3 transition-colors hover:bg-gray-50"
                >
                  {/* Thumbnail */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-center">
                    <h4 className="line-clamp-1 text-sm font-medium text-gray-900">
                      {recipe.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {recipe.category} • {recipe.cookTime + recipe.prepTime}{" "}
                      min
                    </p>
                  </div>

                  {/* Unsave Button */}
                  <button
                    type="button"
                    onClick={() => toggleSaveRecipe(recipe)}
                    className="shrink-0 self-center rounded-full p-2 text-red-500 transition-colors hover:bg-red-50"
                    aria-label="Remove from saved"
                  >
                    <HeartSolidIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
