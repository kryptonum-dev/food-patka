/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/promo',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '138.68.104.42',
          },
        ],
      },
    ];
  }
};

export default nextConfig;