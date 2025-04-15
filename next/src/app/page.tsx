import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { ComponentTypes, Components_Query } from '@/components/Components';

const currentPath = '';

export default async function IndexPage() {
  const { content } = await query();


  return (
    <>
      <Breadcrumbs visible={false} />
      <Components data={content} />
    </>
  );
}

const query = async (): Promise<{ content: ComponentTypes[] }> => {
  return await sanityFetch({
    query: /* groq */ `
      *[_type == "Index_Page"][0] {
        ${Components_Query}
      }
    `,
    params: { isWoo: false },
    tags: ['Index_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Index_Page',
    path: currentPath
  });
}
