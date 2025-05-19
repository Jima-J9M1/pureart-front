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
      {
        hostname: 'diplomatic-song-aa3e8137ce.strapiapp.com',
      },
      {
        hostname: 'diplomatic-song-aa3e8137ce.media.strapiapp.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
