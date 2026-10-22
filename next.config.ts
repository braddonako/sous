import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo at /the-chefs.
 * actions/configure-pages only rewrites next.config.js/.mjs/.cjs, so on a
 * Pages build it may write a sibling next.config.js (loaded first) with the
 * same basePath. Keep this value in sync for local and pull-request builds.
 * Set BASE_PATH="" when a custom domain serves the site from the root.
 */
const basePath = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : "/the-chefs";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
