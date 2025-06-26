import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  FiChevronUp,
  FiChevronDown,
  FiX,
  FiSettings,
  FiEdit,
  FiTrash,
  FiCopy,
  FiDownload,
  FiSliders,
  FiSearch,
  FiMoreVertical,
} from "react-icons/fi";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import { EmptyState } from "./EmptyState";
import TableFooter from "./Footer";
import GroupHeader from "./Groupheader";
import { PiCaretUpDownFill } from "react-icons/pi";
import GroupedRows from "./GroupedRows";

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
  selectedRows?: Set<T>;
 setSelectedRows?: React.Dispatch<React.SetStateAction<Set<T>>>;
  onEdit?: (rowIndex: number, before: T, after: T) => void;
  loading?: boolean;
  isDark?: boolean;
  focusedRowData?:any;
  setFocusedRowData?:(row: T) => void;
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
    isDark = false,
    setFocusedRowData,
  focusedRowData


  } = props;
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set()
  );
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [editedCells, setEditedCells] = useState<Record<string, string>>({});
  const [columnsOrder, setColumnsOrder] = useState<string[]>(
    columns.map((c) => c.key)
  );
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    colKey: string;
    x: number;
    y: number;
  } | null>(null);

  const columnResizersRef = useRef<Record<string, HTMLDivElement | null>>({});
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tableRef = useRef<HTMLTableElement>(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    () => {
      if (Object.keys(propColumnWidths).length > 0) return propColumnWidths;
      const savedWidths = localStorage.getItem("columnWidths");
      return savedWidths ? JSON.parse(savedWidths) : {};
    }
  );

  useEffect(()=>{
    console.log(editedCells)
  },[editedCells])
  useEffect(() => {
    localStorage.setItem("columnWidths", JSON.stringify(columnWidths));
  }, [columnWidths]);

  useEffect(() => {
    setColumnsOrder(columns.map((c) => c.key));
  }, [columns]);

  const handleResizeStart = (
    e: React.MouseEvent<HTMLDivElement>,
    colKey: string
  ) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[colKey] || 150;
    const table = tableRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!table) return;
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX);

      setColumnWidths((prev) => ({
        ...prev,
        [colKey]: newWidth,
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

  const handleDragOver = useCallback(
    (e: React.DragEvent, targetColKey: string) => {
      e.preventDefault();
      if (!draggedColumn || draggedColumn === targetColKey) return;

      const newOrder = [...columnsOrder];
      const sourceIndex = newOrder.indexOf(draggedColumn);
      const targetIndex = newOrder.indexOf(targetColKey);

      newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, draggedColumn);

      setColumnsOrder(newOrder);
    },
    [columnsOrder, draggedColumn]
  );

  const handleDragEnd = () => {
    setDraggedColumn(null);
    document
      .querySelectorAll(".dragging")
      .forEach((el) => el.classList.remove("dragging"));
  };

  const handleContextMenu = (e: React.MouseEvent, colKey: string) => {
    e.preventDefault();
    setContextMenu({
      colKey,
      x: e.clientX,
      y: e.clientY,
    });
  };
  const isTextOverflowing = (key: string) => {
    const cell = cellRefs.current[key];
    return cell && cell.scrollWidth > cell.clientWidth;
  };
const editedData = useMemo(() => {
  return data.map((row, rowIndex) => {
    const updatedRow = { ...row } as T;

    for (const [key, value] of Object.entries(editedCells)) {
      const [indexStr, colKey] = key.split("-");
      if (parseInt(indexStr) === rowIndex) {
        (updatedRow as any)[colKey] = value;
      }
    }

    return updatedRow;
  });
}, [data, editedCells]);


  // Enhanced filtering with type-specific filters
const filteredData = useMemo(() =>
  editedData.filter((row) =>
    Object.entries(filters).every(([colKey, filterValue]) => {
      const column = columns.find((c) => c.key === colKey);
      const value = row[colKey];

      if (column?.type === "number") {
        return Number(value) >= Number(filterValue);
      }

      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    }) &&
    (globalSearch === "" ||
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(globalSearch.toLowerCase())
      ))
  ), [editedData, filters, columns, globalSearch]);

const exportToCSV = () => {
  const filename = "data.csv"
  if (!columns || !sortedData) {
    console.warn("No data or columns to export.");
    return;
  }

  const escapeCSV = (value: any): string => {
    const str = String(value ?? "");
    return `"${str.replace(/"/g, '""')}"`;
  };

  const headerRow = columns.map(col => escapeCSV(col.label)).join(",");
  const dataRows = sortedData.map(row =>
    columns.map(col => escapeCSV(row[col.key])).join(",")
  );
  const csvContent = [headerRow, ...dataRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


const sortedData = useMemo(() =>
  sortColumn
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        return sortOrder === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      })
    : filteredData,
  [filteredData, sortColumn, sortOrder]);


const paginatedData = useMemo(() => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return sortedData.slice(startIndex, endIndex);
}, [sortedData, currentPage, rowsPerPage]);

