import React from "react";
import { FiChevronDown } from "react-icons/fi";

interface GroupHeaderProps {
  group: string;
  columnsOrder: string[];
  collapsedGroups: Set<string>;
  setCollapsedGroups: React.Dispatch<React.SetStateAction<Set<string>>>;
  mode?: "light" | "dark";
}

const GroupHeader: React.FC<GroupHeaderProps> = ({
  group,
  columnsOrder,
  collapsedGroups,
  setCollapsedGroups,
  mode = "light",
}) => {
  const isDark = mode === "dark";

  const handleToggle = () => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev);
      newSet.has(group) ? newSet.delete(group) : newSet.add(group);
      return newSet;
    });
  };

  return (
    <tr
      className={`cursor-pointer transition ${
        isDark
          ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
          : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
      }`}
      onClick={handleToggle}
    >
      <td
        colSpan={columnsOrder.length + 2}
        className={`p-3 border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        } font-medium`}
      >
        <FiChevronDown
          className={`inline-block transform transition-transform duration-200 ${
            collapsedGroups.has(group) ? "rotate-180" : ""
          }`}
        />
        <span className="ml-2">{group}</span>
      </td>
    </tr>
  );
};

export default GroupHeader;
