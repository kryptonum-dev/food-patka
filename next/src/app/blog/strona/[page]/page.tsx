import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import { BlogPaginationPageQueryTypes, BlogPaginationPageTypes } from './page.type';
import Listing, { Listing_Query } from '@/components/_Blog/Listing';
import Components, { Components_Query } from '@/components/Components';

export default async function BlogPaginationPage({ params: { page } }: BlogPaginationPageTypes) {
  const { listing, content } = await query();

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Blog', path: '/blog' },
        { name: `Strona ${page}`, path: `/blog/strona/${page}` },
      ]} />
      <Listing
        {...{
          heading: `Strona ${page} - ${listing.heading}`,
          paragraph: listing.paragraph,
        }}
        currentPage={page}
      />
      <Components data={content} />
    </>
  );
}

const query = async (): Promise<BlogPaginationPageQueryTypes> => {
  const data = await sanityFetch<BlogPaginationPageQueryTypes>({
    query: /* groq */ `
      *[_type == "Blog_Page"][0] {
        ${Listing_Query}
        ${Components_Query}
      }
    `,
    tags: ['BlogPost_Collection'],
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata({ params: { page } }: BlogPaginationPageTypes) {
  return await QueryMetadata('Blog_Page', `/blog/strona/${page}`);
}

// export async function generateStaticParams(page): Promise<generateStaticParamsTypes> {
//   const collection = await sanityFetch<generateStaticParamsTypes>({
//     query: /* groq */ `
//       *[_type == 'BlogPost_Collection'] {
//         'slug': slug.current,
//       }
//     `,
//     params: {
//       page: page,
//     },
//     tags: ['BlogPost_Collection'],
//   });

//   return collection.map(({ slug }) => ({
//     slug: slug,
//   }));
// }
