import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    dynamicIO: true,
  },
  images: {
    domains: ["images.unsplash.com", "wp.cameron.so", "images.pexels.com"],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/p/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5328/api/p/:path*"
            : "/api/p/",
      },
      {
        source: "/admin",
        destination: "https://wp.cameron.so/wp-admin",
      },
    ];
  },
};

export default nextConfig;
