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
            role="tab"
            aria-controls="description-tab"
            id="description-tab-btn"
          >
            Szczegóły
          </button>
          <button
            onClick={() => setTab(1)}
            aria-current={tab === 1}
            role="tab"
            aria-controls="reviews-tab"
            id="reviews-tab-btn"
          >
            Opine ({reviewsCount})
          </button>
        </div>
      )}
      <section
        role="tabpanel"
        id="description-tab"
        aria-labelledby="description-tab-btn"
        className={DescriptionStyles['Description']}
        style={{ display: tab !== 0 ? 'none' : undefined }}
      >
        {children[0]}
      </section>
      {reviewsCount > 0 && (
        <section
          role="tabpanel"
          id="reviews-tab"
          aria-labelledby="reviews-tab-btn"
          className={ReviewsStyles['Reviews']}
          style={{ display: tab !== 1 ? 'none' : undefined }}
        >
          {children[1]}
        </section>
      )}
    </section>
  );
}
