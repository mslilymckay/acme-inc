import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, BookOpen, Info, MessageSquareHeart } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { TrophyCarousel } from './TrophyCarousel';
import { CaseCard } from './CaseCard';

export const HomeView: React.FC = () => {
  const {
    cases,
    userXp,
    setCurrentCase,
    currentCaseId,
    openWelcomeModal,
    openPrototypeWipModal,
    openL2CelebrationModal,
    openFeedbackModal,
    hasSeenL2Celebration,
    resetEntireDemo
  } = useGameStore();
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const casesArray = Object.values(cases);
  const activeCase = casesArray.find(c => c.status === 'active');
  const selectedCaseData = cases[currentCaseId];

  const isL2Completed =
    cases['2.1']?.status === 'completed' &&
    cases['2.2']?.status === 'completed' &&
    cases['2.3']?.status === 'completed';

  useEffect(() => {
    if (isL2Completed && !hasSeenL2Celebration) {
      const timer = setTimeout(() => {
        openL2CelebrationModal();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isL2Completed, hasSeenL2Celebration, openL2CelebrationModal]);

  const handleReset = () => {
    if (window.confirm("Reset all prototype progress to factory start?")) {
      resetEntireDemo();
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFabClick = () => {
    if (!activeCase) return;
    if (activeCase.id === '3.1' || activeCase.level >= 3) {
      openPrototypeWipModal(
        "Level 3 Preview: The Hype Machine Trap",
        "Marcus is waiting for you in Level 3 (Collaboration)! Levels 3–5 are currently under development for the full release. Thank you for testing Level 2: Prompt Building!",
        "LEVEL 3 PREVIEW",
        "🤝"
      );
      return;
    }
    setCurrentCase(activeCase.id);
  };

  const levels = [
    { level: 1, name: "Models", badge: "🧠" },
    { level: 2, name: "Prompting", badge: "🍱" },
    { level: 3, name: "Collaboration", badge: "🤝" },
    { level: 4, name: "Skills", badge: "🛠️" },
    { level: 5, name: "Tasks & Agents", badge: "⚡" },
  ];

  const visibleLevels = selectedLevel === 'all'
    ? levels
    : levels.filter(l => l.level === selectedLevel);

  return (
    <div className="flex flex-col h-full bg-acme-cream relative overflow-hidden">
      {/* Acme Flux Header */}
      <header className="shrink-0 z-20 bg-acme-yellow border-b-2 border-black p-3 flex items-center justify-between shadow-comic-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white border-2 border-black flex items-center justify-center text-base shadow-comic-sm font-black">
            ⚡
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-700 block">
              Your Desk
            </span>
            <h1 className="text-xs font-black text-slate-900 leading-tight">
              Acme Flux AI Coach
            </h1>
          </div>
        </div>

        {/* Header Right Actions: POC Info + Interactive XP */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={openWelcomeModal}
            className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-slate-50 border-2 border-black rounded-full shadow-comic-xs text-[10px] font-black text-slate-800 transition-colors cursor-pointer"
            title="About this prototype"
          >
            <Info className="w-3 h-3 text-purple-700" />
            <span>POC Info</span>
          </button>

          <button
            onClick={() =>
              openPrototypeWipModal(
                "Experience Points (XP)",
                "This is a partial prototype. The MVP will include user settings, progression tracks, and an XP leaderboard. For now, earn XP by discovering flawed output clues and solving Level 2 cases!",
                "XP LEADERBOARD",
                "✨"
              )
            }
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-50 border-2 border-black rounded-full shadow-comic-sm transition-colors cursor-pointer"
            title="View XP info"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span className="text-xs font-black text-slate-900 font-mono">
              {userXp} XP
            </span>
          </button>
        </div>
      </header>

      {/* Scrollable Matrix Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
        {/* Top Trophy Shelf */}
        <TrophyCarousel />

        {/* Level 2 Completion Celebratory Banner */}
        {isL2Completed && (
          <div className="p-3 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 border-2 border-black rounded-2xl shadow-comic-sm flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <span className="text-2xl leading-none">🎉</span>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase text-amber-950 tracking-wider block">
                  Level 2 Completed!
                </span>
                <span className="text-xs font-bold text-slate-900 block truncate">
                  Mastered all 3 Prompt Building cases
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={openL2CelebrationModal}
                className="px-2.5 py-1.5 bg-acme-yellow hover:bg-yellow-300 border-2 border-black rounded-xl text-[10px] font-black text-slate-900 shadow-comic-xs flex items-center gap-1 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>Trio</span>
                <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
              </button>

              <button
                onClick={openFeedbackModal}
                className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border-2 border-black rounded-xl text-[10px] font-black text-slate-900 shadow-comic-xs flex items-center gap-1 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <MessageSquareHeart className="w-3 h-3 text-purple-700" />
                <span>Feedback</span>
              </button>
            </div>
          </div>
        )}

        {/* Case History Header & Filter Pills */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Case History
          </h2>

          {/* Level Filter Pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-2 py-0.5 text-[10px] font-black rounded-lg border transition-all ${
                selectedLevel === 'all'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              All
            </button>
            {levels.map((l) => (
              <button
                key={l.level}
                onClick={() => setSelectedLevel(l.level)}
                className={`px-2 py-0.5 text-[10px] font-black rounded-lg border transition-all ${
                  selectedLevel === l.level
                    ? 'bg-acme-yellow text-slate-900 border-black shadow-comic-sm'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                L{l.level}
              </button>
            ))}
          </div>
        </div>

        {/* 3x5 Case Matrix (Grouped by Levels with Divider Lines) */}
        <div className="space-y-3">
          {visibleLevels.map((lvl) => {
            const levelCases = casesArray.filter(c => c.level === lvl.level);

            return (
              <div key={lvl.level} className="space-y-1.5">
                {/* Horizontal Level Divider */}
                <div className="flex items-center gap-2">
                  <div className="h-[2px] bg-black/15 flex-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 px-2 py-0.5 bg-white border border-black/20 rounded-md">
                    {lvl.badge} Level {lvl.level}: {lvl.name}
                  </span>
                  <div className="h-[2px] bg-black/15 flex-1" />
                </div>

                {/* 3 Columns Row */}
                <div className="grid grid-cols-3 gap-2">
                  {levelCases.map((caseItem) => (
                    <CaseCard key={caseItem.id} caseData={caseItem} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Prototype Reviewer Footer */}
        <div className="pt-4 pb-2 text-center text-[10px] text-slate-500 font-mono flex items-center justify-center gap-2">
          <span>Acme Flux AI Coach · Level 2</span>
          <span>•</span>
          <button
            onClick={handleReset}
            className="underline hover:text-rose-600 transition-colors cursor-pointer"
          >
            Reset Prototype Data
          </button>
        </div>
      </div>

      {/* Wide Floating Action Button (FAB) Overlay for Next Active Case */}
      {activeCase && (
        <div className="absolute bottom-3 left-3 right-3 z-30">
          <button
            onClick={handleFabClick}
            className="w-full py-3.5 px-4 bg-acme-yellow hover:bg-yellow-300 border-3 border-black rounded-2xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-between active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ring-2 ring-black/10"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-lg leading-none">{activeCase.home_card.icon}</span>
              <span className="truncate">
                Solve {activeCase.id}: {activeCase.title}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0 font-bold bg-black text-acme-yellow px-2.5 py-1 rounded-xl text-[11px]">
              <span>Start</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Field Guide Drawer is rendered at App root level */}
    </div>
  );
};
