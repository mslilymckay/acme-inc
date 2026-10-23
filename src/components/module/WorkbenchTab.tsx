import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, BookOpen, Sparkles, AlertCircle, X, FileText } from 'lucide-react';
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

  // Bidirectional interaction state: either quadrant or card can be selected first!
  const [selectedQuadrantId, setSelectedQuadrantId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scramble available prompt cards so they are never in slot order
  const scrambledChips = useMemo(() => {
    const chips = [...data.available_chips];
    const order = ["chip_length", "chip_bullets", "chip_exec", "chip_ld", "chip_jargon", "chip_reg", "chip_managers"];
    return chips.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [data.available_chips]);

  const assignedChipIds = Object.values(slotAssignments).filter(Boolean) as string[];
  const unassignedChips = scrambledChips.filter(chip => !assignedChipIds.includes(chip.id));

  const getChipById = (id: string | null) => {
    if (!id) return null;
    return data.available_chips.find(c => c.id === id);
  };

  const selectedQuadrant = data.bento_slots.find(s => s.id === selectedQuadrantId);
  const selectedCard = data.available_chips.find(c => c.id === selectedCardId);

  // --- BIDIRECTIONAL MATCHING LOGIC ---

  // User taps a quadrant (landing zone)
  const handleQuadrantClick = (slotId: string) => {
    setErrorMessage(null);

    // If a card was already selected in the tray -> Assign it to this quadrant!
    if (selectedCardId) {
      assignChip(slotId, selectedCardId);
      setSelectedCardId(null);
      setSelectedQuadrantId(null);
      return;
    }

    // If this quadrant already has a card assigned
    if (slotAssignments[slotId]) {
      // If tapping the already selected quadrant -> deselect
      if (selectedQuadrantId === slotId) {
        setSelectedQuadrantId(null);
      } else {
        // Select it for replacement or unassignment
        setSelectedQuadrantId(slotId);
      }
      return;
    }

    // Empty quadrant tapped: toggle selection
    if (selectedQuadrantId === slotId) {
      setSelectedQuadrantId(null);
    } else {
      setSelectedQuadrantId(slotId);
    }
  };

  // Remove card from quadrant
  const handleRemoveFromQuadrant = (e: React.MouseEvent, slotId: string) => {
    e.stopPropagation();
    removeChip(slotId);
    setSelectedQuadrantId(slotId);
    setSelectedCardId(null);
  };

  // User taps an index card in the tray
  const handleCardClick = (chipId: string) => {
    setErrorMessage(null);

    // If a quadrant was already selected -> Assign this card to that quadrant!
    if (selectedQuadrantId) {
      assignChip(selectedQuadrantId, chipId);
      setSelectedQuadrantId(null);
      setSelectedCardId(null);
      return;
    }

    // Toggle card selection
    if (selectedCardId === chipId) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(chipId);
    }
  };

  const handleSimulate = () => {
    const success = checkSolution();
    if (!success) {
      setErrorMessage("Close! But Cortex is still showing poor results. Try again by clearing the planner or replacing cards one-by-one.");
    } else {
      setErrorMessage(null);
    }
  };

  // Styling helper for quadrants (Coach Notes styled landing zones)
  const quadrantThemes: Record<string, {
    emptyBg: string;
    emptyBorder: string;
    filledBg: string;
    filledBorder: string;
    titleColor: string;
    descColor: string;
    label: string;
    category: string;
    sublabel: string;
  }> = {
    slot_role: {
      emptyBg: 'bg-rose-50/70 hover:bg-rose-100/60',
      emptyBorder: 'border-rose-300',
      filledBg: 'bg-rose-100',
      filledBorder: 'border-rose-400',
      titleColor: 'text-rose-900',
      descColor: 'text-rose-700',
      label: '1. Role',
      category: 'ROLE',
      sublabel: 'Who is the AI?'
    },
    slot_audience: {
      emptyBg: 'bg-cyan-50/70 hover:bg-cyan-100/60',
      emptyBorder: 'border-cyan-300',
      filledBg: 'bg-cyan-100',
      filledBorder: 'border-cyan-400',
      titleColor: 'text-cyan-900',
      descColor: 'text-cyan-700',
      label: '2. Audience',
      category: 'AUDIENCE',
      sublabel: 'Who is reading?'
    },
    slot_context: {
      emptyBg: 'bg-amber-50/70 hover:bg-amber-100/60',
      emptyBorder: 'border-amber-300',
      filledBg: 'bg-amber-100',
      filledBorder: 'border-amber-400',
      titleColor: 'text-amber-900',
      descColor: 'text-amber-700',
      label: '3. Context',
      category: 'CONTEXT',
      sublabel: 'What are the facts?'
    },
    slot_format: {
      emptyBg: 'bg-lime-50/70 hover:bg-lime-100/60',
      emptyBorder: 'border-lime-300',
      filledBg: 'bg-lime-100',
      filledBorder: 'border-lime-400',
      titleColor: 'text-lime-900',
      descColor: 'text-lime-700',
      label: '4. Format',
      category: 'FORMAT',
      sublabel: 'Length & structure'
    }
  };

  // Card color styles in the tray (larger note cards, no bullets)
  const getTrayCardStyle = (chipId: string) => {
    const chip = data.available_chips.find(c => c.id === chipId);
    const isSelected = selectedCardId === chipId;

    let baseColors = 'bg-stone-50 border-stone-300 text-stone-800 hover:bg-stone-100';
    if (chip) {
      switch (chip.category) {
        case 'role':
          baseColors = 'bg-rose-100/90 border-rose-400 text-rose-950 hover:bg-rose-200';
          break;
        case 'audience':
          baseColors = 'bg-cyan-100/90 border-cyan-400 text-cyan-950 hover:bg-cyan-200';
          break;
        case 'context':
          baseColors = 'bg-amber-100/90 border-amber-400 text-amber-950 hover:bg-amber-200';
          break;
        case 'format':
          baseColors = 'bg-lime-100/90 border-lime-400 text-lime-950 hover:bg-lime-200';
          break;
      }
    }

    if (isSelected) {
      return `${baseColors} ring-3 ring-amber-400 border-black shadow-comic scale-105 z-10`;
    }

    return `${baseColors} shadow-comic-sm hover:translate-y-[-1px]`;
  };

  // Dynamic helper text based on interaction state
  const getHelperText = () => {
    if (selectedCardId && selectedCard) {
      return `👉 Tap a quadrant above to place [${selectedCard.text}]`;
    }
    if (selectedQuadrantId && selectedQuadrant) {
      return `👉 Tap a card below to assign to [${selectedQuadrant.label}]`;
    }
    return `Tap any card or quadrant to begin matching`;
  };

  return (
    <div className="flex flex-col h-full justify-between pb-2 overflow-hidden relative">
      <div className="space-y-2">
        {/* Instruction Header */}
        <div className="flex items-center justify-between px-0.5">
          <div className="min-w-0 pr-1">
            <h3 className="font-extrabold text-xs text-slate-900 tracking-tight flex items-center gap-1.5 truncate">
              <FileText className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>4-Corner Prompt Planner</span>
            </h3>
            <p className="text-[10px] text-slate-500 font-semibold truncate">
              {getHelperText()}
            </p>
          </div>

          <button
            onClick={() => {
              clearAllSlots();
              setSelectedQuadrantId(null);
              setSelectedCardId(null);
              setErrorMessage(null);
            }}
            className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-black rounded-lg text-[10px] font-bold text-slate-700 shadow-comic-sm flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* 4-CORNER PROMPT PLANNER (Clean Landing Zones without crosshair dividers) */}
        <div className="bg-[#faf8f5] border-2 border-black rounded-2xl shadow-comic overflow-hidden relative">
          {/* Top Binding Strip */}
          <div className="bg-stone-800 border-b-2 border-black px-3.5 py-1.5 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-amber-300">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 border border-black inline-block shrink-0" />
              <span className="truncate">4-CORNER PROMPT PLANNER</span>
            </div>
            <span className="text-stone-400 font-semibold shrink-0 ml-1">#2.1</span>
          </div>

          {/* Planner Surface: 4 Landing Zones */}
          <div className="p-2.5">
            <div className="grid grid-cols-2 gap-2">
              {data.bento_slots.map((slot) => {
                const assignedChip = getChipById(slotAssignments[slot.id]);
                const theme = quadrantThemes[slot.id] || {
                  emptyBg: 'bg-white',
                  emptyBorder: 'border-stone-300',
                  filledBg: 'bg-white',
                  filledBorder: 'border-black',
                  titleColor: 'text-slate-900',
                  descColor: 'text-slate-500',
                  label: slot.label,
                  category: slot.label.toUpperCase(),
                  sublabel: slot.description || ''
                };
                const isQuadrantSelected = selectedQuadrantId === slot.id;

                // When filled: The assigned index card fills the entire quadrant target area!
                if (assignedChip) {
                  return (
                    <div
                      key={slot.id}
                      onClick={() => handleQuadrantClick(slot.id)}
                      className={`p-2 rounded-xl border-2 border-black transition-all cursor-pointer min-h-[92px] flex flex-col justify-between relative shadow-comic-sm ${theme.filledBg} ${
                        isQuadrantSelected
                          ? 'ring-3 ring-amber-400 scale-[1.02]'
                          : 'hover:scale-[1.01]'
                      }`}
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 15px, rgba(0,0,0,0.04) 16px, rgba(0,0,0,0.04) 17px)'
                      }}
                    >
                      {/* Top Category Tag & Remove Button */}
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[9px] font-black uppercase tracking-wider text-black/60 font-mono">
                          {theme.category}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveFromQuadrant(e, slot.id)}
                          className="w-4 h-4 rounded-full bg-black/10 hover:bg-rose-500 hover:text-white text-slate-700 flex items-center justify-center transition-colors shrink-0"
                          title="Remove card"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      {/* Centered Large Bold Marker Text */}
                      <div className="my-auto py-1 text-center">
                        <span className="text-xs font-black text-slate-900 tracking-tight leading-snug block">
                          {assignedChip.text}
                        </span>
                      </div>

                      {/* Card footer indicator */}
                      <div className="text-[8px] font-bold text-black/40 text-center uppercase tracking-wider">
                        {isQuadrantSelected ? 'Tap card to swap' : 'Tap to replace'}
                      </div>
                    </div>
                  );
                }

                // When empty: Centered quadrant label with descriptor underneath (Coach Notes design, no buttons)
                return (
                  <div
                    key={slot.id}
                    onClick={() => handleQuadrantClick(slot.id)}
                    className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer min-h-[92px] flex flex-col items-center justify-center text-center ${
                      isQuadrantSelected
                        ? 'bg-amber-50 border-amber-500 ring-3 ring-amber-400 scale-[1.02] shadow-comic-sm'
                        : `${theme.emptyBg} ${theme.emptyBorder} border-dashed hover:border-solid hover:scale-[1.01]`
                    }`}
                  >
                    <span className={`text-xs font-black uppercase tracking-tight block ${theme.titleColor}`}>
                      {theme.label}
                    </span>
                    <p className={`text-[10px] font-semibold mt-0.5 leading-tight ${theme.descColor}`}>
                      {theme.sublabel}
                    </p>
                    {isQuadrantSelected && (
                      <span className="mt-1.5 text-[8px] font-black uppercase px-1.5 py-0.5 bg-black text-amber-300 rounded animate-pulse">
                        Selected Target
                      </span>
                    )}
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
            <span className="leading-tight">{errorMessage}</span>
          </motion.div>
        )}

        {/* ASSORTMENT OF COLORED INDEX CARDS (TRAY: Larger note cards, no bullets) */}
        <div className={`bg-white border-2 rounded-2xl p-2.5 transition-all shadow-comic-sm ${
          selectedQuadrantId || selectedCardId
            ? 'border-amber-500 ring-2 ring-amber-300'
            : 'border-black'
        }`}>
          <div className="flex items-center justify-between mb-2 px-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-slate-500" />
              <span>Available Note Cards ({unassignedChips.length})</span>
            </span>
            <span className="text-[9px] font-semibold text-slate-400">
              Tap to match
            </span>
          </div>

          {/* Larger Note Cards, No Bullets */}
          <div className="flex flex-wrap gap-2 min-h-[58px] items-center">
            {unassignedChips.map((chip) => {
              return (
                <button
                  key={chip.id}
                  onClick={() => handleCardClick(chip.id)}
                  className={`px-3 py-1.5 rounded-xl border-2 border-black font-black text-xs transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${getTrayCardStyle(chip.id)}`}
                >
                  <span>{chip.text}</span>
                </button>
              );
            })}

            {unassignedChips.length === 0 && (
              <span className="text-xs text-slate-400 italic py-1 mx-auto font-medium">
                All 4 quadrants filled! Review your cards and simulate below.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SIMULATE BAR (Always active so user can think/absorb before submitting) */}
      <div className="pt-2">
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
                    Case Solved: Coach Notes Assembled!
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-800">
                    +100 Clarity XP Earned
                  </span>
                </div>
              </div>

              {/* Sam's Character Card with Tap-to-Expand Quote */}
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
                  <span>Replay / Clear Planner</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
