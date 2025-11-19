export enum Category {
  BREAKFAST = "Breakfast",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  DESSERT = "Dessert",
  SNACKS = "Snacks",
  APPETIZER = "Appetizer",
  BEVERAGE = "Beverage",
}

export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  servings: number;
  category: Category;
  difficulty: Difficulty;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  author: {
    name: string;
    avatar?: string;
  };
  ratings: {
    average: number; // 0-5
    count: number;
  };
  likes: number;
  saves: number;
  createdAt: string; // ISO date string
}

export interface SearchFilters {
  keyword: string;
  category: Category | "All";
}
