import LatestBlogEntries from './LatestBlogEntries';
import { BlogPostCard_Query } from '../BlogPostCard';
export default LatestBlogEntries;
export type { LatestBlogEntriesTypes } from './LatestBlogEntries.types';

export const LatestBlogEntries_Query = `
  _type == "LatestBlogEntries" => {
    heading,
    paragraph,
    "posts": *[_type == "BlogPost_Collection"] | order(_createdAt desc) [0...3] {
      ${BlogPostCard_Query}
    },
  },
`;
