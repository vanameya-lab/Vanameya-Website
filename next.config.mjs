/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    key: 'Content-Security-Policy',
    // Using a basic CSP. In a real highly-secure app, we would tightly lock down domains.
    // For now, restricting frame-ancestors to none.
    value: "frame-ancestors 'none';"
  }
];

const nextConfig = {
  serverExternalPackages: ['pdfkit', 'pdfkit-table'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
};

export default nextConfig;
