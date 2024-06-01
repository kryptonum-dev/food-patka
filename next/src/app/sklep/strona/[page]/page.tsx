import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Shop/Listing';
import { ITEMS_PER_PAGE } from '../../page';
import { ProductCard_Query } from '@/components/global/ProductCard';
import type { ShopPaginationPageQueryTypes, ShopPaginationPageTypes } from './page.types';

export default async function ShopPaginationPage({ params: { page } }: ShopPaginationPageTypes) {
  const {
    categories,
    totalPosts,
    products,
    pageContent,
  } = await query(page);

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Sklep', path: '/sklep' },
        { name: `Strona ${page}`, path: `/sklep/strona/${page}` },
      ]} />
      <Listing
        heading={pageContent.header.heading}
        paragraph={pageContent.header.paragraph}
        categories={categories}
        products={products}
        totalPages={Math.ceil(totalPosts / ITEMS_PER_PAGE)}
        currentPage={page}
      />
      <Components data={pageContent.content} />
    </>
  );
}

const query = async (currentPage: number): Promise<ShopPaginationPageQueryTypes> => {
  const OFFSET = ITEMS_PER_PAGE * (currentPage - 1);
  const PAGINATION_BEFORE = OFFSET;
  const PAGINATION_AFTER = OFFSET + ITEMS_PER_PAGE;

  const data = await sanityFetch<ShopPaginationPageQueryTypes>({
    query: /* groq */ `
      {
        "categories": *[_type == "ProductCategory_Collection"
          && isSubcategory == false
          && count(*[_type == "Product_Collection" && references(^._id)]) > 0
        ]{
          name,
          "slug": slug.current,
          "postCount": count(*[_type == "Product_Collection" && references(^._id )]),
        },
        "totalPosts": count(*[_type == "Product_Collection"]),
        "products": *[_type == "Product_Collection"] | order(_createdAt desc) [$PAGINATION_BEFORE...$PAGINATION_AFTER] {
          ${ProductCard_Query}
        },
        "pageContent": *[_type == "Shop_Page"][0] {
          header {
            heading,
            paragraph,
          },
          ${Components_Query}
        }
      }
    `,
    params: {
      PAGINATION_BEFORE: PAGINATION_BEFORE,
      PAGINATION_AFTER: PAGINATION_AFTER,
    },
    tags: ['Shop_Page'],
  });
  if (data.products.length === 0) notFound();
  return data;
};

export async function generateMetadata({ params: { page } }: ShopPaginationPageTypes) {
  return await QueryMetadata({
    name: 'Shop_Page',
    path: page == 1 ? '/sklep' : `/sklep/strona/${page}`,
    titleSuffix: ` - Strona ${page}`,
  });
}

export async function generateStaticParams(): Promise<{ page: number }[]> {
  const { totalPosts } = await sanityFetch<{ totalPosts: number }>({
    query: /* groq */ `
      {
        "totalPosts": count(*[_type == "Product_Collection"]),
      }
    `,
    tags: ['Product_Collection'],
  });

  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: i + 1,
  }));
}
