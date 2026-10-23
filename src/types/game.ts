export type CaseStatus = 'locked' | 'active' | 'completed';

export type ActiveView = 'HOME' | 'MODULE' | 'FIELD_GUIDE';

export interface Hotspot {
  id: string;
  text: string;
  clue_note: string;
  xp_value: number;
}

export interface FlawedOutput {
  text: string;
  hotspots: Hotspot[];
}

export interface ObserveTabData {
  colleague_name: string;
  colleague_role: string;
  colleague_avatar: string;
  message: string;
  flawed_output: FlawedOutput;
}

export interface WarningPanel {
  title: string;
  body: string;
}

export interface InspectTabData {
  crime_scene_prompt: string;
  warning_panel: WarningPanel;
}

export interface BentoSlot {
  id: string;
  label: string;
  description?: string;
  colorClass?: string;
}

export interface NounChip {
  id: string;
  text: string;
  type: 'correct' | 'distractor';
  category?: string;
}

export interface PruningRule {
  id: string;
  text: string;
  category: string;
  isContradiction: boolean;
  conflictPairId?: string;
  sourceLabel?: string;
}

export interface ReferenceFileCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt: string;
  isCorrect: boolean;
  feedbackNote?: string;
}

export interface SuccessResolution {
  heading: string;
  message: string;
  character_reaction_emoji?: string;
  character_reaction_quote: string;
  resolved_prompt_template: string;
}

export interface WorkbenchTabData {
  archetype?: '4_corner_planner' | 'red_pen_pruner' | 'card_swapper' | 'highlighter_stamp' | 'timeline_slider' | 'xray_lens' | 'flowchart_nodes';
  bento_slots?: BentoSlot[];
  available_chips?: NounChip[];
  solution_mapping?: Record<string, string>; // slot_id -> chip_id
  pruning_rules?: PruningRule[];
  reference_cards?: ReferenceFileCard[];
  initial_adjectives?: string[];
  success_resolution: SuccessResolution;
}

export interface FieldGuideData {
  title: string;
  visual_type: string;
  summary: string;
  content_bullets: string[];
  takeaway: string;
}

export interface CaseData {
  id: string;
  title: string;
  level: number;
  level_name: string;
  badge_name: string;
  badge_icon: string;
  status: CaseStatus;
  home_card: {
    hook: string;
    icon: string;
  };
  module_data: {
    observe_tab: ObserveTabData;
    inspect_tab: InspectTabData;
    workbench_tab: WorkbenchTabData;
  };
  field_guide_data: FieldGuideData;
}
