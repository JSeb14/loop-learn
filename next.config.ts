import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_HOSTNAME!,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
