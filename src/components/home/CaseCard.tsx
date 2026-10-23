import React from 'react';
import { Lock, CheckCircle2, BookOpen, ArrowRight, UserCheck } from 'lucide-react';
import { CaseData } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';

interface CaseCardProps {
  caseData: CaseData;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  const { setCurrentCase, openFieldGuide, openPrototypeWipModal } = useGameStore();

  const isCompleted = caseData.status === 'completed';
  const isActive = caseData.status === 'active';
  const isLocked = caseData.status === 'locked';

  const handleClick = () => {
    if (caseData.level === 1) {
      openPrototypeWipModal(
        `Case ${caseData.id}: Level 1 Coach Notes`,
        "This is a partial prototype. Complete Level 2 cases to experience the full interactive workflow and view their Coach Notes!",
        "LEVEL 1 CASE"
      );
      return;
    }

    if (isActive) {
      if (caseData.level >= 3) {
        openPrototypeWipModal(
          `Level 3 Preview: ${caseData.title}`,
          "Marcus is waiting for you in Level 3 (Collaboration)! Levels 3–5 are currently under development for the full release. Thank you for testing Level 2: Prompt Building!",
          "LEVEL 3 PREVIEW"
        );
        return;
      }
      // "Open" state: click to open module
      setCurrentCase(caseData.id);
    } else if (isCompleted) {
      // "Closed" state: click to open Coach Notes
      openFieldGuide(caseData.id);
    } else if (isLocked) {
      if (caseData.level === 2) {
        const prevCaseName = caseData.id === '2.3' ? '2.2 (Liam)' : '2.1 (Sam)';
        openPrototypeWipModal(
          `Case ${caseData.id}: Locked`,
          `Complete Case ${prevCaseName} first to unlock this investigation!`,
          "CASE LOCKED"
        );
      } else {
        openPrototypeWipModal(
          `Case ${caseData.id}: ${caseData.title}`,
          "This is a partial prototype. Levels 3, 4, and 5 (Collaboration, Skills, and Tasks & Agents) are currently under development. Experience Level 2: Prompt Building to test the core mechanics!",
          "FUTURE CASE"
        );
      }
    }
  };

  // State 1: "Open" (Active investigation)
  if (isActive) {
    return (
      <button
        onClick={handleClick}
        className="w-full text-left p-2.5 rounded-2xl border-2 border-black bg-acme-yellow shadow-comic-sm flex flex-col justify-between min-h-[112px] ring-2 ring-black hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer relative overflow-hidden"
      >
        <div className="flex items-start justify-between w-full">
          <span className="text-xl leading-none">{caseData.home_card.icon}</span>
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-black text-acme-yellow rounded-full tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            OPEN
          </span>
        </div>

        <div className="my-1">
          <span className="text-[10px] font-black uppercase tracking-tight text-slate-800 block">
            Case {caseData.id}
          </span>
          <h4 className="font-extrabold text-xs text-slate-900 leading-tight line-clamp-2">
            {caseData.title}
          </h4>
        </div>

        {/* CTA Line: [icon] Coach [blank space] [right arrow (aligned right)] */}
        <div className="flex items-center text-[10px] font-black text-slate-900 pt-1 border-t border-black/15 w-full">
          <UserCheck className="w-3 h-3 mr-1 text-slate-900 shrink-0" />
          <span>Coach</span>
          <div className="flex-1" />
          <ArrowRight className="w-3.5 h-3.5 text-slate-900 shrink-0" />
        </div>
      </button>
    );
  }

  // State 2: "Closed" (Completed investigation -> Opens Coach Notes)
  if (isCompleted) {
    return (
      <button
        onClick={handleClick}
        className="w-full text-left p-2.5 rounded-2xl border-2 border-black bg-white hover:bg-emerald-50 shadow-comic-sm flex flex-col justify-between min-h-[112px] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between w-full">
          <span className="text-xl leading-none">{caseData.home_card.icon}</span>
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-500 rounded-full flex items-center gap-0.5">
            <CheckCircle2 className="w-2.5 h-2.5" />
            CLOSED
          </span>
        </div>

        <div className="my-1">
          <span className="text-[10px] font-black uppercase tracking-tight text-slate-500 block">
            Case {caseData.id}
          </span>
          <h4 className="font-bold text-xs text-slate-800 leading-tight line-clamp-2 group-hover:text-emerald-950">
            {caseData.title}
          </h4>
        </div>

        {/* CTA Line: [icon] Notes [blank space] [right arrow (aligned right)] */}
        <div className="flex items-center text-[10px] font-black text-amber-900 pt-1 border-t border-slate-200 w-full">
          <BookOpen className="w-3 h-3 mr-1 text-amber-800 shrink-0" />
          <span>Notes</span>
          <div className="flex-1" />
          <ArrowRight className="w-3.5 h-3.5 text-amber-900 shrink-0" />
        </div>
      </button>
    );
  }

  // State 3: Locked (Clickable to show Prototype WIP info)
  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full text-left p-2.5 rounded-2xl border border-slate-300 bg-slate-100/80 opacity-60 hover:opacity-85 hover:border-slate-400 transition-all flex flex-col justify-between min-h-[112px] cursor-pointer select-none active:scale-[0.98]"
    >
      <div className="flex items-start justify-between w-full">
        <span className="text-lg opacity-40 grayscale">{caseData.home_card.icon}</span>
        <div className="p-1 rounded-full bg-slate-200 text-slate-500">
          <Lock className="w-2.5 h-2.5" />
        </div>
      </div>

      <div className="my-1">
        <span className="text-[10px] font-bold text-slate-400 block">
          Case {caseData.id}
        </span>
        <h4 className="font-bold text-xs text-slate-500 leading-tight line-clamp-2">
          {caseData.title}
        </h4>
      </div>

      <div className="text-[9px] font-bold text-slate-400 pt-1 border-t border-slate-200 flex items-center justify-between w-full">
        <span>Locked</span>
        <span className="text-[8px] uppercase tracking-wider text-slate-400">Preview ➔</span>
      </div>
    </button>
  );
};
