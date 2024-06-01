import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Shop/Listing';
import { ProductCard_Query } from '@/components/global/ProductCard';
import type { ShopPageQueryTypes } from './page.types';

const ITEMS_PER_PAGE = 1;

const currentPath = '/sklep';
const breadcrumbs = [
  { name: 'Sklep', path: currentPath },
];

export default async function ShopPage() {
  const {
    categories,
    totalPosts,
    products,
    page,
  } = await query();

  return (
    <>
      <Breadcrumbs data={breadcrumbs} />
      <Listing
        heading={page.header.heading}
        paragraph={page.header.paragraph}
        products={products}
        categories={categories}
        totalPages={Math.ceil(totalPosts / ITEMS_PER_PAGE)}
      />
      <Components data={page.content} />
    </>
  );
}

const query = async (currentPage: number = 1): Promise<ShopPageQueryTypes> => {
  const OFFSET = ITEMS_PER_PAGE * (currentPage - 1);
  const PAGINATION_BEFORE = OFFSET;
  const PAGINATION_AFTER = OFFSET + ITEMS_PER_PAGE;

  return await sanityFetch<ShopPageQueryTypes>({
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
        "page": *[_type == "Shop_Page"][0] {
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
};


export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Shop_Page',
    path: currentPath
  });
}