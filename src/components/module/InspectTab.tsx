import React from 'react';
import { AlertTriangle, ArrowRight, Bento, ShieldAlert, Terminal } from 'lucide-react';
import { InspectTabData } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';

interface InspectTabProps {
  data: InspectTabData;
}

export const InspectTab: React.FC<InspectTabProps> = ({ data }) => {
  const { setCurrentTab } = useGameStore();

  return (
    <div className="flex flex-col h-full justify-between pb-4">
      <div className="space-y-4">
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
            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-black text-amber-300 rounded font-mono">
              EVIDENCE #2.1
            </span>
          </div>

          <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed">
            <div className="text-slate-500 text-[10px] select-none mb-1">
              // Prompt sent by Sam (L&D Lead) to Cortex AI:
            </div>
            <div className="font-bold text-white bg-slate-800 p-2.5 rounded-lg border border-slate-700">
              "{data.crime_scene_prompt}"
            </div>
          </div>
        </div>

        {/* Glowing Warning Panel (The Bento Box Intro) */}
        <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-4 shadow-comic-sm relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 border-2 border-black flex items-center justify-center shrink-0 shadow-comic-sm">
              <AlertTriangle className="w-5 h-5 text-slate-900" />
            </div>

            <div>
              <h4 className="font-black text-sm text-slate-900 tracking-tight">
                {data.warning_panel.title}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {data.warning_panel.body}
              </p>
            </div>
          </div>

          {/* 4 Bento Compartment Badges Preview */}
          <div className="mt-4 pt-3 border-t border-amber-300/60 grid grid-cols-2 gap-2">
            <div className="bg-white border border-rose-300 rounded-lg p-2 text-center">
              <span className="text-[10px] font-extrabold text-rose-700 block uppercase">1. Role</span>
              <span className="text-[9px] text-slate-500">Who are you?</span>
            </div>
            <div className="bg-white border border-cyan-300 rounded-lg p-2 text-center">
              <span className="text-[10px] font-extrabold text-cyan-700 block uppercase">2. Audience</span>
              <span className="text-[9px] text-slate-500">Who is reading?</span>
            </div>
            <div className="bg-white border border-amber-300 rounded-lg p-2 text-center">
              <span className="text-[10px] font-extrabold text-amber-700 block uppercase">3. Context</span>
              <span className="text-[9px] text-slate-500">What is the goal?</span>
            </div>
            <div className="bg-white border border-lime-300 rounded-lg p-2 text-center">
              <span className="text-[10px] font-extrabold text-lime-700 block uppercase">4. Format</span>
              <span className="text-[9px] text-slate-500">How should it look?</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Next Step Button */}
      <div className="pt-4">
        <button
          onClick={() => setCurrentTab('workbench')}
          className="w-full py-3 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-extrabold text-sm text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-comic-sm transition-all"
        >
          <span>Open Bento Workbench</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
