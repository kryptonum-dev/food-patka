import { PortableText, PortableTextReactComponents } from 'next-sanity';
import styles from './Description.module.scss';
import { LinkRenderer, ListRenderer } from '@/components/ui/markdown';
import HighlightedSection, { type HighlightedSectionTypes } from './HighlightedSection';
import CommunityTrust, { type CommunityTrustTypes } from './CommunityTrust';
import type { DescriptionTypes } from './Description.types';

const components = {
  block: {
    h2: ({ children }) => <h2 className='h3'>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    largeText: ({ children }) => <p className='h3'>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => LinkRenderer({ href: value.href, children }),
  },
  list: {
    bullet: ({ children }) => <ul className='unorderedList'>{children}</ul>,
    number: ({ children }) => <ol className='orderedList'>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => ListRenderer({ ordered: false, children }),
  },
  types: {
    CommunityTrust: ({ value }: { value: CommunityTrustTypes }) => <CommunityTrust {...value} />,
    HighlightedSection: ({ value }: { value: HighlightedSectionTypes }) => <HighlightedSection {...value} />,
  }
} as Partial<PortableTextReactComponents>;

export default function Description({ className, description }: DescriptionTypes) {
  return (
    <section className={`${styles['Description']} ${className}`}>
      <PortableText
        value={description}
        components={components}
      />
    </section>
  );
}
