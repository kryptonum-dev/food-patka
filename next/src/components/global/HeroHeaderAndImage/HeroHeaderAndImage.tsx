import Markdown from '@/components/ui/markdown';
import styles from './HeroHeaderAndImage.module.scss';
import type { HeroHeaderAndImageTypes } from './HeroHeaderAndImage.types';
import Button from '@/components/ui/Button';
import Img from '@/components/ui/image';

export default function HeroHeaderAndImage({ index, heading, paragraph, cta, img }: HeroHeaderAndImageTypes) {
  return (
    <section className={styles['HeroHeaderAndImage']}>
      <header>
        <Markdown.h1>{heading}</Markdown.h1>
        <Markdown>{paragraph}</Markdown>
        <Button data={cta} />
        <Img data={img} sizes='' />
      </header>
    </section>
  );
}
