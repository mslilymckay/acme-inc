import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, BookOpen, Sparkles, AlertCircle, X } from 'lucide-react';
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
    isSolved,
    openFieldGuide,
    checkSolution
  } = useGameStore();

  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Find which chips are already placed in any slot
  const assignedChipIds = Object.values(slotAssignments).filter(Boolean) as string[];
  const availableChips = data.available_chips.filter(chip => !assignedChipIds.includes(chip.id));

  // Handle tapping a chip from the tray
  const handleChipClick = (chipId: string) => {
    setErrorMessage(null);

    // If a specific slot is targeted, place it there
    if (activeSlotId && !slotAssignments[activeSlotId]) {
      assignChip(activeSlotId, chipId);
      setActiveSlotId(null);
      return;
    }

    // Otherwise, place into the first empty slot
    const emptySlot = data.bento_slots.find(slot => !slotAssignments[slot.id]);
    if (emptySlot) {
      assignChip(emptySlot.id, chipId);
    }
  };

  // Manual test trigger if all filled but not yet solved
  const handleSimulate = () => {
    const success = checkSolution();
    if (!success) {
      setErrorMessage("Close! But Cortex is still stumbling. Check if any distractor chips snuck into your brief!");
    } else {
      setErrorMessage(null);
    }
  };

  const getChipById = (id: string | null) => {
    if (!id) return null;
    return data.available_chips.find(c => c.id === id);
  };

  return (
    <div className="flex flex-col h-full justify-between pb-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Instruction Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
              Bento Briefing Tray
            </h3>
            <p className="text-[11px] text-slate-600">
              Tap chips below to assign the 4 briefing pillars.
            </p>
          </div>

          <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-acme-yellow border border-black rounded-full shadow-comic-sm">
            Case 2.1
          </span>
        </div>

        {/* 4 Bento Slots Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {data.bento_slots.map((slot) => {
            const assignedChip = getChipById(slotAssignments[slot.id]);
            const isTargeted = activeSlotId === slot.id;

            return (
              <div
                key={slot.id}
                onClick={() => {
                  if (assignedChip) {
                    removeChip(slot.id);
                  } else {
                    setActiveSlotId(isTargeted ? null : slot.id);
                  }
                }}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer min-h-[96px] flex flex-col justify-between relative shadow-comic-sm ${
                  assignedChip
                    ? 'bg-white border-black ring-2 ring-emerald-500/20'
                    : isTargeted
                    ? 'bg-amber-50 border-amber-500 border-dashed ring-2 ring-amber-400'
                    : 'bg-slate-50 border-slate-300 border-dashed hover:border-slate-400'
                }`}
              >
                {/* Slot Label & Hint */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                    {slot.label}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400">
                    {slot.description}
                  </span>
                </div>

                {/* Slot Content */}
                <div className="mt-2">
                  {assignedChip ? (
                    <div className="inline-flex items-center justify-between w-full px-2.5 py-1.5 bg-acme-yellow border border-black rounded-lg text-xs font-black text-slate-900 shadow-comic-sm">
                      <span className="truncate">{assignedChip.text}</span>
                      <X className="w-3.5 h-3.5 text-slate-700 ml-1 shrink-0 hover:text-black" />
                    </div>
                  ) : (
                    <div className="text-[11px] font-bold text-slate-400 text-center py-1">
                      {isTargeted ? "Select chip below ➔" : "+ Tap to assign"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Error message toast if incorrect */}
        {errorMessage && !isSolved && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 bg-rose-50 border-2 border-rose-400 rounded-xl flex items-center gap-2 text-xs text-rose-900 font-bold"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Noun Chips Shelf */}
        <div className="bg-white border-2 border-black rounded-2xl p-3 shadow-comic-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
              Available Context Chips ({availableChips.length})
            </span>
            <span className="text-[9px] font-medium text-slate-400">
              Tap chip to load into Bento
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleChipClick(chip.id)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-acme-yellow border-2 border-black rounded-xl text-xs font-bold text-slate-800 shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                {chip.text}
              </button>
            ))}

            {availableChips.length === 0 && (
              <span className="text-xs text-slate-400 italic py-1">
                All chips placed! Ready to test.
              </span>
            )}
          </div>
        </div>

        {/* SUCCESS RESOLUTION CARD */}
        <AnimatePresence>
          {isSolved && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-emerald-50 border-3 border-black rounded-3xl p-4 shadow-comic space-y-3"
            >
              {/* Header with Satisfaction Emoji Reaction */}
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-400 border-2 border-black flex items-center justify-center shadow-comic-sm">
                    <CheckCircle2 className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900">
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

              {/* Sam's Dry Satisfaction Reaction */}
              <div className="bg-white border-2 border-black rounded-xl p-3 shadow-comic-sm">
                <CharacterAvatar
                  name="Sam"
                  role="L&D Lead"
                  avatar="🥪"
                  mood="satisfied"
                  quote={data.success_resolution.character_reaction_quote}
                />
              </div>

              {/* Resolved Prompt with color-coded variables */}
              <div className="p-3 bg-slate-900 text-white rounded-xl font-mono text-xs leading-relaxed border-2 border-black">
                <div className="text-[10px] text-slate-400 mb-1 font-sans font-bold uppercase tracking-wider">
                  Resolved Prompt Simulation:
                </div>
                <p>
                  Act as an <span className="text-rose-400 font-bold bg-rose-950 px-1 rounded">[L&D Lead]</span> writing to <span className="text-cyan-400 font-bold bg-cyan-950 px-1 rounded">[Managers]</span>. We need a <span className="text-amber-400 font-bold bg-amber-950 px-1 rounded">[Registration Link]</span> reminder formatted as a short email with <span className="text-lime-400 font-bold bg-lime-950 px-1 rounded">[Bullet Points]</span>.
                </p>
              </div>

              {/* Unlock Field Guide Button */}
              <button
                onClick={openFieldGuide}
                className="w-full py-3 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-black text-sm text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-comic-sm transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Unlock Field Guide Card</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Check / Reset Bar if not solved */}
      {!isSolved && (
        <div className="pt-4 flex gap-2">
          <button
            onClick={() => {
              Object.keys(slotAssignments).forEach(slotId => removeChip(slotId));
              setErrorMessage(null);
            }}
            className="px-3 py-3 bg-white hover:bg-slate-100 border-2 border-black rounded-xl text-xs font-bold text-slate-700 shadow-comic-sm flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5"
            title="Reset Bento Tray"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSimulate}
            className="flex-1 py-3 bg-acme-yellow hover:bg-yellow-400 border-2 border-black rounded-xl font-extrabold text-sm text-slate-900 shadow-comic flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-comic-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Simulate Cortex Prompt</span>
          </button>
        </div>
      )}
    </div>
  );
};
