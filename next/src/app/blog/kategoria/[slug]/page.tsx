import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Blog/Listing';
import type { BlogCategoryPageQueryTypes, BlogCategoryPageTypes } from './page.types';
import type { generateStaticParamsTypes } from '@/global/types';

export default async function BlogCategoryPage({ params: { slug } }: BlogCategoryPageTypes) {
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
      ]} />
      <Listing {...header} currentCategorySlug={slug} />
      <Components data={content} />
    </>
  );
}

const query = async (slug: string): Promise<BlogCategoryPageQueryTypes> => {
  const data = await sanityFetch<BlogCategoryPageQueryTypes>({
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

export async function generateMetadata({ params: { slug } }: BlogCategoryPageTypes) {
  return await QueryMetadata('BlogCategory_Collection', `/blog/kategoria/${slug}`, slug);
}

export async function generateStaticParams(): Promise<generateStaticParamsTypes> {
  const collection = await sanityFetch<generateStaticParamsTypes>({
    query: /* groq */ `
      *[_type == 'BlogCategory_Collection'] {
        'slug': slug.current,
      }
    `,
    tags: ['BlogCategory_Collection'],
  });

  return collection.map(({ slug }) => ({
    slug: slug,
  }));
}
