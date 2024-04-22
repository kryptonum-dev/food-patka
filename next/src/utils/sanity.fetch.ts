'use server';
import { createClient, type QueryParams } from 'next-sanity';
import { isDraftDeployment } from './is-draft-deployment';

const projectId = process.env.SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;
const dataset = 'production';
const apiVersion = '2024-04-15';

if (isDraftDeployment && !token) {
  throw new Error('The `SANITY_API_TOKEN` environment variable is required.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: isDraftDeployment ? 'previewDrafts' : 'published',
  ...(isDraftDeployment && { token }),
});

/**
 * Performs a Sanity query in GROQ for fetching data.
 * @param {string} query - The GROQ query.
 * @param {string[]} [tags] - Recommended. The tags for Next Caching.
 * @param {QueryParams} [params={}] - Optional. Used to query dynamic pages, like blog posts.
 * @returns {Promise<QueryResponse>} Returns a promise of the SEO object.
 */
export default async function sanityFetch<QueryResponse>({
  query,
  tags,
  params = {},
}: {
  query: string;
  tags?: string[];
  params?: QueryParams;
}): Promise<QueryResponse> {
  return await client.fetch<QueryResponse>(query, params, {
    cache: isDraftDeployment || !tags ? 'no-cache' : 'default',
    ...(tags && {
      next: {
        tags: tags,
      },
    }),
  });
}
