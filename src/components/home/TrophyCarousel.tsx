import React from 'react';
import { Award, Lock, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const TrophyCarousel: React.FC = () => {
  const { unlockedBadges } = useGameStore();

  const badges = [
    { level: 1, name: "The Mental Modelist", icon: "🧠", color: "bg-purple-100 border-purple-500 text-purple-900" },
    { level: 2, name: "The Master Briefer", icon: "🍱", color: "bg-amber-100 border-amber-500 text-amber-900" },
    { level: 3, name: "The Thought Partner", icon: "🤝", color: "bg-cyan-100 border-cyan-500 text-cyan-900" },
    { level: 4, name: "The Skill Builder", icon: "🛠️", color: "bg-rose-100 border-rose-500 text-rose-900" },
    { level: 5, name: "The Workflow Maestro", icon: "⚡", color: "bg-emerald-100 border-emerald-500 text-emerald-900" }
  ];

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-3 shadow-comic-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" />
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-800">
            Coach Badges
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-500">
          {unlockedBadges.length} of 5 Earned
        </span>
      </div>

      {/* Horizontal badge carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {badges.map((badge) => {
          const isUnlocked = unlockedBadges.includes(badge.name);

          return (
            <div
              key={badge.level}
              className={`shrink-0 w-16 p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                isUnlocked
                  ? `${badge.color} border-black shadow-comic-sm`
                  : 'bg-slate-50 border-slate-300 opacity-50'
              }`}
            >
              <div className="text-xl relative">
                {badge.icon}
                {!isUnlocked && (
                  <div className="absolute -bottom-1 -right-1 bg-slate-800 text-white rounded-full p-0.5 border border-white">
                    <Lock className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
              <span className="text-[9px] font-black uppercase tracking-tight text-center mt-1 truncate w-full">
                L{badge.level}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
