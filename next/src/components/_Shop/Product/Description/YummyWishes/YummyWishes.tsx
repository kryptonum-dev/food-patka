import Markdown from '@/components/ui/markdown';
import styles from './YummyWishes.module.scss';
import Img from '@/components/ui/image';
import type { YummyWishesTypes } from './YummyWishes.types';

export default function YummyWishes({ img, heading, paragraph }: YummyWishesTypes) {
  return (
    <section className={styles['YummyWishes']}>
      <Img data={img} sizes='(max-width: 599px) 42vw, 270px' />
      <header>
        <Markdown.h2 className='h3'>{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      </header>
    </section>
  );
}
