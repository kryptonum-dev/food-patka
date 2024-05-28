import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import { removeMarkdown } from '@/utils/remove-markdown';
import ProductHero, { ProductHero_Query } from '@/components/_Shop/ProductHero';
import type { generateStaticParamsTypes } from '@/global/types';
import type { BlogPostPageQueryTypes, ShopProductPageTypes } from './page.types';

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
      <ProductHero {...{
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
      }} />
    </>
  );
}

const query = async (slug: string): Promise<BlogPostPageQueryTypes> => {
  const data = await sanityFetch<BlogPostPageQueryTypes>({
    query: /* groq */ `
      *[_type == "Product_Collection" && $slug == slug.current][0] {
        ${ProductHero_Query}
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
    dynamicSlug: slug
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
