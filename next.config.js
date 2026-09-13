/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev-only. Without these, `next dev` returns 403 for every /_next/static
  // chunk requested from a LAN address, so a phone (or a desktop tab opened on
  // the Network URL) hydrates against whatever stale JS it still has cached.
  allowedDevOrigins: ['127.0.0.1', '192.168.*.*', '10.*.*.*', '*.local'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/Jay3Chauhan/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
      // No Cache-Control override for /_next/static — Next already serves
      // hashed build assets as `immutable, max-age=31536000`, and forcing that
      // header ourselves also applies it to *dev* chunks, which is how a
      // browser ends up hydrating fresh HTML against a year-old bundle.
    ];
  },
};

module.exports = nextConfig;
