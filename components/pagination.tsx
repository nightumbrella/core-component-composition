import { FC } from "react";

type PaginationProp = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount: number;
};

const Pagination: FC<PaginationProp> = ({
  currentPage,
  onPageChange,
  siblingCount,
  totalPages,
}) => {
  const DOTS = "...";

  const generatePageNumbers = () => {
    const totalPageNumber = siblingCount + 5;

    if (totalPageNumber >= totalPages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
  };

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;
  if (!showLeftEllipsis && showRightEllipsis) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = Array.from(
      { length: leftItemCount },
      (_, index) => index + 1
    );

    return [...leftRange, DOTS, totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = Array.from(
      { length: rightItemCount },
      (_, index) => totalPages - rightItemCount + 1 + index
    );

    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    let middleRange = Array.from(
      { length: siblingCount * 2 + 1 },
      (_, index) => leftSiblingIndex + index
    );
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  const pageNumbers = generatePageNumbers();

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
    <nav className="flex justify-center items-center space-x-2">
      <button
        className="px-4 py-2 border rounded hover:bg-gray-200"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers?.map((page:any, index) =>
        page === DOTS ? (
          <span key={index} className="px-4 py-2">
            {DOTS}
          </span>
        ) : (
          <button
            key={page}
            className={`px-4 py-2 border rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
            }`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="px-4 py-2 border rounded hover:bg-gray-200"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
};
