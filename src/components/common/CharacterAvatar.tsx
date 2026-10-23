import React, { useState } from 'react';
import { SamIllustration, SamMood } from './SamIllustration';
import { LiamIllustration } from './LiamIllustration';
import { ChloeIllustration } from './ChloeIllustration';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const sizePixels = {
    sm: 48,
    md: 62,
    lg: 84
  }[size];

  const isLongQuote = Boolean(quote && quote.length > 135);

  const renderIllustration = () => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('liam')) {
      return <LiamIllustration mood={mood} size={sizePixels} />;
    }
    if (lowerName.includes('chloe')) {
      return <ChloeIllustration mood={mood} size={sizePixels} />;
    }
    return <SamIllustration mood={mood} size={sizePixels} />;
  };

  return (
    <div className="flex items-stretch gap-3">
      {/* Left Column: Vertically stacked portrait, name, and title */}
      <div className="flex flex-col items-center justify-center text-center shrink-0 w-[78px]">
        <div className="rounded-2xl bg-amber-100/70 border-2 border-black p-0.5 shadow-comic-sm overflow-hidden flex items-center justify-center">
          {renderIllustration()}
        </div>
        <h3 className="font-black text-slate-900 text-xs tracking-tight leading-tight mt-1.5 truncate w-full">
          {name}
        </h3>
        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 mt-0.5 bg-slate-100 border border-black/20 rounded-full text-slate-700 leading-none">
          {role}
        </span>
      </div>

      {/* Right Column: Large dedicated space for bigger quote text */}
      {quote && (
        <div
          onClick={() => isLongQuote && setIsExpanded(!isExpanded)}
          className={`flex-1 min-w-0 bg-amber-50/80 border border-black/20 rounded-xl p-2.5 flex flex-col justify-center ${
            isLongQuote ? 'cursor-pointer group' : ''
          }`}
          title={isLongQuote ? 'Tap to expand / collapse' : undefined}
        >
          <p
            className={`text-[13px] text-slate-800 italic leading-snug font-medium ${
              !isExpanded && isLongQuote ? 'line-clamp-4' : ''
            }`}
          >
            "{quote}"
          </p>
          {isLongQuote && (
            <span className="text-[10px] font-black text-amber-800 underline group-hover:text-amber-950 block mt-1">
              {isExpanded ? '▴ Show less' : '▾ Read full quote...'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
