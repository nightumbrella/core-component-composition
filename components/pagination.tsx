// src/components/Pagination.tsx
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

const DOTS = '...';

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const generatePageNumbers = (currentPage: number, totalPages: number, siblingCount: number) => {
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, rightSiblingIndex);
    return [...leftRange, DOTS, lastPageIndex];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(leftSiblingIndex, totalPages);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const pageNumbers = generatePageNumbers(currentPage, totalPages, siblingCount);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex justify-center items-center space-x-1 mt-4">
      <button
        className={`px-3 py-1 border rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers?.map((page, index) =>
        page === DOTS ? (
          <span key={index} className="px-3 py-1">
            {DOTS}
          </span>
        ) : (
          <button
            key={page}
            className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        )
      )}
      <button
        className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
