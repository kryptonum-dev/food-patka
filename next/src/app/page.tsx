import Components, { ComponentTypes, Components_Query } from '@/components/Components';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import sanityFetch from '@/utils/sanity.fetch';

export default async function IndexPage() {
  const { content } = await query();

  return (
    <>
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
    tags: ['Index_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata('Index_Page', '/');
}