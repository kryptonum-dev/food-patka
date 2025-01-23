import Img from '@/components/ui/image';
import styles from './HighlightedSection.module.scss';
import Markdown from '@/components/ui/markdown';
import type { HighlightedSectionTypes } from './HighlightedSection.types';
import Video from '@/components/ui/Video';

export default function HighlightedSection({ heading, paragraph, isReversed, img, video }: HighlightedSectionTypes) {
  return (
    <section
      className={styles['HighlightedSection']}
      data-has-media={!!img || !!video}
      data-is-reversed={!!isReversed}
    >
      <header>
        <Markdown.h3 className={styles.heading}>{heading}</Markdown.h3>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
      {img && (
        <Img data={img} sizes='(max-width: 479px) 100vw, (max-width: 549px) 418px, 258px' />
      )}
      {video && (
        <div className={styles.video}>
          <Video {...video} aspectRatio='1:1' hideControls />
        </div>
      )}
    </section>
  );
}
