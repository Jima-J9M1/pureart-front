import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'pureart-strapi.onrender.com',
      },
    ],
  },
};

export default nextConfig;
