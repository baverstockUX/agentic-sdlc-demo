'use client';

interface TabNavigationProps {
  activeTab: 'simulation' | 'comparison';
  onTabChange: (tab: 'simulation' | 'comparison') => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex gap-8 max-w-7xl mx-auto px-4" aria-label="Tabs">
        <button
          onClick={() => onTabChange('simulation')}
          className={`
            py-4 px-1 border-b-2 font-medium text-sm transition-colors
            ${activeTab === 'simulation'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }
          `}
        >
          Simulation
        </button>
        <button
          onClick={() => onTabChange('comparison')}
          className={`
            py-4 px-1 border-b-2 font-medium text-sm transition-colors
            ${activeTab === 'comparison'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }
          `}
        >
          Compare Steps
        </button>
      </nav>
    </div>
  );
}
