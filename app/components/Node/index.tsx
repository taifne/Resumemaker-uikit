import React, { useState, useRef, useEffect } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Link {
  source: string;
  target: string;
}

interface NodeNetworkProps {
  nodes: Node[];
  links: Link[];
}

const NodeNetwork: React.FC<NodeNetworkProps> = ({ nodes, links }) => {
  const [nodePositions, setNodePositions] = useState(nodes);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleDrag = (event: React.MouseEvent<SVGCircleElement>, nodeId: string) => {
    const initialPosition = { x: event.clientX, y: event.clientY };
    const startNode = nodePositions.find(node => node.id === nodeId);

    if (!startNode || !svgRef.current) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - initialPosition.x;
      const dy = moveEvent.clientY - initialPosition.y;

      const updatedPositions = nodePositions.map(node => {
        if (node.id === nodeId) {
          return { ...node, x: startNode.x + dx, y: startNode.y + dy };
        }
        return node;
      });

      setNodePositions(updatedPositions);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    setNodePositions(nodes); // Initialize node positions
  }, [nodes]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <svg
        ref={svgRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* Links */}
        {links.map((link, index) => {
          const sourceNode = nodePositions.find(node => node.id === link.source);
          const targetNode = nodePositions.find(node => node.id === link.target);
          if (!sourceNode || !targetNode) return null;

          return (
            <line
              key={index}
              x1={sourceNode.x}
              y1={sourceNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke="black"
              strokeWidth={2}
            />
          );
        })}

        {/* Nodes */}
        {nodePositions.map((node, index) => (
          <circle
            key={index}
            cx={node.x}
            cy={node.y}
            r={15}
            fill="blue"
            onMouseDown={(e) => handleDrag(e, node.id)}
          />
        ))}
      </svg>

      {/* Labels for nodes */}
      {nodePositions.map((node, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${node.y - 10}px`,
            left: `${node.x + 20}px`,
            fontSize: '12px',
            color: 'black',
          }}
        >
          {node.id}
        </div>
      ))}
    </div>
  );
};

export default NodeNetwork;
