import type { MetadataRoute } from 'next';
import { DOMAIN } from '@/global/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dziekuje-za-zakup',
      ]
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
