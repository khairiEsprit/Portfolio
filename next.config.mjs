/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for static generation but don't force export mode (due to API routes)
  trailingSlash: false,
  skipTrailingSlashRedirect: false,

  // Image optimization for better performance
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for production
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

  // Enhanced experimental features for performance
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-tabs",
    ],
    scrollRestoration: true,
    optimisticClientCache: true,
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // Enable SWC minification for better performance
    styledComponents: false,
  },

  // Enable compression and caching
  poweredByHeader: false,
  compress: true,
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
