import Img from '@/components/ui/image';
import styles from './HighlightedSection.module.scss';
import Markdown from '@/components/ui/markdown';
import type { HighlightedSectionTypes } from './HighlightedSection.types';

export default function HighlightedSection({ heading, paragraph, isReversed, img }: HighlightedSectionTypes) {
  return (
    <section
      className={styles['HighlightedSection']}
      data-has-image={!!img}
      data-is-reversed={!!isReversed}
    >
      <header>
        <Markdown.h3 className={styles.heading}>{heading}</Markdown.h3>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
      {img && (
        <Img data={img} sizes='(max-width: 549px) 304px, 188px' />
      )}
    </section>
  );
}
