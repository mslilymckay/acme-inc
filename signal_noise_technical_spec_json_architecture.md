# Signal & Noise: Technical Spec & Data Architecture

**Project Type:** Mobile-first Progressive Web App (PWA) / Single Page Application
**Stack:** React 18, Vite 5, Tailwind CSS, Framer Motion, Zustand
**Layout:** "Centered Phone Frame" (Max-width: ~430px, centered on desktop screens, 100dvh full height, zero vertical scrollbars).

---

## 1. Component Architecture ("Golden Slice" Pattern)

The app is divided into three primary views, driven by the user's current state.

### View 1: `<HomeView>` (The Desk)
*   `<TrophyCarousel>`: Single-line header displaying all 5 Level Coach Badges (`1/5 Earned`). A level badge unlocks only after all 3 cases in that level are completed.
*   `<CaseGrid>` ("Case History"): A 3x5 matrix grouped by the 5 levels with horizontal row dividers and filter pills.
    *   `<CaseCard>`: Operates in two clean states:
        *   **Open (`active`)**: Displays case hook and `[Coach ->]` CTA; tapping opens the module.
        *   **Closed (`completed`)**: Displays solved state and `[Notes ->]` CTA; tapping opens the `<FieldGuideDrawer>` (Coach Notes).
*   **Sticky Bottom FAB**: Wide action button (`Solve [Next Case]: [Case Name] ->`).

