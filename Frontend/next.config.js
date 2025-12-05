/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.illusiodesigns.agency',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'api.illusiodesigns.agency',
        port: '',
        pathname: '/**',
      },
    ],
  },
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
