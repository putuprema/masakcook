import { type NextRequest, NextResponse } from "next/server";
import { searchRecipes } from "@/lib/recipes";
import { Category } from "@/types/recipe";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "All";

    // Validate category
    const validCategories = [...Object.values(Category), "All"];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Call the search function which simulates database query
    const results = await searchRecipes({
      keyword,
      category: category as Category | "All",
    });

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search recipes" },
      { status: 500 },
    );
  }
}
