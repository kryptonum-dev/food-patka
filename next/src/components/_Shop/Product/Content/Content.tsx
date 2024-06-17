'use client';
import { useState } from 'react';
import styles from './Content.module.scss';
import DescriptionStyles from '../Description/Description.module.scss';
import ReviewsStyles from '../Reviews/Reviews.module.scss';
import type { ContentTypes } from './Content.types';

export default function Content({ children, reviewsCount }: ContentTypes) {
  const [tab, setTab] = useState(0);

  return (
    <section className={styles['Content']}>
      {reviewsCount > 0 && (
        <div className={styles.tabs}>
          <button
            onClick={() => setTab(0)}
            aria-current={tab === 0}
            aria-controls="description-tab"
            role="tab"
          >
            Szczegóły
          </button>
          <button
            onClick={() => setTab(1)}
            aria-current={tab === 1}
            aria-controls="reviews-tab"
            role="tab"
          >
            Opine ({reviewsCount})
          </button>
        </div>
      )}
      <section
        id="description-tab"
        role="tabpanel"
        aria-labelledby="description-tab"
        className={DescriptionStyles['Description']}
        style={{ display: tab !== 0 ? 'none' : undefined }}
      >
        {children[0]}
      </section>
      {reviewsCount > 0 && (
        <section
          id="reviews-tab"
          role="tabpanel"
          aria-labelledby="reviews-tab"
          className={ReviewsStyles['Reviews']}
          style={{ display: tab !== 1 ? 'none' : undefined }}
        >
          {children[1]}
        </section>
      )}
    </section>
  );
}
