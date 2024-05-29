import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import { removeMarkdown } from '@/utils/remove-markdown';
import Product, { Product_Query } from '@/components/_Shop/Product';
import type { ShopProductPageQueryTypes, ShopProductPageTypes } from './page.types';
import type { generateStaticParamsTypes } from '@/global/types';

export default async function ShopProductPage({
  params: { slug },
  searchParams: { v: currentVariantParam },
}: ShopProductPageTypes) {
  const {
    name,
    url,
    category,
    hasVariants,
    variants,
    cheapestVariant,
    price,
    oldPrice,
    omnibus,
    gallery,
    description,
  } = await query(slug);

  const breadcrumbsSchema = [
    { name: 'Sklep', path: '/sklep' },
    { name: category.name, path: `/sklep/kategoria/${category.slug}` },
    { name: removeMarkdown(name), path: `/sklep/${slug}` },
  ];
  const currentVariant = (hasVariants && variants && currentVariantParam) ? variants[currentVariantParam - 1] : null;
  if (currentVariant) {
    breadcrumbsSchema.push({
      name: currentVariant.name,
      path: `/sklep/${slug}?v=${currentVariantParam}`,
    });
  }

  return (
    <>
      <Breadcrumbs data={breadcrumbsSchema} />
      <Product
        {...{
          name,
          url,
          hasVariants,
          variants,
          cheapestVariant,
          price,
          oldPrice,
          omnibus,
          gallery,
          currentVariantParam,
          description,
        }}
      />
    </>
  );
}

const query = async (slug: string): Promise<ShopProductPageQueryTypes> => {
  const data = await sanityFetch<ShopProductPageQueryTypes>({
    query: /* groq */ `
      *[_type == "Product_Collection" && $slug == slug.current][0] {
        ${Product_Query}
      }
    `,
    params: { slug },
    tags: ['Product_Collection'],
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata({
  params: { slug },
  searchParams: { v: currentVariantParam }
}: ShopProductPageTypes) {
  const { hasVariants, variants } = await query(slug);
  const currentVariant = (hasVariants && variants && currentVariantParam) ? variants[currentVariantParam - 1] : null;

  return await QueryMetadata({
    name: 'Product_Collection',
    path: currentVariant ? `/sklep/${slug}?v=${currentVariantParam}` : `/sklep/${slug}`,
    dynamicSlug: slug,
    titleSuffix: currentVariant ? ` - ${currentVariant.name}` : '',
  });
}

export async function generateStaticParams(): Promise<generateStaticParamsTypes> {
  const collection = await sanityFetch<generateStaticParamsTypes>({
    query: /* groq */ `
      *[_type == 'Product_Collection'] {
        'slug': slug.current,
      }
    `,
    tags: ['Product_Collection'],
  });

  return collection.map(({ slug }) => ({
    slug: slug,
  }));
}