import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Blog/Listing';
import type { BlogCategoryPaginationPageQueryTypes, BlogCategoryPaginationPageTypes } from './page.types';

export default async function BlogCategoryPaginationPage({ params: { slug, page } }: BlogCategoryPaginationPageTypes) {
  const {
    category: {
      name: categoryName,
      slug: categorySlug,
      header,
    },
    page: {
      content
    }
  } = await query(slug);

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Blog', path: '/blog' },
        { name: categoryName, path: `/blog/kategoria/${categorySlug}` },
        { name: `Strona ${page}`, path: `/blog/kategoria/${categorySlug}/strong/${page}` },
      ]} />
      <Listing
        {...header}
        currentCategorySlug={slug}
        currentPage={page}
      />
      <Components data={content} />
    </>
  );
}

const query = async (slug: string): Promise<BlogCategoryPaginationPageQueryTypes> => {
  const data = await sanityFetch<BlogCategoryPaginationPageQueryTypes>({
    query: /* groq */ `
      {
        "category": *[_type == 'BlogCategory_Collection' && slug.current == $slug][0] {
          name,
          'slug': slug.current,
          header {
            heading,
            paragraph,
          },
        },
        "page": *[_type == "Blog_Page"][0] {
          ${Components_Query}
        },
      }
    `,
    params: { slug },
    tags: ['Blog_Page', 'BlogCategory_Collection'],
  });
  if (!data.category) notFound();
  return data;
};

export async function generateMetadata({ params: { slug, page } }: BlogCategoryPaginationPageTypes) {
  return await QueryMetadata({
    name: 'BlogCategory_Collection',
    path: `/blog/kategoria/${slug}/strona/${page}`,
    dynamicSlug: slug,
    titleSuffix: ` - Strona ${page}`,
  });
}

export async function generateStaticParams(): Promise<{ slug: string, page: number }[]> {
  const collection = await sanityFetch<{ slug: string, page: number }[]>({
    query: /* groq */ `
      *[_type == 'BlogCategory_Collection'] {
        'slug': slug.current,
        'page': count(*[_type == 'BlogPost_Collection' && references(^._id)]),
      }
    `,
    tags: ['BlogCategory_Collection'],
  });

  return collection.map(({ slug, page }) => ({
    slug: slug,
    page: Math.ceil(page / 10),
  }));
}
