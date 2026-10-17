import React, { useState } from 'react';
import { Sparkles, Zap, Compass, Filter, BookOpen } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { TrophyCarousel } from './TrophyCarousel';
import { CaseCard } from './CaseCard';

export const HomeView: React.FC = () => {
  const { cases, userXp, setCurrentCase } = useGameStore();
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');

  const casesArray = Object.values(cases);
  const filteredCases = selectedLevel === 'all'
    ? casesArray
    : casesArray.filter(c => c.level === selectedLevel);

  const activeCase = casesArray.find(c => c.status === 'active');

  return (
    <div className="flex flex-col h-full bg-acme-cream overflow-y-auto pb-8">
      {/* Acme Flux Header */}
      <header className="sticky top-0 z-30 bg-acme-yellow border-b-2 border-black p-3.5 flex items-center justify-between shadow-comic-sm">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center text-lg shadow-comic-sm font-black">
            ⚡
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block">
              Acme Flux Workspace
            </span>
            <h1 className="text-sm font-black text-slate-900 leading-tight">
              Signal & Noise: AI Coach
            </h1>
          </div>
        </div>

        {/* Global XP counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black rounded-full shadow-comic-sm">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="text-xs font-black text-slate-900 font-mono">
            {userXp} XP
          </span>
        </div>
      </header>

      {/* Main Home Content */}
      <div className="p-3.5 space-y-4">
        {/* Top Trophy Badges Shelf */}
        <TrophyCarousel />

        {/* Featured Active Case Spotlight Card */}
        {activeCase && (
          <div className="bg-white border-3 border-black rounded-3xl p-4 shadow-comic relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-black/10">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                Next Urgent Coaching Request
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-full border border-black/30">
                Case {activeCase.id}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-acme-yellow border-2 border-black flex items-center justify-center text-2xl shadow-comic-sm shrink-0">
                {activeCase.home_card.icon}
              </div>

              <div>
                <h3 className="font-black text-sm text-slate-900">
                  {activeCase.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {activeCase.home_card.hook}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentCase(activeCase.id)}
              className="mt-3 w-full py-2.5 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Solve Case {activeCase.id} (The Mind-Reader Fallacy) ➔</span>
            </button>
          </div>
        )}

        {/* 3x5 Matrix Filter Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              The 15-Case Matrix
            </h3>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-2 py-0.5 text-[10px] font-black rounded-lg border ${
                selectedLevel === 'all'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              All
            </button>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2 py-0.5 text-[10px] font-black rounded-lg border ${
                  selectedLevel === lvl
                    ? 'bg-acme-yellow text-slate-900 border-black shadow-comic-sm'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                L{lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 gap-3">
          {filteredCases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseData={caseItem} />
          ))}
        </div>
      </div>
    </div>
  );
};
