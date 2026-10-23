import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle2, RotateCcw, BookOpen, Sparkles, AlertCircle, ArrowDownUp, FolderOpen, X } from 'lucide-react';
import { WorkbenchTabData, ReferenceFileCard } from '../../../types/game';
import { useGameStore } from '../../../store/useGameStore';
import { CharacterAvatar } from '../../common/CharacterAvatar';

interface CardSwapperProps {
  data: WorkbenchTabData;
  caseId: string;
}

export const CardSwapper: React.FC<CardSwapperProps> = ({ data, caseId }) => {
  const { isSolved, openFieldGuide, checkSolution, replayCase } = useGameStore();

  const referenceCards: ReferenceFileCard[] = data.reference_cards || [];
  const initialAdjectives: string[] = data.initial_adjectives || [];

  const [injectedCardId, setInjectedCardId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const injectedCard = referenceCards.find((c) => c.id === injectedCardId);

  const handleSelectCard = (cardId: string) => {
    setErrorMessage(null);
    setInjectedCardId(cardId);
  };

  const handleRevert = () => {
    setInjectedCardId(null);
    setErrorMessage(null);
  };

  const handleSimulate = () => {
    if (!injectedCardId || !injectedCard) {
      setErrorMessage("The prompt is still relying on abstract adjectives! Select a concrete reference file from Chloe's folder below.");
      return;
    }

    if (!injectedCard.isCorrect) {
      const feedback = injectedCard.feedbackNote || "That reference sample doesn't match your CEO's authentic tone.";
      setErrorMessage(`${feedback} Reset Chloe's notepad or change your selections to proceed.`);
      return;
    }

    // Success!
    setErrorMessage(null);
    checkSolution(true);
  };

  return (
    <div className="flex flex-col min-h-full justify-between pb-2 pr-0.5 select-none relative">
      <div className="flex-1 flex flex-col min-h-0 space-y-2">
        {/* Instruction Header */}
        <div className="flex items-center justify-between px-0.5 shrink-0">
          <div className="min-w-0 pr-1">
            <h3 className="font-extrabold text-xs text-slate-900 tracking-tight flex items-center gap-1.5 truncate">
              <ArrowDownUp className="w-3.5 h-3.5 text-purple-700 shrink-0" />
              <span>The Example Injector</span>
            </h3>
            <p className="text-[11px] text-slate-600 font-semibold truncate">
              Swap Chloe's vague adjectives for a concrete past reference file
            </p>
          </div>

          <button
            onClick={handleRevert}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-black rounded-lg text-[11px] font-bold text-slate-700 shadow-comic-sm flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* TOP SECTION: CHLOE'S LEGAL PAD (PROMPT SLOT) */}
        <div className="bg-[#fef9c3] border-2 border-black rounded-2xl shadow-comic overflow-hidden relative shrink-0">
          {/* Legal Pad Top Binding Tape */}
          <div className="bg-stone-800 border-b-2 border-black px-3.5 py-1.5 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-amber-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 border border-black inline-block" />
              <span>CHLOE'S SPEECH BRIEF NOTEPAD</span>
            </div>
            <span className="text-stone-400 font-semibold">CASE #2.3</span>
          </div>

          {/* Legal Pad Active Slot Content */}
          <div className="p-3">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Anchor Slot: Tone & Style Directive</span>
              {injectedCard ? (
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-400">
                  ✓ Reference Sample Injected
                </span>
              ) : (
                <span className="text-[9px] font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-400 animate-pulse">
                  ⚠️ Subjective Adjective Overload
                </span>
              )}
            </div>

            {injectedCard ? (
              /* DOCKED REFERENCE FILE CARD */
              <div className="p-2.5 rounded-xl border-2 border-black bg-white shadow-comic-sm relative flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-purple-100 border border-purple-400 text-purple-950 font-mono">
                    {injectedCard.category}
                  </span>
                  <button
                    onClick={handleRevert}
                    className="w-4.5 h-4.5 rounded-full bg-black/10 hover:bg-rose-500 hover:text-white text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove file and restore adjectives"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <h4 className="text-xs font-black text-slate-900 leading-snug">
                  {injectedCard.title}
                </h4>
                <p className="text-[11px] text-slate-700 italic mt-1 leading-snug bg-slate-50 p-1.5 rounded border border-slate-200">
                  "{injectedCard.excerpt}"
                </p>

                <div className="text-[9px] font-bold text-emerald-700 text-center uppercase tracking-wider mt-1.5">
                  Style anchor locked! Ready to test below.
                </div>
              </div>
            ) : (
              /* INITIAL 3-ADJECTIVE STACK */
              <div className="space-y-1.5">
                <div className="grid grid-cols-1 gap-1.5">
                  {initialAdjectives.map((adj, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 rounded-lg border border-dashed border-amber-400 bg-white/80 text-xs font-bold text-slate-800 shadow-xs flex items-center justify-between"
                    >
                      <span>"{adj}"</span>
                      <span className="text-[9px] font-bold text-amber-700 italic">Vague Tone</span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-center font-bold text-slate-500 pt-0.5">
                  👇 Tap a reference file below to swap out these adjectives
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION: CHLOE'S MANILA REFERENCE FILE FOLDER */}
        <div className="flex-1 flex flex-col bg-[#fed7aa] border-2 border-black rounded-2xl shadow-comic overflow-hidden min-h-0">
          {/* Manila Folder Tab Header */}
          <div className="bg-[#fb923c] border-b-2 border-black px-3.5 py-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-900 shrink-0">
            <div className="flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5 text-slate-900" />
              <span>Chloe's Reference Folder</span>
            </div>
            <span className="text-slate-800 font-mono text-[9px] font-black">
              {referenceCards.length} FILES
            </span>
          </div>

          {/* List of Candidate Reference Cards */}
          <div className="p-2 flex-1 flex flex-col justify-between gap-1.5 min-h-0">
            {referenceCards.map((card) => {
              const isSelected = injectedCardId === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  className={`p-2 rounded-xl border-2 transition-all cursor-pointer relative shadow-xs flex-1 flex flex-col justify-center ${
                    isSelected
                      ? 'bg-purple-100 border-purple-700 ring-2 ring-purple-400 shadow-comic-sm'
                      : 'bg-white border-black hover:border-purple-600 shadow-comic-sm hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 border border-black/15 text-slate-700 font-mono">
                      {card.category}
                    </span>

                    {isSelected ? (
                      <span className="text-[9px] font-black uppercase text-purple-900 bg-purple-200 px-1.5 py-0.2 rounded">
                        Active In Brief
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-500">
                        Tap to Inject ➔
                      </span>
                    )}
                  </div>

                  <h5 className="text-xs font-black text-slate-900 leading-tight">
                    {card.title}
                  </h5>
                  <p className="text-[10px] text-slate-600 truncate mt-0.5">
                    "{card.excerpt}"
                  </p>
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
            className="p-2.5 bg-rose-50 border-2 border-rose-400 rounded-xl flex items-center gap-2 text-xs text-rose-900 font-bold shrink-0"
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 select-none">
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

              {/* Chloe's Satisfied Character Card */}
              <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
                <CharacterAvatar
                  name="Chloe"
                  role="Executive Comms"
                  mood="satisfied"
                  quote={data.success_resolution.character_reaction_quote}
                  size="md"
                />
              </div>

              {/* Resolved Prompt Preview with Few-Shot Attachment Highlighting */}
              <div className="p-3 bg-slate-900 text-white rounded-xl font-mono text-xs leading-relaxed border-2 border-black">
                <div className="text-[10px] text-slate-400 mb-1 font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3 h-3 text-emerald-400" />
                  <span>Few-Shot Prompt Simulation:</span>
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
                    handleRevert();
                  }}
                  className="w-full py-2 bg-white hover:bg-slate-100 border border-black rounded-xl font-bold text-xs text-slate-700 shadow-comic-sm flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay / Reset Notepad</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
