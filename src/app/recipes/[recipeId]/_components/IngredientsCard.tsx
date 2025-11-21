import { ShoppingBagIcon } from "@heroicons/react/24/outline";

interface IngredientsCardProps {
  ingredients: string[];
}

export function IngredientsCard({ ingredients }: IngredientsCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">Ingredients</h2>
        </div>
      </div>

      <div className="p-6">
        <ul className="space-y-3">
          {ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className="flex items-start gap-3 text-gray-700"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
