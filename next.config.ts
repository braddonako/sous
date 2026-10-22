import type { NextConfig } from "next";

// GitHub Pages injects `basePath` (for this repo, /the-chefs) and
// `images.unoptimized` into this object during deploy. Keep the
// `const nextConfig = { ... }` shape so that injection still matches.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
