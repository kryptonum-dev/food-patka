import type { PortableTextBlock } from 'next-sanity';

export type DescriptionTypes = {
  className: React.HTMLProps<HTMLElement>['className'];
  description: PortableTextBlock;
}
