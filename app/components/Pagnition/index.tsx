import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Generate page numbers with ellipsis handling
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5; // Maximum number of page buttons to show
    const ellipsis = '...';

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Handle the beginning part
      if (currentPage < 4) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(ellipsis);
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push(ellipsis);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(ellipsis);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(ellipsis);
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-sm font-semibold ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200'}`}
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex space-x-2">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={index} className="text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageClick(Number(page))}
              className={`px-3 py-2 rounded-md text-sm font-semibold ${Number(page) === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-blue-100 transition-colors duration-200'}`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md text-sm font-semibold ${currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
