import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Hotspot } from '../../types/game';

interface HotspotClueModalProps {
  hotspot: Hotspot | null;
  onClose: () => void;
}

export const HotspotClueModal: React.FC<HotspotClueModalProps> = ({ hotspot, onClose }) => {
  return (
    <AnimatePresence>
      {hotspot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 select-none"
        >
          {/* Backdrop click to dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-sm bg-white border-3 border-black rounded-3xl p-5 shadow-comic relative z-10 overflow-hidden"
          >
            {/* Top Banner */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-acme-amber border-2 border-black flex items-center justify-center shadow-comic-sm">
                  <Lightbulb className="w-5 h-5 text-slate-900" />
                </div>
                <span className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                  Flaw Detected!
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-full border border-black flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X className="w-4 h-4 text-slate-900" />
              </button>
            </div>

            {/* Target text highlight */}
            <div className="mt-3.5 p-3 bg-rose-50 border-2 border-rose-300 rounded-xl font-mono text-xs text-rose-950 font-bold">
              "{hotspot.text}"
            </div>

            {/* Clue breakdown */}
            <div className="mt-3">
              <p className="text-sm font-medium text-slate-700 leading-snug">
                {hotspot.clue_note}
              </p>
            </div>

            {/* XP Award Confirmation Banner */}
            <div className="mt-3.5 p-2 bg-emerald-50 border border-emerald-400 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Clarity XP Logged</span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 bg-acme-yellow border border-black rounded-full shadow-comic-sm text-slate-900">
                <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                +{hotspot.xp_value || 25} XP
              </span>
            </div>

            {/* Acknowledge Button */}
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full py-2.5 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-extrabold text-xs text-slate-900 shadow-comic active:translate-x-0.5 active:translate-y-0.5 active:shadow-comic-sm transition-all cursor-pointer"
            >
              Add Clue to Case File ➔
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
