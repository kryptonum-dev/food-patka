import { Fragment } from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';
import BreadcrumbsSchema from '@/global/Schema/BreadcrumbsSchema';
import type { BreadcrumbsTypes } from './Breadcrumbs.types';

export default function Breadcrumbs({ data = [], visible = true }: BreadcrumbsTypes) {
  data = [
    {
      name: 'Strona główna',
      path: '',
    },
    ...data,
  ];

  return (
    <>
      <BreadcrumbsSchema data={data} />
      {visible && data.length >= 2 && (
        <nav className={styles['Breadcrumbs']}>
          {data.map(({ name, path }, i) => {
            const isLastItem = i === data.length - 1;
            return (
              <Fragment key={i}>
                {!isLastItem ? (
                  <Link href={path} className={styles.item}>{name}</Link>
                ) : (
                  <span className={styles.item}>{name}</span>
                )}
                {!isLastItem && <Chevron />}
              </Fragment>
            );
          })}
        </nav >
      )
      }
    </>
  );
}

const Chevron = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    viewBox='0 0 20 20'
    fill='none'
  >
    <path
      d='m7.5 15 5-5-5-5'
      stroke='#B4A7B9'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);