const groupedData = useMemo(() =>
  groupBy
    ? paginatedData.reduce<Record<string, T[]>>((acc, row) => {
        const key = String(row[groupBy]);
        acc[key] = acc[key] || [];
        acc[key].push(row);
        return acc;
      }, {})
    : { All: paginatedData },
  [paginatedData, groupBy]);

  useEffect(() => {
    const savedSettings = localStorage.getItem("tableSettings");
    if (savedSettings) {
      const { hidden, order } = JSON.parse(savedSettings);
      setHiddenColumns(new Set(hidden));
      setColumnsOrder(order);
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem(
      "tableSettings",
      JSON.stringify({
        hidden: Array.from(hiddenColumns),
        order: columnsOrder,
      })
    );
  };

  const renderLoadingRows = () =>
    Array.from({ length: rowsPerPage }).map((_, i) => (
      <tr key={i} className="animate-pulse">
        <td className="p-3 border-b border-gray-200 text-center">
          <div className="h-4 bg-gray-200 rounded mx-auto w-4" />
        </td>
        {columnsOrder.map((colKey) => (
          <td key={colKey} className="p-3 border-b border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </td>
        ))}
      </tr>
    ));

  return (
    <div
      className={clsx(
        "overflow-x-auto shadow-xl rounded-xl border h-full relative",
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}
    >
      {/* Table Controls */}
      <div
        className={clsx(
          "p-4 border-b flex items-center justify-between",
          isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Enhanced Search Input */}
          <div className="relative flex-1 max-w-md">
            <FiSearch
              className={clsx(
                "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                isDark ? "text-gray-500" : "text-gray-400"
              )}
            />
            <input
              type="search"
              placeholder="Search across all columns..."
              className={clsx(
                "w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl transition-all shadow-sm",
                isDark
                  ? "bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-500 focus:ring-indigo-500/60 focus:border-indigo-500"
                  : "bg-white text-gray-900 border-gray-200 placeholder-gray-400 focus:ring-indigo-500/60 focus:border-indigo-500 hover:border-gray-300"
              )}
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>

          {/* Column Settings Dropdown */}
          <Menu as="div" className="relative">
            <MenuButton
              className={clsx(
                "flex items-center space-x-2 px-4 py-2.5 text-sm font-medium border rounded-xl transition-colors duration-200",
                isDark
                  ? "bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                  : "bg-white text-indigo-600 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50/50"
              )}
            >
              <FiSettings className="w-4 h-4" />
              <span>Columns</span>
              <FiChevronDown className="w-4 h-4 transition-transform ui-open:rotate-180" />
            </MenuButton>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <MenuItems
                className={clsx(
                  "absolute right-0 mt-2 w-56 border rounded-lg shadow-lg ring-1 focus:outline-none z-50",
                  isDark
                    ? "bg-gray-700 border-gray-600 ring-black/10"
                    : "bg-white border-gray-100 ring-black/5"
                )}
              >
                <div className="p-2 space-y-1">
                  {columns.map((col) => (
                    <Menu.Item key={col.key}>
                      {({ active }) => (
                        <label
                          className={clsx(
                            "flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors",
                            active &&
                              (isDark ? "bg-gray-600" : "bg-indigo-50/50")
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={!hiddenColumns.has(col.key)}
                            onChange={() => {
                              const newSet = new Set(hiddenColumns);
                              newSet.has(col.key)
                                ? newSet.delete(col.key)
                                : newSet.add(col.key);
                              saveSettings();
                              setHiddenColumns(newSet);
                            }}
                            className={clsx(
                              "form-checkbox h-4 w-4 rounded border transition-colors",
                              isDark
                                ? "text-indigo-400 border-gray-500 focus:ring-indigo-500/60"
                                : "text-indigo-600 border-gray-300 focus:ring-indigo-500/60"
                            )}
                          />
                          <span
                            className={clsx(
                              "ml-2.5 text-sm",
                              isDark ? "text-gray-300" : "text-gray-700"
                            )}
                          >
                            {col.label}
                          </span>
                        </label>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className={clsx(
              "flex items-center space-x-2 px-4 py-2.5 text-sm font-medium border rounded-xl transition-colors duration-200",
              isDark
                ? "bg-gray-700 text-emerald-400 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                : "bg-white text-emerald-600 border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50/50"
            )}
          >
            <FiDownload className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <label
            htmlFor="rowsPerPage"
            className={clsx(
              "text-sm font-medium",
              isDark ? "text-gray-300" : "text-gray-700"
            )}
          >
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className={clsx(
              "px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition ease-in-out duration-150",
              isDark
                ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                : "bg-white text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            )}
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table ref={tableRef} className="w-full text-sm text-left text-gray-700">
        {/* Table Header */}
        <thead
          className={clsx(
            "sticky top-0 shadow-sm",
            isDark
              ? "bg-gray-800 border-gray-600"
              : "bg-indigo-50 border-gray-200"
          )}
        >
          <tr>
            {/* Checkbox header */}

            <th
              className={clsx(
                "sticky left-0 z-20 border-b",
                isDark
                  ? "bg-gray-800 border-gray-600"
                  : "bg-indigo-50 border-gray-200"
              )}
              style={{ width: columnWidths["checkbox"] || 60 }}
            >
              <div className="flex items-center justify-center p-3">
                <input
                  type="checkbox"
                  className={clsx(
                    "w-5 h-5 rounded form-checkbox",
                    isDark ? "text-gray-400" : "text-indigo-600"
                  )}
                  checked={selectedRows.size === data.length}
                  onChange={() =>
                    setSelectedRows?.(
                      selectedRows.size === data.length
                        ? new Set()
                        : new Set(data.map((e) => e))
                    )
                  }
                />
              </div>
            </th>

            {columnsOrder.map((colKey) => {
              const col = columns.find((c) => c.key === colKey);
              if (!col || hiddenColumns.has(colKey)) return null;

              return (
                <th
                  key={col.key}
                  className={clsx(
                    "group relative p-0 border-b",
                    isDark ? "border-gray-600" : "border-gray-200",
                    col.frozen &&
                      clsx(
                        isDark ? "bg-gray-800" : "bg-indigo-50",
                        "sticky left-12 z-10"
                      )
                  )}
                  style={{ width: columnWidths[col.key] || 150 }}
                  onContextMenu={(e) => handleContextMenu(e, col.key)}
                  onDragOver={(e) =>
                    col.reorderable && handleDragOver(e, col.key)
                  }
                >
                  {/* Header Content Container */}
                  <div
                    className={clsx(
                      "flex flex-col h-full p-2 transition-colors",
                      isDark ? "hover:bg-gray-700" : "hover:bg-indigo-100/50"
                    )}
                  >
                    {/* Column Label and Controls */}
                    <div className="flex items-center justify-between mb-1">
                      <div
                        className="flex items-center flex-1 gap-1"
                        draggable={col.reorderable}
                        onDragStart={(e) =>
                          col.reorderable && handleDragStart(e, col.key)
                        }
                        onDragEnd={handleDragEnd}
                      >
                        {col.reorderable && (
                          <span
                            className={clsx(
                              "cursor-move opacity-0 group-hover:opacity-100",
                              isDark ? "text-gray-500" : "text-gray-400"
                            )}
                          >
                            ⠿
                          </span>
                        )}
                        <span
                          className={clsx(
                            "font-medium",
                            isDark ? "text-gray-200" : "text-gray-700"
                          )}
                        >
                          {col.label}
                        </span>
                      </div>

                      {col.sortable && (
                        <button
                          onClick={() => {
                            if (sortColumn === col.key) {
                              setSortOrder((prev) =>
                                prev === "asc" ? "desc" : "asc"
                              );
                            } else {
                              setSortColumn(col.key);
                              setSortOrder("asc");
                            }
                          }}
                          className={clsx(
                            "p-1 rounded",
                            isDark
                              ? "hover:bg-gray-700 text-gray-400"
                              : "hover:bg-indigo-100 text-indigo-600"
                          )}
                          aria-label={`Sort by ${col.label}`}
                        >
                          {sortColumn === col.key ? (
                            sortOrder === "asc" ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )
                          ) : (
                            <PiCaretUpDownFill className="w-4 h-4 opacity-30" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Filter Input */}
                    {col.filterable && (
                      <div className="px-1 pb-1">
                        <input
                          type={col.type === "number" ? "number" : "search"}
                          placeholder="Filter..."
                          className={clsx(
                            "w-full px-2 py-1 text-xs border-none rounded-md",
                            isDark
                              ? "bg-gray-700 text-gray-300 placeholder-gray-400"
                              : "bg-white text-gray-900 placeholder-gray-500"
                          )}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              [col.key]: e.target.value,
                            }))
                          }
                          aria-label={`Filter ${col.label}`}
                        />
                      </div>
                    )}

                    {/* Resize Handle */}
                    {col.resizable && (
                      <div
                        onMouseDown={(e) => handleResizeStart(e, col.key)}
                        className={clsx(
                          "absolute top-0 bottom-0 right-0 w-1 transition-colors cursor-col-resize opacity-0 group-hover:opacity-100",
                          isDark
                            ? "bg-gray-600 hover:bg-gray-400"
                            : "bg-gray-300 hover:bg-indigo-500"
                        )}
                      />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {loading
            ? renderLoadingRows()
            : Object.entries(groupedData).map(([group, rows]) => (
                <React.Fragment key={group}>
                  {/* Group header */}
                  <GroupHeader
                    group={group}
                    columnsOrder={columnsOrder}
                    collapsedGroups={collapsedGroups}
                    setCollapsedGroups={setCollapsedGroups}
                    mode="light"
                  />

                  {/* Table rows */}
                  {!collapsedGroups.has(group) && (
                  <GroupedRows
                  group={group}
                  rows={rows}
                  columnsOrder={columnsOrder}
                  columns={columns}
                  hiddenColumns={hiddenColumns}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  setHoveredRow={setHoveredRow}
                  editedCells={editedCells}
                  setEditedCells={setEditedCells}
                  onEdit={onEdit}
                  onDuplicateRow={onDuplicateRow}
                  onDeleteRow={onDeleteRow}
                  isTextOverflowing={isTextOverflowing}
                  cellRefs={cellRefs}
                  collapsedGroups={collapsedGroups}
                  mode="light"
                  focusedRowIndex={focusedRowIndex}
                  setFocusedRowIndex={setFocusedRowIndex}
                  setFocusedRowData={setFocusedRowData}
                />
                  )}
                </React.Fragment>
              ))}
        </tbody>
      </table>

      {/* Empty State */}
      {!loading && filteredData.length === 0 && <EmptyState mode="light" />}

      {/* Footer */}
      <TableFooter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filteredDataLength={filteredData.length}
        rowsPerPage={rowsPerPage}
        selectedRows={selectedRows}
  setRowsPerPage={setRowsPerPage}
        setSelectedRows={() => {
          setSelectedRows?.(new Set());
        }}
        mode="light"
      />
    </div>
  );
};

export default Table;
