<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cloud Agent

The environment start script runs `npm run dev` on port 3000. Open http://localhost:3000.

Next.js 16 blocks dev assets from hosts other than the one the server bound as. `allowedDevOrigins` in `next.config.ts` includes `127.0.0.1`, so http://127.0.0.1:3000 works as well.

`npm run build` writes a static export to `out/` (`output: "export"`). Lint is `npm run lint`. Canonical setup commands are in `README.md`.
