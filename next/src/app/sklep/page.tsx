import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Shop/Listing';
import { ProductCard_Query } from '@/components/global/ProductCard';
import { ITEMS_PER_PAGE } from '@/components/ui/Pagination/Pagination';
import { ImgDataQuery } from '@/components/ui/image';
import type { ShopPageQueryTypes } from './page.types';

const currentPath = '/sklep';
const breadcrumbs = [
  { name: 'Sklep', path: currentPath },
];

export default async function ShopPage(props: { searchParams: Promise<{ woo: string }> }) {
  const { woo } = await props.searchParams;
  const isWoo = woo !== 'false';
  const {
    categories,
    totalProducts,
    products,
    pageContent,
  } = await query(1, isWoo);

  return (
    <>
      <Breadcrumbs data={breadcrumbs} />
      <Listing
        heading={pageContent.header.heading}
        paragraph={pageContent.header.paragraph}
        categories={categories}
        products={products}
        totalPages={Math.ceil(totalProducts / ITEMS_PER_PAGE)}
        currentPage={1}
      />
      <Components data={pageContent.content} />
    </>
  );
}

const query = async (currentPage: number = 1, isWoo: boolean): Promise<ShopPageQueryTypes> => {
  const OFFSET = ITEMS_PER_PAGE * (currentPage - 1);
  const PAGINATION_BEFORE = OFFSET;
  const PAGINATION_AFTER = OFFSET + ITEMS_PER_PAGE;

  return await sanityFetch<ShopPageQueryTypes>({
    query: /* groq */ `
      {
        "categories": *[_type == "ProductCategory_Collection"
          && isSubcategory == false
          && count(*[_type == "Product_Collection" && (references(^._id) || category -> mainCategory -> _id == ^._id)]) > 0
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
    tags: ['Shop_Page', 'ProductCategory_Collection', 'Product_Collection', 'Review_Collection'],
  });
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Shop_Page',
    path: currentPath
  });
}
