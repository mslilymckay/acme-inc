import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, BookOpen, Sparkles, AlertCircle, X, Hand } from 'lucide-react';
import { WorkbenchTabData } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';
import { CharacterAvatar } from '../common/CharacterAvatar';

interface WorkbenchTabProps {
  data: WorkbenchTabData;
  caseId: string;
}

export const WorkbenchTab: React.FC<WorkbenchTabProps> = ({ data, caseId }) => {
  const {
    slotAssignments,
    assignChip,
    removeChip,
    clearAllSlots,
    isSolved,
    openFieldGuide,
    checkSolution,
    replayCase
  } = useGameStore();

  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scramble available chips so they are never in slot order
  const scrambledChips = useMemo(() => {
    const chips = [...data.available_chips];
    const order = ["chip_length", "chip_bullets", "chip_exec", "chip_ld", "chip_jargon", "chip_reg", "chip_managers"];
    return chips.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [data.available_chips]);

  const assignedChipIds = Object.values(slotAssignments).filter(Boolean) as string[];
  const unassignedChips = scrambledChips.filter(chip => !assignedChipIds.includes(chip.id));

  // Find active slot object
  const activeSlot = data.bento_slots.find(s => s.id === activeSlotId);

  // Step 1: Tap slot -> Highlights slot and shifts focus to ingredients card
  const handleSlotClick = (slotId: string) => {
    setErrorMessage(null);
    if (slotAssignments[slotId]) {
      // If already assigned, remove it
      removeChip(slotId);
      setActiveSlotId(slotId);
      return;
    }

    if (activeSlotId === slotId) {
      setActiveSlotId(null);
    } else {
      setActiveSlotId(slotId);
    }
  };

  // Step 2: Tap ingredient -> Adds ingredient to the active slot
  const handleIngredientClick = (chipId: string) => {
    setErrorMessage(null);

    // Target the actively selected slot if one is highlighted
    if (activeSlotId) {
      assignChip(activeSlotId, chipId);
      
      // Auto-advance to next empty slot if available
      const nextEmptySlot = data.bento_slots.find(
        s => s.id !== activeSlotId && !slotAssignments[s.id]
      );
      setActiveSlotId(nextEmptySlot ? nextEmptySlot.id : null);
      return;
    }

    // Fallback: place into the first empty slot
    const firstEmpty = data.bento_slots.find(s => !slotAssignments[s.id]);
    if (firstEmpty) {
      assignChip(firstEmpty.id, chipId);
    }
  };

  const handleSimulate = () => {
    const success = checkSolution();
    if (!success) {
      setErrorMessage("Close! But Cortex is stumbling. Check if any distractor chips snuck into your brief!");
    } else {
      setErrorMessage(null);
    }
  };

  const getChipById = (id: string | null) => {
    if (!id) return null;
    return data.available_chips.find(c => c.id === id);
  };

  const bentoCompartmentThemes: Record<string, { bg: string; icon: string; text: string; border: string }> = {
    slot_role: { bg: 'bg-rose-50', icon: '🍱', text: 'text-rose-950', border: 'border-rose-300' },
    slot_audience: { bg: 'bg-cyan-50', icon: '🍚', text: 'text-cyan-950', border: 'border-cyan-300' },
    slot_context: { bg: 'bg-amber-50', icon: '🥗', text: 'text-amber-950', border: 'border-amber-300' },
    slot_format: { bg: 'bg-lime-50', icon: '🥢', text: 'text-lime-950', border: 'border-lime-300' }
  };

  return (
    <div className="flex flex-col h-full justify-between pb-2 overflow-hidden relative">
      <div className="space-y-2.5">
        {/* Instruction Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-xs text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Briefing Bento Box</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {activeSlotId ? `(Tap ingredient for ${activeSlot?.label})` : `(Tap slot, then ingredient)`}
              </span>
            </h3>
          </div>

          <button
            onClick={() => {
              clearAllSlots();
              setActiveSlotId(null);
              setErrorMessage(null);
            }}
            className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-black rounded-lg text-[10px] font-bold text-slate-700 shadow-comic-sm flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* AUTHENTIC BENTO BOX CONTAINER */}
        <div className="p-2.5 bg-stone-900 border-3 border-black rounded-3xl shadow-comic relative ring-2 ring-stone-700/60">
          {/* Bento Brand Stamp */}
          <div className="flex items-center justify-between pb-1.5 px-1 text-[9px] font-black uppercase tracking-wider text-amber-400 font-mono">
            <span>ACME BENTO • 4-PILLAR TRAY</span>
            <span className="text-stone-300">#2.1</span>
          </div>

          {/* LIGHT INNER CONTAINER */}
          <div className="grid grid-cols-2 gap-2 bg-stone-100 p-2 rounded-2xl border-2 border-stone-300 shadow-inner">
            {data.bento_slots.map((slot) => {
              const assignedChip = getChipById(slotAssignments[slot.id]);
              const theme = bentoCompartmentThemes[slot.id] || { bg: 'bg-white', icon: '🍱', text: 'text-slate-900', border: 'border-slate-300' };
              const isActive = activeSlotId === slot.id;

              return (
                <div
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id)}
                  className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer min-h-[88px] flex flex-col justify-between relative shadow-xs ${
                    isActive
                      ? 'bg-yellow-50 border-amber-500 ring-3 ring-amber-300 scale-[1.02]'
                      : assignedChip
                      ? `${theme.bg} ${theme.border} border-solid shadow-comic-sm`
                      : 'bg-white border-dashed border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {/* Compartment Label & Bento Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 text-slate-800">
                      <span>{theme.icon}</span>
                      <span>{slot.label}</span>
                    </span>
                    {isActive ? (
                      <span className="text-[8px] font-black uppercase bg-black text-amber-300 px-1 rounded animate-pulse">
                        Active
                      </span>
                    ) : (
                      <span className="text-[8px] font-bold text-slate-400">
                        {slot.description}
                      </span>
                    )}
                  </div>

                  {/* Placed Chip or Selection Prompt */}
                  <div className="mt-1">
                    {assignedChip ? (
                      <div className="inline-flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-black rounded-lg text-xs font-black text-slate-900 shadow-comic-sm">
                        <span className="truncate">{assignedChip.text}</span>
                        <X className="w-3.5 h-3.5 text-rose-600 ml-1 shrink-0 hover:scale-110" />
                      </div>
                    ) : (
                      <div className={`text-[10px] font-bold text-center py-1.5 rounded-lg border ${
                        isActive
                          ? 'border-amber-400 text-amber-900 bg-amber-100/60 font-black'
                          : 'border-dashed border-stone-200 text-slate-400 bg-stone-50/50'
                      }`}>
                        {isActive ? "👉 Pick ingredient" : "+ Tap to assign"}
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
            className="p-2 bg-rose-50 border-2 border-rose-400 rounded-xl flex items-center gap-2 text-xs text-rose-900 font-bold"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* SCRAMBLED INGREDIENTS CARD */}
        <div className={`bg-white border-2 rounded-2xl p-2.5 transition-all shadow-comic-sm ${
          activeSlotId
            ? 'border-amber-500 ring-2 ring-amber-300'
            : 'border-black'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Hand className="w-3 h-3 text-slate-500" />
              {activeSlotId ? (
                <span className="text-amber-800 font-extrabold">
                  Select Ingredient for [{activeSlot?.label}]:
                </span>
              ) : (
                <span>Available Ingredients ({unassignedChips.length})</span>
              )}
            </span>
            <span className="text-[9px] font-medium text-slate-400">
              Tap to add
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[60px] items-center">
            {unassignedChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleIngredientClick(chip.id)}
                className="px-2.5 py-1.5 rounded-xl border-2 border-black text-xs font-bold text-slate-900 bg-slate-100 hover:bg-yellow-200 active:bg-acme-yellow shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                {chip.text}
              </button>
            ))}

            {unassignedChips.length === 0 && (
              <span className="text-xs text-slate-400 italic py-1 mx-auto">
                All 4 slots filled! Ready to test below.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SIMULATE BAR */}
      <div className="pt-2">
        <button
          onClick={handleSimulate}
          className="w-full py-2.5 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-extrabold text-xs text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-700 fill-amber-500" />
          <span>Simulate Cortex Prompt</span>
        </button>
      </div>

      {/* FULL SUCCESS OVERLAY MODAL (Focus on Pleased Sam, no emoji badge) */}
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
                <div className="w-8 h-8 rounded-xl bg-emerald-400 border-2 border-black flex items-center justify-center shadow-comic-sm">
                  <CheckCircle2 className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900 leading-tight">
                    {data.success_resolution.heading}
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-800">
                    +100 Clarity XP Earned
                  </span>
                </div>
              </div>

              {/* Sam's Pleased Character Card (Earnestly satisfied with wide eyes & full smile) */}
              <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
                <CharacterAvatar
                  name="Sam"
                  role="L&D Lead"
                  mood="satisfied"
                  quote={data.success_resolution.character_reaction_quote}
                  size="md"
                />
              </div>

              {/* Resolved Prompt Preview */}
              <div className="p-2.5 bg-slate-900 text-white rounded-xl font-mono text-[11px] leading-relaxed border-2 border-black">
                <div className="text-[9px] text-slate-400 mb-1 font-sans font-bold uppercase tracking-wider">
                  Resolved Prompt Simulation:
                </div>
                <p>
                  Act as an <span className="text-rose-400 font-bold bg-rose-950 px-1 rounded">[L&D Lead]</span> writing to <span className="text-cyan-400 font-bold bg-cyan-950 px-1 rounded">[Managers]</span>. We need a <span className="text-amber-400 font-bold bg-amber-950 px-1 rounded">[Registration Link]</span> reminder formatted as a short email with <span className="text-lime-400 font-bold bg-lime-950 px-1 rounded">[Bullet Points]</span>.
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
                  onClick={() => replayCase(caseId)}
                  className="w-full py-2 bg-white hover:bg-slate-100 border border-black rounded-xl font-bold text-xs text-slate-700 shadow-comic-sm flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay / Clear Bento Tray</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
