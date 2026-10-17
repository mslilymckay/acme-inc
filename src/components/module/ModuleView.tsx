import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, Layers } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ObserveTab } from './ObserveTab';
import { InspectTab } from './InspectTab';
import { WorkbenchTab } from './WorkbenchTab';
import { HotspotClueModal } from '../common/HotspotClueModal';
import { FieldGuideDrawer } from './FieldGuideDrawer';

export const ModuleView: React.FC = () => {
  const {
    currentCaseId,
    cases,
    currentTab,
    setCurrentTab,
    setActiveView,
    userXp,
    activeHotspotClue,
    closeHotspotModal,
    openFieldGuide
  } = useGameStore();

  const caseData = cases[currentCaseId];

  if (!caseData) {
    return (
      <div className="p-8 text-center">
        <p className="font-bold">Case not found.</p>
        <button
          onClick={() => setActiveView('HOME')}
          className="mt-4 px-4 py-2 bg-acme-yellow border-2 border-black rounded-xl font-bold shadow-comic-sm"
        >
          Return Home
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'observe', label: '1. Observe', icon: '🔍' },
    { id: 'inspect', label: '2. Inspect', icon: '🚨' },
    { id: 'workbench', label: '3. Workbench', icon: '🍱' }
  ] as const;

  return (
    <div className="flex flex-col h-full bg-acme-cream relative">
      {/* Sticky Module Header */}
      <header className="sticky top-0 z-30 bg-acme-yellow border-b-2 border-black p-3 flex items-center justify-between shadow-comic-sm">
        <button
          onClick={() => setActiveView('HOME')}
          className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-black rounded-lg text-xs font-black text-slate-800 shadow-comic-sm flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Desk</span>
        </button>

        <div className="text-center px-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-700 block">
            LEVEL {caseData.level} • {caseData.level_name}
          </span>
          <h2 className="text-xs font-black text-slate-900 truncate max-w-[180px]">
            {caseData.id}: {caseData.title}
          </h2>
        </div>

        {/* Animated XP Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-black rounded-full shadow-comic-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span className="text-xs font-black text-slate-900 font-mono">
            {userXp} XP
          </span>
        </div>
      </header>

      {/* Sticky Sub-Tab Navigation Bar */}
      <nav className="sticky top-[53px] z-20 bg-white border-b-2 border-black px-2 py-1.5 flex items-center justify-between gap-1 shadow-xs">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all border ${
                isActive
                  ? 'bg-acme-yellow border-black shadow-comic-sm text-slate-900'
                  : 'bg-slate-50 border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="text-[11px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}

        {/* Quick Field Guide Drawer trigger if solved */}
        {caseData.status === 'completed' && (
          <button
            onClick={openFieldGuide}
            className="w-8 h-8 rounded-xl bg-amber-100 border border-black flex items-center justify-center text-xs shadow-comic-sm ml-1"
            title="View Field Guide"
          >
            <BookOpen className="w-4 h-4 text-slate-900" />
          </button>
        )}
      </nav>

      {/* Main Tab Content View */}
      <main className="flex-1 p-3.5 overflow-y-auto">
        {currentTab === 'observe' && (
          <ObserveTab
            data={caseData.module_data.observe_tab}
            caseId={caseData.id}
          />
        )}
        {currentTab === 'inspect' && (
          <InspectTab data={caseData.module_data.inspect_tab} />
        )}
        {currentTab === 'workbench' && (
          <WorkbenchTab
            data={caseData.module_data.workbench_tab}
            caseId={caseData.id}
          />
        )}
      </main>

      {/* Interactive Clue Modal */}
      <HotspotClueModal
        hotspot={activeHotspotClue}
        onClose={closeHotspotModal}
      />

      {/* Field Guide Bottom Drawer */}
      <FieldGuideDrawer
        data={caseData.field_guide_data}
        caseId={caseData.id}
      />
    </div>
  );
};
