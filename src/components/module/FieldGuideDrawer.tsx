import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, BookOpen, Check, Award, FolderOpen } from 'lucide-react';
import { FieldGuideData } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';

interface FieldGuideDrawerProps {
  data: FieldGuideData;
  caseId: string;
}

export const FieldGuideDrawer: React.FC<FieldGuideDrawerProps> = ({ data, caseId }) => {
  const { showFieldGuideModal, closeFieldGuide, replayCase, setActiveView } = useGameStore();

  return (
    <AnimatePresence>
      {showFieldGuideModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center select-none">
          {/* Backdrop click to dismiss */}
          <motion.div
            key="field-guide-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/60"
            onClick={closeFieldGuide}
          />

          {/* Full Height Drawer (92vh) */}
          <motion.div
            key="field-guide-drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[430px] h-[92vh] max-h-[92vh] bg-white border-t-3 border-x-3 border-black rounded-t-[32px] p-4 shadow-comic relative z-10 flex flex-col justify-between overflow-hidden"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2 shrink-0" />

            {/* Header: Coach Notes */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-black/10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-acme-yellow border-2 border-black flex items-center justify-center shadow-comic-sm">
                  <Award className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">
                    Incident File #{caseId}
                  </span>
                  <h3 className="font-black text-sm text-slate-900 leading-tight">
                    {data.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={closeFieldGuide}
                className="w-7 h-7 rounded-full border border-black flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X className="w-4 h-4 text-slate-900" />
              </button>
            </div>

            {/* Compact Body Content (Fits 100% without scroll) */}
            <div className="space-y-2.5 my-2 flex-1 flex flex-col justify-around">
              {/* Visual Diagram: Dynamic by visual_type */}
              {data.visual_type === 'card_swapper' || data.visual_type === 'few_shot_card' ? (
                /* Chloe's Few-Shot Folder Diagram */
                <div className="bg-amber-50/80 border-2 border-black rounded-2xl p-2.5 shadow-comic-sm">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <FolderOpen className="w-4 h-4 text-amber-700" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                      Few-Shot Reference Architecture
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-white border border-black/20 rounded-xl">
                      <span className="text-base block mb-0.5">📂</span>
                      <span className="text-[10px] font-black text-slate-900 block uppercase">1. Curate Real Pairs</span>
                      <p className="text-[10px] text-slate-600 leading-tight">Provide authentic input + gold-standard output</p>
                    </div>
                    <div className="p-2 bg-white border border-black/20 rounded-xl">
                      <span className="text-base block mb-0.5">🎯</span>
                      <span className="text-[10px] font-black text-slate-900 block uppercase">2. Anchor Voice</span>
                      <p className="text-[10px] text-slate-600 leading-tight">Anchor tone, structure & cadence without prompt clutter</p>
                    </div>
                  </div>
                </div>
              ) : data.visual_type === 'red_pen_card' ? (
                /* Liam's Red Pen Contradiction Pruner Diagram */
                <div className="bg-amber-50/80 border-2 border-black rounded-2xl p-2.5 shadow-comic-sm">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm">🖊️</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                      Noise & Contradiction Pruner
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-white border border-black/20 rounded-xl">
                      <span className="text-base block mb-0.5">✂️</span>
                      <span className="text-[10px] font-black text-rose-900 block uppercase">1. Prune the Noise</span>
                      <p className="text-[10px] text-slate-600 leading-tight">Cut contradictory instructions that confuse attention</p>
                    </div>
                    <div className="p-2 bg-white border border-black/20 rounded-xl">
                      <span className="text-base block mb-0.5">✨</span>
                      <span className="text-[10px] font-black text-emerald-900 block uppercase">2. Keep it Clean</span>
                      <p className="text-[10px] text-slate-600 leading-tight">Every token should direct the model, not distract it</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Sam's 4-Pillars Diagram */
                <div className="bg-amber-50/80 border-2 border-black rounded-2xl p-2.5 shadow-comic-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 block mb-1.5 text-center">
                    The 4 Prompt Pillars
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-white border border-amber-300 rounded-xl">
                      <span className="text-base block mb-0.5">🎭</span>
                      <span className="text-[10px] font-black text-amber-900 block uppercase">1. Persona</span>
                      <p className="text-[11px] font-semibold text-amber-800">Who is the AI?</p>
                    </div>
                    <div className="p-2 bg-white border border-sky-300 rounded-xl">
                      <span className="text-base block mb-0.5">🎯</span>
                      <span className="text-[10px] font-black text-sky-900 block uppercase">2. Objective</span>
                      <p className="text-[11px] font-semibold text-sky-800">What is the goal?</p>
                    </div>
                    <div className="p-2 bg-white border border-purple-300 rounded-xl">
                      <span className="text-base block mb-0.5">📜</span>
                      <span className="text-[10px] font-black text-purple-900 block uppercase">3. Rules</span>
                      <p className="text-[11px] font-semibold text-purple-800">What are the constraints?</p>
                    </div>
                    <div className="p-2 bg-white border border-lime-300 rounded-xl">
                      <span className="text-base block mb-0.5">📋</span>
                      <span className="text-[10px] font-black text-lime-900 block uppercase">4. Format</span>
                      <p className="text-[11px] font-semibold text-lime-800">How should it look?</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Principles Bullets */}
              <div className="bg-slate-50 border-2 border-black rounded-2xl p-2.5 space-y-1.5 shadow-comic-sm">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 block">
                  Core Coaching Principles:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                  {data.content_bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tip Card */}
              <div className="p-2.5 bg-acme-yellow/40 border-2 border-black rounded-xl text-center">
                <span className="text-[11px] font-black text-slate-900 uppercase block tracking-wider">
                  💡 Pro Tip
                </span>
                <p className="text-xs font-semibold text-slate-800 italic mt-0.5 leading-snug">
                  "{data.takeaway}"
                </p>
              </div>
            </div>

            {/* Footer with Simplified "Back to Desk" CTA */}
            <div className="pt-2 flex gap-2 border-t border-black/10 shrink-0">
              <button
                type="button"
                onClick={() => replayCase(caseId)}
                className="px-3.5 py-2.5 bg-white hover:bg-slate-100 border-2 border-black rounded-xl text-xs font-bold text-slate-800 shadow-comic-sm flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeFieldGuide();
                  setActiveView('HOME');
                }}
                className="flex-1 py-2.5 bg-acme-cyan hover:bg-cyan-400 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Back to Desk</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
