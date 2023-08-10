const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: { domains: ['m.media-amazon.com'], }
}

module.exports = nextConfig
