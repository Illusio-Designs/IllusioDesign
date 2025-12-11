/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable standalone output for easier deployment
  output: 'standalone',
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
  // Ensure proper handling of dynamic routes
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Enable production source maps so large first‑party bundles ship with maps
  productionBrowserSourceMaps: true,
};
export default nextConfig;
