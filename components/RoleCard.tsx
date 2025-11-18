'use client';

import { Step, roleColors } from '@/lib/workflow-data';
import { motion } from 'framer-motion';
import { Clock, FileText } from 'lucide-react';

interface RoleCardProps {
  step: Step;
  isActive: boolean;
  onClick?: () => void;
}

export default function RoleCard({ step, isActive, onClick }: RoleCardProps) {
  const colors = roleColors[step.role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        border-2 rounded-lg p-4 cursor-pointer transition-all
        ${isActive ? `${colors.border} ${colors.bg} shadow-lg` : 'border-gray-200 bg-white hover:border-gray-300'}
      `}
      onClick={onClick}
    >
      <div className="space-y-2">
        <h3 className={`font-semibold ${isActive ? colors.text : 'text-gray-900'}`}>
          {step.title}
        </h3>

        <p className="text-sm text-gray-600">
          {step.description}
        </p>

        {step.details && (
          <p className="text-xs text-gray-500 italic">
            {step.details}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{step.duration}s</span>
          </div>

          {step.artifacts && step.artifacts.length > 0 && (
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>{step.artifacts.length} artifact{step.artifacts.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {step.artifacts && step.artifacts.length > 0 && (
          <div className="pt-2 border-t border-gray-200">
            <div className="text-xs font-medium text-gray-700 mb-1">Generated:</div>
            {step.artifacts.map((artifact, idx) => (
              <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                {artifact}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
