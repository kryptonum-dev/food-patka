import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { ComponentTypes, Components_Query } from '@/components/Components';
import Analytics from './Analytics';
import type { ThankYouPageTypes } from './page.types';

const currentPath = '/dziekuje-za-zakup';
const breadcrumbs = [
  { name: 'Dziękuję za zakup', path: currentPath },
];

export default async function ThankYouPage({
  searchParams: { ec_product, ec_product_uuid, ec_amount, ttclid, epik }
}: ThankYouPageTypes) {
  const { content } = await query();

  return (
    <>
      <Analytics {...{ ec_product, ec_product_uuid, ec_amount, ttclid, epik }} />
      <Breadcrumbs data={breadcrumbs} />
      <Components data={content} />
    </>
  );
}

const query = async (): Promise<{ content: ComponentTypes[] }> => {
  return await sanityFetch({
    query: /* groq */ `
      *[_type == "ThankYou_Page"][0] {
        ${Components_Query}
      }
    `,
    tags: ['ThankYou_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'ThankYou_Page',
    path: currentPath
  });
}
