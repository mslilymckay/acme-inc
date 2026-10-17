import React from 'react';

interface CharacterAvatarProps {
  name: string;
  role: string;
  avatar?: string;
  mood?: 'stressed' | 'thinking' | 'satisfied';
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
  // Just the emoji for character mood/expression
  const emoji = {
    stressed: '🥱',
    thinking: '🧐',
    satisfied: '😏'
  }[mood];

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  }[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* Just the emoji avatar */}
      <span className={`${sizeClasses} select-none leading-none shrink-0`}>
        {emoji}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="font-black text-slate-900 text-xs tracking-tight truncate">{name}</h3>
          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-slate-100 border border-black/20 rounded-full text-slate-700 shrink-0">
            {role}
          </span>
        </div>
        {quote && (
          <p className="text-[11px] text-slate-600 italic mt-0.5 line-clamp-1 leading-snug">
            "{quote}"
          </p>
        )}
      </div>
    </div>
  );
};
