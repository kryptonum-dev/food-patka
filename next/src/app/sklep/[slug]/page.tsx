import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import { removeMarkdown } from '@/utils/remove-markdown';
import Product, { Product_Query } from '@/components/_Shop/Product';
import Components, { Components_Query } from '@/components/Components';
import Analytics from './Analytics';
import type { ShopProductPageQueryTypes, ShopProductPageTypes } from './page.types';
import { hash } from '@/utils/hash';

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
    content: pageContent,
    analytics,
    rating,
    totalReviews,
    reviews,
    RecentPurchases: { min, max },
  } = await query(slug);

  const timestamp = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 1));
  const stableSeed = await hash(`${slug}-${timestamp}-${min}-${max}`);
  const seedNumber = BigInt(`0x${stableSeed}`);
  const absSeed = seedNumber >= 0 ? seedNumber : -seedNumber;
  const numberOfRecentPurchases = Number(absSeed % BigInt(max - min + 1) + BigInt(min));

  const breadcrumbsSchema = [{ name: 'Sklep', path: '/sklep' }];
  if (category.mainCategory) {
    breadcrumbsSchema.push(
      { name: category.mainCategory.name, path: `/sklep/kategoria/${category.mainCategory.slug}` },
      { name: category.name, path: `/sklep/kategoria/${category.mainCategory.slug}/${category.slug}` },
    );
  } else {
    breadcrumbsSchema.push(
      { name: category.name, path: `/sklep/kategoria/${category.slug}` },
    );
  }
  breadcrumbsSchema.push({ name: removeMarkdown(name), path: `/sklep/${slug}` });
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
          numberOfRecentPurchases,
        }}
        content_id={analytics.item_id}
        content_name={analytics.item_name}
        rating={rating}
        totalReviews={totalReviews}
        reviews={reviews}
      />
      <Components data={pageContent} />
      <Analytics
        item_id={analytics.item_id}
        item_name={analytics.item_name}
      />
    </>
  );
}

const query = async (slug: string): Promise<ShopProductPageQueryTypes> => {
  const data = await sanityFetch<ShopProductPageQueryTypes>({
    query: /* groq */ `
      *[_type == "Product_Collection" && $slug == slug.current][0] {
        ${Product_Query}
        ${Components_Query}
        analytics {
          item_name,
          item_id,
        },
        "rating": math::avg(*[_type == 'Review_Collection' && references(^._id)]{rating}.rating),
        "totalReviews": count(*[_type == 'Review_Collection' && references(^._id)]),
        "RecentPurchases": *[_id == 'global'][0].RecentPurchases {
          min,
          max,
        },
      }
    `,
    params: { slug },
    tags: ['Product_Collection', 'global'],
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

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const products = await sanityFetch<{ slug: string }[]>({
    query: /* groq */ `
      *[_type == 'Product_Collection'] {
        "slug": slug.current,
      }
    `,
    tags: ['Product_Collection'],
  });

  return products.map(({ slug }) => ({
    slug: slug,
  }));
}
