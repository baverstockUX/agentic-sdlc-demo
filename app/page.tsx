'use client';

import { useState } from 'react';
import TabNavigation from '@/components/TabNavigation';
import SimulationView from '@/components/SimulationView';
import ComparisonView from '@/components/ComparisonView';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('simulation');

  return (
    <div>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'simulation' ? (
        <SimulationView onSwitchToComparison={() => setActiveTab('comparison')} />
      ) : (
        <ComparisonView />
      )}
    </div>
  );
}
