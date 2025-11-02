import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
        {
        protocol: 'https',
        hostname: 'cdn.pixabay.com', // for Pixabay images
      },
    ],
  },
};

export default nextConfig;





