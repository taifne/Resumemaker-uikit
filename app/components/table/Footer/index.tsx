import React from "react";
import {
  FiTrash,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface TableFooterProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filteredDataLength: number;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  selectedRows: Set<any>;
  setSelectedRows: (selected: Set<any>) => void;
  mode?: "light" | "dark";
}

const TableFooter: React.FC<TableFooterProps> = ({
  currentPage,
  setCurrentPage,
  filteredDataLength,
  rowsPerPage,
  setRowsPerPage,
  selectedRows,
  setSelectedRows,
  mode = "light",
}) => {
  const totalPages = Math.ceil(filteredDataLength / rowsPerPage);
  const hasSelections = selectedRows.size > 0;
  const isDark = mode === "dark";

  const getPageNumbers = () => {
    const maxVisible = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(currentPage - 2, 1);
      let end = Math.min(currentPage + 2, totalPages);

      if (start > 1) pages.push(1, "...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages) pages.push("...", totalPages);
    }

    return pages;
  };

  const paginationBtnClass = (disabled: boolean) =>
    `px-2 py-1.5 rounded-md text-sm flex items-center ${
      disabled
        ? "text-gray-400 cursor-not-allowed"
        : isDark
        ? "hover:bg-gray-700 text-gray-300"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <div
      className={`relative py-4 px-6 flex items-center justify-center border-t transition-all duration-300 ${
        hasSelections ? "shadow-xl" : "shadow-md"
      } ${isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"}`}
    >
      {/* Left: Selection Info */}
      <div
        className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-4 transition-opacity duration-200 ${
          hasSelections ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="text-sm font-medium">
          {selectedRows.size} item{selectedRows.size > 1 ? "s" : ""} selected
        </span>
        <button
          onClick={() => setSelectedRows(new Set())}
          className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium space-x-2 transition-colors ${
            isDark
              ? "bg-red-900 text-red-300 hover:bg-red-800"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          <FiTrash className="w-4 h-4" />
          <span>Clear</span>
        </button>
      </div>

      {/* Center: Pagination */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={paginationBtnClass(currentPage === 1)}
        >
          <FiChevronsLeft />
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={paginationBtnClass(currentPage === 1)}
        >
          <FiChevronLeft />
        </button>

        {getPageNumbers().map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={idx}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                currentPage === page
                  ? isDark
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-700"
                  : isDark
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="px-2 text-sm text-gray-400">
              ...
            </span>
          )
        )}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={paginationBtnClass(currentPage === totalPages)}
        >
          <FiChevronRight />
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className={paginationBtnClass(currentPage === totalPages)}
        >
          <FiChevronsRight />
        </button>
      </div>

      {/* Right: Page Size Selector */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          className={`text-sm rounded-md px-2 py-1 border ${
            isDark
              ? "bg-gray-700 text-gray-200 border-gray-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableFooter;
