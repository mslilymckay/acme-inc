import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, BookOpen, Sparkles, AlertCircle, X, Move } from 'lucide-react';
import { WorkbenchTabData, NounChip } from '../../types/game';
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

  const [draggedChipId, setDraggedChipId] = useState<string | null>(null);
  const [hoveredSlotId, setHoveredSlotId] = useState<string | null>(null);
  const [selectedChipId, setSelectedChipId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scramble available chips so they are never in slot order
  const scrambledChips = useMemo(() => {
    // Deterministic shuffle with distractors interspersed
    const chips = [...data.available_chips];
    const order = ["chip_length", "chip_bullets", "chip_exec", "chip_ld", "chip_jargon", "chip_reg", "chip_managers"];
    return chips.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [data.available_chips]);

  const assignedChipIds = Object.values(slotAssignments).filter(Boolean) as string[];
  const unassignedChips = scrambledChips.filter(chip => !assignedChipIds.includes(chip.id));

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, chipId: string) => {
    e.dataTransfer.setData('text/plain', chipId);
    setDraggedChipId(chipId);
  };

  const handleDragOver = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    if (hoveredSlotId !== slotId) {
      setHoveredSlotId(slotId);
    }
  };

  const handleDragLeave = () => {
    setHoveredSlotId(null);
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    const chipId = e.dataTransfer.getData('text/plain') || draggedChipId;
    if (chipId) {
      assignChip(slotId, chipId);
      setErrorMessage(null);
    }
    setDraggedChipId(null);
    setHoveredSlotId(null);
  };

  // Tap-to-place fallback for mobile touch
  const handleChipTap = (chipId: string) => {
    setErrorMessage(null);
    if (selectedChipId === chipId) {
      setSelectedChipId(null);
      return;
    }

    // If an empty slot exists, drop into the first empty slot
    const emptySlot = data.bento_slots.find(slot => !slotAssignments[slot.id]);
    if (emptySlot) {
      assignChip(emptySlot.id, chipId);
    } else {
      setSelectedChipId(chipId);
    }
  };

  const handleSlotTap = (slotId: string) => {
    if (slotAssignments[slotId]) {
      removeChip(slotId);
      return;
    }

    if (selectedChipId) {
      assignChip(slotId, selectedChipId);
      setSelectedChipId(null);
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
    slot_role: { bg: 'bg-rose-50/80', icon: '🍱', text: 'text-rose-950', border: 'border-rose-400' },
    slot_audience: { bg: 'bg-cyan-50/80', icon: '🍚', text: 'text-cyan-950', border: 'border-cyan-400' },
    slot_context: { bg: 'bg-amber-50/80', icon: '🥗', text: 'text-amber-950', border: 'border-amber-400' },
    slot_format: { bg: 'bg-lime-50/80', icon: '🥢', text: 'text-lime-950', border: 'border-lime-400' }
  };

  return (
    <div className="flex flex-col h-full justify-between pb-2 overflow-hidden relative">
      <div className="space-y-3">
        {/* Instruction Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-xs text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Briefing Bento Box</span>
              <span className="text-[10px] text-slate-500 font-normal">
                (Drag chips into compartments)
              </span>
            </h3>
          </div>

          <button
            onClick={clearAllSlots}
            className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-black rounded-lg text-[10px] font-bold text-slate-700 shadow-comic-sm flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* AUTHENTIC BENTO BOX CONTAINER */}
        <div className="p-3 bg-stone-900 border-3 border-black rounded-3xl shadow-comic relative ring-2 ring-red-950/40">
          {/* Bento Brand Stamp */}
          <div className="flex items-center justify-between pb-2 px-1 text-[10px] font-black uppercase tracking-wider text-amber-400/90 font-mono">
            <span>ACME BENTO • 4-PILLAR TRAY</span>
            <span className="text-stone-400">#2.1</span>
          </div>

          {/* 4 Partitioned Compartments Grid */}
          <div className="grid grid-cols-2 gap-2 bg-stone-950 p-2 rounded-2xl border-2 border-stone-800">
            {data.bento_slots.map((slot) => {
              const assignedChip = getChipById(slotAssignments[slot.id]);
              const theme = bentoCompartmentThemes[slot.id] || { bg: 'bg-white', icon: '🍱', text: 'text-slate-900', border: 'border-slate-300' };
              const isHovered = hoveredSlotId === slot.id;

              return (
                <div
                  key={slot.id}
                  onDragOver={(e) => handleDragOver(e, slot.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, slot.id)}
                  onClick={() => handleSlotTap(slot.id)}
                  className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer min-h-[92px] flex flex-col justify-between relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)] ${
                    isHovered
                      ? 'bg-amber-100 border-amber-500 scale-[1.02] ring-2 ring-amber-400'
                      : assignedChip
                      ? `${theme.bg} ${theme.border} border-solid`
                      : 'bg-stone-900/90 border-dashed border-stone-700 hover:border-stone-500'
                  }`}
                >
                  {/* Compartment Label & Bento Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 text-slate-800">
                      <span>{theme.icon}</span>
                      <span>{slot.label}</span>
                    </span>
                    <span className="text-[8px] font-bold text-slate-400">
                      {slot.description}
                    </span>
                  </div>

                  {/* Placed Chip or Drop Zone */}
                  <div className="mt-1">
                    {assignedChip ? (
                      <div className="inline-flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-black rounded-lg text-xs font-black text-slate-900 shadow-comic-sm">
                        <span className="truncate">{assignedChip.text}</span>
                        <X className="w-3.5 h-3.5 text-rose-600 ml-1 shrink-0 hover:scale-110" />
                      </div>
                    ) : (
                      <div className="text-[10px] font-bold text-stone-500 text-center py-2 border border-dashed border-stone-800 rounded-lg">
                        {isHovered ? "Drop here!" : "+ Drop Chip"}
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

        {/* SCRAMBLED NOUN CHIPS SHELF */}
        <div className="bg-white border-2 border-black rounded-2xl p-2.5 shadow-comic-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Move className="w-3 h-3 text-slate-500" />
              Available Ingredients ({unassignedChips.length})
            </span>
            <span className="text-[9px] font-medium text-slate-400">
              Drag or tap to assign
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[64px] items-center">
            {unassignedChips.map((chip) => (
              <div
                key={chip.id}
                draggable
                onDragStart={(e) => handleDragStart(e, chip.id)}
                onClick={() => handleChipTap(chip.id)}
                className={`px-2.5 py-1.5 rounded-xl border-2 border-black text-xs font-bold text-slate-900 shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-grab active:cursor-grabbing select-none ${
                  selectedChipId === chip.id
                    ? 'bg-acme-yellow ring-2 ring-black'
                    : 'bg-slate-100 hover:bg-yellow-200'
                }`}
              >
                {chip.text}
              </div>
            ))}

            {unassignedChips.length === 0 && (
              <span className="text-xs text-slate-400 italic py-1 mx-auto">
                All 4 slots filled! Tap Simulate below.
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

      {/* FULL SUCCESS OVERLAY MODAL (Confetti-Free, Overlay with Replay option) */}
      <AnimatePresence>
        {isSolved && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-emerald-50 border-3 border-black rounded-3xl p-4 shadow-comic space-y-3"
            >
              {/* Header with Character Satisfaction Emoji */}
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <div className="flex items-center gap-2">
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

                <div className="w-9 h-9 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-xl shadow-comic-sm">
                  {data.success_resolution.character_reaction_emoji}
                </div>
              </div>

              {/* Sam's Satisfied Character Reaction Card */}
              <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
                <CharacterAvatar
                  name="Sam"
                  role="L&D Lead"
                  avatar="🥪"
                  mood="satisfied"
                  quote={data.success_resolution.character_reaction_quote}
                  size="sm"
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

              {/* Modal Action Buttons: Unlock Field Guide + Replay Option */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={openFieldGuide}
                  className="w-full py-2.5 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-black text-xs text-slate-900 shadow-comic flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Unlock Field Guide Card</span>
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
