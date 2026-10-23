import React from 'react';
import { Sparkles, ArrowRight, Search, CheckCircle2 } from 'lucide-react';
import { ObserveTabData, Hotspot } from '../../types/game';
import { CharacterAvatar } from '../common/CharacterAvatar';
import { useGameStore } from '../../store/useGameStore';

interface ObserveTabProps {
  data: ObserveTabData;
  caseId: string;
}

export const ObserveTab: React.FC<ObserveTabProps> = ({ data, caseId }) => {
  const { discoveredHotspots, discoverHotspot, setCurrentTab } = useGameStore();
  const caseDiscovered = discoveredHotspots[caseId] || [];

  const handleHotspotClick = (hotspot: Hotspot) => {
    discoverHotspot(caseId, hotspot);
  };

  const renderFlawedText = () => {
    const { text, hotspots } = data.flawed_output;
    if (!hotspots || hotspots.length === 0) return <span>{text}</span>;

    let remainingText = text;
    const elements: React.ReactNode[] = [];

    hotspots.forEach((hs, idx) => {
      const parts = remainingText.split(hs.text);
      if (parts.length > 1) {
        if (parts[0]) {
          elements.push(<span key={`text-${idx}`}>{parts[0]}</span>);
        }
        const isFound = caseDiscovered.includes(hs.id);
        elements.push(
          <button
            key={hs.id}
            onClick={() => handleHotspotClick(hs)}
            className={`inline text-left align-baseline px-1.5 py-0.5 rounded border transition-all cursor-pointer font-bold my-0.5 mr-1 break-words ${
              isFound
                ? 'bg-amber-200 border-amber-500 text-amber-950 font-black'
                : 'bg-rose-100 border-dashed border-rose-500 text-rose-900 animate-pulse hover:bg-rose-200 ring-2 ring-rose-400/40'
            }`}
          >
            <span className="text-left">{hs.text}</span>
            {isFound ? (
              <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-emerald-700 inline align-middle" />
            ) : (
              <span className="ml-1 text-[9px] font-black px-1 bg-rose-600 text-white rounded-full inline-block align-middle">
                +{hs.xp_value || 25}XP
              </span>
            )}
          </button>
        );
        remainingText = parts.slice(1).join(hs.text);
      }
    });

    if (remainingText) {
      elements.push(<span key="text-end">{remainingText}</span>);
    }

    return elements;
  };

  return (
    <div className="flex flex-col h-full justify-between pb-2 overflow-hidden">
      <div className="space-y-3">
        {/* Colleague Character Card: Left-stacked portrait/name/role + large quote area on right */}
        <div className="bg-white border-2 border-black rounded-2xl p-3 shadow-comic-sm">
          <CharacterAvatar
            name={data.colleague_name}
            role={data.colleague_role}
            avatar={data.colleague_avatar}
            mood="stressed"
            size="md"
            quote={data.message}
          />
        </div>

        {/* Flawed AI Output Box */}
        <div className="bg-white border-2 border-black rounded-2xl p-3 shadow-comic-sm">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-rose-100 border border-black flex items-center justify-center">
                <Search className="w-3.5 h-3.5 text-rose-700" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Flawed AI Memo
              </span>
            </div>

            {/* Clue counter badge */}
            <span className="text-[11px] font-black px-2 py-0.5 bg-slate-100 border border-black/30 rounded-full text-slate-700 flex items-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
              Clues: {caseDiscovered.length}/{data.flawed_output.hotspots.length}
            </span>
          </div>

          {/* Instruction banner moved to top, between heading and flawed memo */}
          <div className="flex items-center justify-between mb-2 text-[11px] text-slate-600 font-semibold px-0.5">
            <span>💡 Tap highlighted phrases to inspect flaws</span>
            <span className="font-bold text-amber-700 font-mono">+25 XP each</span>
          </div>

          {/* Interactive Flawed Memo Text */}
          <div className="p-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl font-mono text-xs leading-relaxed text-slate-800 text-left">
            {renderFlawedText()}
          </div>
        </div>
      </div>

      {/* Sticky Next Step Button */}
      <div className="pt-2">
        <button
          onClick={() => setCurrentTab('inspect')}
          className="w-full py-2.5 bg-acme-cyan hover:bg-cyan-400 border-2 border-black rounded-xl font-extrabold text-xs text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <span>Inspect the Brief</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
