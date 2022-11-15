/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    unoptimized: true,
    formats:['image/png']
  },
}

module.exports = nextConfig
