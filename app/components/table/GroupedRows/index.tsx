import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiCopy, FiTrash, FiSliders } from "react-icons/fi";

interface Column<T extends Record<string, any>> {
  key: string;
  editable?: boolean;
  type?: string;
  render?: (value: any, row: T) => React.ReactNode;
}


interface GroupedRowsProps<T extends Record<string, any>> {
  group: string;
  rows: T[];
  columnsOrder: string[];
  columns: Column<T>[];
  hiddenColumns: Set<string>;
  selectedRows: Set<T>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<Set<T>>>;
  setHoveredRow: (row: number | null) => void;
  editedCells: Record<string, any>;
  setEditedCells: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onEdit?: (rowIndex: number, before: T, after: T) => void;
  onDuplicateRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  isTextOverflowing: (key: string) => boolean | null
  cellRefs: React.MutableRefObject<Record<string, HTMLDivElement  | null>>;
  collapsedGroups: Set<string>;
  mode?: "light" | "dark";
  focusedRowIndex?: number|null;
setFocusedRowIndex?: (index: number) => void;
setFocusedRowData?: (index: T) => void;

}

const GroupedRows = <T extends Record<string, any>>({
  group,
  rows,
  columnsOrder,
  columns,
  hiddenColumns,
  selectedRows,
  setSelectedRows,
  setHoveredRow,
  editedCells,
  setEditedCells,
  onEdit,
  onDuplicateRow,
  onDeleteRow,
  isTextOverflowing,
  cellRefs,
  collapsedGroups,
  mode = "light",
  focusedRowIndex,
  setFocusedRowIndex,
  setFocusedRowData,
}: GroupedRowsProps<T>) => {
  if (collapsedGroups.has(group)) return null;

  const isDark = mode === "dark";

  return (
    <>
      {rows.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className={`hover:bg-opacity-70 ${
            isDark
            ? focusedRowIndex === rowIndex
              ? "bg-gray-600"
              : selectedRows.has(row)
              ? "bg-gray-700"
              : "bg-gray-800"
            : focusedRowIndex === rowIndex
            ? "bg-indigo-100"
            : selectedRows.has(row)
            ? "bg-indigo-50"
            : "bg-white"
          }`}
          onMouseEnter={() => setHoveredRow(rowIndex)}
          onMouseLeave={() => setHoveredRow(null)}
          onClick={() => {setFocusedRowIndex?.(rowIndex);
setFocusedRowData?.(row);
          }}
        >
          {/* Checkbox Cell */}
          <td
  className={`sticky left-0 z-10 border-b ${
    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
  }`}
>
  <div className="flex items-center justify-center p-3">
  <input
  type="checkbox"
  className="form-checkbox h-4 w-4 text-indigo-600 rounded"
  checked={selectedRows.has(row)}
  onClick={(e) => e.stopPropagation()} // ⛔ prevent row click
  onChange={() =>
    setSelectedRows?.((prev) => {
      const newSet = new Set(prev);
      newSet.has(row) ? newSet.delete(row) : newSet.add(row);
      return newSet;
    })
  }
/>

  </div>
</td>

          {columnsOrder.map((colKey) => {
            const col = columns.find((c) => c.key === colKey);
            if (!col || hiddenColumns.has(colKey)) return null;
            const cellKey = `${rowIndex}-${colKey}`;
            const value = editedCells[cellKey] ?? row[col.key as keyof T];

            return (
              <td
                key={colKey}
                className={`p-3 border-b relative group ${
                  isDark ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-700"
                }`}
                ref={(el) => {
                  cellRefs.current[colKey] = el;
                }}
              >
                {col.editable ? (
                  <input
                    type={col.type || "text"}
                    value={String(value)}
                    onChange={(e) => {
                      setEditedCells((prev) => ({
                        ...prev,
                        [cellKey]: e.target.value,
                      }));
                      onEdit?.(rowIndex, row, { ...row, [colKey]: e.target.value });
                    }}
                    className={`border rounded px-2 py-1 text-xs w-full ${
                      isDark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"
                    }`}
                  />
                ) : col.render ? (
                  col.render(value, row)
                ) : (
                  <div className="truncate">
                    {String(value)}
                    {isTextOverflowing(colKey) && (
                      <div
                        className={`absolute left-0 top-full mt-1 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                          isDark ? "bg-gray-900 text-gray-200" : "bg-gray-800 text-white"
                        }`}
                      >
                        {String(value)}
                      </div>
                    )}
                  </div>
                )}
              </td>
            );
          })}

        
        </tr>
      ))}
    </>
  );
};

export default GroupedRows;
