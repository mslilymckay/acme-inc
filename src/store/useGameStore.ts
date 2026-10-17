import { create } from 'zustand';
import { ActiveView, CaseData, Hotspot } from '../types/game';
import { INITIAL_CASES } from '../data/cases';

interface GameState {
  userXp: number;
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
  assignChip: (slotId: string, chipId: string) => void;
  removeChip: (slotId: string) => void;
  checkSolution: () => boolean;
  openFieldGuide: () => void;
  closeFieldGuide: () => void;
  replayCase: (caseId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  userXp: 150, // Starting XP from cleared Level 1 mysteries
  cases: INITIAL_CASES,
  activeView: 'HOME',
  currentCaseId: '2.1',
  currentTab: 'observe',
  discoveredHotspots: {
    '2.1': []
  },
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
    const currentDiscovered = get().discoveredHotspots[caseId] || [];
    const isNew = !currentDiscovered.includes(hotspot.id);

    set({
      activeHotspotClue: hotspot,
      ...(isNew ? {
        userXp: get().userXp + hotspot.xp_value,
        discoveredHotspots: {
          ...get().discoveredHotspots,
          [caseId]: [...currentDiscovered, hotspot.id]
        }
      } : {})
    });
  },

  closeHotspotModal: () => set({ activeHotspotClue: null }),

  assignChip: (slotId, chipId) => {
    const currentAssignments = { ...get().slotAssignments };
    
    // If this chip was already in another slot, unassign it from that slot
    Object.keys(currentAssignments).forEach((sId) => {
      if (currentAssignments[sId] === chipId) {
        currentAssignments[sId] = null;
      }
    });

    currentAssignments[slotId] = chipId;
    set({ slotAssignments: currentAssignments });

    // Auto-check solution if all slots are filled
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

      // Also unlock next case if applicable (e.g. 2.2)
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
        userXp: wasAlreadyCompleted ? userXp : userXp + 100 // +100 Clarity XP for solve
      });

      return true;
    }

    return false;
  },

  openFieldGuide: () => set({ showFieldGuideModal: true }),
  closeFieldGuide: () => set({ showFieldGuideModal: false }),

  replayCase: (caseId) => {
    set({
      currentCaseId: caseId,
      currentTab: 'observe',
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
