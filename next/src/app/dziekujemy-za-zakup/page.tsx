import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Hero, { Hero_Query } from '@/components/_ThankYou/Hero';
import Promo, { Promo_Query } from '@/components/_ThankYou/Promo';
import type { ThankYouPageQuery } from './page.types';

const currentPath = '/dziekujemy-za-zakup';
const breadcrumbs = [
  { name: 'Dziękujemy za zakup', path: currentPath },
];

export default async function ThankYouPage() {
  const { hero, promo } = await query();

  return (
    <>
      <Breadcrumbs data={breadcrumbs} visible={false} />
      <Hero {...hero} />
      <Promo {...promo} />
    </>
  );
}

const query = async (): Promise<ThankYouPageQuery> => {
  return await sanityFetch<ThankYouPageQuery>({
    query: /* groq */ `
      *[_type == "ThankYou_Page"][0] {
        ${Hero_Query}
        ${Promo_Query}
      }
    `,
    tags: ['ThankYou_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'ThankYou_Page',
    path: currentPath,
  });
}