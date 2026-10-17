import { create } from 'zustand';
import { ActiveView, CaseData, Hotspot } from '../types/game';
import { INITIAL_CASES } from '../data/cases';

interface GameState {
  userXp: number;
  xpToast: string | null;
  cases: Record<string, CaseData>;
  activeView: ActiveView;
  currentCaseId: string;
  currentTab: 'observe' | 'inspect' | 'workbench';
  discoveredHotspots: Record<string, string[]>;
  activeHotspotClue: Hotspot | null;
  slotAssignments: Record<string, string | null>;
  isSolved: boolean;
  showFieldGuideModal: boolean;
  unlockedBadges: string[];

  // Actions
  setActiveView: (view: ActiveView) => void;
  setCurrentCase: (caseId: string) => void;
  setCurrentTab: (tab: 'observe' | 'inspect' | 'workbench') => void;
  discoverHotspot: (caseId: string, hotspot: Hotspot) => void;
  closeHotspotModal: () => void;
  clearXpToast: () => void;
  assignChip: (slotId: string, chipId: string) => void;
  removeChip: (slotId: string) => void;
  clearAllSlots: () => void;
  checkSolution: () => boolean;
  openFieldGuide: (caseId?: string) => void;
  closeFieldGuide: () => void;
  replayCase: (caseId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  userXp: 150, // Starting XP from cleared Level 1 mysteries
  xpToast: null,
  cases: INITIAL_CASES,
  activeView: 'HOME',
  currentCaseId: '2.1',
  currentTab: 'observe',
  discoveredHotspots: {},
  activeHotspotClue: null,
  slotAssignments: {
    slot_role: null,
    slot_audience: null,
    slot_context: null,
    slot_format: null,
  },
  isSolved: false,
  showFieldGuideModal: false,
  unlockedBadges: ['The Mental Modelist'],

  setActiveView: (view) => set({ activeView: view }),

  setCurrentCase: (caseId) => {
    // Strictly sanitize caseId to prevent event objects from corrupting store
    if (typeof caseId !== 'string' || !caseId) return;

    const caseData = get().cases[caseId];
    if (!caseData) return;

    set({
      currentCaseId: caseId,
      activeView: 'MODULE',
      currentTab: 'observe',
      isSolved: caseData.status === 'completed',
      activeHotspotClue: null,
      slotAssignments: {
        slot_role: null,
        slot_audience: null,
        slot_context: null,
        slot_format: null,
      }
    });
  },

  setCurrentTab: (tab) => set({ currentTab: tab }),

  discoverHotspot: (caseId, hotspot) => {
    if (typeof caseId !== 'string' || !hotspot) return;

    const state = get();
    const currentDiscovered = state.discoveredHotspots[caseId] || [];
    const isNew = !currentDiscovered.includes(hotspot.id);

    if (isNew) {
      const newDiscovered = [...currentDiscovered, hotspot.id];
      const newXp = state.userXp + (hotspot.xp_value || 25);
      
      set({
        activeHotspotClue: hotspot,
        userXp: newXp,
        xpToast: `+${hotspot.xp_value || 25}`,
        discoveredHotspots: {
          ...state.discoveredHotspots,
          [caseId]: newDiscovered
        }
      });
    } else {
      set({
        activeHotspotClue: hotspot
      });
    }
  },

  closeHotspotModal: () => set({ activeHotspotClue: null }),

  clearXpToast: () => set({ xpToast: null }),

  assignChip: (slotId, chipId) => {
    const currentAssignments = { ...get().slotAssignments };
    
    // If chip was in another slot, unassign it
    Object.keys(currentAssignments).forEach((sId) => {
      if (currentAssignments[sId] === chipId) {
        currentAssignments[sId] = null;
      }
    });

    currentAssignments[slotId] = chipId;
    set({ slotAssignments: currentAssignments });

    // Check solution if all slots filled
    const allFilled = Object.values(currentAssignments).every(val => val !== null);
    if (allFilled) {
      get().checkSolution();
    }
  },

  removeChip: (slotId) => {
    set((state) => ({
      slotAssignments: {
        ...state.slotAssignments,
        [slotId]: null
      }
    }));
  },

  clearAllSlots: () => {
    set({
      slotAssignments: {
        slot_role: null,
        slot_audience: null,
        slot_context: null,
        slot_format: null,
      },
      isSolved: false
    });
  },

  checkSolution: () => {
    const { currentCaseId, cases, slotAssignments, userXp, unlockedBadges } = get();
    const currentCase = cases[currentCaseId];
    if (!currentCase) return false;

    const solutionMapping = currentCase.module_data.workbench_tab.solution_mapping;
    const isCorrect = Object.entries(solutionMapping).every(
      ([slotId, expectedChipId]) => slotAssignments[slotId] === expectedChipId
    );

    if (isCorrect) {
      const updatedCases = { ...cases };
      const wasAlreadyCompleted = updatedCases[currentCaseId].status === 'completed';
      
      updatedCases[currentCaseId] = {
        ...updatedCases[currentCaseId],
        status: 'completed'
      };

      // Unlock next case (2.2)
      if (currentCaseId === '2.1' && updatedCases['2.2']) {
        updatedCases['2.2'] = {
          ...updatedCases['2.2'],
          status: 'active'
        };
      }

      const newBadges = [...unlockedBadges];
      if (!newBadges.includes(currentCase.badge_name)) {
        newBadges.push(currentCase.badge_name);
      }

      set({
        isSolved: true,
        cases: updatedCases,
        unlockedBadges: newBadges,
        userXp: wasAlreadyCompleted ? userXp : userXp + 100,
        xpToast: wasAlreadyCompleted ? null : "+100"
      });

      return true;
    }

    return false;
  },

  openFieldGuide: (caseId) => {
    // Sanitize: only set currentCaseId if caseId is a valid string
    if (typeof caseId === 'string' && caseId) {
      set({ currentCaseId: caseId, showFieldGuideModal: true });
    } else {
      set({ showFieldGuideModal: true });
    }
  },

  closeFieldGuide: () => set({ showFieldGuideModal: false }),

  replayCase: (caseId) => {
    const validId = typeof caseId === 'string' && caseId ? caseId : get().currentCaseId;
    set({
      currentCaseId: validId,
      currentTab: 'workbench',
      activeView: 'MODULE',
      isSolved: false,
      showFieldGuideModal: false,
      slotAssignments: {
        slot_role: null,
        slot_audience: null,
        slot_context: null,
        slot_format: null,
      }
    });
  }
}));
