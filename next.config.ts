import type { NextConfig } from "next";

// Bundle analyzer setup for performance monitoring
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  
  // Performance optimizations
  experimental: {
    // optimizeCss: true, // Disabled due to critters module issue
    webpackBuildWorker: true,
  },
  
  // Webpack optimizations for better bundle splitting
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Note: headers() doesn't work with output: 'export'
  // These headers should be configured on the hosting platform
  // (Vercel, Netlify, etc.) or web server
};

export default withBundleAnalyzer(nextConfig);