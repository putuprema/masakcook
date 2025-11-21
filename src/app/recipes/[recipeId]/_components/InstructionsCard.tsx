import { DocumentTextIcon } from "@heroicons/react/24/outline";

interface InstructionsCardProps {
  instructions: string[];
}

export function InstructionsCard({ instructions }: InstructionsCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-bold text-gray-900">Instructions</h2>
        </div>
      </div>

      <div className="p-6">
        <ol className="space-y-4">
          {instructions.map((instruction, index) => (
            <li key={instruction} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                {index + 1}
              </span>
              <p className="flex-1 pt-1 text-gray-700">{instruction}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
