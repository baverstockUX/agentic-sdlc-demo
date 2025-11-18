'use client';

import { Step, roleColors, roleLabels } from '@/lib/workflow-data';
import { ArrowDown, GitBranch, Clock } from 'lucide-react';

interface StepComparisonCardProps {
  step: Step;
  stepNumber: number;
  type: 'traditional' | 'agentic';
  showHandoff?: boolean;
  showCollaboration?: boolean;
}

export default function StepComparisonCard({
  step,
  stepNumber,
  type,
  showHandoff,
  showCollaboration,
}: StepComparisonCardProps) {
  const colors = roleColors[step.role];

  return (
    <div className="space-y-2">
      {/* Step Card */}
      <div className={`bg-white rounded-lg border-2 ${colors.border} p-4 shadow-sm hover:shadow-md transition-shadow`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-start gap-3 flex-1">
            <div className={`${colors.dark} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0`}>
              {stepNumber}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wide`}>
                  {roleLabels[step.role]}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {step.duration}s
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{step.title}</h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-2 pl-11">{step.description}</p>

        {/* Details */}
        {step.details && (
          <div className={`${colors.bg} rounded p-2 text-xs text-gray-700 pl-11`}>
            {step.details}
          </div>
        )}

        {/* Artifacts */}
        {step.artifacts && step.artifacts.length > 0 && (
          <div className="pl-11 mt-2">
            <div className="text-xs font-semibold text-gray-500 mb-1">Artifacts:</div>
            <div className="space-y-1">
              {step.artifacts.map((artifact, idx) => (
                <div key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                  <span className={`${colors.text} font-bold`}>→</span>
                  <span>{artifact}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Handoff Indicator for Traditional */}
      {type === 'traditional' && showHandoff && (
        <div className="flex flex-col items-center py-1">
          <ArrowDown className="w-5 h-5 text-orange-500" />
          <div className="text-xs text-orange-600 font-semibold">Handoff</div>
        </div>
      )}

      {/* Collaboration Indicator for Agentic */}
      {type === 'agentic' && showCollaboration && (
        <div className="flex justify-center -my-1">
          <div className="flex items-center gap-1 text-green-600">
            <div className="w-4 h-px bg-green-300"></div>
            <GitBranch className="w-4 h-4" />
            <div className="w-4 h-px bg-green-300"></div>
          </div>
        </div>
      )}
    </div>
  );
}
