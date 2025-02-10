import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Blog/Listing';
import type { BlogCategoryPageQueryTypes, BlogCategoryPageTypes } from './page.types';

export default async function BlogCategoryPage(props: BlogCategoryPageTypes) {
  const { slug } = await props.params;
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

export async function generateMetadata(props: BlogCategoryPageTypes) {
  const { slug } = await props.params;
  return await QueryMetadata({
    name: 'BlogCategory_Collection',
    path: `/blog/kategoria/${slug}`,
    dynamicSlug: slug
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const collection = await sanityFetch<{ slug: string }[]>({
    query: /* groq */ `
      *[_type == 'BlogCategory_Collection'] {
        "slug": slug.current,
      }
    `,
    tags: ['BlogCategory_Collection'],
  });

  return collection.map(({ slug }) => ({
    slug: slug,
  }));
}
