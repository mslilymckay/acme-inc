import React from 'react';
import { AlertTriangle, ArrowRight, Terminal } from 'lucide-react';
import { InspectTabData } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';

interface InspectTabProps {
  data: InspectTabData;
}

export const InspectTab: React.FC<InspectTabProps> = ({ data }) => {
  const { setCurrentTab } = useGameStore();

  return (
    <div className="flex flex-col h-full justify-between pb-2 overflow-hidden">
      <div className="space-y-3">
        {/* Crime Scene Prompt Box */}
        <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-comic-sm">
          {/* Hazard banner */}
          <div className="bg-amber-300 border-b-2 border-black px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-900" />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                The Crime Scene Prompt
              </span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-black text-amber-300 rounded font-mono">
              EVIDENCE #2.1
            </span>
          </div>

          <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed">
            <div className="text-slate-400 text-[11px] select-none mb-1">
              // Prompt sent by Sam to Cortex:
            </div>
            <div className="font-bold text-white bg-slate-800 p-2.5 rounded-lg border border-slate-700 text-[13px]">
              "{data.crime_scene_prompt}"
            </div>
          </div>
        </div>

        {/* Glowing Warning Panel (The 4 Prompt Pillars Intro) */}
        <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-3 shadow-comic-sm relative overflow-hidden">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 border-2 border-black flex items-center justify-center shrink-0 shadow-comic-sm mt-0.5">
              <AlertTriangle className="w-4 h-4 text-slate-900" />
            </div>

            <div>
              <h4 className="font-black text-sm text-slate-900 tracking-tight">
                {data.warning_panel.title}
              </h4>
              <p className="text-xs text-slate-800 mt-1 leading-snug font-medium">
                {data.warning_panel.body}
              </p>
            </div>
          </div>

          {/* 4 Prompt Planner Quadrants Preview */}
          <div className="mt-3 pt-2.5 border-t border-amber-300/60 grid grid-cols-2 gap-2">
            <div className="bg-white border-2 border-rose-300 rounded-xl p-2 text-center shadow-xs">
              <span className="text-[11px] font-black text-rose-800 block uppercase">1. Persona</span>
              <span className="text-[10px] font-semibold text-slate-600 block mt-0.5">Who should the AI behave as?</span>
            </div>
            <div className="bg-white border-2 border-cyan-300 rounded-xl p-2 text-center shadow-xs">
              <span className="text-[11px] font-black text-cyan-800 block uppercase">2. Audience</span>
              <span className="text-[10px] font-semibold text-slate-600 block mt-0.5">Who is reading?</span>
            </div>
            <div className="bg-white border-2 border-amber-300 rounded-xl p-2 text-center shadow-xs">
              <span className="text-[11px] font-black text-amber-800 block uppercase">3. Context</span>
              <span className="text-[10px] font-semibold text-slate-600 block mt-0.5">What is the goal?</span>
            </div>
            <div className="bg-white border-2 border-lime-300 rounded-xl p-2 text-center shadow-xs">
              <span className="text-[11px] font-black text-lime-800 block uppercase">4. Format</span>
              <span className="text-[10px] font-semibold text-slate-600 block mt-0.5">How should it look?</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Next Step Button: Open Workbench */}
      <div className="pt-2">
        <button
          onClick={() => setCurrentTab('workbench')}
          className="w-full py-2.5 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-extrabold text-xs text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <span>Open Workbench</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
