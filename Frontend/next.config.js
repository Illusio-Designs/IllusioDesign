/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // Only rewrite public routes to root page, exclude dashboard/login/register
      {
        source: '/:path((?!dashboard|login|register).*)',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
