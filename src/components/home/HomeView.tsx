import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { TrophyCarousel } from './TrophyCarousel';
import { CaseCard } from './CaseCard';
import { FieldGuideDrawer } from '../module/FieldGuideDrawer';

export const HomeView: React.FC = () => {
  const { cases, userXp, setCurrentCase, currentCaseId } = useGameStore();
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');

  const casesArray = Object.values(cases);
  const activeCase = casesArray.find(c => c.status === 'active');
  const selectedCaseData = cases[currentCaseId];

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
              Acme Flux Workspace
            </span>
            <h1 className="text-xs font-black text-slate-900 leading-tight">
              Signal & Noise: AI Coach
            </h1>
          </div>
        </div>

        {/* Global XP Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-black rounded-full shadow-comic-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span className="text-xs font-black text-slate-900 font-mono">
            {userXp} XP
          </span>
        </div>
      </header>

      {/* Scrollable Matrix Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
        {/* Top Trophy Shelf */}
        <TrophyCarousel />

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
      </div>

      {/* Wide Floating Action Button (FAB) Overlay for Next Active Case */}
      {activeCase && (
        <div className="absolute bottom-3 left-3 right-3 z-30">
          <button
            onClick={() => setCurrentCase(activeCase.id)}
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

      {/* Field Guide Drawer when triggered from Closed case cards */}
      {selectedCaseData && (
        <FieldGuideDrawer
          data={selectedCaseData.field_guide_data}
          caseId={selectedCaseData.id}
        />
      )}
    </div>
  );
};
