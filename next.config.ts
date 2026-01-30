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
    MT_API_URL: process.env.MT_API_URL,
    API_URL: process.env.API_URL,
    HOST_URL: process.env.HOST_URL,
    LOCATION: process.env.LOCATION,
  },
  experimental: {
    authInterrupts: true,
  },

  async rewrites() {
    const hostUrl = process.env.HOST_URL;

    if (process.env.LOCATION !== "server" && hostUrl) {
      return [
        {
          source: "/api/:path*",
          destination: `${hostUrl}/api/:path*`,
        },
      ];
    }

    return [];
  },
};

export default nextConfig;
