import React from 'react';
import { Award, Lock } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const TrophyCarousel: React.FC = () => {
  const { unlockedBadges } = useGameStore();

  const badges = [
    { level: 1, name: "The Mental Modelist", icon: "🧠", color: "bg-purple-100 border-purple-500 text-purple-900" },
    { level: 2, name: "The Master Briefer", icon: "📝", color: "bg-amber-100 border-amber-500 text-amber-900" },
    { level: 3, name: "The Thought Partner", icon: "🤝", color: "bg-cyan-100 border-cyan-500 text-cyan-900" },
    { level: 4, name: "The Skill Builder", icon: "🛠️", color: "bg-rose-100 border-rose-500 text-rose-900" },
    { level: 5, name: "The Workflow Maestro", icon: "⚡", color: "bg-emerald-100 border-emerald-500 text-emerald-900" }
  ];

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-2.5 shadow-comic-sm">
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
            Coach Badges
          </span>
        </div>
        <span className="text-[9px] font-bold text-slate-500 font-mono">
          {unlockedBadges.length}/5 Earned
        </span>
      </div>

      {/* 5 Badges fitted on a single line without scrolling */}
      <div className="grid grid-cols-5 gap-1.5">
        {badges.map((badge) => {
          const isUnlocked = unlockedBadges.includes(badge.name);

          return (
            <div
              key={badge.level}
              title={`${badge.name} (Level ${badge.level})`}
              className={`p-1.5 rounded-xl border transition-all flex flex-col items-center justify-center ${
                isUnlocked
                  ? `${badge.color} border-black shadow-comic-sm`
                  : 'bg-slate-50 border-slate-200 opacity-40'
              }`}
            >
              <div className="text-base leading-none relative">
                {badge.icon}
                {!isUnlocked && (
                  <div className="absolute -bottom-1 -right-1 bg-slate-800 text-white rounded-full p-0.5 border border-white">
                    <Lock className="w-2 h-2" />
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
