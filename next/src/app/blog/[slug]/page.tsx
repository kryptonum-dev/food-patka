import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import type { generateStaticParamsTypes } from '@/global/types';
import { BlogPostPageQueryTypes, BlogPostPageTypes } from './page.type';
import { ImgDataQuery } from '@/components/ui/image';
import { removeMarkdown } from '@/utils/remove-markdown';
import PostHero from '@/components/_Blog/PostHero';

export default async function BlogPostPage({ params: { slug } }: BlogPostPageTypes) {
  const { title, subtitle, img, slug: postSlug, _createdAt, category } = await query(slug);

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Blog', path: '/blog' },
        { name: removeMarkdown(title), path: `/blog/${postSlug}` },
      ]} />
      <PostHero {...{ title, subtitle, img, _createdAt, category }} />
    </>
  );
}

const query = async (slug: string): Promise<BlogPostPageQueryTypes> => {
  const data = await sanityFetch<BlogPostPageQueryTypes>({
    query: /* groq */ `
      *[_type == "BlogPost_Collection" && $slug == slug.current][0] {
        title,
        subtitle,
        img {
          ${ImgDataQuery}
        },
        "slug": slug.current,
        "category": {
          "name": category -> name,
          "slug": category -> slug.current,
        },
        _createdAt,
      }
    `,
    params: { slug },
    tags: ['BlogPost_Collection'],
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata({ params: { slug } }: BlogPostPageTypes) {
  return await QueryMetadata('BlogPost_Collection', `/blog/${slug}`, slug);
}

export async function generateStaticParams(): Promise<generateStaticParamsTypes> {
  const collection = await sanityFetch<generateStaticParamsTypes>({
    query: /* groq */ `
      *[_type == 'BlogPost_Collection'] {
        'slug': slug.current,
      }
    `,
    tags: ['BlogPost_Collection'],
  });

  return collection.map(({ slug }) => ({
    slug: slug,
  }));
}
