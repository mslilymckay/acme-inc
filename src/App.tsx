import React from 'react';
import { useGameStore } from './store/useGameStore';
import { HomeView } from './components/home/HomeView';
import { ModuleView } from './components/module/ModuleView';

export function App() {
  const { activeView } = useGameStore();

  return (
    <div className="w-full h-full flex flex-col relative font-sans overflow-hidden">
      {activeView === 'HOME' && <HomeView />}
      {activeView === 'MODULE' && <ModuleView />}
    </div>
  );
}

export default App;
