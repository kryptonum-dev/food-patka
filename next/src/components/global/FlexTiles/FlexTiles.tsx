import Markdown from '@/components/ui/markdown';
import Img from '@/components/ui/image';
import Button from '@/components/ui/Button';
import styles from './FlexTiles.module.scss';
import type { FlexTilesTypes } from './FlexTiles.types';

export default function FlexTiles({ heading, list }: FlexTilesTypes) {
  return (
    <section className={`${styles['FlexTiles']} sec-wo-margin`}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
      </header>
      <ul className={styles.list}>
        {list.map(({ icon, heading, paragraph, cta }, i) => (
          <li className={styles.item} key={i}>
            <Img data={icon} sizes='140px' />
            <Markdown.h3>{heading}</Markdown.h3>
            <Markdown className={styles.paragraph}>{paragraph}</Markdown>
            <Button data={cta} />
          </li>
        ))}
      </ul>
      <WaveTop className={styles.WaveTop} />
      <WaveBottom className={styles.WaveBottom} />
    </section>
  );
}

const WaveTop = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={1366}
    height={171}
    viewBox='0 0 1366 171'
    preserveAspectRatio='none'
    fill='none'
    {...props}
  >
    <path
      d='M601 105C377.11 10.738 63.337 48.346-1 99.679l1 71h1368v-168c-181-17.228-255.42 53.162-362.14 82C831 131.927 757 170.679 601 105Z'
      fill='#FFF6F9'
    />
  </svg>
);

const WaveBottom = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={1366}
    height={149}
    viewBox='0 0 1366 149'
    preserveAspectRatio='none'
    fill='none'
    {...props}
  >
    <path
      d='M322 42.68c-152-76.8-279.333 5.332-324 56v-98h1370v145.999c-17.33-26.667-70.66-50.473-188-84-217-62-305.539 30.329-407 58-220 60-261 18-451-78Z'
      fill='#FFF6F9'
    />
  </svg>
);