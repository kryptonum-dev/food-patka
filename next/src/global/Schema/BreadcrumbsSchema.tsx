import { DOMAIN } from '@/global/constants';
import type { BreadcrumbsTypes } from '@/components/global/Breadcrumbs';

export default function BreadcrumbsSchema({ data }: BreadcrumbsTypes) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            data?.map(({ name, path }, i) => ({
              '@type': 'ListItem',
              position: ++i,
              name: name,
              item: `${DOMAIN}${path}`,
            })),
          ],
        }),
      }}
    />
  );
}