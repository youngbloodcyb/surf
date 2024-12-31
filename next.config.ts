import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
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
    ];
  },
};

export default nextConfig;
