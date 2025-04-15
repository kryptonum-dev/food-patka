import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Shop/Listing';
import { ProductCard_Query } from '@/components/global/ProductCard';
import { ITEMS_PER_PAGE } from '@/components/ui/Pagination/Pagination';
import { ImgDataQuery } from '@/components/ui/image';
import type { ShopPageQueryTypes, ShopPageTypes } from '@/app/sklep/page.types';

export default async function ShopPaginationPage(props: ShopPageTypes) {
  const { page = 1 } = await props.params;
  const { woo } = await props.searchParams;
  const isWoo = woo !== 'false';
  const {
    categories,
    totalProducts,
    products,
    pageContent,
  } = await query(page, isWoo);

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
        totalPages={Math.ceil(totalProducts / ITEMS_PER_PAGE)}
        currentPage={page}
      />
      <Components data={pageContent.content} />
    </>
  );
}

const query = async (currentPage: number, isWoo: boolean): Promise<ShopPageQueryTypes> => {
  const OFFSET = ITEMS_PER_PAGE * (currentPage - 1);
  const PAGINATION_BEFORE = OFFSET;
  const PAGINATION_AFTER = OFFSET + ITEMS_PER_PAGE;

  const data = await sanityFetch<ShopPageQueryTypes>({
    query: /* groq */ `
      {
        "categories": *[_type == "ProductCategory_Collection"
          && isSubcategory == false
          && count(*[_type == "Product_Collection" && references(^._id)]) > 0
        ]{
          name,
          "slug": slug.current,
          "productCount": count(*[_type == "Product_Collection" && (references(^._id) || category -> mainCategory -> _id == ^._id)]),
          thumbnail {
            ${ImgDataQuery}
          },
        },
        "totalProducts": count(*[_type == "Product_Collection"]),
        "products": *[_type == "Product_Collection"] | order(_updatedAt desc) [$PAGINATION_BEFORE...$PAGINATION_AFTER] {
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
      isWoo: isWoo.toString(),
    },
    tags: ['Shop_Page', 'Product_Collection', 'ProductCategory_Collection', 'Review_Collection'],
  });
  if (data.products.length === 0) notFound();
  return data;
};

export async function generateMetadata(props: ShopPageTypes) {
  const { page } = await props.params;
  return await QueryMetadata({
    name: 'Shop_Page',
    path: `/sklep${page !== 1 ? `/strona/${page}` : ''}`,
    titleSuffix: ` - Strona ${page}`,
  });
}

export async function generateStaticParams(): Promise<{ page: string }[]> {
  const totalProducts = await sanityFetch<number>({
    query: /* groq */ `
      count(*[_type == "Product_Collection"])
    `,
    tags: ['Product_Collection'],
  });

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}
