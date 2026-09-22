import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@luxalgo/journal-core", "@luxalgo/journal-importers"],
  outputFileTracingExcludes: {
    "/*": ["./data/**/*", "../../outputs/**/*", "../../.runtime-backup*/**/*"],
  },
};

export default nextConfig;
