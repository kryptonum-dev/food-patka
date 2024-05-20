import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { ComponentTypes, Components_Query } from '@/components/Components';

const currentPath = '/sklep';
const breadcrumbs = [
  { name: 'Sklep', path: currentPath },
];

export default async function ShopPage() {
  const { content } = await query();

  return (
    <>
      <Breadcrumbs data={breadcrumbs} />
      <Components data={content} />
    </>
  );
}

const query = async (): Promise<{ content: ComponentTypes[] }> => {
  return await sanityFetch({
    query: /* groq */ `
      *[_type == "Shop_Page"][0] {
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