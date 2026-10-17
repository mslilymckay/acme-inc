import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, ArrowLeft, BookOpen, Check, Award } from 'lucide-react';
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs">
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={closeFieldGuide} />

          {/* Bottom Sheet Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-full max-w-[430px] bg-white border-t-3 border-x-3 border-black rounded-t-[32px] p-5 shadow-comic relative z-10 max-h-[85vh] flex flex-col justify-between overflow-hidden"
          >
            {/* Drag Pill Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-acme-yellow border-2 border-black flex items-center justify-center shadow-comic-sm">
                  <Award className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    Field Guide Card Unlocked
                  </span>
                  <h3 className="font-black text-sm text-slate-900 leading-tight">
                    {data.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={closeFieldGuide}
                className="w-7 h-7 rounded-full border border-black flex items-center justify-center hover:bg-slate-100"
              >
                <X className="w-4 h-4 text-slate-900" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-4 my-4 overflow-y-auto pr-1">
              {/* Visual Bento Box Diagram */}
              <div className="bg-amber-50 border-2 border-black rounded-2xl p-3 shadow-comic-sm">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block mb-2 text-center">
                  🍱 The 4 Compartments of a Bulletproof Brief
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-rose-100 border-2 border-rose-400 rounded-xl p-2.5">
                    <span className="text-[10px] font-black text-rose-900 block uppercase">1. Role</span>
                    <p className="text-[11px] font-semibold text-rose-800">Who is the AI pretending to be?</p>
                  </div>
                  <div className="bg-cyan-100 border-2 border-cyan-400 rounded-xl p-2.5">
                    <span className="text-[10px] font-black text-cyan-900 block uppercase">2. Audience</span>
                    <p className="text-[11px] font-semibold text-cyan-800">Who is receiving the output?</p>
                  </div>
                  <div className="bg-amber-100 border-2 border-amber-400 rounded-xl p-2.5">
                    <span className="text-[10px] font-black text-amber-900 block uppercase">3. Context</span>
                    <p className="text-[11px] font-semibold text-amber-800">What are the facts & goals?</p>
                  </div>
                  <div className="bg-lime-100 border-2 border-lime-400 rounded-xl p-2.5">
                    <span className="text-[10px] font-black text-lime-900 block uppercase">4. Format</span>
                    <p className="text-[11px] font-semibold text-lime-800">Length, bullets, tone & style.</p>
                  </div>
                </div>
              </div>

              {/* Takeaway Bullets */}
              <div className="bg-slate-50 border-2 border-black rounded-2xl p-3 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 block">
                  Key Principles:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {data.content_bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Mantra */}
              <div className="p-3 bg-acme-yellow/40 border-2 border-black rounded-xl text-center">
                <span className="text-xs font-black text-slate-900 block">
                  💡 Coach's Golden Rule:
                </span>
                <p className="text-[11px] font-medium text-slate-800 italic mt-0.5">
                  "{data.takeaway}"
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex gap-2 border-t border-black/10">
              <button
                onClick={() => replayCase(caseId)}
                className="px-4 py-3 bg-white hover:bg-slate-100 border-2 border-black rounded-xl text-xs font-bold text-slate-800 shadow-comic-sm flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay</span>
              </button>

              <button
                onClick={() => {
                  closeFieldGuide();
                  setActiveView('HOME');
                }}
                className="flex-1 py-3 bg-acme-cyan hover:bg-cyan-400 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Back to Desk Matrix</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
