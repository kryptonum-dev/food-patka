import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import styles from './Features.module.scss';
import type { FeaturesTypes } from './Features.types';

export default function Features({ heading, list }: FeaturesTypes) {
  return (
    <section className={styles['Features']}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
      </header>
      <ul className={styles.list}>
        {list.map(({ img, heading, paragraph }, i) => (
          <li
            className={styles.item}
            key={i}
          >
            <Img data={img} sizes='154px' />
            <Markdown.h3>{heading}</Markdown.h3>
            <Markdown>{paragraph}</Markdown>
          </li>
        ))}
      </ul>
    </section>
  );
}
