import Link from 'next/link';
import type { PaginationTypes } from './Pagination.types';

const Pagination = ({ currentPage, totalPages }: PaginationTypes) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Decide when to start showing ellipses
    let startPage = Math.max(2, currentPage - 1); // Always show at least one page before current if possible
    let endPage = Math.min(totalPages - 1, currentPage + 2); // Show at least two pages after current if possible

    // Handle when currentPage is 3 or less
    if (currentPage < 4) {
      endPage = Math.min(5, totalPages - 1); // Show the first five pages
      startPage = 2;
    }

    // Handle when currentPage is close to totalPages
    if (currentPage > totalPages - 4) {
      startPage = Math.max(totalPages - 4, 2); // Show the last five pages
      endPage = totalPages - 1;
    }

    // Always add the first page
    pageNumbers.push(
      <Link href={`/page/1`} key="1">1</Link>
    );

    // Conditionally add ellipsis after the first page
    if (startPage > 2) {
      pageNumbers.push(<span key="ellipsis-start">...</span>);
    }

    // Add page numbers from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Link href={`/page/${i}`} key={i.toString()}>{i}</Link>
      );
    }

    // Conditionally add ellipsis before the last page
    if (endPage < totalPages - 1) {
      pageNumbers.push(<span key="ellipsis-end">...</span>);
    }

    // Always add the last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(
        <Link href={`/page/${totalPages}`} key={totalPages.toString()}>{totalPages}</Link>
      );
    }

    return pageNumbers;
  };

  return <div className="pagination">{renderPageNumbers()}</div>;
};

export default Pagination;
