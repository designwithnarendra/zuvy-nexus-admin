/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placeholder.svg'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  output: 'export',
  images: { unoptimized: true },
  basePath: '/zuvy-nexus-admin>',
  assetPrefix: '/zuvy-nexus-admin/',
}

module.exports = nextConfig
