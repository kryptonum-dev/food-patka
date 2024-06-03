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

export default async function ShopMainCategoryPage({ params: { mainCategorySlug } }: ShopPageTypes) {
  const {
    categories,
    pageContent,
    products,
    totalProducts,
    mainCategory,
  } = await query({
    currentPage: 1,
    mainCategory: mainCategorySlug,
  });

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Sklep', path: '/sklep' },
        { name: mainCategory.name, path: `/sklep/kategoria/${mainCategory.slug}` },
      ]} />
      <Listing
        heading={mainCategory.header.heading}
        paragraph={mainCategory.header.paragraph}
        categories={categories}
        products={products}
        totalPages={Math.ceil(totalProducts / ITEMS_PER_PAGE)}
        currentPage={1}
        mainCategorySlug={mainCategory.slug}
      />
      <Components data={pageContent.content} />
    </>
  );
}

const query = async ({
  currentPage,
  mainCategory,
}: {
  currentPage: number;
  mainCategory: string;
}): Promise<ShopPageQueryTypes> => {
  const OFFSET = ITEMS_PER_PAGE * (currentPage - 1);
  const PAGINATION_BEFORE = OFFSET;
  const PAGINATION_AFTER = OFFSET + ITEMS_PER_PAGE;

  const data = await sanityFetch<ShopPageQueryTypes>({
    query: /* groq */ `
      {
        "categories": *[_type == "ProductCategory_Collection"
          && isSubcategory == true
          && count(*[_type == "Product_Collection" && references(^._id)]) > 0
          && mainCategory -> slug.current == $mainCategory
        ]{
          name,
          "slug": slug.current,
          "productCount": count(*[_type == "Product_Collection" && (references(^._id) || mainCategory -> _id == ^._id)]) ,
          thumbnail {
            ${ImgDataQuery}
          },
        },
        "mainCategory": *[_type == "ProductCategory_Collection" && slug.current == $mainCategory && isSubcategory == false] {
          name,
          "slug": slug.current,
          header {
            heading,
            paragraph
          }
        }[0],
        "totalProducts": count(*[_type == "Product_Collection"
          && (category -> slug.current == $mainCategory
          || category -> mainCategory -> slug.current == $mainCategory)
        ]),
        "products": *[_type == "Product_Collection"
          && (category -> slug.current == $mainCategory
          || category -> mainCategory -> slug.current == $mainCategory)
        ] | order(_createdAt desc) [$PAGINATION_BEFORE...$PAGINATION_AFTER]
          {
            ${ProductCard_Query}
        },
        "pageContent": *[_type == "Shop_Page"][0] {
          ${Components_Query}
        }
      }
    `,
    params: {
      PAGINATION_BEFORE: PAGINATION_BEFORE,
      PAGINATION_AFTER: PAGINATION_AFTER,
      mainCategory: mainCategory,
    },
    tags: ['Shop_Page', 'Product_Collection', 'ProductCategory_Collection'],
  });
  if (!data.mainCategory) notFound();
  return data;
};

export async function generateMetadata({ params: { mainCategorySlug } }: ShopPageTypes) {
  return await QueryMetadata({
    name: 'ProductCategory_Collection',
    path: `/sklep/kategoria/${mainCategorySlug}`,
    dynamicSlug: mainCategorySlug,
  });
}

export async function generateStaticParams(): Promise<{ mainCategorySlug: string }[]> {
  const mainCategories = await sanityFetch<{ slug: string }[]>({
    query: /* groq */ `
      *[_type == "ProductCategory_Collection" && isSubcategory == false] {
        "slug": slug.current,
      }
    `,
    tags: ['ProductCategory_Collection'],
  });

  return mainCategories.map(({ slug }) => ({
    mainCategorySlug: slug,
  }));
}