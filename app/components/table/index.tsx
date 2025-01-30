import React, { useState, useRef } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  editable?: boolean;
  resizable?: boolean;
  filterable?: boolean;
  type?: "text" | "number" | "date"; // Add type for columns
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  groupBy?: keyof T;
  rowsPerPage?: number;
  columnWidths?: Record<string, number>;
  selectedRows?: Set<number>; // Add this prop
  setSelectedRows?: (selected: Set<number>) => void; // Add this callback prop
}

const Table = <T,>({
  columns,
  data,
  onRowClick,
  groupBy,
  rowsPerPage = 10,
  columnWidths = {},
  selectedRows = new Set(),
  setSelectedRows,
}: TableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [editedCells, setEditedCells] = useState<Record<string, string>>({});
  const columnResizersRef = useRef<Record<string, HTMLDivElement | null>>({});
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({}); // Store cell refs

  // Handle sorting
  const handleSort = (colKey: keyof T) => {
    if (sortColumn === colKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(colKey);
      setSortOrder("asc");
    }
  };

  // Handle filter change
  const handleFilterChange = (colKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [colKey]: value }));
  };

  // Filter data
  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([colKey, filterValue]) =>
      String(row[colKey as keyof T])
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    )
  );

  // Sort data
  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        return sortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      })
    : filteredData;

  // Group data by column
  const groupedData = groupBy
    ? sortedData.reduce<Record<string, T[]>>((acc, row) => {
        const key = String(row[groupBy]);
        if (!acc[key]) acc[key] = [];
        acc[key].push(row);
        return acc;
      }, {})
    : { All: sortedData };

  // Handle toggling group visibility
  const handleToggleGroup = (group: string) => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev);
      newSet.has(group) ? newSet.delete(group) : newSet.add(group);
      return newSet;
    });
  };

  // Handle selecting rows
  const handleRowSelection = (rowIndex: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowIndex)) {
      newSelected.delete(rowIndex);
    } else {
      newSelected.add(rowIndex);
    }
    if (setSelectedRows) {
      setSelectedRows(newSelected); // Update selected rows outside of Table
    }
  };

  // Select all rows
  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows?.(new Set()); // Deselect all
    } else {
      setSelectedRows?.(new Set(data.map((_, index) => index))); // Select all
    }
  };

  // Check if a row is selected
  const isRowSelected = (rowIndex: number) => selectedRows.has(rowIndex);

  // Get selected row data
  const getSelectedRowData = () => {
    return data.filter((_, index) => selectedRows.has(index));
  };

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Get pagination data
  const getPaginationData = () => {
    return {
      pageIndex: currentPage,
      pageSize: rowsPerPage,
      totalPages,
    };
  };
  const handleCellChange = (rowIndex: number, colKey: keyof T, value: string) => {
    setEditedCells((prev) => ({
      ...prev,
      [`${rowIndex}-${String(colKey)}`]: value,
    }));
  };
  const isTextOverflowing = (key: string) => {
    const cell = cellRefs.current[key];
    return cell && cell.scrollWidth > cell.clientWidth;
  };
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <div className="overflow-y-auto max-h-[500px]">
        <table className="w-full text-sm text-left text-gray-700">
        <thead className="sticky top-0 bg-gray-50 shadow-md">
            <tr>
              <th className="p-4 border-b border-gray-300 text-center" style={{ width: columnWidths["checkbox"] || 150 }}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={selectedRows.size === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map(
                (col) =>
                  !hiddenColumns.has(String(col.key)) && (
                    <th
                      key={String(col.key)}
                      className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
                      style={{ width: columnWidths[String(col.key)] || 150 }}
                      onClick={() => col.sortable && handleSort(col.key)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{col.label}</span>
                        {col.sortable &&
                          (sortColumn === col.key ? (
                            sortOrder === "asc" ? (
                              <FiChevronUp className="text-gray-600" />
                            ) : (
                              <FiChevronDown className="text-gray-600" />
                            )
                          ) : null)}
                      </div>
                      {col.resizable && (
                        <div
                          ref={(el) => {
                            columnResizersRef.current[String(col.key)] = el;
                          }}
                          className="cursor-col-resize w-1 bg-gray-400"
                        />
                      )}
                      {col.filterable && (
                        <input
                          type="text"
                          placeholder="Search"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                          onChange={(e) => handleFilterChange(String(col.key), e.target.value)}
                        />
                      )}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedData).map(([group, rows]) => (
              <React.Fragment key={group}>
                <tr
                  className="bg-gray-100 cursor-pointer"
                  onClick={() => handleToggleGroup(group)}
                >
                  <td
                    colSpan={columns.length + 1}
                    
                    className="p-4 border-b border-gray-300 font-semibold text-gray-700"
                  >
                    {collapsedGroups.has(group) ? (
                      <FiChevronDown className="inline-block" />
                    ) : (
                      <FiChevronUp className="inline-block" />
                    )}{" "}
                    {group}
                  </td>
                </tr>
                {!collapsedGroups.has(group) &&
                  rows
                    .slice(
                      (currentPage - 1) * rowsPerPage,
                      currentPage * rowsPerPage
                    )
                    .map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`hover:bg-gray-50 transition duration-200 ${isRowSelected(rowIndex) ? "bg-indigo-100" : ""}`}
                        onClick={() => onRowClick?.(row)}
                      >
                        <td className="p-4 border-b border-gray-300 text-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            checked={isRowSelected(rowIndex)}
                            onChange={() => handleRowSelection(rowIndex)}
                          />
                        </td>
                        {
                        
                        columns.map(
                          (col) =>{
                            const cellKey = `${rowIndex}-${String(col.key)}`;
                            const cellValue =
                              editedCells[cellKey] ?? (row[col.key] ? String(row[col.key]) : "");
                           return  !hiddenColumns.has(String(col.key)) && (
                              <td
                           
  ref={(el) => {
    cellRefs.current[String(col.key)] = el; // ✅ Fix: No return value
  }}
                                key={String(col.key)}
                                className="p-4 border-b border-gray-300"
                                style={{
                                  width: columnWidths[String(col.key)] || 150,
                                }}
                              >
                                  {isTextOverflowing(String(col.key)) && (
                      <div className="absolute left-0 bottom-full mb-2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        {cellValue}
                      </div>
                    )}
                              {col.editable ? (
                    col.type === "date" ? ( // Date Picker Input
                      <input
                        type="date"
                        value={
                          editedCells[`${rowIndex}-${String(col.key)}`] ??
                          (row[col.key] ? String(row[col.key]) : "")
                        }
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        className="border p-2 rounded-md text-sm w-full"
                      />
                    ) : (
                      <input
                        type={col.type || "text"}
                        value={
                          editedCells[`${rowIndex}-${String(col.key)}`] ??
                          (row[col.key] ? String(row[col.key]) : "")
                        }
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        className="border p-2 rounded-md text-sm w-full"
                      />
                    )
                  ) :  col.render ? (
                                  col.render(row[col.key], row)
                                ) : (
                                  String(row[col.key])
                                )}
                              </td>
                            )
                        }
                        )}
                      </tr>
                    ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"

        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
       className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"

        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
