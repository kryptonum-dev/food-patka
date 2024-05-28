'use client';
import { useState } from 'react';
import Img from '@/components/ui/image';
import styles from './ProductHero.module.scss';
import type { GalleryTypes } from './ProductHero.types';

export default function Gallery({ data, ArrowLeftIcon, ArrowRightIcon }: GalleryTypes) {
  const [preview, setPreview] = useState(0);
  const handleChange = (direction: number) => setPreview((preview + direction + data.length) % data.length);

  return (
    <div className={styles['Gallery']}>
      <div className={styles.preview}>
        {data.map((img, i) => (
          <Img
            data={img}
            sizes=''
            key={i}
            style={{
              display: i !== preview ? 'none' : undefined,
            }}
          />
        ))}
        <button
          aria-label='Poprzednie zdjęcie'
          onClick={() => handleChange(-1)}
          className={`${styles.navigation} ${styles.prev}`}
        >
          {ArrowLeftIcon}
        </button>
        <button
          aria-label='Następne zdjęcie'
          onClick={() => handleChange(1)}
          className={`${styles.navigation} ${styles.next}`}
        >
          {ArrowRightIcon}
        </button>
      </div>
      {data.length > 1 && (
        <div className={styles.thumbnails}>
          {data.map((img, i) => (
            <button
              key={i}
              onClick={() => setPreview(i)}
              aria-current={i === preview ? 'true' : undefined}
            >
              <Img data={img} sizes='80px' key={i} />
            </button>
          ))}
        </div>
      )}
    </div >
  );
}