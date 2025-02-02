import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { FiChevronUp, FiChevronDown, FiX, FiSettings, FiEdit, FiTrash, FiCopy, FiDownload, FiSliders } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";

export interface Column<T> {
  key: keyof T & string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  editable?: boolean;
  resizable?: boolean;
  filterable?: boolean;
  type?: "text" | "number" | "date";
  reorderable?: boolean;
  frozen?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  onDuplicateRow?: (row: T) => void;
  groupBy?: keyof T;
  rowsPerPageOptions?: number[];
  columnWidths?: Record<string, number>;
  selectedRows?: Set<number>;
  setSelectedRows?: (selected: Set<number>) => void;
  onEdit?: (rowIndex: number, before: T, after: T) => void;
  loading?: boolean;
}

const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
  const {
    columns,
    data,
    onRowClick,
    onDeleteRow,
    onDuplicateRow,
    groupBy,
    rowsPerPageOptions = [10, 25, 50],
    columnWidths: propColumnWidths = {},
    selectedRows = new Set(),
    setSelectedRows,
    onEdit,
    loading = false,
  } = props;
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [editedCells, setEditedCells] = useState<Record<string, string>>({});
  const [columnsOrder, setColumnsOrder] = useState<string[]>(columns.map(c => c.key));
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{colKey: string; x: number; y: number} | null>(null);

  const columnResizersRef = useRef<Record<string, HTMLDivElement | null>>({});
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tableRef = useRef<HTMLTableElement>(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    if (Object.keys(propColumnWidths).length > 0) return propColumnWidths;
    const savedWidths = localStorage.getItem("columnWidths");
    return savedWidths ? JSON.parse(savedWidths) : {};
  });

  useEffect(() => {
    localStorage.setItem("columnWidths", JSON.stringify(columnWidths));
  }, [columnWidths]);

  useEffect(() => {
    setColumnsOrder(columns.map(c => c.key));
  }, [columns]);

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, colKey: string) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[colKey] || 150;
    const table = tableRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!table) return;
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX);
      
      setColumnWidths(prev => ({
        ...prev,
        [colKey]: newWidth
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  
  const handleDragStart = (e: React.DragEvent, colKey: string) => {
    e.dataTransfer.setData("text/plain", colKey);
    setDraggedColumn(colKey);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragOver = useCallback((e: React.DragEvent, targetColKey: string) => {
    e.preventDefault();
    if (!draggedColumn || draggedColumn === targetColKey) return;

    const newOrder = [...columnsOrder];
    const sourceIndex = newOrder.indexOf(draggedColumn);
    const targetIndex = newOrder.indexOf(targetColKey);

    newOrder.splice(sourceIndex, 1);
    newOrder.splice(targetIndex, 0, draggedColumn);

    setColumnsOrder(newOrder);
  }, [columnsOrder, draggedColumn]);

  const handleDragEnd = () => {
    setDraggedColumn(null);
    document.querySelectorAll(".dragging").forEach(el => el.classList.remove("dragging"));
  };

  const handleContextMenu = (e: React.MouseEvent, colKey: string) => {
    e.preventDefault();
    setContextMenu({
      colKey,
      x: e.clientX,
      y: e.clientY
    });
  };
  const isTextOverflowing = (key: string) => {
    const cell = cellRefs.current[key];
    return cell && cell.scrollWidth > cell.clientWidth;
  };
  // Enhanced filtering with type-specific filters
  const filteredData = useMemo(() => data.filter(row =>
    Object.entries(filters).every(([colKey, filterValue]) => {
      const column = columns.find(c => c.key === colKey);
      const value = row[colKey];
      
      if (column?.type === "number") {
        return Number(value) >= Number(filterValue);
      }
      
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    }) &&
    (globalSearch === "" || 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(globalSearch.toLowerCase())
      )
    )
  ), [data, filters, columns, globalSearch]);
// Export to CSV
const exportToCSV = () => {
  const csvContent = [
    // Join the column labels
    columns.map(c => c.label).join(","),
    
    // Map through the rows and join values
    ...sortedData.map(row => 
      columns.map(c => 
        // Use the correct template literal to replace quotes in cell data
        `"${String(row[c.key]).replace(/"/g, '""')}"`
      ).join(",")
    )
  ].join("\n");

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  
  // Create an anchor element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  a.click();
  
  // Clean up
  window.URL.revokeObjectURL(url);
};

  const sortedData = useMemo(() => sortColumn
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        return sortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      })
    : filteredData, [filteredData, sortColumn, sortOrder]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, rowsPerPage]);

  const groupedData = useMemo(() => groupBy 
    ? paginatedData.reduce<Record<string, T[]>>((acc, row) => {
        const key = String(row[groupBy]);
        acc[key] = acc[key] || [];
        acc[key].push(row);
        return acc;
      }, {})
    : { All: paginatedData }, [paginatedData, groupBy]);

    useEffect(() => {
      const savedSettings = localStorage.getItem("tableSettings");
      if (savedSettings) {
        const { hidden, order } = JSON.parse(savedSettings);
        setHiddenColumns(new Set(hidden));
        setColumnsOrder(order);
      }
    }, []);
  
    const saveSettings = () => {
      localStorage.setItem("tableSettings", JSON.stringify({
        hidden: Array.from(hiddenColumns),
        order: columnsOrder
      }));
    };
    const contextMenuOptions = [
      { label: "Hide Column", icon: <FiX />, action: () => setHiddenColumns(prev => new Set([...prev, contextMenu!.colKey])) },
      { label: "Freeze Column", icon: <FiSliders />, action: () => {/* Implement freezing logic */} },
      { label: "Reset Width", icon: <FiSettings />, action: () => setColumnWidths(prev => ({ ...prev, [contextMenu!.colKey]: 150 })) },
      { label: "Copy Key", icon: <FiCopy />, action: () => navigator.clipboard.writeText(contextMenu!.colKey) },
    ];
  
    // Loading skeleton
    const renderLoadingRows = () => (
      Array.from({ length: rowsPerPage }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="p-3 border-b border-gray-200 text-center">
            <div className="h-4 bg-gray-200 rounded mx-auto w-4" />
          </td>
          {columnsOrder.map(colKey => (
            <td key={colKey} className="p-3 border-b border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </td>
          ))}
        </tr>
      ))
    );
    
  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200 h-full relative">
      {/* Table Controls */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Global Search..."
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
          
          <Menu as="div" className="relative">
            <Menu.Button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
              <FiSettings className="mr-2" /> Columns
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-50">
                {columns.map(col => (
                  <Menu.Item key={col.key}>
                    {({ active }) => (
                      <label className={`flex items-center px-3 py-2 rounded cursor-pointer ${active ? 'bg-gray-100' : ''}`}>
                        <input
                          type="checkbox"
                          checked={!hiddenColumns.has(col.key)}
                          onChange={() => setHiddenColumns(prev => {
                            const newSet = new Set(prev);
                            newSet.has(col.key) ? newSet.delete(col.key) : newSet.add(col.key);
                            saveSettings();
                            return newSet;
                          })}
                          className="form-checkbox h-4 w-4 text-indigo-600 mr-2"
                        />
                        <span>{col.label}</span>
                      </label>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <FiDownload className="mr-2" /> Export
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="px-2 py-1 border rounded-md"
          >
            {rowsPerPageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <table ref={tableRef} className="w-full text-sm text-left text-gray-700">
        {/* Table Header */}
        <thead className="sticky top-0 bg-indigo-50 shadow-sm">
          <tr>
            <th className="p-3 border-b border-gray-200 text-center sticky left-0 bg-indigo-50 z-20" style={{ width: 60 }}>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                checked={selectedRows.size === data.length}
                onChange={() => setSelectedRows?.(selectedRows.size === data.length ? new Set() : new Set(data.map((_, i) => i)))}
              />
            </th>
            {columnsOrder.map(colKey => {
              const col = columns.find(c => c.key === colKey);
              if (!col || hiddenColumns.has(colKey)) return null;

              return (
                <th
                  key={col.key}
                  className={`p-3 border-b border-gray-200 group ${col.frozen ? 'sticky left-12 z-10 bg-indigo-50' : ''}`}
                  style={{ width: columnWidths[col.key] || 150 }}

                  onContextMenu={(e) => handleContextMenu(e, col.key)}
                  onDragOver={(e) => col.reorderable && handleDragOver(e, col.key)}
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center flex-1"
                      draggable={col.reorderable}
                      onDragStart={(e) => col.reorderable && handleDragStart(e, col.key)}
                      onDragEnd={handleDragEnd}
                    >
                      {col.reorderable && (
                        <span className="mr-2 cursor-move opacity-0 group-hover:opacity-100">⠿</span>
                      )}
                      <span>{col.label}</span>
                    </div>

                    {col.sortable && (
                      <button 
                        onClick={() => {
                          if (sortColumn === col.key) {
                            setSortOrder(prev => prev === "asc" ? "desc" : "asc");
                          } else {
                            setSortColumn(col.key);
                            setSortOrder("asc");
                          }
                        }}
                        className="ml-2"
                      >
                        {sortColumn === col.key ? (
                          sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />
                        ) : <FiChevronUp className="opacity-30" />}
                      </button>
                    )}
                  </div>

                  {col.resizable && (
                    <div
                      onMouseDown={(e) => handleResizeStart(e, col.key)}
                      className="cursor-col-resize w-1 h-full bg-gray-400 absolute right-0 top-0 bottom-0 hover:bg-blue-500 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}

                  {col.filterable && (
                    <input
                      type={col.type === "number" ? "number" : "search"}
                      placeholder="Filter"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
                      onChange={(e) => setFilters(prev => ({ ...prev, [col.key]: e.target.value }))}
                    />
                  )}
             </th>
              );
            })}
            <th className="p-3 border-b border-gray-200 sticky right-0 bg-indigo-50">Actions</th>
          </tr>
        </thead>


        <tbody>
          {loading ? renderLoadingRows() : Object.entries(groupedData).map(([group, rows]) => (
            <React.Fragment key={group}>
              {/* Group header */}
              <tr 
                className="bg-indigo-50 cursor-pointer hover:bg-indigo-100"
                onClick={() => setCollapsedGroups(prev => {
                  const newSet = new Set(prev);
                  newSet.has(group) ? newSet.delete(group) : newSet.add(group);
                  return newSet;
                })}
              >
                <td colSpan={columnsOrder.length + 2} className="p-3 border-b border-gray-200 font-medium">
                  <FiChevronDown className={`inline-block transform ${collapsedGroups.has(group) ? 'rotate-180' : ''}`} />
                  <span className="ml-2 text-indigo-700">{group}</span>
                </td>
              </tr>
              
              {/* Table rows */}
              {!collapsedGroups.has(group) && rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`hover:bg-gray-50 ${selectedRows.has(rowIndex) ? 'bg-indigo-50' : ''}`}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Checkbox cell */}
                  <td className="p-3 border-b border-gray-200 text-center sticky left-0 bg-white z-10">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => setSelectedRows?.(prev => {
                        const newSet = new Set(prev);
                        newSet.has(rowIndex) ? newSet.delete(rowIndex) : newSet.add(rowIndex);
                        return newSet;
                      })}
                    />
                  </td>

                  {columnsOrder.map(colKey => {
                    const col = columns.find(c => c.key === colKey);
                    if (!col || hiddenColumns.has(colKey)) return null;
                    const cellKey = `${rowIndex}-${colKey}`;
                    const value = editedCells[cellKey] ?? row[col.key];

                    return (
                      <td
                        key={colKey}
                        className="p-3 border-b border-gray-300 relative group"
                        ref={el => cellRefs.current[colKey] = el}
                      >
                        {col.editable ? (
                          <input
                            type={col.type || "text"}
                            value={String(value)}
                            onChange={(e) => {
                              setEditedCells(prev => ({
                                ...prev,
                                [cellKey]: e.target.value
                              }));
                              onEdit?.(rowIndex, row, { ...row, [colKey]: e.target.value });
                            }}
                            className="border rounded px-2 py-1 text-xs w-full"
                          />
                        ) : col.render ? (
                          col.render(value, row)
                        ) : (
                          <div className="truncate">
                            {String(value)}
                            {isTextOverflowing(colKey) && (
                              <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {String(value)}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
             <td className="p-3 border-b border-gray-200 sticky right-0 bg-white">
                    <Menu as="div" className="relative">
                      <Menu.Button className="text-gray-500 hover:text-indigo-600">
                        <FiSliders className="transform rotate-90" />
                      </Menu.Button>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-50">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`flex items-center w-full px-3 py-2 rounded ${active ? 'bg-indigo-50 text-indigo-700' : ''}`}
                                onClick={() => onDuplicateRow?.(row)}
                              >
                                <FiCopy className="mr-2" /> Duplicate
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`flex items-center w-full px-3 py-2 rounded ${active ? 'bg-indigo-50 text-indigo-700' : ''}`}
                                onClick={() => onDeleteRow?.(row)}
                              >
                                <FiTrash className="mr-2" /> Delete
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>

      </table>

       {/* Empty State */}
       {!loading && filteredData.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <div className="text-2xl mb-2">📭</div>
          No data found
        </div>
      )}

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t p-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          {selectedRows.size > 0 && (
            <div className="flex items-center space-x-2">
              <span>{selectedRows.size} selected</span>
              <button
                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
                onClick={() => {/* Implement bulk delete */}}
              >
                <FiTrash className="inline-block mr-1" /> Delete Selected
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border rounded-lg hover:bg-gray-50"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}</span>
            <button
              className="px-3 py-1 border rounded-lg hover:bg-gray-50"
              onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(filteredData.length / rowsPerPage)))}
              disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;