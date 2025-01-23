import Link from 'next/link';
import styles from './Pagination.module.scss';
import type { PaginationTypes } from './Pagination.types';

export const ITEMS_PER_PAGE = 9;

export default function Pagination({
  currentPage,
  totalPages,
  slugBase
}: PaginationTypes) {
  if (totalPages <= 1) return null;

  currentPage = Number(currentPage);

  const slugPrefix = (number?: number) => (number && number > 1) ? `${slugBase}/strona/${number}#strona` : `${slugBase}#strona`;

  const LinkRender = (number: number) => (
    <Link key={number} aria-current={currentPage === number ? 'page' : undefined} href={slugPrefix(number)}>{number}</Link>
  );

  const renderPagination = () => {
    const pagination = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(LinkRender(i));
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pagination.push(LinkRender(i));
        }
        pagination.push(<div key="pageSpread1">...</div>);
        pagination.push(LinkRender(totalPages));
      } else if (currentPage >= 3 && totalPages - currentPage >= 3) {
        pagination.push(LinkRender(1));
        pagination.push(<div key="pageSpread1">...</div>);
        pagination.push(LinkRender(currentPage));
        pagination.push(<div key="pageSpread2">...</div>);
        pagination.push(LinkRender(totalPages));
      } else {
        pagination.push(LinkRender(1));
        pagination.push(<div key="pageSpread1">...</div>);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pagination.push(LinkRender(i));
        }
      }
    }
    return pagination;
  };

  return (
    <nav className={styles['Pagination']}>
      {currentPage > 1 ? (
        <Link
          href={slugPrefix(currentPage - 1)}
          aria-label='Przejdź do poprzedniej strony'
          className={styles.arrow}
        >
          <LeftArrowIcon />
        </Link>
      ) : (
        <div className={styles.arrow}>
          <LeftArrowIcon />
        </div>
      )}
      {renderPagination()}
      {currentPage < totalPages ? (
        <Link
          href={slugPrefix(currentPage + 1)}
          aria-label='Przejdź do następnej strony'
          className={styles.arrow}
        >
          <RightArrowIcon />
        </Link>
      ) : (
        <div className={styles.arrow}>
          <RightArrowIcon />
        </div>
      )}
    </nav>
  );
}

const LeftArrowIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M5.56 12.687h-.15l.107.107 5.47 5.47a.686.686 0 0 1-.223 1.122.69.69 0 0 1-.75-.15l-6.75-6.75a.686.686 0 0 1 0-.973l6.75-6.75a.688.688 0 1 1 .973.973l-5.47 5.47-.107.106h14.84a.688.688 0 0 1 0 1.375z'
      fill='#F489A9'
      stroke='#F489A9'
      strokeWidth={0.125}
    />
  </svg>
);
const RightArrowIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M18.44 12.687h.15l-.107.107-5.47 5.47a.686.686 0 0 0 .223 1.122.69.69 0 0 0 .75-.15l6.75-6.75a.687.687 0 0 0 0-.973l-6.75-6.75a.688.688 0 1 0-.973.973l5.47 5.47.107.106H3.75a.688.688 0 0 0 0 1.375z'
      fill='#F489A9'
      stroke='#F489A9'
      strokeWidth={0.125}
    />
  </svg>
);
