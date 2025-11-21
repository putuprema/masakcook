"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Recipe } from "@/types/recipe";

interface SavedRecipesContextType {
  savedRecipes: Recipe[];
  toggleSaveRecipe: (recipe: Recipe) => void;
  isSaved: (recipe: Recipe) => boolean;
  getSavedCount: () => number;
}

const STORAGE_KEY = "masakcook_saved_recipes";
const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(
  undefined,
);

export function SavedRecipesProvider({ children }: { children: ReactNode }) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const savedRecipes = JSON.parse(stored) as Recipe[];
      setSavedRecipes(savedRecipes);
    }
  }, []);

  const toggleSaveRecipe = (recipe: Recipe) => {
    setSavedRecipes((prev) => {
      let neww: Recipe[] = [];
      if (prev.findIndex((prevRecipe) => prevRecipe.id === recipe.id) !== -1) {
        neww = prev.filter((prevRecipe) => prevRecipe.id !== recipe.id);
      } else {
        neww = [...prev, recipe];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(neww));
      return neww;
    });
  };

  const isSaved = (recipe: Recipe) =>
    savedRecipes.findIndex((el) => el.id === recipe.id) !== -1;

  const getSavedCount = () => savedRecipes.length;

  const contextVal = {
    savedRecipes,
    toggleSaveRecipe,
    isSaved,
    getSavedCount,
  };

  return (
    <SavedRecipesContext.Provider value={contextVal}>
      {children}
    </SavedRecipesContext.Provider>
  );
}

export function useSavedRecipes() {
  const context = useContext(SavedRecipesContext);
  if (context === undefined)
    throw new Error(
      "useSavedRecipes must be used within a SavedRecipesProvider",
    );
  return context;
}
