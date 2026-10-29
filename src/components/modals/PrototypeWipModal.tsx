import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const PrototypeWipModal: React.FC = () => {
  const { prototypeWipModal, closePrototypeWipModal } = useGameStore();

  const isOpen = Boolean(prototypeWipModal && prototypeWipModal.isOpen);

  return (
    <AnimatePresence>
      {isOpen && prototypeWipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop click to dismiss */}
          <motion.div
            key="prototype-wip-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/60"
            onClick={closePrototypeWipModal}
          />

          <motion.div
            key="prototype-wip-content"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-[380px] bg-white border-3 border-black rounded-3xl p-4 shadow-comic relative z-10 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={closePrototypeWipModal}
              className="absolute top-3 right-3 w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4 text-slate-800" />
            </button>

            {/* Header Badge with dynamic Icon */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 border-2 border-black flex items-center justify-center text-base shadow-comic-xs shrink-0">
                {prototypeWipModal.icon || '🚧'}
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-amber-50 border border-black/20 text-slate-800 rounded-full font-mono">
                {prototypeWipModal.badge || 'PROTOTYPE PREVIEW'}
              </span>
            </div>

            <h3 className="text-base font-black text-slate-900 leading-tight">
              {prototypeWipModal.title}
            </h3>

            <div className="my-3 p-3 bg-amber-50/70 border border-amber-300/80 rounded-2xl">
              <p className="text-xs font-medium text-slate-800 leading-relaxed">
                {prototypeWipModal.message}
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={closePrototypeWipModal}
                className="flex-1 py-2.5 bg-acme-yellow hover:bg-yellow-300 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-center"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
