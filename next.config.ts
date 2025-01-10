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
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com", // Replace with your domain
        port: "", // Optional: leave empty for default ports (80 for http, 443 for https)
        pathname: "/**", // Allow all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
