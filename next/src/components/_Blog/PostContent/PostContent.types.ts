import type { PortableTextBlock } from 'next-sanity';

export type PostContentTypes = {
  headings: PortableTextBlock[];
  content: PortableTextBlock;
}
