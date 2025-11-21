import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface BreadcrumbProps {
  recipeTitle: string;
}

export function Breadcrumb({ recipeTitle }: BreadcrumbProps) {
  return (
    <nav
      className="mb-6 flex items-center gap-2 text-sm"
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-600 transition-colors hover:text-blue-600"
      >
        <HomeIcon className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <ChevronRightIcon className="h-4 w-4 text-gray-400" />
      <span className="line-clamp-1 text-gray-900 font-medium">
        {recipeTitle}
      </span>
    </nav>
  );
}
