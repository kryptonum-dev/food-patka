import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Blog/Listing';
import type { BlogCategoryPaginationPageQueryTypes, BlogCategoryPaginationPageTypes } from './page.types';
import { ITEMS_PER_PAGE } from '@/components/ui/Pagination/Pagination';

export default async function BlogCategoryPaginationPage(props: BlogCategoryPaginationPageTypes) {
  const { slug, page } = await props.params;
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
    params: { slug, isWoo: false },
    tags: ['Blog_Page', 'BlogCategory_Collection'],
  });
  if (!data.category) notFound();
  return data;
};

export async function generateMetadata(props: BlogCategoryPaginationPageTypes) {
  const { slug, page } = await props.params;
  return await QueryMetadata({
    name: 'BlogCategory_Collection',
    path: `/blog/kategoria/${slug}/strona/${page}`,
    dynamicSlug: slug,
    titleSuffix: ` - Strona ${page}`,
  });
}

export async function generateStaticParams(): Promise<{ slug: string; page: string; }[]> {
  const data = await sanityFetch<{ slug: string, postCount: number }[]>({
    query: /* groq */ `
      *[_type == 'BlogCategory_Collection'] {
        "slug": slug.current,
        "postCount": count(*[_type == "Product_Collection" && references(^._id)]),
      }
    `,
    tags: ['BlogPost_Collection', 'BlogCategory_Collection'],
  });

  return data.flatMap(({ slug, postCount }) => {
    const totalPages = Math.ceil(postCount / ITEMS_PER_PAGE);
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      slug: slug,
      page: (i + 2).toString(),
    }));
  });
}
