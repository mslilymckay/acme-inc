import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, BookOpen, Check, Award } from 'lucide-react';
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
          {/* Backdrop click to dismiss */}
          <div className="absolute inset-0" onClick={closeFieldGuide} />

          {/* Full Height Drawer (92vh) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="w-full max-w-[430px] h-[92vh] max-h-[92vh] bg-white border-t-3 border-x-3 border-black rounded-t-[32px] p-4 shadow-comic relative z-10 flex flex-col justify-between overflow-hidden"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-black/10 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-acme-yellow border-2 border-black flex items-center justify-center shadow-comic-sm">
                  <Award className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">
                    Field Guide Dossier #{caseId}
                  </span>
                  <h3 className="font-black text-sm text-slate-900 leading-tight">
                    {data.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={closeFieldGuide}
                className="w-7 h-7 rounded-full border border-black flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-900" />
              </button>
            </div>

            {/* Compact Body Content (Fits 100% without scroll) */}
            <div className="space-y-2.5 my-2 flex-1 flex flex-col justify-around">
              {/* Visual Bento Box Diagram */}
              <div className="bg-amber-50 border-2 border-black rounded-2xl p-2.5 shadow-comic-sm">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block mb-1.5 text-center">
                  🍱 The 4 Bento Briefing Compartments
                </span>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-rose-100 border border-rose-400 rounded-lg p-2 text-center">
                    <span className="text-[9px] font-black text-rose-900 block uppercase">1. Role</span>
                    <p className="text-[10px] font-medium text-rose-800">Who is the AI?</p>
                  </div>
                  <div className="bg-cyan-100 border border-cyan-400 rounded-lg p-2 text-center">
                    <span className="text-[9px] font-black text-cyan-900 block uppercase">2. Audience</span>
                    <p className="text-[10px] font-medium text-cyan-800">Who is reading?</p>
                  </div>
                  <div className="bg-amber-100 border border-amber-400 rounded-lg p-2 text-center">
                    <span className="text-[9px] font-black text-amber-900 block uppercase">3. Context</span>
                    <p className="text-[10px] font-medium text-amber-800">What are the facts?</p>
                  </div>
                  <div className="bg-lime-100 border border-lime-400 rounded-lg p-2 text-center">
                    <span className="text-[9px] font-black text-lime-900 block uppercase">4. Format</span>
                    <p className="text-[10px] font-medium text-lime-800">Length & structure</p>
                  </div>
                </div>
              </div>

              {/* Key Principles Bullets */}
              <div className="bg-slate-50 border-2 border-black rounded-2xl p-2.5 space-y-1.5 shadow-comic-sm">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 block">
                  Core Coaching Principles:
                </span>
                <ul className="space-y-1 text-[11px] text-slate-700">
                  {data.content_bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coach's Golden Rule Card */}
              <div className="p-2.5 bg-acme-yellow/40 border-2 border-black rounded-xl text-center">
                <span className="text-[10px] font-black text-slate-900 uppercase block tracking-wider">
                  💡 Coach's Golden Rule
                </span>
                <p className="text-xs font-semibold text-slate-800 italic mt-0.5">
                  "{data.takeaway}"
                </p>
              </div>
            </div>

            {/* Footer with Simplified "Back to Desk" CTA */}
            <div className="pt-2 flex gap-2 border-t border-black/10 shrink-0">
              <button
                onClick={() => replayCase(caseId)}
                className="px-3.5 py-2.5 bg-white hover:bg-slate-100 border-2 border-black rounded-xl text-xs font-bold text-slate-800 shadow-comic-sm flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>

              <button
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
