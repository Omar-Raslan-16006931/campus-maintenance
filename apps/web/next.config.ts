import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root also has a package-lock.json (Husky/Prettier); pin the
  // Turbopack root to this app so Next doesn't guess the workspace root.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
