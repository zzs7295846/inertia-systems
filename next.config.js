/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removing output: 'export' to allow dynamic routes in dev mode
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
