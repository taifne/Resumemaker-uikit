import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'; // Using React Icons for chevron

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

type TreeviewProps = {
  data: TreeNode[];
  onSelect?: (id: string) => void;
};

const Treeview: React.FC<TreeviewProps> = ({ data, onSelect }) => {
  const [openNodes, setOpenNodes] = useState<string[]>([]);

  const toggleNode = (id: string) => {
    setOpenNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    );
  };

  const handleNodeClick = (id: string) => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const renderNode = (node: TreeNode) => {
    const isOpen = openNodes.includes(node.id);

    return (
      <div key={node.id} className="ml-6">
        <div
          className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all duration-200 ease-in-out"
          onClick={() => {
            if (node.children) toggleNode(node.id);
            handleNodeClick(node.id);
          }}
        >
          {node.children && (
            <span className="mr-2 text-gray-600">
              {isOpen ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )}
            </span>
          )}
          <span className="text-gray-800">{node.label}</span>
        </div>

        {/* Render children nodes recursively */}
        {isOpen && node.children && (
          <div className="ml-6">
            {node.children.map((childNode) => renderNode(childNode))}
          </div>
        )}
      </div>
    );
  };

  return <div>{data.map((node) => renderNode(node))}</div>;
};

export default Treeview;
