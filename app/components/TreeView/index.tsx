import React, { useState, useCallback, useEffect } from 'react';
import { FaChevronRight, FaChevronDown, FaFolder, FaFolderOpen, FaFile, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

type TreeNode = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  isDisabled?: boolean;
};

type TreeviewProps = {
  data: TreeNode[];
  onSelect?: (id: string) => void;
  onToggle?: (id: string, isOpen: boolean) => void;
  selectable?: boolean;
  accordion?: boolean;
  showConnectors?: boolean;
  className?: string;
  expandAll?: boolean;
};

const Treeview: React.FC<TreeviewProps> = ({
  data,
  onSelect,
  onToggle,
  selectable = false,
  accordion = false,
  showConnectors = true,
  className = '',
  expandAll = false
}) => {
  const [openNodes, setOpenNodes] = useState<string[]>(expandAll ? getAllIds(data) : []);
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (expandAll) {
      setOpenNodes(getAllIds(data));
    } else {
      setOpenNodes([]);
    }
  }, [expandAll, data]);

  function getAllIds(nodes: TreeNode[]): string[] {
    return nodes.reduce<string[]>((acc, node) => {
      acc.push(node.id);
      if (node.children) acc.push(...getAllIds(node.children));
      return acc;
    }, []);
  }

  const toggleNode = useCallback((id: string) => {
    setOpenNodes(prev => {
      const newState = prev.includes(id)
        ? prev.filter(nodeId => nodeId !== id)
        : accordion ? [id] : [...prev, id];
      
      onToggle?.(id, !prev.includes(id));
      return newState;
    });
  }, [accordion, onToggle]);

  const handleSelect = useCallback((id: string) => {
    if (!selectable) return;
    
    setSelectedNodes(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
    onSelect?.(id);
  }, [selectable, onSelect]);

  const renderNode = useCallback((node: TreeNode, level: number = 0) => {
    const isOpen = openNodes.includes(node.id);
    const isSelected = selectedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const marginLeft = level * 20; // 20px per level

    return (
      <div 
        key={node.id}
        className={`relative ${level === 0 ? 'my-1' : ''}`}
        style={{ marginLeft: `${marginLeft}px` }}
        role="treeitem"
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-selected={isSelected}
        id={`node-${node.id}`}
        tabIndex={node.isDisabled ? -1 : 0}
        onClick={() => {
          if (node.isDisabled) return;
          if (hasChildren) toggleNode(node.id);
          handleSelect(node.id);
        }}
        onKeyDown={(e) => {
          if (node.isDisabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (hasChildren) toggleNode(node.id);
            handleSelect(node.id);
          }
        }}
      >
        {showConnectors && level > 0 && (
          <div 
            className="absolute top-5 left-3 w-px h-[calc(100%-24px)] bg-gray-300" 
            style={{ left: '12px' }} // Adjust based on your icon size
          />
        )}

        <div
          className={`flex items-center gap-2 p-2 rounded-lg transition-colors
            ${node.isDisabled ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
            ${isSelected ? 'bg-blue-50 border border-blue-200' : ''}`}
        >
          {hasChildren ? (
            <span className="text-gray-500">
              {isOpen ? (
                <FaChevronDown className="w-4 h-4 transition-transform" />
              ) : (
                <FaChevronRight className="w-4 h-4 transition-transform" />
              )}
            </span>
          ) : (
            <span className="w-4 h-4" />
          )}

          {selectable && (
            <span className="text-gray-600">
              {isSelected ? (
                <FaRegCheckSquare className="w-4 h-4" />
              ) : (
                <FaRegSquare className="w-4 h-4" />
              )}
            </span>
          )}

          <span className="text-gray-600">
            {node.icon || (hasChildren ? (
              isOpen ? <FaFolderOpen className="w-5 h-5" /> : <FaFolder className="w-5 h-5" />
            ) : (
              <FaFile className="w-5 h-5" />
            ))}
          </span>

          <span className={`text-gray-800 ${node.isDisabled ? 'opacity-50' : ''}`}>
            {node.label}
          </span>
        </div>

        {hasChildren && isOpen && (
          <div 
            className="relative"
            role="group"
            aria-labelledby={`node-${node.id}`}
          >
            {showConnectors && (
              <div className="absolute left-3 top-5 w-px h-[calc(100%-24px)] bg-gray-300" />
            )}
            {node.children?.map(childNode => renderNode(childNode, level + 1))}
          </div>
        )}
      </div>
    );
  }, [openNodes, selectedNodes, toggleNode, handleSelect, selectable, showConnectors]);

  return (
    <div 
      className={`text-sm font-medium select-none ${className}`}
      role="tree"
      aria-multiselectable={selectable}
    >
      {data.map(node => renderNode(node))}
    </div>
  );
};

export default Treeview;