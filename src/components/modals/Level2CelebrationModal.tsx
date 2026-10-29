import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquareHeart, RotateCcw, X } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { SamIllustration } from '../common/SamIllustration';
import { LiamIllustration } from '../common/LiamIllustration';
import { ChloeIllustration } from '../common/ChloeIllustration';

export const Level2CelebrationModal: React.FC = () => {
  const {
    showL2CelebrationModal,
    closeL2CelebrationModal,
    openFeedbackModal,
    resetL2Progress
  } = useGameStore();

  const handleOpenFeedback = () => {
    closeL2CelebrationModal();
    openFeedbackModal();
  };

  const handleReplay = () => {
    resetL2Progress();
    closeL2CelebrationModal();
  };

  return (
    <AnimatePresence>
      {showL2CelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 select-none">
          {/* Backdrop click to dismiss */}
          <motion.div
            key="l2-celebration-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/60"
            onClick={closeL2CelebrationModal}
          />

          <motion.div
            key="l2-celebration-content"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-[420px] bg-white border-3 border-black rounded-3xl p-4 shadow-comic relative z-10 overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Close button */}
            <button
              onClick={closeL2CelebrationModal}
              className="absolute top-3 right-3 w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer z-10"
              title="Close"
            >
              <X className="w-4 h-4 text-slate-800" />
            </button>

            {/* Celebration Header Pill */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-acme-yellow border border-black rounded-full text-slate-900 shadow-comic-xs flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                Level 2 Mastery Unlocked!
              </span>
            </div>

            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Case Closed: You're a Master Briefer!
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              All 3 Prompt Building investigations have been solved.
            </p>

            {/* Trio of Satisfied Colleagues */}
            <div className="my-3 p-2.5 bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-black rounded-2xl shadow-comic-sm">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-700 text-center mb-1">
                Your Happy Team at Acme Flux
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {/* Sam */}
                <div className="bg-white border-2 border-black rounded-xl p-1.5 flex flex-col items-center text-center shadow-comic-xs">
                  <SamIllustration mood="satisfied" size={54} />
                  <span className="text-[10px] font-black text-slate-900 mt-0.5">Sam</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase">L&D Lead</span>
                  <span className="text-[9px] font-semibold text-amber-800 mt-1 italic leading-tight">
                    "4 pillars locked!"
                  </span>
                </div>

                {/* Liam */}
                <div className="bg-white border-2 border-black rounded-xl p-1.5 flex flex-col items-center text-center shadow-comic-xs">
                  <LiamIllustration mood="satisfied" size={54} />
                  <span className="text-[10px] font-black text-slate-900 mt-0.5">Liam</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase">Product</span>
                  <span className="text-[9px] font-semibold text-rose-800 mt-1 italic leading-tight">
                    "Templates pruned!"
                  </span>
                </div>

                {/* Chloe */}
                <div className="bg-white border-2 border-black rounded-xl p-1.5 flex flex-col items-center text-center shadow-comic-xs">
                  <ChloeIllustration mood="satisfied" size={54} />
                  <span className="text-[10px] font-black text-slate-900 mt-0.5">Chloe</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase">Comms</span>
                  <span className="text-[9px] font-semibold text-purple-800 mt-1 italic leading-tight">
                    "Real voice set!"
                  </span>
                </div>
              </div>
            </div>

            {/* Unlocked Coach Badge Card */}
            <div className="p-2.5 bg-amber-100 border-2 border-black rounded-xl flex items-center gap-3 mb-3 shadow-comic-xs">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center text-xl shadow-comic-xs shrink-0">
                📝
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black uppercase text-amber-900 tracking-wider block">
                  Coach Badge Earned
                </span>
                <h4 className="font-black text-xs text-slate-900">
                  The Master Briefer
                </h4>
                <p className="text-[10px] text-slate-700 font-medium leading-snug">
                  Earned for mastering prompt pillars, pruning noise, and few-shot examples.
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 border-t border-black/10 flex flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={handleOpenFeedback}
                className="w-full py-2.5 bg-acme-yellow hover:bg-yellow-300 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <MessageSquareHeart className="w-3.5 h-3.5 text-slate-900" />
                <span>Send Feedback to Creator</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleReplay}
                  className="py-2 bg-white hover:bg-slate-100 border-2 border-black rounded-xl font-bold text-xs text-slate-800 shadow-comic-xs flex items-center justify-center gap-1 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-slate-700" />
                  <span>Replay L2</span>
                </button>

                <button
                  type="button"
                  onClick={closeL2CelebrationModal}
                  className="py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl font-bold text-xs text-slate-700 text-center cursor-pointer"
                >
                  Explore Desk
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
