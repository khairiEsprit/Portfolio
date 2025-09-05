/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Re-enabled - will fix the underlying issues instead
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.svgrepo.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mohamedkhairibouzid.engineer" }],
        destination: "https://www.mohamedkhairibouzid.engineer/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "http://mohamedkhairibouzid.engineer" }],
        destination: "https://www.mohamedkhairibouzid.engineer/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "host", value: "http://www.mohamedkhairibouzid.engineer" },
        ],
        destination: "https://www.mohamedkhairibouzid.engineer/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
