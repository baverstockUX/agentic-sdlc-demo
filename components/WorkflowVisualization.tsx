'use client';

import { motion } from 'framer-motion';
import { Role } from '@/lib/workflow-data';

interface WorkflowVisualizationProps {
  type: 'traditional' | 'agentic';
  currentRole?: Role;
}

export default function WorkflowVisualization({ type, currentRole }: WorkflowVisualizationProps) {
  if (type === 'traditional') {
    return <TraditionalFlow currentRole={currentRole} />;
  }
  return <AgenticFlow currentRole={currentRole} />;
}

// Traditional: Linear Sequential Flow
function TraditionalFlow({ currentRole }: { currentRole?: Role }) {
  const nodes = [
    { id: 'product', label: 'P', color: '#3B82F6', active: currentRole === 'product' },
    { id: 'design', label: 'D', color: '#A855F7', active: currentRole === 'design' },
    { id: 'engineering', label: 'E', color: '#22C55E', active: currentRole === 'engineering' },
  ];

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {nodes.map((node, idx) => (
        <div key={node.id} className="flex items-center gap-3">
          {/* Node Circle */}
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${
              node.active ? 'ring-2 ring-offset-2' : ''
            }`}
            style={{
              backgroundColor: node.active ? node.color : '#D1D5DB',
              ringColor: node.color,
            }}
            animate={{
              scale: node.active ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {node.label}
          </motion.div>

          {/* Arrow between nodes */}
          {idx < nodes.length - 1 && (
            <div className="relative w-12 h-0.5 bg-gray-300">
              {/* Animated dot flowing through arrow */}
              <motion.div
                className="absolute w-2 h-2 rounded-full -top-[3px]"
                style={{
                  backgroundColor: nodes[idx].active ? nodes[idx].color : '#9CA3AF',
                }}
                animate={{
                  left: ['0%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: idx * 0.5,
                }}
              />
              {/* Arrow head */}
              <div
                className="absolute w-0 h-0 -right-1 -top-1"
                style={{
                  borderLeft: '4px solid #D1D5DB',
                  borderTop: '3px solid transparent',
                  borderBottom: '3px solid transparent',
                }}
              />
            </div>
          )}
        </div>
      ))}

      <div className="ml-2 text-xs text-gray-500">
        Sequential<br />Handoffs
      </div>
    </div>
  );
}

// Agentic: Circular Collaborative Flow
function AgenticFlow({ currentRole }: { currentRole?: Role }) {
  const nodes = [
    { id: 'product', label: 'P', color: '#3B82F6', x: 60, y: 25, active: currentRole === 'product' },
    { id: 'design', label: 'D', color: '#A855F7', x: 95, y: 65, active: currentRole === 'design' },
    { id: 'engineering', label: 'E', color: '#22C55E', x: 25, y: 65, active: currentRole === 'engineering' },
  ];

  // Connection lines between all nodes (mesh network)
  const connections = [
    { from: 0, to: 1 }, // P -> D
    { from: 1, to: 2 }, // D -> E
    { from: 2, to: 0 }, // E -> P
  ];

  return (
    <div className="relative py-4 px-4">
      <svg width="120" height="90" viewBox="0 0 120 90" className="mx-auto">
        {/* Draw connection lines */}
        {connections.map((conn, idx) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          const isActive = from.active || to.active;

          return (
            <g key={idx}>
              {/* Line */}
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? from.color : '#D1D5DB'}
                strokeWidth="2"
                opacity={isActive ? 0.6 : 0.3}
              />

              {/* Animated dots flowing along lines */}
              <motion.circle
                r="3"
                fill={isActive ? from.color : '#9CA3AF'}
                animate={{
                  cx: [from.x, to.x],
                  cy: [from.y, to.y],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: idx * 0.7,
                }}
              />

              {/* Reverse flow (bidirectional) */}
              <motion.circle
                r="2"
                fill={isActive ? to.color : '#9CA3AF'}
                opacity="0.5"
                animate={{
                  cx: [to.x, from.x],
                  cy: [to.y, from.y],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: idx * 0.7 + 1,
                }}
              />
            </g>
          );
        })}

        {/* Draw nodes on top */}
        {nodes.map((node, idx) => (
          <g key={node.id}>
            {/* Active ring */}
            {node.active && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="18"
                fill="none"
                stroke={node.color}
                strokeWidth="2"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}

            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r="14"
              fill={node.active ? node.color : '#D1D5DB'}
            />

            {/* Label text */}
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontWeight="bold"
              fontSize="14"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="text-center text-xs text-gray-500 mt-1">
        Collaborative<br />Circle
      </div>
    </div>
  );
}
