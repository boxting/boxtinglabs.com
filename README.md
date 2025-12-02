# Boxting Labs Landing Page

A modern, scalable landing page built with Astro, React, and Tailwind CSS. Features a comprehensive design system with Storybook documentation.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generation with islands architecture
- **UI Library**: [React](https://react.dev/) - Interactive components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Animation**: [Framer Motion](https://www.framer.com/motion/) - Production-ready animations
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icons
- **Documentation**: [Storybook](https://storybook.js.org/) - Component documentation

## Project Structure

```
src/
├── components/
│   ├── icons/          # Brand icons and logo
│   ├── sections/       # Page sections (Header, Hero, etc.)
│   └── ui/             # Design system primitives
├── design-system/
│   └── tokens/         # Design tokens (colors, spacing, etc.)
├── layouts/            # Astro layouts
├── lib/                # Utilities and helpers
├── pages/              # Astro pages
├── stories/            # Storybook stories
└── styles/             # Global styles and Tailwind config
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn (package manager)

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Start Storybook
yarn storybook
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start Astro dev server on port 4321 |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn storybook` | Start Storybook on port 6006 |
| `yarn build-storybook` | Build Storybook for deployment |
| `yarn lint` | Run ESLint |
| `yarn format` | Format code with Prettier |
| `yarn typecheck` | Run TypeScript type checking |

## Design System

The design system is built on a token-based architecture:

### Colors

- **Brand Orange**: Primary accent color (`#F97316`)
- **Brand Navy**: Text and dark backgrounds (`#0F172A`)
- Light and dark mode support

### Typography

- **Font**: DM Sans
- **Scale**: Based on 1.25 ratio (major third)

### Components

All components are documented in Storybook:

- **Button** - Primary interactive element
- **Input** - Form input fields
- **Card** - Content containers
- **Badge** - Status indicators
- **Container** - Layout wrapper
- **Section** - Page sections

## Deployment

```bash
# Build for production
yarn build

# Output is in ./dist folder
```

The build output can be deployed to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.)

## License

MIT
