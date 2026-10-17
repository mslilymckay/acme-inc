import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    xpToast,
    clearXpToast,
    activeHotspotClue,
    closeHotspotModal,
    openFieldGuide
  } = useGameStore();

  const [isXpFlashing, setIsXpFlashing] = useState(false);

  // Trigger internal flash when XP changes
  useEffect(() => {
    if (xpToast) {
      setIsXpFlashing(true);
      const timer = setTimeout(() => {
        setIsXpFlashing(false);
        clearXpToast();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [xpToast, clearXpToast]);

  const caseData = cases[currentCaseId];

  if (!caseData) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center h-full">
        <p className="font-bold text-slate-800">Case not found.</p>
        <button
          onClick={() => setActiveView('HOME')}
          className="mt-4 px-4 py-2 bg-acme-yellow border-2 border-black rounded-xl font-bold shadow-comic-sm cursor-pointer"
        >
          Back
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
    <div className="flex flex-col h-full bg-acme-cream relative overflow-hidden">
      {/* Case Header: [Back] [Level heading; case sub-heading] [XP pill; no 'XP'] */}
      <header className="shrink-0 z-30 bg-acme-yellow border-b-2 border-black p-3 flex items-center justify-between shadow-comic-sm">
        {/* Back button (no 'to Desk') */}
        <button
          onClick={() => setActiveView('HOME')}
          className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-black rounded-lg text-xs font-black text-slate-800 shadow-comic-sm flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        {/* Center: [Level heading; case sub-heading] */}
        <div className="text-center px-1">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-700 block">
            LEVEL {caseData.level}: {caseData.level_name.toUpperCase()}
          </span>
          <h2 className="text-xs font-black text-slate-900 truncate max-w-[170px]">
            {caseData.id}: {caseData.title}
          </h2>
        </div>

        {/* XP button/pill with Slot-Machine roll transition and flash (No top overflow) */}
        <motion.div
          animate={isXpFlashing ? {
            scale: [1, 1.15, 0.95, 1.05, 1],
            backgroundColor: ['#ffffff', '#fef08a', '#86efac', '#ffffff']
          } : { scale: 1, backgroundColor: '#ffffff' }}
          transition={{ duration: 0.6 }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black shadow-comic-sm transition-colors ${
            isXpFlashing ? 'ring-2 ring-amber-400' : ''
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
          
          {/* Slot-Machine Roll for the XP number */}
          <div className="relative overflow-hidden h-4 min-w-[28px] flex items-center justify-center font-mono font-black text-xs text-slate-900">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={userXp}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="block leading-none"
              >
                {userXp}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Flash bonus indicator inside the pill */}
          {isXpFlashing && xpToast && (
            <span className="text-[10px] font-black text-emerald-700 font-mono animate-pulse">
              {xpToast}
            </span>
          )}
        </motion.div>
      </header>

      {/* Sub-Tab Navigation Bar */}
      <nav className="shrink-0 z-20 bg-white border-b-2 border-black px-2 py-1.5 flex items-center justify-between gap-1 shadow-xs">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex-1 py-1 px-1.5 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all border cursor-pointer ${
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

        {/* Quick Coach Notes Drawer trigger if case is completed */}
        {caseData.status === 'completed' && (
          <button
            onClick={() => openFieldGuide(caseData.id)}
            className="w-7 h-7 rounded-xl bg-amber-100 border border-black flex items-center justify-center text-xs shadow-comic-sm ml-1 cursor-pointer"
            title="View Coach Notes"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-900" />
          </button>
        )}
      </nav>

      {/* Main Tab Content View */}
      <main className="flex-1 p-3 overflow-hidden">
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

      {/* Coach Notes Bottom Drawer */}
      <FieldGuideDrawer
        data={caseData.field_guide_data}
        caseId={caseData.id}
      />
    </div>
  );
};
