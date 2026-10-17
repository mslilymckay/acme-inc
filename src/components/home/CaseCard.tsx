import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, ArrowRight, RotateCw, BookOpen, Sparkles } from 'lucide-react';
import { CaseData } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';

interface CaseCardProps {
  caseData: CaseData;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  const { setCurrentCase, openFieldGuide } = useGameStore();
  const [isFlipped, setIsFlipped] = useState(false);

  const isCompleted = caseData.status === 'completed';
  const isActive = caseData.status === 'active';
  const isLocked = caseData.status === 'locked';

  const handleCardClick = () => {
    if (isActive) {
      setCurrentCase(caseData.id);
    }
  };

  return (
    <div className="relative perspective-1000 min-h-[148px]">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* FRONT FACE: Case Action Card */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className={`w-full h-full rounded-2xl border-2 p-3.5 flex flex-col justify-between transition-all ${
            isActive
              ? 'bg-white border-black shadow-comic ring-2 ring-acme-yellow'
              : isCompleted
              ? 'bg-emerald-50/60 border-black shadow-comic-sm'
              : 'bg-slate-100/70 border-slate-300 opacity-60'
          }`}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl p-1 bg-white border border-black/20 rounded-xl shadow-xs">
                {caseData.home_card.icon}
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Case {caseData.id} • L{caseData.level}
                </span>
                <h4 className="font-extrabold text-xs text-slate-900 leading-tight">
                  {caseData.title}
                </h4>
              </div>
            </div>

            {/* Status Indicator */}
            {isCompleted && (
              <span className="p-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-500">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            )}
            {isLocked && (
              <span className="p-1 bg-slate-200 text-slate-500 rounded-full border border-slate-400">
                <Lock className="w-3 h-3" />
              </span>
            )}
            {isActive && (
              <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-acme-yellow border border-black rounded-full shadow-comic-sm animate-pulse">
                Active
              </span>
            )}
          </div>

          {/* Hook Teaser */}
          <p className="text-[11px] text-slate-600 line-clamp-2 my-2 leading-snug">
            {isLocked ? "Complete earlier cases to unlock." : caseData.home_card.hook}
          </p>

          {/* Card Action Row */}
          <div className="flex items-center justify-between pt-1">
            {isActive && (
              <button
                onClick={handleCardClick}
                className="w-full py-2 bg-acme-yellow hover:bg-yellow-400 border border-black rounded-xl font-black text-xs text-slate-900 shadow-comic-sm flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Coach Colleague</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {isCompleted && (
              <div className="w-full flex items-center justify-between gap-2">
                <button
                  onClick={() => setCurrentCase(caseData.id)}
                  className="px-2.5 py-1.5 bg-white border border-black rounded-lg text-[10px] font-extrabold text-slate-800 shadow-comic-sm hover:bg-slate-50 cursor-pointer"
                >
                  Review
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  className="flex-1 py-1.5 bg-amber-100 hover:bg-amber-200 border border-black rounded-lg text-[10px] font-extrabold text-amber-900 shadow-comic-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Field Guide</span>
                </button>
              </div>
            )}

            {isLocked && (
              <span className="text-[10px] text-slate-400 italic">
                Locked • Unlock at Level {caseData.level}
              </span>
            )}
          </div>
        </div>

        {/* BACK FACE: Field Guide Reference Card */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
          className="absolute inset-0 w-full h-full bg-white border-2 border-black rounded-2xl p-3 shadow-comic flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-1 border-b border-black/10">
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-700">
                📖 Field Guide #{caseData.id}
              </span>
              <button
                onClick={() => setIsFlipped(false)}
                className="text-[9px] font-bold text-slate-500 hover:text-black flex items-center gap-0.5"
              >
                <RotateCw className="w-2.5 h-2.5" />
                Flip
              </button>
            </div>

            <h5 className="font-extrabold text-xs text-slate-900 mt-1">
              {caseData.field_guide_data.title}
            </h5>
            <p className="text-[10px] text-slate-600 line-clamp-3 mt-1 leading-snug">
              {caseData.field_guide_data.summary}
            </p>
          </div>

          <div className="pt-2 border-t border-black/10">
            <button
              onClick={() => {
                setCurrentCase(caseData.id);
                openFieldGuide();
              }}
              className="w-full py-1.5 bg-acme-cyan border border-black rounded-lg text-[10px] font-black text-slate-900 shadow-comic-sm flex items-center justify-center gap-1 hover:bg-cyan-400 cursor-pointer"
            >
              <BookOpen className="w-3 h-3" />
              <span>Open Blueprint</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
