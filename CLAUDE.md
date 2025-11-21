# MasakCook - Claude Development Instructions

This file contains important context and conventions for Claude when working on this project.

## Project Overview

MasakCook is a crowd-sourced recipe web application built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. The app features a homepage with recipe browsing, searching, and a bookmark system for saving favorite recipes.

## Architecture Decisions

### Component Organization
- **Route-specific components**: `src/app/_components/` - Components used only in specific routes
- **Shared components**: `src/shared-components/` - Reusable components across the app (Navbar, RecipeCard, etc.)
- **ALL shared/reusable components MUST go in `src/shared-components/`** - This is a strict convention

### State Management
- **React Context** is used for global state (saved recipes)
- **localStorage** for persistence
- Server Components by default, Client Components only when needed ("use client")

### Data Flow
- Static JSON data in `src/data/recipes.ts`
- Data fetching utilities in `src/lib/recipes.ts` with simulated delays (300-500ms)
- API routes in `src/app/api/` for client-server communication
- Search API: `/api/recipes/search` with keyword and category filters

### Styling Approach
- **Tailwind CSS v4** (uses new `@import "tailwindcss"` syntax)
- **Glassmorphism** for navbar: `backdrop-blur-md`, `bg-white/70`
- **Mobile-first** responsive design
- **No emojis** unless explicitly requested by user
- **Modal/Dialog pattern**: Backdrop overlay with positioned content card
- **Z-index layers**: Navbar (z-50), Modal backdrop (z-50), Modal content (z-60)

## Tech Stack Specifics

### Next.js 16 + React 19
- App Router architecture
- Server Components by default
- Async Server Components for data fetching
- Suspense boundaries with loading skeletons

### TypeScript
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- All types in `src/types/`

### Biome (NOT ESLint/Prettier)
- Linter and formatter in one
- Run: `pnpm biome check src/`
- Auto-fix: `pnpm biome check --write src/`
- Auto-organize imports enabled
- ALWAYS run after making changes

### Tailwind CSS v4
- New syntax: `@import "tailwindcss"` instead of `@tailwind` directives
- Custom utilities in `globals.css` (e.g., `.scrollbar-hide`)
- Geist Sans and Geist Mono fonts configured

## Important Conventions

### File Naming
- React components: PascalCase (e.g., `RecipeCard.tsx`)
- Utilities/libs: camelCase (e.g., `recipes.ts`)
- Types: singular (e.g., `recipe.ts` not `recipes.ts`)

### Component Structure
```tsx
"use client"; // Only if needed

// Imports (Biome will auto-organize)
import { Icon } from "@heroicons/react/24/outline";
import type { Recipe } from "@/types/recipe";

// Interface/types
interface ComponentProps {
  prop: string;
}

// Component
export function Component({ prop }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();

  // Logic

  // Return JSX
  return <div></div>;
}
```

### Button Elements
- ALWAYS add `type="button"` to buttons (Biome requirement)
- Use semantic HTML for accessibility
- Add descriptive `aria-label` attributes for icon-only buttons

### Images
- Use `next/image` component
- Unsplash URLs for recipe images
- Always provide `alt` text and `sizes` prop

### Data Fetching
- Server Components: Use async functions directly
- Client Components: Use fetch API or import utilities
- Simulate delays: 300-500ms for realistic UX

## Context Providers

### SavedRecipesContext
Located in `src/contexts/SavedRecipesContext.tsx`

**Available methods:**
- `toggleSaveRecipe(recipe: Recipe)` - Save/unsave a recipe (now takes full recipe object)
- `isSaved(id: string)` - Check if recipe is saved
- `getSavedCount()` - Get total saved recipes count
- `savedRecipes` - Array of full recipe objects (for displaying in modal)
- `setSavedRecipes(recipes)` - Set full recipe data

**Usage:**
```tsx
import { useSavedRecipes } from "@/contexts/SavedRecipesContext";

const { toggleSaveRecipe, isSaved, savedRecipes } = useSavedRecipes();

// Toggle save (pass full recipe object)
toggleSaveRecipe(recipe);

// Check if saved
const saved = isSaved(recipe.id);

// Get count for badge
const count = getSavedCount();

// Display saved recipes
savedRecipes.map(recipe => <RecipeItem key={recipe.id} recipe={recipe} />);
```

## Recipe Data Structure

