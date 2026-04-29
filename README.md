# `PlatformDiagram` Redesign (Rho)
A redesign exploration of Rho's `PlatformDiagram` component. The goal here was to make that progression clearer so users immediately understand how Rho scales with them over time.

The component renders an interactive mountain illustration where each elevation maps to a use case, from extending runway as an early-stage startup to consolidating your entire finance stack at scale. Users navigate between stages via animated pulse points on the mountain, arrow controls, pagination dots, or (on mobile) a horizontal swipe carousel.

**Note:** This is a standalone design exploration, not a fork of Rho's production codebase. The component was rebuilt from scratch to explore how the progression narrative could be made clearer through interaction design.

## Tech Stack
- **Next.js** – React framework with App Router and use client components
- **TypeScript** – type-safe component and data layer
- **SCSS Modules** – scoped styling with CSS custom properties (OKLCH color space)
- **Degular / Basier / Inter** – custom type stack for headings, body, and fallback
- **`lucide-react`** – lightweight icon set
- **`@portabletext/react`** – rich text rendering for the header block

## Running Locally
1. Clone the repository
```
git clone https://github.com/kim-jenny5/platform-diagram.git
cd platform-diagram
```

2. Install dependencies

```
npm install
```

3. Start the development server

```
npm run dev
```

The app will be running at `http://localhost:3000`.

## Note
This is a standalone design exploration, not a fork of Rho's production codebase. The component was rebuilt from scratch to explore how the progression narrative could be made clearer through interaction design.
