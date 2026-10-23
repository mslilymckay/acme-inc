import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, BookOpen, Sparkles, AlertCircle, X, Calendar as CalendarIcon, FileText } from 'lucide-react';
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

  // Scramble available prompt cards so they are never in slot order
  const scrambledChips = useMemo(() => {
    const chips = [...data.available_chips];
    const order = ["chip_length", "chip_bullets", "chip_exec", "chip_ld", "chip_jargon", "chip_reg", "chip_managers"];
    return chips.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [data.available_chips]);

  const assignedChipIds = Object.values(slotAssignments).filter(Boolean) as string[];
  const unassignedChips = scrambledChips.filter(chip => !assignedChipIds.includes(chip.id));

  // Find active slot object
  const activeSlot = data.bento_slots.find(s => s.id === activeSlotId);

  // Step 1: Tap slot -> Highlights slot and shifts focus to prompt cards tray
  const handleSlotClick = (slotId: string) => {
    setErrorMessage(null);
    if (slotAssignments[slotId]) {
      // If already assigned, remove it and set active for replacement
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

  // Step 2: Tap index card -> Adds card to the active slot
  const handleCardClick = (chipId: string) => {
    setErrorMessage(null);

    // Target the actively selected quadrant slot if one is highlighted
    if (activeSlotId) {
      assignChip(activeSlotId, chipId);
      
      // Auto-advance to next empty slot if available
      const nextEmptySlot = data.bento_slots.find(
        s => s.id !== activeSlotId && !slotAssignments[s.id]
      );
      setActiveSlotId(nextEmptySlot ? nextEmptySlot.id : null);
      return;
    }

    // Fallback: place into the first empty quadrant
    const firstEmpty = data.bento_slots.find(s => !slotAssignments[s.id]);
    if (firstEmpty) {
      assignChip(firstEmpty.id, chipId);
      // Highlight the next empty slot
      const subsequentEmpty = data.bento_slots.find(s => s.id !== firstEmpty.id && !slotAssignments[s.id]);
      setActiveSlotId(subsequentEmpty ? subsequentEmpty.id : null);
    }
  };

  const handleSimulate = () => {
    const success = checkSolution();
    if (!success) {
      setErrorMessage("Close! But Cortex is stumbling. Check if any distractor cards snuck onto your calendar!");
    } else {
      setErrorMessage(null);
    }
  };

  const getChipById = (id: string | null) => {
    if (!id) return null;
    return data.available_chips.find(c => c.id === id);
  };

  // Visual themes for the 4 Desk Calendar quadrants
  const calendarQuadrantThemes: Record<string, {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    label: string;
    sublabel: string;
    accentDot: string;
  }> = {
    slot_role: {
      bg: 'bg-rose-50/70',
      border: 'border-rose-300',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-900',
      label: '1. Role',
      sublabel: 'Who is speaking?',
      accentDot: 'bg-rose-500'
    },
    slot_audience: {
      bg: 'bg-cyan-50/70',
      border: 'border-cyan-300',
      badgeBg: 'bg-cyan-100',
      badgeText: 'text-cyan-900',
      label: '2. Audience',
      sublabel: 'Who is reading?',
      accentDot: 'bg-cyan-500'
    },
    slot_context: {
      bg: 'bg-amber-50/70',
      border: 'border-amber-300',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-900',
      label: '3. Context',
      sublabel: 'What is the goal?',
      accentDot: 'bg-amber-500'
    },
    slot_format: {
      bg: 'bg-lime-50/70',
      border: 'border-lime-300',
      badgeBg: 'bg-lime-100',
      badgeText: 'text-lime-900',
      label: '4. Format',
      sublabel: 'How is it structured?',
      accentDot: 'bg-lime-500'
    }
  };

  // Card background styling based on category
  const getCardStyle = (chipId: string) => {
    const chip = data.available_chips.find(c => c.id === chipId);
    if (!chip) return 'bg-white border-black text-slate-900';
    
    switch (chip.category) {
      case 'role':
        return 'bg-rose-100/90 border-rose-400 text-rose-950 hover:bg-rose-200';
      case 'audience':
        return 'bg-cyan-100/90 border-cyan-400 text-cyan-950 hover:bg-cyan-200';
      case 'context':
        return 'bg-amber-100/90 border-amber-400 text-amber-950 hover:bg-amber-200';
      case 'format':
        return 'bg-lime-100/90 border-lime-400 text-lime-950 hover:bg-lime-200';
      default:
        // Distractors: plain index card look
        return 'bg-stone-50 border-stone-300 text-stone-800 hover:bg-stone-100';
    }
  };

  return (
    <div className="flex flex-col h-full justify-between pb-2 overflow-hidden relative">
      <div className="space-y-2">
        {/* Instruction Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-xs text-slate-900 tracking-tight flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-700" />
              <span>Desk Calendar Planner</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {activeSlotId ? `(Pick card for ${activeSlot?.label})` : `(Tap slot, then card)`}
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

        {/* DESK CALENDAR PAD WITH BISECTING AXES */}
        <div className="bg-[#faf8f5] border-3 border-black rounded-3xl shadow-comic overflow-hidden relative">
          {/* Top Binding Strip with Brass Rivets */}
          <div className="bg-stone-800 border-b-2 border-black px-3 py-1 flex items-center justify-between text-[9px] font-mono font-bold tracking-wider text-amber-300">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 border border-black inline-block" />
              <span>ACME DESK CALENDAR • 4-CORNER PLANNER</span>
            </div>
            <span className="text-stone-400 font-semibold">CASE #2.1</span>
          </div>

          {/* Blotter Surface with Dark Bisecting Axes */}
          <div className="p-2 relative">
            {/* Bisecting Axis Lines (Crosshair divider) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-stone-300 -translate-x-1/2 pointer-events-none z-0" />
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-stone-300 -translate-y-1/2 pointer-events-none z-0" />

            {/* 4 Quadrants Grid */}
            <div className="grid grid-cols-2 gap-2 relative z-10">
              {data.bento_slots.map((slot) => {
                const assignedChip = getChipById(slotAssignments[slot.id]);
                const theme = calendarQuadrantThemes[slot.id] || {
                  bg: 'bg-white',
                  border: 'border-stone-300',
                  badgeBg: 'bg-stone-100',
                  badgeText: 'text-stone-800',
                  label: slot.label,
                  sublabel: slot.description || '',
                  accentDot: 'bg-stone-400'
                };
                const isActive = activeSlotId === slot.id;

                return (
                  <div
                    key={slot.id}
                    onClick={() => handleSlotClick(slot.id)}
                    className={`p-2 rounded-xl border-2 transition-all cursor-pointer min-h-[86px] flex flex-col justify-between relative shadow-xs ${
                      isActive
                        ? 'bg-amber-50/90 border-amber-500 ring-3 ring-amber-300 scale-[1.02] shadow-comic-sm'
                        : assignedChip
                        ? `${theme.bg} ${theme.border} border-solid shadow-comic-sm`
                        : 'bg-white/90 border-dashed border-stone-300 hover:border-stone-400 hover:bg-stone-50/80'
                    }`}
                  >
                    {/* Quadrant Header */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.accentDot}`} />
                        <span className="text-[10px] font-black uppercase tracking-tight text-slate-800">
                          {theme.label}
                        </span>
                      </div>
                      
                      {isActive ? (
                        <span className="text-[8px] font-black uppercase bg-black text-amber-300 px-1 py-0.2 rounded animate-pulse">
                          Active
                        </span>
                      ) : (
                        <span className="text-[8px] font-semibold text-slate-400 truncate max-w-[75px]">
                          {theme.sublabel}
                        </span>
                      )}
                    </div>

                    {/* Docked Index Card or Empty Target Prompt */}
                    <div className="mt-0.5">
                      {assignedChip ? (
                        <div className={`p-1.5 rounded-lg border-2 border-black shadow-comic-sm relative flex items-center justify-between ${getCardStyle(assignedChip.id)}`}>
                          {/* Ruled index card styling */}
                          <div className="flex items-center gap-1.5 min-w-0 pr-1">
                            <FileText className="w-3 h-3 shrink-0 opacity-70" />
                            <span className="text-xs font-black truncate leading-tight tracking-tight">
                              {assignedChip.text}
                            </span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeChip(slot.id);
                              setActiveSlotId(slot.id);
                            }}
                            className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 hover:bg-rose-600 transition-colors ml-1"
                            title="Remove card"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ) : (
                        <div className={`text-[10px] py-2 rounded-lg border text-center transition-colors ${
                          isActive
                            ? 'border-amber-400 text-amber-900 bg-amber-100/70 font-black'
                            : 'border-dashed border-stone-200 text-stone-400 bg-stone-50/60 font-medium'
                        }`}>
                          {isActive ? "👉 Pick card below" : "+ Tap to assign"}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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

        {/* ASSORTMENT OF COLORED INDEX CARDS (TRAY) */}
        <div className={`bg-white border-2 rounded-2xl p-2.5 transition-all shadow-comic-sm ${
          activeSlotId
            ? 'border-amber-500 ring-2 ring-amber-300'
            : 'border-black'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-slate-500" />
              {activeSlotId ? (
                <span className="text-amber-800 font-extrabold">
                  Select Card for [{activeSlot?.label}]:
                </span>
              ) : (
                <span>Available Index Cards ({unassignedChips.length})</span>
              )}
            </span>
            <span className="text-[9px] font-semibold text-slate-400">
              Tap card to place
            </span>
          </div>

          {/* Scrambled 3x5 Index Cards */}
          <div className="flex flex-wrap gap-1.5 min-h-[56px] items-center">
            {unassignedChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleCardClick(chip.id)}
                className={`px-2.5 py-1.5 rounded-xl border-2 border-black text-xs font-black shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 ${getCardStyle(chip.id)}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black/30 shrink-0" />
                <span>{chip.text}</span>
              </button>
            ))}

            {unassignedChips.length === 0 && (
              <span className="text-xs text-slate-400 italic py-1 mx-auto">
                All 4 calendar quadrants filled! Ready to simulate.
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

      {/* FULL SUCCESS OVERLAY MODAL (Focus on Pleased Sam, strictly no emoji badges) */}
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

              {/* Sam's Pleased Character Card (Earnestly satisfied with Bob Belcher's wide eyes & full smile) */}
              <div className="bg-white border-2 border-black rounded-xl p-2.5 shadow-comic-sm">
                <CharacterAvatar
                  name="Sam"
                  role="L&D Lead"
                  mood="satisfied"
                  quote={data.success_resolution.character_reaction_quote}
                  size="md"
                />
              </div>

              {/* Resolved Prompt Preview with Index Card Color Highlights */}
              <div className="p-2.5 bg-slate-900 text-white rounded-xl font-mono text-[11px] leading-relaxed border-2 border-black">
                <div className="text-[9px] text-slate-400 mb-1 font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Resolved Prompt Simulation:</span>
                </div>
                <p>
                  Act as an <span className="text-rose-300 font-bold bg-rose-950 px-1 py-0.5 rounded border border-rose-800">[L&D Lead]</span> writing to <span className="text-cyan-300 font-bold bg-cyan-950 px-1 py-0.5 rounded border border-cyan-800">[Managers]</span>. We need a <span className="text-amber-300 font-bold bg-amber-950 px-1 py-0.5 rounded border border-amber-800">[Registration Link]</span> reminder formatted as a short email with <span className="text-lime-300 font-bold bg-lime-950 px-1 py-0.5 rounded border border-lime-800">[Bullet Points]</span>.
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
                  <span>Replay / Clear Calendar</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
