import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Components, { ComponentTypes, Components_Query } from '@/components/Components';

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
      *[_type == "About_Page"][0] {
        ${Components_Query}
      }
    `,
    tags: ['About_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata('About_Page', '/o-marce');
}