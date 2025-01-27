/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    },
    experimental: {
      appDir: true,
      optimizeCss: true,
      optimizePackageImports: ['framer-motion'],
    },
    webpack: (config) => {
      // Ensure proper module resolution
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
        alias: {
          ...config.resolve.alias,
          '@': require('path').resolve(__dirname, 'src'),
        },
      }
  
      return config
    },
  }
  
  const securityHeaders = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN'
    }
  ]
  
  module.exports = nextConfig 