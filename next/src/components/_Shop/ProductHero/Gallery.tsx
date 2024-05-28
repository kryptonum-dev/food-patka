import Img from '@/components/ui/image';
import styles from './ProductHero.module.scss';
import type { GalleryTypes } from './ProductHero.types';

export default function Gallery({ data }: GalleryTypes) {
  return (
    <div className={styles['Gallery']}>
      <div className={styles.preview}>
        {/* <Img data={data[0]} sizes='' /> */}
      </div>
      {data.length > 1 && (
        <div className={styles.thumbnails}>
          {data.map((img, i) => (
            <Img data={img} sizes='' key={i} />
          ))}
        </div>
      )}
    </div>
  );
}