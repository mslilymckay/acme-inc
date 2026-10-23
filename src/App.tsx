import React from 'react';
import { useGameStore } from './store/useGameStore';
import { HomeView } from './components/home/HomeView';
import { ModuleView } from './components/module/ModuleView';
import { WelcomeModal } from './components/modals/WelcomeModal';
import { PrototypeWipModal } from './components/modals/PrototypeWipModal';
import { Level2CelebrationModal } from './components/modals/Level2CelebrationModal';
import { FeedbackModal } from './components/modals/FeedbackModal';

export function App() {
  const { activeView } = useGameStore();

  return (
    <div className="w-full h-full flex flex-col relative font-sans overflow-hidden bg-acme-cream">
      {activeView === 'HOME' && <HomeView />}
      {activeView === 'MODULE' && <ModuleView />}

      {/* Prototype POC Modals */}
      <WelcomeModal />
      <PrototypeWipModal />
      <Level2CelebrationModal />
      <FeedbackModal />
    </div>
  );
}

export default App;
