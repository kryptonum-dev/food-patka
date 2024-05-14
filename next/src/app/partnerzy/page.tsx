import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { ComponentTypes, Components_Query } from '@/components/Components';

const currentPath = '/partnerzy';
const breadcrumbs = [
  { name: 'Partnerzy', path: currentPath },
];

export default async function PartnersPage() {
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
      *[_type == "Partners_Page"][0] {
        ${Components_Query}
      }
    `,
    tags: ['Partners_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Partners_Page',
    path: currentPath
  });
}