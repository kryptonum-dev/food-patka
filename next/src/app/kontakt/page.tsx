import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { ComponentTypes, Components_Query } from '@/components/Components';

const currentPath = '/kontakt';
const breadcrumbs = [
  { name: 'Kontakt', path: currentPath },
];

export default async function ContactPage() {
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
      *[_type == "Contact_Page"][0] {
        ${Components_Query}
      }
    `,
    params: { isWoo: 'true' },
    tags: ['Contact_Page'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Contact_Page',
    path: currentPath
  });
}
