# Signal & Noise: Technical Spec & Data Architecture

**Project Type:** Mobile-first Progressive Web App (PWA) / Single Page Application
**Stack Recommendation:** React (or Preact), Vite, Tailwind CSS, Framer Motion (for smooth drawer/flip animations), Zustand or React Context (for global state).
**Layout:** "Centered Phone Frame" (Max-width: ~430px, centered on desktop screens, 100vh full height).

---

## 1. Component Architecture

The app is divided into three primary views, driven by the user's current state. 

### View 1: `<HomeView>`
*   `<TrophyCarousel>`: Sticky top header displaying large, horizontal-scrolling badge slots.
*   `<CaseGrid>`: The main vertical scrolling list.
    *   `<CaseCard>`: Renders conditionally based on status (`locked`, `active`, `completed`). Handles the 3D flip animation when transitioning from `active` to `completed`.

### View 2: `<ModuleView>` (Active when playing a case)
*   `<ModuleHeader>`: Sticky top bar with `[< Exit]` button, Case Title, and an animated `<XPScore>` counter.
*   `<TopTabBar>`: Sticky navigation below header (Observe, Inspect, Fix).
*   `<TabContent>`: Renders one of three tabs:
    *   `<ObserveTab>`: Renders `<MessageBubble>` and the `<FlawedOutput>` with tappable `<HighlightHotspots>`.
    *   `<InspectTab>`: Renders the `<CrimeScenePrompt>` and the glowing `<WarningPanel>` (The Bento Box intro).
    *   `<WorkbenchTab>`: Renders the interactive puzzle.
        *   `<BentoTray>`: 4 drop-zone slots.
        *   `<ChipCarousel>`: Horizontal scrolling list of draggable `<NounChip>` components.
*   `<StickyNextButton>`: Persists at the bottom of Tab 1 and Tab 2 to guide users.
*   `<SuccessOverlay>`: Slides up when the simulation runs successfully. Renders the `<DynamicResolvedPrompt>` with inline color-coded variables, and the `[Unlock Field Guide]` button.

### View 3: `<FieldGuideDrawer>`
*   A bottom-sheet modal (`framer-motion` recommended for drag-to-dismiss physics).
*   `<DrawerHeader>`: Title and `[< Back to Library]` button.
*   `<BentoVisualizer>`: Visual representation of the lesson.
*   `<DrawerFooter>`: Sticky bottom containing `[Download PDF]` and `[⟲ Replay Case]` buttons.

---

## 2. Global State Management Requirements

The application needs a lightweight global store to track:
1.  **`user_xp`**: Total integer score.
2.  **`case_statuses`**: Key-value pairs mapping Case IDs to their current state (e.g., `{"2.1": "completed", "2.2": "active", "3.1": "locked"}`).
3.  **`active_view`**: Enum (`HOME`, `MODULE`, `FIELD_GUIDE`).
4.  **`current_case_id`**: The ID of the case currently being played or viewed.

---

## 3. The JSON Data Schema (Case 2.1 Spec)

*Pass this exact JSON structure to your coding agent. It allows the app to be completely deterministic and data-driven without a real AI backend.*

```json
{
  "id": "2.1",
  "title": "The Mind-Reader Fallacy",
  "level": 2,
  "badge_name": "The Master Briefer",
  "status": "active",
  "home_card": {
    "hook": "Sam's email is a corporate snoozefest. Help him fix the brief.",
    "icon": "bento-box-icon"
  },
  "module_data": {
    "observe_tab": {
      "colleague_name": "Sam (L&D)",
      "message": "I just asked Cortex to write an email about the new manager training and it gave me a 600-word corporate snoozefest. No deadline, no audience, no registration link.",
      "flawed_output": {
        "text": "[Dear Employee], As we move forward into the new quarter, it is imperative that we optimize our leadership paradigms. Therefore, training will occur. Synergizing our core competencies requires attendance. Thank you.",
        "hotspots": [
          {
            "id": "hs_1",
            "text": "[Dear Employee]",
            "clue_note": "Generic audience. The AI doesn't know who this is for.",
            "xp_value": 25
          },
          {
            "id": "hs_2",
            "text": "training will occur.",
            "clue_note": "Missing context and deadline. The AI had no details to share.",
            "xp_value": 25
          }
        ]
      }
    },
    "inspect_tab": {
      "crime_scene_prompt": "Write an email about the new manager training.",
      "warning_panel": {
        "title": "Warning: Insufficient Context",
        "body": "The AI is guessing your intent. A sufficient brief requires four distinct ingredients in your 'Bento Box': Role (Who are you?), Audience (Who is reading?), Context (What is the goal?), and Format (How should it look?)."
      }
    },
    "workbench_tab": {
      "bento_slots": [
        { "id": "slot_role", "label": "Role" },
        { "id": "slot_audience", "label": "Audience" },
        { "id": "slot_context", "label": "Context" },
        { "id": "slot_format", "label": "Format" }
      ],
      "available_chips": [
        { "id": "chip_ld", "text": "L&D Lead", "type": "correct" },
        { "id": "chip_managers", "text": "Managers", "type": "correct" },
        { "id": "chip_reg", "text": "Registration", "type": "correct" },
        { "id": "chip_bullets", "text": "Bullet Points", "type": "correct" },
        { "id": "chip_jargon", "text": "Jargon", "type": "distractor" },
        { "id": "chip_length", "text": "Length", "type": "distractor" },
        { "id": "chip_exec", "text": "Executives", "type": "distractor" }
      ],
      "solution_mapping": {
        "slot_role": "chip_ld",
        "slot_audience": "chip_managers",
        "slot_context": "chip_reg",
        "slot_format": "chip_bullets"
      },
      "success_resolution": {
        "heading": "Case Solved!",
        "message": "Sam's new brief gave the AI exactly what it needed.",
        "resolved_prompt_template": "Act as an [{slot_role}] writing to [{slot_audience}]. We need a [{slot_context}] reminder formatted as a short email with [{slot_format}]."
      }
    }
  },
  "field_guide_data": {
    "title": "The Briefing Bento Box",
    "visual_type": "bento_diagram",
    "content_bullets": [
      "Role: Ground the AI in a specific persona.",
      "Audience: Define who is receiving the message.",
      "Context: Provide the exact goal, facts, or deadline.",
      "Format: Specify the length, tone, and structure."
    ]
  }
}
```