18 sample recipes in `src/data/recipes.ts` with:
- Categories: Breakfast, Lunch, Dinner, Dessert, Snacks, Appetizer, Beverage
- Difficulty: Easy, Medium, Hard
- Full metadata: ingredients, instructions, ratings, likes, saves
- Unsplash images

## API Routes

### `/api/recipes/search`
- Method: GET
- Query params: `keyword` (string), `category` (Category | "All")
- Returns: `{ success: boolean, data: Recipe[], count: number }`
- Validates category and returns 400 for invalid input

## Common Tasks

### Adding a New Shared Component
1. Create file in `src/shared-components/`
2. Export as named export
3. Import using `@/shared-components/ComponentName`
4. Run Biome to organize imports

### Adding New Route
1. Create folder in `src/app/`
2. Add `page.tsx` for the route
3. Add `_components/` subfolder for route-specific components
4. Use Server Components by default

### Updating Context
1. Modify `src/contexts/SavedRecipesContext.tsx`
2. Update interface types
3. Add methods to context value
4. Export from custom hook

### Working with Images
```tsx
<Image
  src={recipe.image}
  alt={recipe.title}
  fill // or width/height
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  priority // for above-fold images
/>
```

### Modal/Dialog Pattern
For modal components (like SavedRecipesModal):

**Structure:**
1. Backdrop button (full screen, closes on click)
2. Content card (positioned absolutely/fixed)
3. useRef for click-outside detection
4. Two useEffect hooks: one for click-outside, one for Escape key

**Implementation:**
```tsx
"use client";

export function Modal({ isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
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

      {/* Modal Content */}
      <div ref={modalRef} className="fixed right-4 top-20 z-60 ...">
        {/* Content here */}
      </div>
    </>
  );
}
```

**Key points:**
- Return `null` if `!isOpen`
- Separate backdrop and content elements
- Use `mousedown` event (not `click`) for click-outside
- Clean up event listeners in useEffect return
- Both useEffect hooks depend on `[isOpen, onClose]`

## Testing Flow

1. Make changes
2. Run `pnpm biome check --write src/` to auto-fix
3. Verify all linter checks pass
4. Test in browser at `http://localhost:3000`

## Git Workflow

When committing:
1. Stage relevant files
2. Use descriptive commit messages
3. Format: `<type>: <description>`
4. Types: feat, fix, refactor, docs, style, chore
5. Include co-author tag when appropriate

## Accessibility Standards

- Semantic HTML elements
- ARIA labels on interactive elements (especially icon-only buttons)
- Keyboard navigation support (Tab, Enter, Escape for modals)
- Focus states visible on all interactive elements
- Color contrast ratios met (WCAG AA minimum)
- Modal accessibility: Escape key closes, focus management
- Screen reader friendly (descriptive aria-label with dynamic content)

## Performance Best Practices

- Use Server Components when possible
- Lazy load below-the-fold content
- Optimize images with next/image
- Use Suspense for async boundaries
- Minimize client-side JavaScript

## Common Gotchas

1. **Biome vs ESLint**: This project uses Biome, not ESLint
2. **Tailwind v4**: New syntax, check docs for changes
3. **localStorage**: Only works in Client Components
4. **Hydration**: Be careful with localStorage and SSR
5. **Path aliases**: Always use `@/` for imports from src/

## Future Development Guidelines

When adding new features:
1. Follow existing patterns
2. Keep components small and focused
3. Use TypeScript strictly (no `any`)
4. Add loading states for async operations
5. Consider mobile experience first
6. Run Biome before committing
7. Update this file if adding major features

## Questions to Ask User

Before implementing new features:
- Where should this component live? (shared vs route-specific)
- Should this be a Server or Client Component?
- What data structure is needed?
- How should errors be handled?
- Mobile/desktop differences?

## Quick Reference

**Data fetching:** `src/lib/recipes.ts`
**Types:** `src/types/recipe.ts`
**Context:** `src/contexts/SavedRecipesContext.tsx`
**API:** `src/app/api/recipes/search/route.ts`
**Shared components:** `src/shared-components/`
**Static data:** `src/data/recipes.ts`

---

*Last updated: Project initial development phase*
*Current status: Homepage with search, trending, hero sections, and bookmark system complete*
*Latest additions: Navbar with badge, SavedRecipesModal with empty state and unsave functionality*
