import Img from '@/components/ui/image';
import Markdown from '@/components/ui/markdown';
import Button from '@/components/ui/Button';
import styles from './Hero.module.scss';
import type { HeroTypes } from './Hero.types';

export default function Hero({ img, heading, paragraph, cta }: HeroTypes) {
  return (
    <section className={styles['Hero']}>
      <Img data={img} sizes='' />
      <header>
        <Markdown.h1>{heading}</Markdown.h1>
        <Markdown>{paragraph}</Markdown>
        {cta && <Button data={cta} />}
      </header>
    </section>
  );
}
