import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing, { Listing_Query } from '@/components/_Shop/Listing';
import type { ShopPageQueryTypes } from './page.types';

const currentPath = '/sklep';
const breadcrumbs = [
  { name: 'Sklep', path: currentPath },
];

export default async function ShopPage() {
  const { listing, content } = await query();

  return (
    <>
      <Breadcrumbs data={breadcrumbs} />
      <Listing {...listing} />
      <Components data={content} />
    </>
  );
}

const query = async (): Promise<ShopPageQueryTypes> => {
  return await sanityFetch<ShopPageQueryTypes>({
    query: /* groq */ `
      *[_type == "Shop_Page"][0] {
        ${Listing_Query}
        ${Components_Query}
      }
    `,
    tags: ['Shop_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Shop_Page',
    path: currentPath
  });
}