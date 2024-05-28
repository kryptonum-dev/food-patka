'use client';
import { useState } from 'react';
import Img from '@/components/ui/image';
import styles from './Gallery.module.scss';
import type { GalleryTypes } from './Gallery.types';

export default function Gallery({ data, ArrowLeftIcon, ArrowRightIcon, className }: GalleryTypes) {
  const [preview, setPreview] = useState(0);
  const handleChange = (direction: number) => setPreview((preview + direction + data.length) % data.length);

  return (
    <div className={`${styles['Gallery']} ${className}`}>
      <div className={styles.preview}>
        {data.map((img, i) => (
          <Img
            data={img}
            sizes=''
            key={i}
            priority={i === 0}
            style={{
              display: i !== preview ? 'none' : undefined,
            }}
          />
        ))}
        {data.length > 1 && (
          <>
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
          </>
        )}
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
    </div>
  );
}