import Img from '@/components/ui/image';
import styles from './InfoTile.module.scss';
import Markdown from '@/components/ui/markdown';
import type { InfoTileTypes } from './InfoTile.types';

export default function InfoTile({ img, heading, paragraph }: InfoTileTypes) {
  return (
    <section className={styles['InfoTile']}>
      <Img data={img} sizes='(max-width: 449px) 100vw, 188px' />
      <header>
        <Markdown.h2 className='h3'>{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
    </section>
  );
}
