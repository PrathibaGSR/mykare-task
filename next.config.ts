import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate', // Enable caching
          },
        ],
      },
    ];
  },
};

export default withPWA({
    dest: "public",         // destination directory for the PWA files
    disable: false,        // disable PWA in the development environment
    register: true,         // register the PWA service worker
    skipWaiting: true,      // skip waiting for service worker activation
});

