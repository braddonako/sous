# Studio site

Marketing site for a two-person software studio. Next.js App Router, React, TypeScript, and Tailwind CSS. The production build is a static export served on GitHub Pages at `/the-chefs`.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000/the-chefs](http://localhost:3000/the-chefs). The dev server uses the same `basePath` as GitHub Pages.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run check:brand` | Fail if the brand name is hardcoded outside `src/config` |
| `npm run build` | Brand check, then static export into `out/` |
| `npm run lint` | ESLint |

## Where to edit

| Change | File |
|--------|------|
| Name, tagline, location, email, booking URL, theme | `src/config/site.ts` |
| Page copy | `src/content/home.ts` |
| Colors and type | `src/app/globals.css` |

`src/config/site.ts` is the only file under `src/` that may contain the brand name. `npm run check:brand` enforces that. The wordmark is text plus a dot-grid mark, so a rename does not require a new logo image.

Set `theme` to `"kitchen"` for the Fraunces, cream, order-ticket treatment. `"neutral"` is the default.

Prices from the strategy notes are commented in `src/content/home.ts`. The page says "Scoped on a call".

Booking buttons never use `href="#"`. With no booking URL and no email, they use the `mailto:` fallback in config.

## Deployment

Pushes to `main` deploy through `.github/workflows/nextjs.yml`. Do not push to `main` to preview. Open a pull request. `actions/configure-pages` injects `basePath` for the Pages site. Local and pull-request builds set the same path in `next.config.ts`. Override it with `BASE_PATH` (use an empty string for a custom domain at the root).
