import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { ComponentTypes, Components_Query } from '@/components/Components';

const currentPath = '/o-marce';
const breadcrumbs = [
  { name: 'O Marce', path: currentPath },
];

export default async function AboutPage() {
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
      *[_type == "About_Page"][0] {
        ${Components_Query}
      }
    `,
    params: { isWoo: false },
    tags: ['About_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'About_Page',
    path: currentPath
  });
}
