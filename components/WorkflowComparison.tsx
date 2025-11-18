'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workflowScenario, getTotalDuration } from '@/lib/workflow-data';
import Timeline from './Timeline';
import RoleCard from './RoleCard';
import WorkflowVisualization from './WorkflowVisualization';
import { Play, RotateCcw, Pause, AlertTriangle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

type SimulationState = 'idle' | 'running' | 'paused' | 'completed';

export default function WorkflowComparison() {
  // Traditional workflow state
  const [tradState, setTradState] = useState<SimulationState>('idle');
  const [tradCurrentStep, setTradCurrentStep] = useState(0);

  // Agentic workflow state
  const [agenticState, setAgenticState] = useState<SimulationState>('idle');
  const [agenticCurrentStep, setAgenticCurrentStep] = useState(0);

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showTradSteps, setShowTradSteps] = useState(false);
  const [showAgenticSteps, setShowAgenticSteps] = useState(false);

  const traditionalSteps = workflowScenario.traditional;
  const agenticSteps = workflowScenario.agentic;

  const tradTotalDuration = getTotalDuration(traditionalSteps);
  const agenticTotalDuration = getTotalDuration(agenticSteps);

  // Auto-play timer - advances both workflows simultaneously
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      // Advance traditional if not completed
      if (tradCurrentStep < traditionalSteps.length - 1) {
        setTradCurrentStep(prev => prev + 1);
      } else if (tradState !== 'completed') {
        setTradState('completed');
      }

      // Advance agentic if not completed
      if (agenticCurrentStep < agenticSteps.length - 1) {
        setAgenticCurrentStep(prev => prev + 1);
      } else if (agenticState !== 'completed') {
        setAgenticState('completed');
      }

      // Stop auto-play when both completed
      if (tradCurrentStep >= traditionalSteps.length - 1 && agenticCurrentStep >= agenticSteps.length - 1) {
        setIsAutoPlaying(false);
      }
    }, 1500); // Advance every 1.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, tradCurrentStep, agenticCurrentStep, traditionalSteps.length, agenticSteps.length, tradState, agenticState]);

  const startSimulation = () => {
    if (tradState === 'idle') {
      setTradState('running');
      setTradCurrentStep(0);
    }
    if (agenticState === 'idle') {
      setAgenticState('running');
      setAgenticCurrentStep(0);
    }
    setIsAutoPlaying(true);
  };

  const pauseSimulation = () => {
    setIsAutoPlaying(false);
  };

  const resetSimulation = () => {
    setTradState('idle');
    setAgenticState('idle');
    setTradCurrentStep(0);
    setAgenticCurrentStep(0);
    setIsAutoPlaying(false);
    setShowTradSteps(false);
    setShowAgenticSteps(false);
  };

  const tradNext = () => {
    if (tradState === 'idle') setTradState('running');
    if (tradCurrentStep < traditionalSteps.length - 1) {
      setTradCurrentStep(prev => prev + 1);
    } else {
      setTradState('completed');
    }
  };

  const tradPrev = () => {
    if (tradCurrentStep > 0) {
      setTradCurrentStep(prev => prev - 1);
      if (tradState === 'completed') setTradState('running');
    }
  };

  const agenticNext = () => {
    if (agenticState === 'idle') setAgenticState('running');
    if (agenticCurrentStep < agenticSteps.length - 1) {
      setAgenticCurrentStep(prev => prev + 1);
    } else {
      setAgenticState('completed');
    }
  };

  const agenticPrev = () => {
    if (agenticCurrentStep > 0) {
      setAgenticCurrentStep(prev => prev - 1);
      if (agenticState === 'completed') setAgenticState('running');
    }
  };

  const currentTradStep = traditionalSteps[tradCurrentStep];
  const currentAgenticStep = agenticSteps[agenticCurrentStep];

  const bothCompleted = tradState === 'completed' && agenticState === 'completed';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Agentic SDLC Transformation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch how the same feature - adding user authentication - flows through traditional vs agentic workflows.
            Click steps to advance or use auto-play.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isAutoPlaying && tradState !== 'completed' && agenticState !== 'completed' && (
            <button
              onClick={startSimulation}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Play className="w-5 h-5" />
              {tradState === 'idle' ? 'Start Auto-Play' : 'Resume Auto-Play'}
            </button>
          )}

          {isAutoPlaying && (
            <button
              onClick={pauseSimulation}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          )}

          {(tradState !== 'idle' || agenticState !== 'idle') && (
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          )}
        </div>

        <div className="text-center text-sm text-gray-600">
          Use arrow buttons below each workflow to step through manually, or use Auto-Play to run both simultaneously.
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional Workflow */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Traditional SDLC</h2>
                <div className="text-sm text-gray-500">
                  Total: {Math.floor(tradTotalDuration / 60)}m {tradTotalDuration % 60}s
                </div>
              </div>

              <WorkflowVisualization
                type="traditional"
                currentRole={tradState !== 'idle' && currentTradStep ? currentTradStep.role : undefined}
              />

              {/* Step Counter */}
              {tradState !== 'idle' && tradState !== 'completed' && (
                <div className="text-center text-sm text-gray-600 mt-3">
                  Step {tradCurrentStep + 1} of {traditionalSteps.length}
                </div>
              )}
            </div>

            {/* Manual Navigation Controls */}
            {tradState !== 'idle' && tradState !== 'completed' && (
              <div className="flex justify-center gap-3">
                <button
                  onClick={tradPrev}
                  disabled={tradCurrentStep === 0}
                  className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={tradNext}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {tradState !== 'idle' && tradState !== 'completed' && currentTradStep && (
                  <RoleCard
                    key={currentTradStep.id}
                    step={currentTradStep}
                    isActive={true}
                  />
                )}
              </AnimatePresence>

              {tradState === 'idle' && (
                <div className="text-center text-gray-500 py-8">
                  Click &quot;Start Simulation&quot; to begin
                </div>
              )}

              {tradState === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Traditional Flow Complete</h3>
                    <p className="text-blue-700">
                      Total Time: {Math.floor(tradTotalDuration / 60)} minutes {tradTotalDuration % 60} seconds
                    </p>
                    <p className="text-sm text-blue-600 mt-2">
                      {traditionalSteps.length} sequential steps
                    </p>
                  </div>

                  <button
                    onClick={() => setShowTradSteps(!showTradSteps)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {showTradSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    <span className="font-medium text-gray-700">
                      {showTradSteps ? 'Hide' : 'View'} All Steps
                    </span>
                  </button>

                  <AnimatePresence>
                    {showTradSteps && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {traditionalSteps.map((step, idx) => (
                          <RoleCard
                            key={step.id}
                            step={step}
                            isActive={false}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>

          {/* Agentic Workflow */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Agentic SDLC</h2>
                <div className="text-sm text-green-600 font-semibold">
                  {tradTotalDuration > 0 && (
                    <>~{(tradTotalDuration / agenticTotalDuration).toFixed(1)}x faster</>
                  )}
                </div>
              </div>

              <WorkflowVisualization
                type="agentic"
                currentRole={agenticState !== 'idle' && currentAgenticStep ? currentAgenticStep.role : undefined}
              />

              {/* Step Counter */}
              {agenticState !== 'idle' && agenticState !== 'completed' && (
                <div className="text-center text-sm text-gray-600 mt-3">
                  Step {agenticCurrentStep + 1} of {agenticSteps.length}
                </div>
              )}
            </div>

            {/* Manual Navigation Controls */}
            {agenticState !== 'idle' && agenticState !== 'completed' && (
              <div className="flex justify-center gap-3">
                <button
                  onClick={agenticPrev}
                  disabled={agenticCurrentStep === 0}
                  className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={agenticNext}
                  className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {agenticState !== 'idle' && agenticState !== 'completed' && currentAgenticStep && (
                  <RoleCard
                    key={currentAgenticStep.id}
                    step={currentAgenticStep}
                    isActive={true}
                  />
                )}
              </AnimatePresence>

              {agenticState === 'idle' && (
                <div className="text-center text-gray-500 py-8">
                  Click &quot;Start Simulation&quot; to begin
                </div>
              )}

              {agenticState === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-bold text-green-900 mb-2">Agentic Flow Complete</h3>
                    <p className="text-green-700">
                      Total Time: {Math.floor(agenticTotalDuration / 60)} minutes {agenticTotalDuration % 60} seconds
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      {agenticSteps.length} parallelized steps
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAgenticSteps(!showAgenticSteps)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    {showAgenticSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    <span className="font-medium text-gray-700">
                      {showAgenticSteps ? 'Hide' : 'View'} All Steps
                    </span>
                  </button>

                  <AnimatePresence>
                    {showAgenticSteps && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {agenticSteps.map((step, idx) => (
                          <RoleCard
                            key={step.id}
                            step={step}
                            isActive={false}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Final Summary */}
        {bothCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-lg p-8"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">The Hidden Failure Mode</h2>

                <div className="space-y-3 text-gray-700">
                  <p className="text-lg font-semibold text-orange-700">
                    You just got {(tradTotalDuration / agenticTotalDuration).toFixed(1)}x faster at building...
                    but was it the right thing to build?
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-900">What Changed</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                          <span>Async artifact generation vs sync handoffs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                          <span>Parallel exploration vs sequential work</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                          <span>Humans curate & validate vs execute</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                          <span>Real-time documentation vs stale wikis</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-900">What Didn&apos;t Change</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                          <span>Political complexity in stakeholders</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                          <span>Unclear customer requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                          <span>Technical debt from past decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                          <span>Production incidents requiring judgment</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 mt-4">
                    <p className="font-bold text-gray-900 mb-2">The Real Bottleneck Shift:</p>
                    <p className="text-sm">
                      The constraint moves from <span className="font-mono bg-gray-100 px-1">&quot;Can we build it?&quot;</span> to{' '}
                      <span className="font-mono bg-orange-100 px-1">&quot;Should we build it?&quot;</span>
                    </p>
                    <p className="text-sm mt-2">
                      Product strategy becomes the bottleneck, not engineering capacity. Sprint planning becomes portfolio
                      management. Code review becomes architecture review.
                    </p>
                  </div>

                  <div className="bg-orange-100 rounded-lg p-4 mt-4">
                    <p className="text-sm font-semibold text-orange-900">
                      Teams that don&apos;t adapt their decision-making processes will just get 10x faster at building the wrong thing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
