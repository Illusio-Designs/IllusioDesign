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
  // Disable source maps to reduce build processes (can re-enable if needed)
  productionBrowserSourceMaps: false,
  
  // CRITICAL: Disable all parallel processing to prevent fork errors
  webpack: (config, { dev, isServer }) => {
    // Only apply these changes in production builds
    if (!dev) {
      // Disable parallel processing in all minimizers
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((minimizer) => {
          if (minimizer && minimizer.options) {
            // Disable parallel processing for TerserPlugin
            if (minimizer.options.parallel !== undefined) {
              minimizer.options.parallel = false;
            }
            // Disable parallel processing for CssMinimizerPlugin
            if (minimizer.options.minimizerOptions && minimizer.options.minimizerOptions.parallel !== undefined) {
              minimizer.options.minimizerOptions.parallel = false;
            }
          }
        });
      }
      
      // Set webpack parallelism to 1
      config.parallelism = 1;
      
      // Disable cache to reduce file operations
      config.cache = false;
    }
    
    return config;
  },
  
  // Use SWC minify (single-threaded) instead of Terser (multi-threaded)
  swcMinify: true,
};
export default nextConfig;
