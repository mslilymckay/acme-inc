import React from 'react';

interface CharacterAvatarProps {
  name: string;
  role: string;
  avatar: string;
  mood?: 'stressed' | 'thinking' | 'satisfied';
  size?: 'sm' | 'md' | 'lg';
  quote?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  name,
  role,
  avatar,
  mood = 'stressed',
  size = 'md',
  quote
}) => {
  // Cartoon emoji mapping matching Bob's Burgers deadpan / Rick & Morty vibes
  const moodEmoji = {
    stressed: '🥱',
    thinking: '🧐',
    satisfied: '😏'
  }[mood];

  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl'
  }[size];

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className={`${sizeClasses} bg-acme-yellow border-2 border-black rounded-2xl flex items-center justify-center shadow-comic-sm transition-transform active:scale-95`}
        >
          <span>{avatar}</span>
        </div>
        {/* Mood indicator badge */}
        <div className="absolute -bottom-1 -right-1 bg-white border border-black rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-comic-sm">
          {moodEmoji}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-900 text-sm tracking-tight">{name}</h3>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-200 border border-black/40 rounded-full text-slate-700">
            {role}
          </span>
        </div>
        {quote && (
          <p className="text-xs text-slate-600 italic mt-0.5 line-clamp-1">
            "{quote}"
          </p>
        )}
      </div>
    </div>
  );
};
