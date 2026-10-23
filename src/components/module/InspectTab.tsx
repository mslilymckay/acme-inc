import React from 'react';
import { AlertTriangle, ArrowRight, Terminal, PenTool, Zap, FolderOpen } from 'lucide-react';
import { InspectTabData } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';

interface InspectTabProps {
  data: InspectTabData;
  caseId?: string;
}

export const InspectTab: React.FC<InspectTabProps> = ({ data, caseId = '2.1' }) => {
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
              EVIDENCE #{caseId}
            </span>
          </div>

          <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed">
            <div className="text-slate-400 text-[11px] select-none mb-1">
              // Prompt sent to Cortex:
            </div>
            <div className="font-bold text-white bg-slate-800 p-2.5 rounded-lg border border-slate-700 text-[13px]">
              "{data.crime_scene_prompt}"
            </div>
          </div>
        </div>

        {/* Diagnostic Warning Panel: Styled to match Case Archetype */}
        {caseId === '2.3' ? (
          /* Case 2.3: Manila Reference Folder Swapper Preview */
          <div className="bg-[#fed7aa] border-2 border-black rounded-2xl shadow-comic-sm overflow-hidden">
            {/* Manila Folder Tab Header */}
            <div className="bg-[#fb923c] border-b-2 border-black px-3.5 py-1.5 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-slate-900">
              <div className="flex items-center gap-1.5">
                <FolderOpen className="w-3.5 h-3.5 text-slate-900" />
                <span>CHLOE'S REFERENCE FOLDER PREVIEW</span>
              </div>
              <span className="text-amber-950 font-black">FEW-SHOT ANCHOR</span>
            </div>

            <div className="p-3 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#fb923c] border-2 border-black flex items-center justify-center shrink-0 shadow-comic-sm mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-slate-900" />
                </div>

                <div>
                  <h4 className="font-black text-sm text-slate-900 tracking-tight">
                    {data.warning_panel.title}
                  </h4>
                  <p className="text-xs text-slate-800 mt-0.5 leading-snug font-medium">
                    {data.warning_panel.body}
                  </p>
                </div>
              </div>

              {/* Adjective vs File Comparison (Styled as File Sleeves) */}
              <div className="p-2.5 bg-[#ffedd5] border-2 border-black/20 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-800">
                  <span className="flex items-center gap-1">
                    <FolderOpen className="w-3 h-3 text-orange-600" />
                    The Few-Shot Injection Strategy:
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="bg-rose-50 border border-rose-300 rounded-lg p-2 shadow-xs">
                    <span className="text-[9px] font-black text-rose-900 uppercase block">❌ Current Ask</span>
                    <span className="text-[10px] font-bold text-rose-950 block leading-tight mt-0.5">50 Vague Adjectives</span>
                    <span className="text-[9px] text-rose-700 italic block mt-0.5">"visionary yet grounded"</span>
                  </div>
                  <div className="bg-white border-2 border-purple-600 rounded-lg p-2 shadow-xs">
                    <span className="text-[9px] font-black text-purple-900 uppercase block">✓ Better Ask</span>
                    <span className="text-[10px] font-bold text-purple-950 block leading-tight mt-0.5">1 Reference File</span>
                    <span className="text-[9px] text-purple-700 font-bold block mt-0.5">"2025 CEO Town Hall"</span>
                  </div>
                </div>

                <div className="text-[10px] font-bold text-purple-900 text-center italic">
                  📁 Next step: Open Chloe's folder on the Workbench to inject a real reference file!
                </div>
              </div>
            </div>
          </div>
        ) : caseId === '2.2' ? (
          /* Case 2.2: Clipboard & Contradiction Preview */
          <div className="bg-[#fefce8] border-2 border-black rounded-2xl shadow-comic-sm overflow-hidden">
            {/* Metal Clip Header */}
            <div className="bg-stone-800 border-b-2 border-black px-3 py-1 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-amber-300">
              <div className="flex items-center gap-1.5">
                <PenTool className="w-3 h-3 text-rose-500" />
                <span>LIAM'S NOTEPAD PREVIEW</span>
              </div>
              <span className="text-stone-400">CONFLICT DETECTED</span>
            </div>

            <div className="p-3 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400 border-2 border-black flex items-center justify-center shrink-0 shadow-comic-sm mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-slate-900" />
                </div>

                <div>
                  <h4 className="font-black text-sm text-slate-900 tracking-tight">
                    {data.warning_panel.title}
                  </h4>
                  <p className="text-xs text-slate-800 mt-0.5 leading-snug font-medium">
                    {data.warning_panel.body}
                  </p>
                </div>
              </div>

              {/* Contradictory Rules Collision Preview */}
              <div className="p-2 bg-amber-100/60 border border-amber-300 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-amber-950">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-600 fill-amber-500" />
                    Opposing Rules Fighting Each Other:
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-center font-mono">
                  <div className="bg-white border border-black/20 rounded-lg p-1.5">
                    <span className="text-[9px] font-black text-emerald-800 uppercase block">Rule 1</span>
                    <span className="text-[10px] font-bold text-slate-800">"3-bullet Slack update"</span>
                  </div>
                  <div className="bg-rose-100/80 border border-rose-400 rounded-lg p-1.5">
                    <span className="text-[9px] font-black text-rose-900 uppercase block">Rule 2</span>
                    <span className="text-[10px] font-bold text-rose-950">"18-page dissertation"</span>
                  </div>
                </div>

                <div className="text-[10px] font-bold text-slate-600 text-center italic">
                  ✂️ Next step: Use the Red Pen on Liam's clipboard to prune the noise!
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Case 2.1: 4-Corner Prompt Planner Preview */
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
        )}
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
