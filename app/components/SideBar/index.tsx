import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  link: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col h-full transition-all duration-300 bg-gray-800 text-white ${isCollapsed ? "w-16" : "w-64"}`}>
      {/* Sidebar Header */}
      <div className={`flex items-center p-4 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && <span className="text-xl font-semibold text-white">MySite</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-2xl p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          {/* Show hamburger icon when collapsed, show "X" icon when expanded */}
          {isCollapsed ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Menu Items */}
      <ul className="flex flex-col p-2 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-700">
            <a href={item.link} className="w-full flex items-center text-white hover:text-gray-300 transition-colors duration-200">
              {!isCollapsed && <span className="ml-3 w-4/5">{item.label}</span>}
              <span className="mr-2 text-xl">{item.icon}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
