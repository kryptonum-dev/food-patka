'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { usePagination, useNavigation } from '@/components/global/Carousel';
import '@/components/global/Carousel/embla.scss';
import styles from './Reviews.module.scss';
import ReviewScore from '@/components/ui/ReviewScore';
import type { SliderTypes } from './Reviews.types';

export default function Slider({ list, QuoteIcon, LeftArrowIcon, RightArrowIcon, PaginationIcon }: SliderTypes) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', skipSnaps: true, loop: true });
  const { scrollSnaps, selectedIndex, onDotButtonClick } = usePagination(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useNavigation(emblaApi);

  return (
    <>
      <div className={`embla ${styles['Slider']}`} ref={emblaRef}>
        <div className="embla__container">
          {list.map(({ name, rating, productName, productSlug, content }, i) => (
            <div className={`embla__slide ${styles.slide}`} key={i}>
              {QuoteIcon}
              <header>
                <h3>{name}</h3>
                <ReviewScore rating={rating} />
              </header>
              <p className={styles.purchased}><span>Kupił/a:</span> <Link href={`/sklep/${productSlug}`}>{productName}</Link></p>
              {content}
            </div>
          ))}
        </div>
      </div>
      <div className={styles['Pagination']}>
        <>
          <button
            type='button'
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            aria-label='Przejdź do poprzedniego elementu'
          >
            {LeftArrowIcon}
          </button>
          <div className={styles.dots}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type='button'
                onClick={() => onDotButtonClick(index)}
                aria-current={index === selectedIndex}
                aria-label={`Przejdź do ${index + 1} elementu`}
              >
                {PaginationIcon}
              </button>
            ))}
          </div>
          <button
            type='button'
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            aria-label='Przejdź do następnego elementu'
          >
            {RightArrowIcon}
          </button>
        </>
      </div>
    </>
  );
}