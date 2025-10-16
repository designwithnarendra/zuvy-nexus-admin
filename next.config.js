/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placeholder.svg'],
  },
  output: 'export',
  images: { unoptimized: true },
  basePath: '/zuvy-nexus-admin>',
  assetPrefix: '/zuvy-nexus-admin/',
}

module.exports = nextConfig
