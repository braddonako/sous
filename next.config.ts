import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Next.js 16 only serves dev assets to the bind host (localhost). Cloud
  // agents and browsers also open the dev server at 127.0.0.1.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