### View 2: `<ModuleView>` (Active when playing a case)
*   **`<ModuleHeader>`**: Clean 3-zone header: `[< Back]`, `[LEVEL X: NAME • ID: Title]`, and `[✨ XP]` with slot-machine number roll and flash transition.
*   **`<TopTabBar>`**: Sub-tab navigation (`1. Observe`, `2. Inspect`, `3. Workbench`).
*   **`<TabContent>`**:
    *   **`<ObserveTab>` (1. Observe)**: Consistent across all 15 cases (matching 2.1.1). Displays `<CharacterAvatar>` (illustrated *Bob's Burgers*-style colleague portrait in `stressed` mood, no extraneous emoji clutter) + frustrated message + `<FlawedOutput>` with tappable clue `<HighlightHotspots>` (+25 XP each).
    *   **`<InspectTab>` (2. Inspect)**: Displays `<CrimeScenePrompt>`, the diagnostic `<WarningPanel>` with simplified concept preview cards, and the `[Open Workbench ->]` CTA.
    *   **`<WorkbenchTab>` (3. Workbench)**: Renders the case's simplified office-stationery interaction mechanic (e.g., `<PromptPlanner>`, `<RedPenPruner>`, `<CardSwapper>`, `<TwoColorStamp>`, `<TimelineSlider>`, `<XRayLens>`, or `<FlowchartNodes>`) paired with an always-active `[Simulate Cortex Prompt]` button.
*   **`<SuccessOverlay>`**: Full modal overlay upon solving. Displays the colleague's `<CharacterAvatar>` in `satisfied` mood (earnest wide eyes and full smile, with tap-to-expand reaction quote), the color-coded resolved prompt simulation, `[Unlock Coach Notes Card]`, and `[⟲ Replay / Clear Planner]`.

### View 3: `<FieldGuideDrawer>` (Coach Notes)
*   A 92vh bottom-sheet modal (`framer-motion`) fitting all content without vertical scrolling.
*   **`<DrawerHeader>`**: `Incident File #[ID]` and Coach Notes title.
*   **Visual Diagram**: Simplified 4-Corner Prompt Planner or concept diagram.
*   **Core Coaching Principles**: Bulleted takeaways (`Role:`, `Audience:`, `Context:`, `Format:`).
*   **`💡 Pro Tip` Callout**: Highlighted takeaway box.
*   **`<DrawerFooter>`**: `[⟲ Replay]` and `[Back to Desk]` buttons.

---

## 2. Global State Management (`useGameStore.ts`)

1.  **`userXp`**: Total integer score (starts at 150 XP from Level 1).
2.  **`cases`**: Key-value map of all 15 `CaseData` objects.
3.  **`activeView`**: `'HOME' | 'MODULE'`.
4.  **`currentCaseId`**: String ID of the active case (sanitized against event objects).
5.  **`unlockedBadges`**: Array of unlocked Level Coach Badges (gated on completing all 3 cases in a level).

---

## 3. Golden Slice Data Schema (Case 2.1 Reference)

```json
{
  "id": "2.1",
  "title": "The Mind-Reader Fallacy",
  "level": 2,
  "level_name": "Prompting",
  "badge_name": "The Master Briefer",
  "badge_icon": "🗓️",
  "status": "active",
  "home_card": {
    "hook": "Sam's email is a corporate snoozefest. Help him fix the brief.",
    "icon": "🗓️"
  },
  "module_data": {
    "observe_tab": {
      "colleague_name": "Sam",
      "colleague_role": "L&D Lead",
      "message": "I just asked Cortex to write an email about the new manager training and it gave me a 600-word corporate snoozefest. No deadline, no audience, no registration link.",
      "flawed_output": {
        "text": "[Dear Employee], As we move forward into the new quarter, it is imperative that we optimize our leadership paradigms. Therefore, training will occur. Synergizing our core competencies requires attendance. Thank you.",
        "hotspots": [
          {
            "id": "hs_1",
            "text": "[Dear Employee]",
            "clue_note": "Generic audience. The AI doesn't know who this email is intended for.",
            "xp_value": 25
          },
          {
            "id": "hs_2",
            "text": "training will occur.",
            "clue_note": "Missing context & deadline. The AI had no specifics to share.",
            "xp_value": 25
          }
        ]
      }
    },
    "inspect_tab": {
      "crime_scene_prompt": "Write an email about the new manager training.",
      "warning_panel": {
        "title": "Warning: Insufficient Context",
        "body": "The AI is guessing your intent. A sufficient brief requires four distinct cards in your 4-Corner Prompt Planner: Role (Who are you?), Audience (Who is reading?), Context (What is the goal?), and Format (How should it look?)."
      }
    },
    "workbench_tab": {
      "bento_slots": [
        { "id": "slot_role", "label": "Role", "description": "Who is speaking?" },
        { "id": "slot_audience", "label": "Audience", "description": "Who is reading?" },
        { "id": "slot_context", "label": "Context", "description": "What is the goal?" },
        { "id": "slot_format", "label": "Format", "description": "How is it structured?" }
      ],
      "available_chips": [
        { "id": "chip_ld", "text": "L&D Lead", "type": "correct", "category": "role" },
        { "id": "chip_managers", "text": "Managers", "type": "correct", "category": "audience" },
        { "id": "chip_reg", "text": "Registration Link", "type": "correct", "category": "context" },
        { "id": "chip_bullets", "text": "Bullet Points", "type": "correct", "category": "format" },
        { "id": "chip_jargon", "text": "Heavy Jargon", "type": "distractor" },
        { "id": "chip_length", "text": "600 Words", "type": "distractor" },
        { "id": "chip_exec", "text": "Board of Directors", "type": "distractor" }
      ],
      "solution_mapping": {
        "slot_role": "chip_ld",
        "slot_audience": "chip_managers",
        "slot_context": "chip_reg",
        "slot_format": "chip_bullets"
      },
      "success_resolution": {
        "heading": "Case Solved: Coach Notes Assembled!",
        "message": "Sam's new brief gave Cortex the exact structure it needed.",
        "character_reaction_quote": "Wait... it's under 150 words, has the registration link, and didn't mention 'synergy' once? I'm taking an early lunch.",
        "resolved_prompt_template": "Act as an [{slot_role}] writing to [{slot_audience}]. We need a [{slot_context}] reminder formatted as a short email with [{slot_format}]."
      }
    }
  },
  "field_guide_data": {
    "title": "The 4-Corner Prompt Planner",
    "visual_type": "prompt_planner",
    "summary": "AI can't read your mind. Every rock-solid prompt pins four essential cards to the 4-Corner Prompt Planner:",
    "content_bullets": [
      "Role: Ground the AI in a specific persona and authority level.",
      "Audience: Define exactly who will read or act on the response.",
      "Context: Provide the core facts, constraints, and deadline.",
      "Format: Specify length, tone, structural boundaries, etc."
    ],
    "takeaway": "Order doesn't matter, but structure does! Just make sure to include all the necessary pieces of the prompt before you hit Send."
  }
}
```
