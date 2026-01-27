import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_URL: process.env.API_URL,
    HOST_URL: process.env.HOST_URL,
    LOCATION: process.env.LOCATION,
  },
  experimental: {
    authInterrupts: true,
  },

  async rewrites() {
    if (process.env.LOCATION !== "server") {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.HOST_URL}/api/:path*`, // bridge default docker linux
        },
      ];
    } else {
      return [];
    }
  },
};

export default nextConfig;
