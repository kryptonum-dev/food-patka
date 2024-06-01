import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import Components, { Components_Query } from '@/components/Components';
import Listing from '@/components/_Shop/Listing';
import type { ShopCategoryPageQueryTypes, ShopCategoryPageTypes } from './page.types';

export default async function ShopCategoryPage({ params: { slug } }: ShopCategoryPageTypes) {
  return null;
  const {
    category: {
      name: categoryName,
      slug: categorySlug,
      subcategories,
      header,
    },
    page: {
      content
    }
  } = await query(slug);


  return (
    <>
      <Breadcrumbs data={[
        { name: 'Sklep', path: '/sklep' },
        { name: categoryName, path: `/sklep/kategoria/${categorySlug}` },
      ]} />
      <Listing {...header} currentCategorySlug={slug[slug.length - 1]} />
      <Components data={content} />
    </>
  );
}

const query = async (slug: string[]): Promise<ShopCategoryPageQueryTypes> => {

  const data = await sanityFetch<ListingQueryTypes>({
    query: /* groq */ `
      {
        "categories": *[_type == "ProductCategory_Collection" && isSubcategory == false] {
          name,
          "slug": slug.current,
          "postCount": count(*[_type == "Product_Collection" && references(^._id )]),
        },
        "totalPosts": count(
          *[_type == "Product_Collection"
            ${currentCategorySlug ? `&& category -> slug.current == "${currentCategorySlug}"` : ''}
          ]
        ),
        "products": *[_type == "Product_Collection"
          ${currentCategorySlug ? `&& category -> slug.current == "${currentCategorySlug}"` : ''}]
        | order(_createdAt desc) [$PAGINATION_BEFORE...$PAGINATION_AFTER] {
          ${ProductCard_Query}
        },
      }
    `,
    params: {
      PAGINATION_BEFORE: PAGINATION_BEFORE,
      PAGINATION_AFTER: PAGINATION_AFTER,
      ...currentCategorySlug && { category: currentCategorySlug },
    },
    tags: ['ProductCategory_Collection', 'BlogPost_Collection'],
  });
  if (data.products.length === 0) notFound();
  return data;
};

export async function generateMetadata({ params: { slug } }: ShopCategoryPageTypes) {
  return await QueryMetadata({
    name: 'ProductCategory_Collection',
    path: `/sklep/kategoria/${slug}`,
    dynamicSlug: slug[slug.length - 1],
  });
}

// export async function generateStaticParams(): Promise<generateStaticParamsTypes> {
//   const collection = await sanityFetch<generateStaticParamsTypes>({
//     query: /* groq */ `
//       *[_type == 'ProductCategory_Collection'] {
//         'slug': slug.current,
//       }
//     `,
//     tags: ['ProductCategory_Collection'],
//   });

//   return collection.map(({ slug }) => ({
//     slug: slug,
//   }));
// }
