import React from 'react';
import { SamIllustration, SamMood } from './SamIllustration';

interface CharacterAvatarProps {
  name: string;
  role: string;
  avatar?: string;
  mood?: SamMood;
  size?: 'sm' | 'md' | 'lg';
  quote?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  name,
  role,
  mood = 'stressed',
  size = 'md',
  quote
}) => {
  const sizePixels = {
    sm: 52,
    md: 68,
    lg: 96
  }[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* Illustrated character portrait without emoji clutter */}
      <div className="relative shrink-0">
        <div className="rounded-2xl bg-amber-100/70 border-2 border-black p-0.5 shadow-comic-sm overflow-hidden flex items-center justify-center">
          <SamIllustration mood={mood} size={sizePixels} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="font-black text-slate-900 text-xs tracking-tight truncate">{name}</h3>
          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-slate-100 border border-black/20 rounded-full text-slate-700 shrink-0">
            {role}
          </span>
        </div>

        {quote && (
          <p className="text-[11px] text-slate-600 italic mt-0.5 line-clamp-2 leading-snug">
            "{quote}"
          </p>
        )}
      </div>
    </div>
  );
};
