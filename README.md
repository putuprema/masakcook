# MasakCook - Recipe Sharing Web App

A modern, crowd-sourced recipe web application built with Next.js 16, React 19,
TypeScript, and Tailwind CSS v4.

## Features

### 🏠 Homepage

- **Hero Section** - Showcases the "Recipe of the Day" with full-width image banner
- **Trending Now** - Horizontal scrollable carousel of trending recipes
- **Search Section** - Real-time recipe search with keyword and category filters

### 🔖 Bookmark System

- Save/unsave recipes with persistent localStorage
- Global state management using React Context
- Navbar badge showing saved recipe count (displays "99+" for 100+)
- Modal popup to view all saved recipes with thumbnails
- Empty state with helpful message when no recipes saved
- Click-outside-to-close and Escape key support for modal
- Individual unsave buttons for each saved recipe

### 🎨 UI/UX

- Glassmorphism navbar with backdrop blur effect
- Responsive mobile-first design
- Loading states with Suspense boundaries
- Smooth animations and transitions
- Accessibility-focused (ARIA labels, keyboard navigation)

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **UI Icons:** Heroicons
- **Linter/Formatter:** Biome 2.2.0
- **Package Manager:** pnpm
- **Fonts:** Geist Sans & Geist Mono
- **Monitoring:** Grafana + Loki + Tempo + Faro (via Docker)

## Monitoring

Lihat [MONITORING.md](./MONITORING.md) untuk dokumentasi lengkap setup observability:

- **Frontend RUM** — Grafana Faro Web SDK (web vitals, errors, tracing)
- **Backend Tracing** — OpenTelemetry + Tempo
- **Log Management** — Loki + Promtail
- **Dashboard** — Grafana dengan datasource & dashboard auto-provisioning

```bash
DOCKER_BUILD=true docker compose up --build
```

Akses Grafana di [http://localhost:3333](http://localhost:3333)

## Project Structure

```
masakcook/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── _components/          # Route-specific components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrendingSection.tsx
│   │   │   └── SearchSection.tsx
│   │   ├── api/                  # API routes
│   │   │   └── recipes/
│   │   │       └── search/
│   │   │           └── route.ts  # Recipe search endpoint
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Global styles
│   ├── shared-components/        # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── RecipeCard.tsx
│   │   └── SavedRecipesModal.tsx
│   ├── contexts/                 # React Context providers
│   │   └── SavedRecipesContext.tsx
│   ├── data/                     # Static data
│   │   └── recipes.ts            # Recipe dataset
│   ├── lib/                      # Utility functions
│   │   └── recipes.ts            # Data fetching utils
│   └── types/                    # TypeScript types
│       └── recipe.ts
├── docker/                       # Docker & monitoring configs
│   ├── faro-collector/
│   ├── grafana/
│   ├── loki/
│   ├── promtail/
│   └── tempo/
├── public/                       # Static assets
├── biome.json                    # Biome config
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── Dockerfile                    # Docker image build
├── docker-compose.yml            # Monitoring stack orchestrator
└── tsconfig.json                 # TypeScript config
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)
- Docker & Docker Compose (untuk monitoring stack)

### Installation

#### Lokal (tanpa Docker)

1. Clone the repository

```bash
git clone <repository-url>
cd masakcook
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

#### Docker (dengan monitoring stack)

1. Clone & masuk direktori

```bash
git clone <repository-url>
cd masakcook
```

2. Build & jalankan semua service

```bash
DOCKER_BUILD=true docker compose up --build
```

3. Akses:
   - Aplikasi: [http://localhost:3000](http://localhost:3000)
   - Grafana: [http://localhost:3333](http://localhost:3333)

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm lint:fix     # Fix linter issues
```

## Key Features Implementation

### Recipe Search API

The search functionality uses a dedicated API route (`/api/recipes/search`) that:

- Accepts `keyword` and `category` query parameters
- Validates input and returns proper HTTP status codes
- Simulates database query with artificial delays
- Returns filtered recipes in JSON format

### Saved Recipes Context

Global state management for bookmarked recipes:

- Persists data to localStorage
- Provides `toggleSaveRecipe`, `isSaved`, `getSavedCount` methods
- Handles SSR hydration properly
- Updates all components reactively

### Server Components

Leverages React Server Components for optimal performance:

- `HeroSection` - Async data fetching on server
- `TrendingSection` - Server-side sorting and filtering
- Suspense boundaries with loading skeletons

### Glassmorphism Navbar

Modern glass effect using:

- `backdrop-blur-md` for blur effect
- `bg-white/70` for semi-transparency
- Sticky positioning that stays on top while scrolling
- Bookmark button with count badge (red pill badge showing saved recipes)
- Opens SavedRecipesModal on click with smooth animations

### SavedRecipesModal Component

A dropdown-style modal for managing saved recipes:

- Positioned at top-right below navbar (`right-4 top-20`)
- Displays recipe thumbnails, titles, categories, and total time
- Empty state with HeartIcon when no recipes saved
- Individual unsave buttons (red heart icons) for each recipe
- Closes via Escape key, backdrop click, or X button
- Scroll support for long lists (max-height with overflow-y-auto)
- Uses refs and event listeners for click-outside detection

## Data Structure

### Recipe Interface

```typescript
interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;           // Unsplash URL
  ingredients: string[];
  instructions: string[];
  servings: number;
  category: Category;      // Enum
  difficulty: Difficulty;  // Enum
  prepTime: number;        // minutes
  cookTime: number;        // minutes
  author: {
    name: string;
    avatar?: string;
  };
  ratings: {
    average: number;       // 0-5
    count: number;
  };
  likes: number;
  saves: number;
  createdAt: string;       // ISO date
}
```

## Best Practices

✅ **React 19** - Latest patterns and features
✅ **Next.js 16** - App Router, Server Components
✅ **TypeScript** - Full type safety
✅ **Accessibility** - ARIA labels, semantic HTML
✅ **Performance** - Image optimization, code splitting
✅ **Code Quality** - Biome linting, consistent formatting
✅ **Responsive** - Mobile-first design

## Future Enhancements

- User authentication
- Recipe creation and editing
- Social features (comments, ratings)
- Recipe collections/folders
- Advanced filters (diet, cuisine, ingredients)
- Recipe sharing via URL
- Dark mode support

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
