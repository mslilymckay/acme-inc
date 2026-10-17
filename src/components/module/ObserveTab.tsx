import React, { useState } from 'react';
import { Sparkles, ArrowRight, MessageSquareQuote, Search, CheckCircle2 } from 'lucide-react';
import { ObserveTabData, Hotspot } from '../../types/game';
import { CharacterAvatar } from '../common/CharacterAvatar';
import { SamMood } from '../common/SamIllustration';
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

  // Local mood preview state (defaults to stressed, flips to thinking when clues found, or user clicks preview pills)
  const [currentMood, setCurrentMood] = useState<SamMood>(allCluesFound ? 'thinking' : 'stressed');

  const handleHotspotClick = (hotspot: Hotspot) => {
    discoverHotspot(caseId, hotspot);
  };

  return (
    <div className="flex flex-col h-full justify-between pb-2 overflow-hidden">
      <div className="space-y-3">
        {/* Colleague Chat Dialogue with Illustrated Sam */}
        <div className="bg-white border-2 border-black rounded-2xl p-3 shadow-comic-sm">
          <CharacterAvatar
            name={data.colleague_name}
            role={data.colleague_role}
            avatar={data.colleague_avatar}
            mood={currentMood}
            size="md"
            showMoodToggle={true}
            onMoodChange={setCurrentMood}
          />

          <div className="mt-2.5 relative bg-amber-50 border border-black/20 rounded-xl p-2.5 text-xs text-slate-800 leading-snug">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600 absolute -top-1.5 -left-1 bg-white rounded-full border border-black/20 p-0.5" />
            <p className="italic text-[11px]">"{data.message}"</p>
          </div>
        </div>

        {/* Flawed AI Output Box */}
        <div className="bg-white border-2 border-black rounded-2xl p-3 shadow-comic-sm">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-rose-100 border border-black flex items-center justify-center">
                <Search className="w-3 h-3 text-rose-700" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                Flawed AI Memo
              </span>
            </div>

            {/* Clue counter badge */}
            <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 border border-black/30 rounded-full text-slate-700 flex items-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
              Clues: {caseDiscovered.length}/{data.flawed_output.hotspots.length}
            </span>
          </div>

          {/* Interactive Flawed Memo Text */}
          <div className="p-2.5 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl font-mono text-[11px] leading-relaxed text-slate-800">
            {/* Hotspot 1: [Dear Employee] */}
            <button
              onClick={() => handleHotspotClick(data.flawed_output.hotspots[0])}
              className={`inline-flex items-center px-1.5 py-0.5 rounded border transition-all cursor-pointer font-bold mr-1 ${
                caseDiscovered.includes(data.flawed_output.hotspots[0]?.id)
                  ? 'bg-amber-200 border-amber-500 text-amber-950 font-black'
                  : 'bg-rose-100 border-dashed border-rose-500 text-rose-900 animate-pulse hover:bg-rose-200 ring-2 ring-rose-400/40'
              }`}
            >
              <span>{data.flawed_output.hotspots[0]?.text || "[Dear Employee]"}</span>
              {caseDiscovered.includes(data.flawed_output.hotspots[0]?.id) ? (
                <CheckCircle2 className="w-3 h-3 ml-1 text-emerald-700 inline" />
              ) : (
                <span className="ml-1 text-[8px] font-black px-1 bg-rose-600 text-white rounded-full">
                  +25XP
                </span>
              )}
            </button>
            
            <span>, As we move forward into the new quarter, it is imperative that we optimize our leadership paradigms. Therefore, </span>

            {/* Hotspot 2: training will occur. */}
            <button
              onClick={() => handleHotspotClick(data.flawed_output.hotspots[1])}
              className={`inline-flex items-center px-1.5 py-0.5 rounded border transition-all cursor-pointer font-bold mx-1 ${
                caseDiscovered.includes(data.flawed_output.hotspots[1]?.id)
                  ? 'bg-amber-200 border-amber-500 text-amber-950 font-black'
                  : 'bg-rose-100 border-dashed border-rose-500 text-rose-900 animate-pulse hover:bg-rose-200 ring-2 ring-rose-400/40'
              }`}
            >
              <span>{data.flawed_output.hotspots[1]?.text || "training will occur."}</span>
              {caseDiscovered.includes(data.flawed_output.hotspots[1]?.id) ? (
                <CheckCircle2 className="w-3 h-3 ml-1 text-emerald-700 inline" />
              ) : (
                <span className="ml-1 text-[8px] font-black px-1 bg-rose-600 text-white rounded-full">
                  +25XP
                </span>
              )}
            </button>

            <span>Synergizing our core competencies requires attendance. Thank you.</span>
          </div>

          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-medium">
            <span>💡 Tap highlighted phrases to inspect flaws</span>
            <span className="font-bold text-amber-700">+25 XP each</span>
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
