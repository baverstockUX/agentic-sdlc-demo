'use client';

import { workflowScenario, getTotalDuration } from '@/lib/workflow-data';
import StepComparisonCard from './StepComparisonCard';
import { ArrowRight, GitBranch } from 'lucide-react';

export default function ComparisonView() {
  const traditionalSteps = workflowScenario.traditional;
  const agenticSteps = workflowScenario.agentic;

  const tradTotalDuration = getTotalDuration(traditionalSteps);
  const agenticTotalDuration = getTotalDuration(agenticSteps);
  const speedImprovement = (tradTotalDuration / agenticTotalDuration).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Step-by-Step Workflow Comparison
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare how the same feature flows through traditional sequential handoffs vs agentic collaborative circles.
          </p>
        </div>

        {/* Summary Metrics */}
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-sm text-blue-600 font-semibold mb-1">Traditional SDLC</div>
            <div className="text-2xl font-bold text-blue-900">{traditionalSteps.length} steps</div>
            <div className="text-sm text-blue-700">{Math.floor(tradTotalDuration / 60)}m {tradTotalDuration % 60}s</div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-sm text-green-600 font-semibold mb-1">Agentic SDLC</div>
            <div className="text-2xl font-bold text-green-900">{agenticSteps.length} steps</div>
            <div className="text-sm text-green-700">{Math.floor(agenticTotalDuration / 60)}m {agenticTotalDuration % 60}s</div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
            <div className="text-sm text-orange-600 font-semibold mb-1">Speed Improvement</div>
            <div className="text-2xl font-bold text-orange-900">{speedImprovement}x faster</div>
            <div className="text-sm text-orange-700">{tradTotalDuration - agenticTotalDuration}s saved</div>
          </div>
        </div>

        {/* Workflow Pattern Legend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Workflow Patterns</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-gray-900">Sequential Handoffs</div>
                <div className="text-sm text-gray-600">
                  Work passes linearly between roles. Each phase must complete before the next begins.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <GitBranch className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-gray-900">Collaborative Circle</div>
                <div className="text-sm text-gray-600">
                  Work flows freely between roles. Parallel execution with continuous validation.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional Column */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-300 sticky top-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Traditional SDLC</h2>
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mt-1">Sequential handoffs between roles</p>
            </div>

            <div className="space-y-3">
              {traditionalSteps.map((step, idx) => (
                <StepComparisonCard
                  key={step.id}
                  step={step}
                  stepNumber={idx + 1}
                  type="traditional"
                  showHandoff={idx < traditionalSteps.length - 1 && step.role !== traditionalSteps[idx + 1].role}
                />
              ))}
            </div>
          </div>

          {/* Agentic Column */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-green-500 sticky top-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Agentic SDLC</h2>
                <GitBranch className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mt-1">Collaborative circle with parallel work</p>
            </div>

            <div className="space-y-3">
              {agenticSteps.map((step, idx) => (
                <StepComparisonCard
                  key={step.id}
                  step={step}
                  stepNumber={idx + 1}
                  type="agentic"
                  showCollaboration={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-gray-300 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Key Differences</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-900 mb-2">Traditional Characteristics:</div>
              <ul className="space-y-1 text-gray-700">
                <li>• Sequential phases with clear handoffs</li>
                <li>• Documentation-heavy transitions</li>
                <li>• Each role waits for previous to complete</li>
                <li>• Feedback loops require full cycles</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-green-900 mb-2">Agentic Characteristics:</div>
              <ul className="space-y-1 text-gray-700">
                <li>• Parallel work streams with AI assistance</li>
                <li>• Real-time artifact generation</li>
                <li>• Continuous validation across roles</li>
                <li>• Instant feedback and iteration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
