import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import Seo from '@/global/Seo';
import type { Metadata } from 'next';
import type { QueryMetadataTypes, QueryTypes } from './Seo.types';

/**
 * Performs a SEO query.
 * @param {string} name - The name of the SEO query for GROQ, it will be: `*[_id == "${name}"][0]` or `* [_type=='${name}' && slug.current == $slug][0]` if the `dynamicSlug` will be provided.
 * @param {string} path - The cannonical path for the URL.
 * @param {string} [dynamicSlug] - Optional. Used to query dynamic pages, like blog posts.
 * @returns {Promise<Metadata>} Returns a promise of the SEO object.
 */
export const QueryMetadata = async ({
  name,
  path,
  dynamicSlug,
  titleSuffix = '',
}: QueryMetadataTypes): Promise<Metadata> => {
  const customQuery = dynamicSlug ? `*[_type == '${name}' && slug.current == $slug][0]` : `*[_id == "${name}"][0]`;

  const { title, description, img } = await query(customQuery, name, dynamicSlug);

  return Seo({
    title: title + titleSuffix,
    description,
    path: path,
    img,
  });
};

const query = async (customQuery: string, tag: string, dynamicSlug?: string): Promise<QueryTypes> => {
  const seo = await sanityFetch<QueryTypes>({
    query: /* groq */ `
      ${customQuery} {
        "title": seo.title,
        "description": seo.description,
        "img": seo.img.asset -> url + "?w=1200"
      }
    `,
    tags: [tag],
    ...(dynamicSlug && { params: { slug: dynamicSlug } }),
  });
  !seo && notFound();
  return { ...seo };
};
