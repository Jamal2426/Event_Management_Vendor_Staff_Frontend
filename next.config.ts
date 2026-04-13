import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Fix 1: Remove eslint block (no longer supported in next.config)
  
  // ✅ Fix 2: Add turbopack empty config to silence webpack warning
  turbopack: {},

  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "i.pravatar.cc" },
      { hostname: "logo.clearbit.com" },
      { hostname: "ui-avatars.com" },
      { hostname: "www.google.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "flagcdn.com" },
      { hostname: "localhost" },
      // ✅ Fix 3: Add your actual image CDN domain here
      { hostname: "**" }, // allows all — or replace with your specific API domain
    ],
  },

  // ✅ Fix 2: Remove webpack block, not needed with Turbopack
  // webpack: (...) => { ... }  ← DELETE THIS

  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:5000'}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;