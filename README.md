# Landing page

Static marketing site for a two-person consultancy. Built with Next.js (static export), TypeScript, and Tailwind CSS. GitHub Pages deploys it from `.github/workflows/nextjs.yml` on every push to `main`. A pull request does not go live until it is merged.

## Edit the name in one place

Company name, tagline, email, booking link, location, and the wordmark live in [`src/config/site.ts`](src/config/site.ts). Page copy lives in [`src/content/home.ts`](src/content/home.ts).

The header uses a text wordmark, so a rename does not require a new logo image. `npm run check:brand` fails if the configured name, domain, or email is hardcoded anywhere else under `src/`. The Pages workflow runs that check before `next build`.

```bash
npm run check:brand
```

## Theme

`theme` in `src/config/site.ts` is `"neutral"` or `"kitchen"`. Neutral is the default. Kitchen turns on warmer accents, serif headings, dotted offer rows, and a few menu labels. Leave it on neutral unless the name still suits that flavor.

## Prices

Prices are commented out in `src/content/home.ts`. Uncomment a step's `price` field to show it. Until then, the page says every engagement is scoped on a call.

## Contact

`bookingUrl` and `email` in the config are placeholders until they are confirmed. With no booking URL, "Book a call" opens email. With no email either, the button is a disabled coming-soon state. Neither state uses a dead `#` link.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run check:brand` | Fail if the brand name is hardcoded outside the config |
| `npm run build` | Brand check, then static export to `out/` |
| `npm run lint` | ESLint |

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Pages builds with a `/the-chefs` base path injected by `actions/configure-pages`. Asset links go through Next, so they keep that prefix. Hash links on the page stay relative.
