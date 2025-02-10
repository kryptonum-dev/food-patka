import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import { BlogPaginationPageQueryTypes, BlogPaginationPageTypes } from './page.type';
import Listing, { Listing_Query } from '@/components/_Blog/Listing';
import Components, { Components_Query } from '@/components/Components';
import { ITEMS_PER_PAGE } from '@/components/ui/Pagination/Pagination';

export default async function BlogPaginationPage(props: BlogPaginationPageTypes) {
  const { page } = await props.params;
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

export async function generateMetadata(props: BlogPaginationPageTypes) {
  const { page } = await props.params;
  return await QueryMetadata({
    name: 'Blog_Page',
    path: page == 1 ? '/blog' : `/blog/strona/${page}`,
    titleSuffix: ` - Strona ${page}`,
  });
}

export async function generateStaticParams(): Promise<{ page: string }[]> {
  const totalPosts = await sanityFetch<number>({
    query: /* groq */ `
      count(*[_type == "BlogPost_Collection"])
    `,
    tags: ['BlogPost_Collection'],
  });

  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}
