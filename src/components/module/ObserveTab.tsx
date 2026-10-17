import React from 'react';
import { Sparkles, ArrowRight, MessageSquareQuote, Search } from 'lucide-react';
import { ObserveTabData } from '../../types/game';
import { CharacterAvatar } from '../common/CharacterAvatar';
import { useGameStore } from '../../store/useGameStore';

interface ObserveTabProps {
  data: ObserveTabData;
  caseId: string;
}

export const ObserveTab: React.FC<ObserveTabProps> = ({ data, caseId }) => {
  const { discoveredHotspots, discoverHotspot, setCurrentTab } = useGameStore();
  const caseDiscovered = discoveredHotspots[caseId] || [];
  const allCluesFound = data.flawed_output.hotspots.length > 0 &&
    data.flawed_output.hotspots.every(h => caseDiscovered.includes(h.id));

  // Render flawed text with clickable interactive hotspots
  const renderInteractiveFlawedText = () => {
    let rawText = data.flawed_output.text;
    const hotspots = data.flawed_output.hotspots;

    if (hotspots.length === 0) {
      return <span>{rawText}</span>;
    }

    // Split text around hotspots
    return (
      <div className="leading-relaxed font-mono text-xs text-slate-800 space-y-2">
        <p>
          {hotspots.reduce<React.ReactNode[]>((acc, hotspot, idx) => {
            const parts = rawText.split(hotspot.text);
            const before = parts[0];
            rawText = parts.slice(1).join(hotspot.text);
            const isFound = caseDiscovered.includes(hotspot.id);

            acc.push(<span key={`before-${idx}`}>{before}</span>);
            acc.push(
              <button
                key={hotspot.id}
                onClick={() => discoverHotspot(caseId, hotspot)}
                className={`inline-flex items-center px-1.5 py-0.5 rounded border transition-all cursor-pointer font-bold ${
                  isFound
                    ? 'bg-amber-200 border-amber-500 text-amber-950 underline decoration-amber-600'
                    : 'bg-rose-100 border-dashed border-rose-500 text-rose-800 animate-pulse hover:bg-rose-200'
                }`}
                title="Tap to inspect clue"
              >
                {hotspot.text}
                {!isFound && (
                  <span className="ml-1 text-[9px] px-1 bg-rose-600 text-white rounded-full">
                    ?
                  </span>
                )}
              </button>
            );

            if (idx === hotspots.length - 1) {
              acc.push(<span key={`end-${idx}`}>{rawText}</span>);
            }
            return acc;
          }, [])}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full justify-between pb-4">
      <div className="space-y-4">
        {/* Colleague Chat Dialogue */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-comic-sm">
          <CharacterAvatar
            name={data.colleague_name}
            role={data.colleague_role}
            avatar={data.colleague_avatar}
            mood={allCluesFound ? 'thinking' : 'stressed'}
          />

          <div className="mt-3 relative bg-amber-50 border border-black/20 rounded-xl p-3 text-xs text-slate-800 leading-normal">
            <MessageSquareQuote className="w-4 h-4 text-amber-600 absolute -top-2 -left-1 bg-white rounded-full border border-black/20 p-0.5" />
            <p className="italic">"{data.message}"</p>
          </div>
        </div>

        {/* Flawed AI Output Card */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-comic-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-rose-100 border border-black flex items-center justify-center">
                <Search className="w-3 h-3 text-rose-700" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Flawed AI Memo
              </span>
            </div>

            {/* Clue counter pill */}
            <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 border border-black/30 rounded-full text-slate-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Clues: {caseDiscovered.length}/{data.flawed_output.hotspots.length}
            </span>
          </div>

          <div className="p-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
            {renderInteractiveFlawedText()}
          </div>

          <p className="text-[10px] text-slate-400 mt-2 text-center font-medium">
            💡 Tap the highlighted phrases to inspect why Cortex failed.
          </p>
        </div>
      </div>

      {/* Sticky Next Step Button */}
      <div className="pt-4">
        <button
          onClick={() => setCurrentTab('inspect')}
          className="w-full py-3 bg-acme-cyan hover:bg-cyan-400 border-2 border-black rounded-xl font-extrabold text-sm text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-comic-sm transition-all"
        >
          <span>Inspect the Brief</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
