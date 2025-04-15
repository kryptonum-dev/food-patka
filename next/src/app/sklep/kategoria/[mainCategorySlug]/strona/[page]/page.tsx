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
  const { page = 1, mainCategorySlug } = await props.params;
  const { woo } = await props.searchParams;
  const isWoo = woo !== 'false';
  const {
    categories,
    pageContent,
    products,
    totalProducts,
    mainCategory,
  } = await query({
    currentPage: page,
    mainCategory: mainCategorySlug,
    isWoo,
  });

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Sklep', path: '/sklep' },
        { name: mainCategory.name, path: `/sklep/kategoria/${mainCategory.slug}` },
        { name: `Strona ${page}`, path: `/sklep/kategoria/${mainCategory.slug}/strona/${page}` },
      ]} />
      <Listing
        heading={mainCategory.header.heading}
        paragraph={mainCategory.header.paragraph}
        categories={categories}
        products={products}
        totalPages={Math.ceil(totalProducts / ITEMS_PER_PAGE)}
        currentPage={page}
        mainCategorySlug={mainCategory.slug}
      />
      <Components data={pageContent.content} />
    </>
  );
}

const query = async ({
  currentPage,
  mainCategory,
  isWoo,
}: {
  currentPage: number;
  mainCategory: string;
  isWoo: boolean;
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
        ] | order(_updatedAt desc) [$PAGINATION_BEFORE...$PAGINATION_AFTER]
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
      isWoo: isWoo.toString(),
    },
    tags: ['Shop_Page', 'Product_Collection', 'ProductCategory_Collection', 'Review_Collection'],
  });
  if (!data.mainCategory || data.products.length === 0) notFound();
  return data;
};

export async function generateMetadata(props: ShopPageTypes) {
  const { page, mainCategorySlug } = await props.params;
  return await QueryMetadata({
    name: 'ProductCategory_Collection',
    path: `/sklep/kategoria/${mainCategorySlug}${page !== 1 ? `/strona/${page}` : ''}`,
    dynamicSlug: mainCategorySlug,
    titleSuffix: ` - Strona ${page}`,
  });
}

export async function generateStaticParams(): Promise<{ mainCategorySlug: string; page: string; }[]> {
  const mainCategories = await sanityFetch<{ slug: string, productCount: number; }[]>({
    query: /* groq */ `
      *[_type == "ProductCategory_Collection" && isSubcategory == false] {
        "slug": slug.current,
        "productCount": count(*[_type == "Product_Collection" && references(^._id)]),
      }
    `,
    tags: ['ProductCategory_Collection', 'Product_Collection'],
  });

  return mainCategories.flatMap(({ slug, productCount }) => {
    const totalPages = Math.ceil(productCount / ITEMS_PER_PAGE);
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      mainCategorySlug: slug,
      page: (i + 2).toString(),
    }));
  });
}

