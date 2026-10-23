import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, CheckCircle2, RotateCcw, BookOpen, Sparkles, AlertCircle, Trash2 } from 'lucide-react';
import { WorkbenchTabData, PruningRule } from '../../../types/game';
import { useGameStore } from '../../../store/useGameStore';
import { CharacterAvatar } from '../../common/CharacterAvatar';

interface RedPenPrunerProps {
  data: WorkbenchTabData;
  caseId: string;
}

export const RedPenPruner: React.FC<RedPenPrunerProps> = ({ data, caseId }) => {
  const { isSolved, openFieldGuide, checkSolution, replayCase } = useGameStore();

  const rules: PruningRule[] = data.pruning_rules || [];
  const [prunedRuleIds, setPrunedRuleIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const togglePrune = (ruleId: string) => {
    setErrorMessage(null);
    setPrunedRuleIds((prev) =>
      prev.includes(ruleId) ? prev.filter((id) => id !== ruleId) : [...prev, ruleId]
    );
  };

  const resetPruning = () => {
    setPrunedRuleIds([]);
    setErrorMessage(null);
  };

  const handleSimulate = () => {
    const contradictoryRules = rules.filter((r) => r.isContradiction).map((r) => r.id);
    const validRules = rules.filter((r) => !r.isContradiction).map((r) => r.id);

    // Check if any valid rule was mistakenly pruned
    const wronglyPruned = prunedRuleIds.some((id) => validRules.includes(id));
    if (wronglyPruned) {
      setErrorMessage("Careful! You struck out a valid product instruction. Reset Liam's notepad or change your selections to proceed.");
      return;
    }

    // Check if all contradictions are pruned
    const allContradictionsPruned = contradictoryRules.every((id) => prunedRuleIds.includes(id));
    if (!allContradictionsPruned) {
      setErrorMessage("Close! But there are still conflicting rules fighting each other. Reset Liam's notepad or change your selections to proceed.");
      return;
    }

    // Success!
    setErrorMessage(null);
    checkSolution(true);
  };

  const totalContradictions = rules.filter((r) => r.isContradiction).length;
  const prunedContradictionsCount = rules.filter((r) => r.isContradiction && prunedRuleIds.includes(r.id)).length;
  const isReadyToSimulate = prunedContradictionsCount === totalContradictions && prunedRuleIds.length === totalContradictions;

  return (
    <div className="flex flex-col min-h-full justify-between pb-2 pr-0.5 select-none relative">
      <div className="flex-1 flex flex-col min-h-0 space-y-2">
        {/* Instruction Header */}
        <div className="flex items-center justify-between px-0.5 shrink-0">
          <div className="min-w-0 pr-1">
            <h3 className="font-extrabold text-xs text-slate-900 tracking-tight flex items-center gap-1.5 truncate">
              <PenTool className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>The Red-Pen Pruner</span>
            </h3>
            <p className="text-[11px] text-slate-600 font-semibold truncate">
              Tap contradictory rules with the Red Pen to strike them out
            </p>
          </div>

          <button
            onClick={resetPruning}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-black rounded-lg text-[11px] font-bold text-slate-700 shadow-comic-sm flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* OFFICE CLIPBOARD / NOTEPAD CONTAINER (Spans entire available space without internal scroll) */}
        <div className="flex-1 flex flex-col bg-[#fefce8] border-2 border-black rounded-2xl shadow-comic overflow-hidden min-h-0">
          {/* Metal Clipboard Top Header */}
          <div className="bg-stone-800 border-b-2 border-black px-3.5 py-1.5 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-amber-300 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300 border border-black inline-block" />
              <span>LIAM'S PROMPT NOTEPAD</span>
            </div>
            <span className="text-stone-400 font-semibold">CASE #2.2</span>
          </div>

          {/* Progress / Status Sub-bar */}
          <div className="bg-amber-100/70 border-b border-black/10 px-3 py-1 flex items-center justify-between shrink-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Trash2 className="w-3 h-3 text-rose-600" />
              <span>Contradictions Pruned: {prunedContradictionsCount}/{totalContradictions}</span>
            </span>
          </div>

          {/* Lined Paper List of Rules (Flexibly distributed, no internal scroll) */}
          <div className="p-2 flex-1 flex flex-col justify-between gap-1.5 min-h-0">
            {rules.map((rule) => {
              const isPruned = prunedRuleIds.includes(rule.id);

              return (
                <div
                  key={rule.id}
                  onClick={() => togglePrune(rule.id)}
                  className={`p-2 rounded-xl border-2 transition-all cursor-pointer relative shadow-xs flex-1 flex flex-col justify-center ${
                    isPruned
                      ? 'bg-rose-50/60 border-rose-400/80 opacity-70'
                      : 'bg-white border-black hover:border-rose-500 shadow-comic-sm hover:scale-[1.01]'
                  }`}
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 16px, rgba(0,0,0,0.03) 17px, rgba(0,0,0,0.03) 18px)'
                  }}
                >
                  {/* Category Tag & Conflict Source */}
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 border border-black/15 text-slate-700 font-mono">
                      {rule.category}
                    </span>

                    {rule.sourceLabel && (
                      <span className="text-[9px] font-bold text-rose-700 italic">
                        {rule.sourceLabel}
                      </span>
                    )}

                    {isPruned && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 bg-rose-600 text-white rounded font-mono shadow-xs">
                        ✕ PRUNED
                      </span>
                    )}
                  </div>

                  {/* Rule Text with Red Strikethrough Effect */}
                  <div className="relative">
                    <p
                      className={`text-xs font-black leading-snug tracking-tight ${
                        isPruned ? 'text-slate-400 line-through decoration-rose-600 decoration-3' : 'text-slate-900'
                      }`}
                    >
                      {rule.text}
                    </p>

                    {/* Tactile Red Pen Scribble Overlay when pruned */}
                    {isPruned && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-full h-0.5 bg-rose-600/80 -rotate-1 rounded" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error message toast */}
        {errorMessage && !isSolved && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 bg-rose-50 border-2 border-rose-400 rounded-xl flex items-center gap-2 text-xs text-rose-900 font-bold shrink-0"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="leading-snug">{errorMessage}</span>
          </motion.div>
        )}
      </div>

      {/* BOTTOM SIMULATE BAR */}
      <div className="pt-2 shrink-0">
        <button
          onClick={handleSimulate}
          className="w-full py-2.5 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-extrabold text-xs text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-700 fill-amber-500" />
          <span>Simulate Cortex Prompt</span>
        </button>
      </div>

      {/* FULL SUCCESS OVERLAY MODAL */}
      <AnimatePresence>
        {isSolved && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-emerald-50 border-3 border-black rounded-3xl p-4 shadow-comic space-y-3"
            >
              {/* Header without emoji in corner */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-black/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-400 border-2 border-black flex items-center justify-center shadow-comic-sm shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900 leading-tight">
                    {data.success_resolution.heading}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-800">
                    +100 Clarity XP Earned
                  </span>
                </div>
              </div>

              {/* Liam's Satisfied Character Card */}
              <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
                <CharacterAvatar
                  name="Liam"
                  role="Product Manager"
                  mood="satisfied"
                  quote={data.success_resolution.character_reaction_quote}
                  size="md"
                />
              </div>

              {/* Resolved Prompt Preview with Clean Signal Highlighting */}
              <div className="p-3 bg-slate-900 text-white rounded-xl font-mono text-xs leading-relaxed border-2 border-black">
                <div className="text-[10px] text-slate-400 mb-1 font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                  <PenTool className="w-3 h-3 text-emerald-400" />
                  <span>Pruned Prompt Simulation:</span>
                </div>
                <p className="text-emerald-300">
                  "{data.success_resolution.resolved_prompt_template}"
                </p>
              </div>

              {/* Action Buttons: Unlock Coach Notes + Replay Option */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => openFieldGuide(caseId)}
                  className="w-full py-2.5 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Unlock Coach Notes Card</span>
                </button>

                <button
                  onClick={() => {
                    replayCase(caseId);
                    resetPruning();
                  }}
                  className="w-full py-2 bg-white hover:bg-slate-100 border border-black rounded-xl font-bold text-xs text-slate-700 shadow-comic-sm flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay / Reset Notepad</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
