import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/Seo/query-metadata';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import { BlogPostPageQueryTypes, BlogPostPageTypes } from './page.type';
import { removeMarkdown } from '@/utils/remove-markdown';
import PostHero, { PostHero_Query } from '@/components/_Blog/PostHero';
import PostContent, { PostContent_Query } from '@/components/_Blog/PostContent';
import { toPlainText } from 'next-sanity';

export default async function BlogPostPage(props: BlogPostPageTypes) {
  const { slug } = await props.params;
  const { title, subtitle, img, slug: postSlug, _createdAt, category, content, headings } = await query(slug);

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Blog', path: '/blog' },
        { name: removeMarkdown(title), path: `/blog/${postSlug}` },
      ]} />
      <PostHero {...{
        title,
        subtitle,
        img,
        _createdAt,
        category,
        readingTimeContent: toPlainText(content)
      }} />
      <PostContent headings={headings} content={content} />
    </>
  );
}

const query = async (slug: string): Promise<BlogPostPageQueryTypes> => {
  const data = await sanityFetch<BlogPostPageQueryTypes>({
    query: /* groq */ `
      *[_type == "BlogPost_Collection" && $slug == slug.current][0] {
        "slug": slug.current,
        ${PostHero_Query}
        ${PostContent_Query}
      }
    `,
    params: { slug },
    tags: ['BlogPost_Collection'],
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata(props: BlogPostPageTypes) {
  const { slug } = await props.params;
  return await QueryMetadata({
    name: 'BlogPost_Collection',
    path: `/blog/${slug}`,
    dynamicSlug: slug
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const collection = await sanityFetch<{ slug: string }[]>({
    query: /* groq */ `
      *[_type == 'BlogPost_Collection'] {
        "slug": slug.current,
      }
    `,
    tags: ['BlogPost_Collection'],
  });

  return collection.map(({ slug }) => ({
    slug: slug,
  }));
}
