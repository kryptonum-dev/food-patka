import Img from '@/components/ui/image';
import styles from './ImageGrid.module.scss';
import type { ImageGridTypes } from './ImageGrid.types';

export default function ImageGrid({ images }: ImageGridTypes) {
  return (
    <section className={styles['ImageGrid']}>
      {images.map((img, i) => (
        <Img key={i} data={img} sizes='' />
      ))}
    </section>
  );
}
