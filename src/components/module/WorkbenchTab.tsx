import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, BookOpen, Sparkles, AlertCircle, X, FileText } from 'lucide-react';
import { WorkbenchTabData } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';
import { CharacterAvatar } from '../common/CharacterAvatar';
import { RedPenPruner } from './workbench/RedPenPruner';

interface WorkbenchTabProps {
  data: WorkbenchTabData;
  caseId: string;
}

interface DragState {
  chipId: string;
  fromSlotId: string | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
}

export const WorkbenchTab: React.FC<WorkbenchTabProps> = ({ data, caseId }) => {
  // Delegate to specific archetype workbenches
  if (data.archetype === 'red_pen_pruner' || caseId === '2.2') {
    return <RedPenPruner data={data} caseId={caseId} />;
  }

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

  // Drag-and-drop state + fallback tap selection
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [hoveredSlotId, setHoveredSlotId] = useState<string | null>(null);
  const [selectedQuadrantId, setSelectedQuadrantId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableChips = data.available_chips || [];
  const bentoSlots = data.bento_slots || [];

  // Scramble available prompt cards so they are never in slot order
  const scrambledChips = useMemo(() => {
    const chips = [...availableChips];
    const order = ["chip_length", "chip_bullets", "chip_exec", "chip_ld", "chip_jargon", "chip_reg", "chip_managers"];
    return chips.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [availableChips]);

  const assignedChipIds = Object.values(slotAssignments).filter(Boolean) as string[];
  const unassignedChips = scrambledChips.filter(chip => !assignedChipIds.includes(chip.id));

  const getChipById = (id: string | null) => {
    if (!id) return null;
    return availableChips.find(c => c.id === id);
  };

  // Global pointer move / up listeners during active drag
  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      const dist = Math.hypot(dx, dy);
      const isNowDragging = dragState.isDragging || dist > 6;

      setDragState(prev =>
        prev
          ? {
              ...prev,
              currentX: e.clientX,
              currentY: e.clientY,
              isDragging: isNowDragging
            }
          : null
      );

      if (isNowDragging) {
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const slotEl = elements.find(el => el.getAttribute('data-slot-id'));
        const slotId = slotEl ? slotEl.getAttribute('data-slot-id') : null;
        setHoveredSlotId(slotId);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (dragState.isDragging) {
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const slotEl = elements.find(el => el.getAttribute('data-slot-id'));
        const targetSlotId = slotEl ? slotEl.getAttribute('data-slot-id') : null;

        if (targetSlotId) {
          assignChip(targetSlotId, dragState.chipId);
          setSelectedCardId(null);
          setSelectedQuadrantId(null);
        } else if (dragState.fromSlotId) {
          // Dragged out of a quadrant back into the tray
          removeChip(dragState.fromSlotId);
        }
      } else {
        // Pointer barely moved -> treat as a tap
        if (dragState.fromSlotId) {
          handleQuadrantTap(dragState.fromSlotId);
        } else {
          handleCardTap(dragState.chipId);
        }
      }

      setDragState(null);
      setHoveredSlotId(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [dragState]);

  const startCardDrag = (e: React.PointerEvent, chipId: string, fromSlotId: string | null = null) => {
    setErrorMessage(null);
    setDragState({
      chipId,
      fromSlotId,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isDragging: false
    });
  };

  // Fallback tap support (works alongside drag-and-drop)
  const handleQuadrantTap = (slotId: string) => {
    setErrorMessage(null);
    if (selectedCardId) {
      assignChip(slotId, selectedCardId);
      setSelectedCardId(null);
      setSelectedQuadrantId(null);
      return;
    }
    if (slotAssignments[slotId]) {
      setSelectedQuadrantId(selectedQuadrantId === slotId ? null : slotId);
      return;
    }
    setSelectedQuadrantId(selectedQuadrantId === slotId ? null : slotId);
  };

  const handleCardTap = (chipId: string) => {
    setErrorMessage(null);
    if (selectedQuadrantId) {
      assignChip(selectedQuadrantId, chipId);
      setSelectedQuadrantId(null);
      setSelectedCardId(null);
      return;
    }
    setSelectedCardId(selectedCardId === chipId ? null : chipId);
  };

  const handleRemoveFromQuadrant = (e: React.MouseEvent | React.PointerEvent, slotId: string) => {
    e.stopPropagation();
    removeChip(slotId);
    setSelectedQuadrantId(null);
    setSelectedCardId(null);
  };

  const handleSimulate = () => {
    const success = checkSolution();
    if (!success) {
      setErrorMessage("Close! But Cortex is still showing poor results. Try again by clearing the planner or replacing cards one-by-one.");
    } else {
      setErrorMessage(null);
    }
  };

  // Styling helper for the 4 quadrants (Updated Role -> Persona)
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
      descColor: 'text-rose-800',
      label: '1. Persona',
      category: 'PERSONA',
      sublabel: 'Who should the AI behave as?'
    },
    slot_audience: {
      emptyBg: 'bg-cyan-50/70 hover:bg-cyan-100/60',
      emptyBorder: 'border-cyan-300',
      filledBg: 'bg-cyan-100',
      filledBorder: 'border-cyan-400',
      titleColor: 'text-cyan-900',
      descColor: 'text-cyan-800',
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
      descColor: 'text-amber-800',
      label: '3. Context',
      category: 'CONTEXT',
      sublabel: 'What is the goal?'
    },
    slot_format: {
      emptyBg: 'bg-lime-50/70 hover:bg-lime-100/60',
      emptyBorder: 'border-lime-300',
      filledBg: 'bg-lime-100',
      filledBorder: 'border-lime-400',
      titleColor: 'text-lime-900',
      descColor: 'text-lime-800',
      label: '4. Format',
      category: 'FORMAT',
      sublabel: 'How should it look?'
    }
  };

  const getCardColorClasses = (chipId: string) => {
    const chip = availableChips.find(c => c.id === chipId);
    if (!chip) return 'bg-stone-50 border-stone-300 text-stone-800';
    switch (chip.category) {
      case 'role':
        return 'bg-rose-100 border-rose-400 text-rose-950';
      case 'audience':
        return 'bg-cyan-100 border-cyan-400 text-cyan-950';
      case 'context':
        return 'bg-amber-100 border-amber-400 text-amber-950';
      case 'format':
        return 'bg-lime-100 border-lime-400 text-lime-950';
      default:
        return 'bg-stone-50 border-stone-300 text-stone-800';
    }
  };

  const getTrayCardStyle = (chipId: string) => {
    const baseColors = getCardColorClasses(chipId);
    const isSelected = selectedCardId === chipId;
    const isBeingDragged = dragState?.isDragging && dragState.chipId === chipId;

    if (isBeingDragged) {
      return `${baseColors} opacity-40 border-dashed scale-95`;
    }
    if (isSelected) {
      return `${baseColors} ring-3 ring-amber-400 border-black shadow-comic scale-105 z-10`;
    }
    return `${baseColors} shadow-comic-sm hover:translate-y-[-1px]`;
  };

  const activeDraggedChip = dragState?.isDragging ? getChipById(dragState.chipId) : null;

  return (
    <div className="flex flex-col h-full justify-between pb-2 overflow-hidden relative select-none">
      <div className="space-y-2">
        {/* Instruction Header */}
        <div className="flex items-center justify-between px-0.5">
          <div className="min-w-0 pr-1">
            <h3 className="font-extrabold text-xs text-slate-900 tracking-tight flex items-center gap-1.5 truncate">
              <FileText className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>4-Corner Prompt Planner</span>
            </h3>
            <p className="text-[11px] text-slate-600 font-semibold truncate">
              Drag note cards onto the 4 quadrants (or tap to match)
            </p>
          </div>

          <button
            onClick={() => {
              clearAllSlots();
              setSelectedQuadrantId(null);
              setSelectedCardId(null);
              setErrorMessage(null);
            }}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-black rounded-lg text-[11px] font-bold text-slate-700 shadow-comic-sm flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>

        {/* 4-CORNER PROMPT PLANNER */}
        <div className="bg-[#faf8f5] border-2 border-black rounded-2xl shadow-comic overflow-hidden relative">
          {/* Top Binding Strip */}
          <div className="bg-stone-800 border-b-2 border-black px-3.5 py-1.5 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-amber-300">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 border border-black inline-block shrink-0" />
              <span className="truncate">4-CORNER PROMPT PLANNER</span>
            </div>
            <span className="text-stone-400 font-semibold shrink-0 ml-1">#2.1</span>
          </div>

          {/* Planner Surface: 4 Drop-Zone Quadrants */}
          <div className="p-2.5">
            <div className="grid grid-cols-2 gap-2">
              {bentoSlots.map((slot) => {
                const assignedChip = getChipById(slotAssignments[slot.id]);
                const theme = quadrantThemes[slot.id] || {
                  emptyBg: 'bg-white',
                  emptyBorder: 'border-stone-300',
                  filledBg: 'bg-white',
                  filledBorder: 'border-black',
                  titleColor: 'text-slate-900',
                  descColor: 'text-slate-600',
                  label: slot.label,
                  category: slot.label.toUpperCase(),
                  sublabel: slot.description || ''
                };
                const isHoveredDropTarget = hoveredSlotId === slot.id;
                const isQuadrantSelected = selectedQuadrantId === slot.id;

                // When filled: The assigned index card fills the entire quadrant target area!
                if (assignedChip) {
                  return (
                    <div
                      key={slot.id}
                      data-slot-id={slot.id}
                      onPointerDown={(e) => startCardDrag(e, assignedChip.id, slot.id)}
                      className={`p-2.5 rounded-xl border-2 border-black transition-all cursor-grab active:cursor-grabbing touch-none min-h-[92px] flex flex-col justify-between relative shadow-comic-sm ${theme.filledBg} ${
                        isHoveredDropTarget || isQuadrantSelected
                          ? 'ring-3 ring-amber-400 scale-[1.02]'
                          : 'hover:scale-[1.01]'
                      }`}
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 16px, rgba(0,0,0,0.04) 17px, rgba(0,0,0,0.04) 18px)'
                      }}
                    >
                      {/* Top Category Tag & Remove Button */}
                      <div className="flex items-center justify-between w-full pointer-events-auto">
                        <span className="text-[10px] font-black uppercase tracking-wider text-black/60 font-mono">
                          {theme.category}
                        </span>
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => handleRemoveFromQuadrant(e, slot.id)}
                          className="w-4.5 h-4.5 rounded-full bg-black/10 hover:bg-rose-500 hover:text-white text-slate-800 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                          title="Remove card"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Centered Large Bold Marker Text */}
                      <div className="my-auto py-1 text-center pointer-events-none">
                        <span className="text-[13px] font-black text-slate-900 tracking-tight leading-snug block">
                          {assignedChip.text}
                        </span>
                      </div>

                      {/* Card footer indicator */}
                      <div className="text-[9px] font-bold text-black/45 text-center uppercase tracking-wider pointer-events-none">
                        Drag or tap ✕ to remove
                      </div>
                    </div>
                  );
                }

                // When empty: Centered quadrant label with descriptor underneath
                return (
                  <div
                    key={slot.id}
                    data-slot-id={slot.id}
                    onClick={() => handleQuadrantTap(slot.id)}
                    className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer min-h-[92px] flex flex-col items-center justify-center text-center ${
                      isHoveredDropTarget || isQuadrantSelected
                        ? 'bg-amber-50 border-amber-500 ring-3 ring-amber-400 scale-[1.02] shadow-comic-sm'
                        : `${theme.emptyBg} ${theme.emptyBorder} border-dashed hover:border-solid`
                    }`}
                  >
                    <span className={`text-[13px] font-black uppercase tracking-tight block pointer-events-none ${theme.titleColor}`}>
                      {theme.label}
                    </span>
                    <p className={`text-[11px] font-semibold mt-0.5 leading-tight pointer-events-none ${theme.descColor}`}>
                      {theme.sublabel}
                    </p>
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
            className="p-2.5 bg-rose-50 border-2 border-rose-400 rounded-xl flex items-center gap-2 text-xs text-rose-900 font-bold"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="leading-snug">{errorMessage}</span>
          </motion.div>
        )}

        {/* ASSORTMENT OF COLORED NOTE CARDS (DRAGGABLE TRAY) */}
        <div className={`bg-white border-2 rounded-2xl p-2.5 transition-all shadow-comic-sm ${
          selectedQuadrantId || selectedCardId
            ? 'border-amber-500 ring-2 ring-amber-300'
            : 'border-black'
        }`}>
          <div className="flex items-center justify-between mb-2 px-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Available Note Cards ({unassignedChips.length})</span>
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              Drag to planner
            </span>
          </div>

          {/* Larger Draggable Note Cards, No Bullets */}
          <div className="flex flex-wrap gap-2 min-h-[60px] items-center">
            {unassignedChips.map((chip) => (
              <div
                key={chip.id}
                onPointerDown={(e) => startCardDrag(e, chip.id, null)}
                className={`px-3.5 py-2 rounded-xl border-2 border-black font-black text-xs transition-all cursor-grab active:cursor-grabbing touch-none select-none ${getTrayCardStyle(chip.id)}`}
              >
                <span>{chip.text}</span>
              </div>
            ))}

            {unassignedChips.length === 0 && (
              <span className="text-xs text-slate-500 italic py-1 mx-auto font-medium">
                All 4 quadrants filled! Review your cards and simulate below.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* FLOATING DRAG PREVIEW CARD */}
      {activeDraggedChip && dragState && (
        <div
          style={{
            position: 'fixed',
            left: dragState.currentX,
            top: dragState.currentY,
            transform: 'translate(-50%, -60%) rotate(-3deg)',
            zIndex: 9999,
            pointerEvents: 'none'
          }}
          className={`px-4 py-2.5 rounded-xl border-2 border-black font-black text-xs shadow-comic-lg ${getCardColorClasses(activeDraggedChip.id)}`}
        >
          {activeDraggedChip.text}
        </div>
      )}

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
                  <span className="text-[11px] font-bold text-emerald-800">
                    +100 Clarity XP Earned
                  </span>
                </div>
              </div>

              {/* Sam's Character Card with Stacked Left Column + Large Right Quote */}
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
              <div className="p-3 bg-slate-900 text-white rounded-xl font-mono text-xs leading-relaxed border-2 border-black">
                <div className="text-[10px] text-slate-400 mb-1 font-sans font-bold uppercase tracking-wider flex items-center gap-1">
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
