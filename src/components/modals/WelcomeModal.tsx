import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const WelcomeModal: React.FC = () => {
  const { showWelcomeModal, closeWelcomeModal, setCurrentCase, resetEntireDemo } = useGameStore();

  const handleStartL2 = () => {
    closeWelcomeModal();
    setCurrentCase('2.1');
  };

  return (
    <AnimatePresence initial={false}>
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 select-none">
          {/* Backdrop click to dismiss */}
          <motion.div
            key="welcome-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/60"
            onClick={closeWelcomeModal}
          />

          <motion.div
            key="welcome-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-[420px] bg-white border-3 border-black rounded-3xl p-4 shadow-comic relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Close button in top-right */}
            <button
              onClick={closeWelcomeModal}
              className="absolute top-3 right-3 w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer z-10"
              title="Dismiss"
            >
              <X className="w-4 h-4 text-slate-800" />
            </button>

            {/* Header Banner */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-acme-yellow border border-black rounded-full text-slate-900 shadow-comic-xs flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                Early POC Prototype
              </span>
            </div>

            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Acme Flux AI Coach
            </h2>
            <p className="text-xs font-semibold text-slate-600 mt-1 leading-snug">
              Interactive AI Enablement & Fluency Simulation
            </p>

            {/* Prototype Scope Note */}
            <div className="my-3 p-3 bg-slate-50 border-2 border-black/15 rounded-2xl space-y-2">
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                This is a partial prototype to collect early feedback on the POC. Experience the user flow from playing individual lessons and viewing their resource cards to completing a level and earning its badge.
              </p>
            </div>

            {/* Playable Level 2 Highlights */}
            <div className="space-y-1.5 mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block px-0.5">
                🍱 Ready to test: Level 2 (Prompt Building)
              </span>

              <div className="space-y-1.5 text-xs">
                <div className="p-2 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-2">
                  <span className="text-base leading-none">🥪</span>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-slate-900 block text-[11px] leading-tight">
                      Case 2.1 (Sam): 4-Corner Prompt Planner
                    </span>
                    <span className="text-[10px] text-slate-600 truncate block">
                      Touch & drag-and-drop structural prompt assembly
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-rose-50 border border-rose-300 rounded-xl flex items-center gap-2">
                  <span className="text-base leading-none">🖊️</span>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-slate-900 block text-[11px] leading-tight">
                      Case 2.2 (Liam): The Prompt Pruner
                    </span>
                    <span className="text-[10px] text-slate-600 truncate block">
                      Interactive red-pen contradiction pruning
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-orange-50 border border-orange-300 rounded-xl flex items-center gap-2">
                  <span className="text-base leading-none">📁</span>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-slate-900 block text-[11px] leading-tight">
                      Case 2.3 (Chloe): The Example Injector
                    </span>
                    <span className="text-[10px] text-slate-600 truncate block">
                      Few-shot reference folder card swapper
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 border-t border-black/10 flex flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={handleStartL2}
                className="w-full py-3 bg-acme-yellow hover:bg-yellow-300 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Start Level 2: Prompt Building</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={closeWelcomeModal}
                className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl font-bold text-xs text-slate-600 transition-colors cursor-pointer"
              >
                Explore the Acme Flux Desk First
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset all prototype progress to factory start?")) {
                    resetEntireDemo();
                    closeWelcomeModal();
                  }
                }}
                className="text-[11px] font-bold text-slate-400 hover:text-rose-600 underline text-center cursor-pointer transition-colors pt-0.5"
              >
                Reset Prototype Data
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
