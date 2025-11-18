'use client';

import { Role, roleColors, roleLabels } from '@/lib/workflow-data';
import { motion } from 'framer-motion';

interface TimelineProps {
  currentRole: Role;
  currentStep: number;
  totalSteps: number;
  elapsedTime: number;
}

export default function Timeline({ currentRole, currentStep, totalSteps, elapsedTime }: TimelineProps) {
  const progress = (currentStep / totalSteps) * 100;
  const colors = roleColors[currentRole];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-1 rounded ${colors.bg} ${colors.text} text-xs font-medium`}>
            {roleLabels[currentRole]}
          </div>
          <span className="text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="text-gray-600 font-mono">
          {Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, '0')}
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colors.dark}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
