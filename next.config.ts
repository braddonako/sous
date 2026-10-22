import type { NextConfig } from "next";
import { basePath } from "./src/config/site";

/**
 * GitHub Pages serves this site at /sous
 * (https://braddonako.github.io/sous/).
 * basePath prefixes routes and /_next assets. Do not also set assetPrefix:
 * that option is for a separate CDN host, and pairing it with basePath
 * would double-prefix the files.
 * The Pages workflow does not inject a path, so this value is what the
 * export uses. Set BASE_PATH="" when a custom domain serves the site
 * from the root.
 *
 * trailingSlash emits /teams/index.html so /sous/teams/ resolves on Pages.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
