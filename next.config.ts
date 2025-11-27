import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Enable compression
  compress: true,
  
  // Modern browser support - remove polyfills for modern JS features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-accordion', '@radix-ui/react-dialog'],
  },
  
  // Target modern browsers only
  transpilePackages: [],
  
  // Webpack config to exclude polyfills for modern features
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude unnecessary polyfills for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Enable SWC minification (faster and better)
  // swcMinify: true,
  
  // Optimize CSS
  // optimizeFonts: true,
  
  // Power optimizations
  poweredByHeader: false,
  
  // React strict mode for better performance
  reactStrictMode: true,
  
  // Experimental features for better performance
  // experimental: {
  //   optimizePackageImports: [
  //     'lucide-react',
  //     '@radix-ui/react-accordion',
  //     '@radix-ui/react-dialog',
  //     'framer-motion',
  //   ],
  //   optimizeCss: true,
  // },
};

export default nextConfig;
