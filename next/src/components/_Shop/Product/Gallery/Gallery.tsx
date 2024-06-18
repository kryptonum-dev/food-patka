'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Img from '@/components/ui/image';
import styles from './Gallery.module.scss';
import { usePagination, useNavigation } from '@/components/global/Carousel';
import '@/components/global/Carousel/embla.scss';
import type { GalleryTypes } from './Gallery.types';

export default function Gallery({
  data,
  ArrowLeftIcon,
  ArrowRightIcon,
  className,
  numberOfRecentPurchases,
}: GalleryTypes) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', skipSnaps: true, loop: true });
  const { selectedIndex, onDotButtonClick } = usePagination(emblaApi);
  const { onPrevButtonClick, onNextButtonClick } = useNavigation(emblaApi);

  return (
    <div className={`${styles['Gallery']} ${className}`}>
      <div className={`embla ${styles.preview}`} ref={emblaRef}>
        <div className="embla__container">
          {data.map((img, i) => (
            <Img
              className='embla__slide'
              data={img}
              sizes='(max-width: 539px) 100vw, 485px'
              key={i}
              priority={i === 0}
            />
          ))}
        </div>
        {data.length > 1 && (
          <>
            <button
              aria-label='Poprzednie zdjęcie'
              onClick={onPrevButtonClick}
              className={`${styles.navigation} ${styles.prev}`}
            >
              {ArrowLeftIcon}
            </button>
            <button
              aria-label='Następne zdjęcie'
              onClick={onNextButtonClick}
              className={`${styles.navigation} ${styles.next}`}
            >
              {ArrowRightIcon}
            </button>
          </>
        )}
        <p className={styles.RecentPurchases}>{numberOfRecentPurchases} osób kupiło ten produkt w ciągu ostatnich 24 godzin</p>
      </div>
      {data.length > 1 && (
        <div className={styles.thumbnails}>
          {data.map((img, i) => (
            <button
              key={i}
              onClick={() => onDotButtonClick(i)}
              aria-current={i === selectedIndex ? 'true' : undefined}
              aria-label={`Zobacz ${i + 1} zdjęcie`}
            >
              <Img data={img} sizes='80px' key={i} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}