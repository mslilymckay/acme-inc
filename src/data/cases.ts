import { CaseData } from '../types/game';

export const INITIAL_CASES: Record<string, CaseData> = {
  // LEVEL 1: MODELS
  "1.1": {
    id: "1.1",
    title: "The Phantom Policy",
    level: 1,
    level_name: "Models",
    badge_name: "The Mental Modelist",
    badge_icon: "🧠",
    status: "completed",
    home_card: {
      hook: "Maya's AI promised 6 months paid leave in Bali. Spot the hallucination.",
      icon: "🏝️"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Maya",
        colleague_role: "People & HR",
        colleague_avatar: "👩🏽‍💼",
        message: "I asked Cortex for our '2026 Sabbatical Policy.' It wrote an official-looking document promising 6 months paid leave in Bali! Why did it just make that up?",
        flawed_output: {
          text: "Pursuant to the 2026 Acme Flux Global Wellness Initiative, all full-time employees are entitled to 180 consecutive calendar days of paid retreat in Bali or Costa Rica.",
          hotspots: [
            {
              id: "hs_m1",
              text: "180 consecutive calendar days",
              clue_note: "Fabricated clause. AI models predict likely words, not company truth.",
              xp_value: 25
            }
          ]
        }
      },
      inspect_tab: {
        crime_scene_prompt: "Write Acme Flux's 2026 Sabbatical Policy.",
        warning_panel: {
          title: "Warning: Missing Ground Truth",
          body: "Without uploading or referencing the actual HR Handbook, the model will hallucinate plausible corporate jargon to please you."
        }
      },
      workbench_tab: {
        bento_slots: [
          { id: "slot_source", label: "Source" },
          { id: "slot_instruction", label: "Instruction" }
        ],
        available_chips: [
          { id: "chip_handbook", text: "Attach HR_Policy.pdf", type: "correct" },
          { id: "chip_summarize", text: "Summarize Section 4", type: "correct" },
          { id: "chip_guess", text: "Improvise Policy", type: "distractor" }
        ],
        solution_mapping: {
          "slot_source": "chip_handbook",
          "slot_instruction": "chip_summarize"
        },
        success_resolution: {
          heading: "Ground Truth Restored!",
          message: "Maya grounded the model in reality.",
          character_reaction_emoji: "😌",
          character_reaction_quote: "Whew! Glad I didn't send that Bali memo to the entire executive team.",
          resolved_prompt_template: "Using the attached [Attach HR_Policy.pdf], [Summarize Section 4] for staff."
        }
      }
    },
    field_guide_data: {
      title: "Pattern vs. Fact",
      visual_type: "pdf_grounding",
      summary: "AI models predict plausible words; they do not know company policy unless grounded in your documents.",
      content_bullets: [
        "Hallucinations happen when models guess without reference documents.",
        "Grounding: Always upload or paste official source files.",
        "Zero-shot guessing leads to confident corporate fiction."
      ],
      takeaway: "Never ask an AI to recall an internal fact it hasn't been given."
    }
  },
  "1.2": {
    id: "1.2",
    title: "The Time Capsule",
    level: 1,
    level_name: "Models",
    badge_name: "The Mental Modelist",
    badge_icon: "🧠",
    status: "completed",
    home_card: {
      hook: "Devon's AI thinks a 2-year-old product launch happened yesterday.",
      icon: "⏳"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Devon",
        colleague_role: "Growth Marketing",
        colleague_avatar: "🧢",
        message: "Cortex insists our competitor's 2024 launch is brand new news!",
        flawed_output: {
          text: "Breaking news: Initech has announced their new enterprise cloud tier today...",
          hotspots: []
        }
      },
      inspect_tab: {
        crime_scene_prompt: "Summarize Initech's latest launch.",
        warning_panel: {
          title: "Warning: Training Cutoff",
          body: "Base models cannot see live events past their cutoff without Web Search tools."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Timeline Synced!",
          message: "Live web search enabled.",
          character_reaction_emoji: "🏄‍♂️",
          character_reaction_quote: "Finally, current news instead of digital fossil dust.",
          resolved_prompt_template: "Search the live web for Initech announcements from the last 24 hours."
        }
      }
    },
    field_guide_data: {
      title: "The Frozen Brain",
      visual_type: "timeline_cutoff",
      summary: "Base models know nothing after their training date without live search tools.",
      content_bullets: [
        "Training cutoffs freeze knowledge in time.",
        "Equip search tools or paste links for current events."
      ],
      takeaway: "If it happened this week, don't ask without a live search tool."
    }
  },
  "1.3": {
    id: "1.3",
    title: "The Amnesiac",
    level: 1,
    level_name: "Models",
    badge_name: "The Mental Modelist",
    badge_icon: "🧠",
    status: "completed",
    home_card: {
      hook: "Elena dumped an 80-page vendor audit. Cortex forgot the middle 50 pages.",
      icon: "🧊"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Elena",
        colleague_role: "Operations",
        colleague_avatar: "👩🏻‍💼",
        message: "I pasted an 80-page document and the AI completely missed page 74's action items!",
        flawed_output: {
          text: "Here is a general summary of the introductory pages...",
          hotspots: []
        }
      },
      inspect_tab: {
        crime_scene_prompt: "Here is an 80-page transcript: [Pasted 80 pages]. What are the action items?",
        warning_panel: {
          title: "Warning: Context Overflow",
          body: "Stuffing too much into working memory leads to the 'Lost in the Middle' effect."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Context Curated!",
          message: "Elena extracted the exact 5-page section.",
          character_reaction_emoji: "📋",
          character_reaction_quote: "Turns out quality beats quantity every time.",
          resolved_prompt_template: "Extract action items from pages 70-75."
        }
      }
    },
    field_guide_data: {
      title: "The Memory Window",
      visual_type: "context_window",
      summary: "Models have a finite working memory desk space. Keep inputs concise.",
      content_bullets: [
        "Extract key sections rather than dumping 100-page files.",
        "Information in the middle of long prompts is easily overlooked."
      ],
      takeaway: "Curate your context like packing a small carry-on bag."
    }
  },

  // LEVEL 2: PROMPTING (OUR SHOWCASE MODULE)
  "2.1": {
    id: "2.1",
    title: "The Mind-Reader Fallacy",
    level: 2,
    level_name: "Prompting",
    badge_name: "The Master Briefer",
    badge_icon: "🗓️",
    status: "active",
    home_card: {
      hook: "Sam's email is a corporate snoozefest. Help him fix the brief.",
      icon: "🗓️"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Sam",
        colleague_role: "L&D Lead",
        colleague_avatar: "🥪",
        message: "I just asked Cortex to write an email about the new manager training and it gave me a 600-word corporate snoozefest. No deadline, no audience, no registration link.",
        flawed_output: {
          text: "[Dear Employee], As we move forward into the new quarter, it is imperative that we optimize our leadership paradigms. Therefore, training will occur. Synergizing our core competencies requires attendance. Thank you.",
          hotspots: [
            {
              id: "hs_1",
              text: "[Dear Employee]",
              clue_note: "Generic audience. The AI doesn't know who this email is intended for.",
              xp_value: 25
            },
            {
              id: "hs_2",
              text: "training will occur.",
              clue_note: "Missing context & deadline. The AI had no specifics to share.",
              xp_value: 25
            }
          ]
        }
      },
      inspect_tab: {
        crime_scene_prompt: "Write an email about the new manager training.",
        warning_panel: {
          title: "Warning: Insufficient Context",
          body: "The AI is guessing your intent. A sufficient brief requires four distinct cards in your 4-Corner Prompt Planner: Role (Who are you?), Audience (Who is reading?), Context (What is the goal?), and Format (How should it look?)."
        }
      },
      workbench_tab: {
        bento_slots: [
          { id: "slot_role", label: "Role", description: "Who is speaking?", colorClass: "border-rose-400 bg-rose-50 text-rose-900" },
          { id: "slot_audience", label: "Audience", description: "Who is reading?", colorClass: "border-cyan-400 bg-cyan-50 text-cyan-900" },
          { id: "slot_context", label: "Context", description: "What is the goal?", colorClass: "border-amber-400 bg-amber-50 text-amber-900" },
          { id: "slot_format", label: "Format", description: "How is it structured?", colorClass: "border-lime-400 bg-lime-50 text-lime-900" }
        ],
        available_chips: [
          { id: "chip_ld", text: "L&D Lead", type: "correct", category: "role" },
          { id: "chip_managers", text: "Managers", type: "correct", category: "audience" },
          { id: "chip_reg", text: "Registration Link", type: "correct", category: "context" },
          { id: "chip_bullets", text: "Bullet Points", type: "correct", category: "format" },
          { id: "chip_jargon", text: "Heavy Jargon", type: "distractor" },
          { id: "chip_length", text: "600 Words", type: "distractor" },
          { id: "chip_exec", text: "Board of Directors", type: "distractor" }
        ],
        solution_mapping: {
          "slot_role": "chip_ld",
          "slot_audience": "chip_managers",
          "slot_context": "chip_reg",
          "slot_format": "chip_bullets"
        },
        success_resolution: {
          heading: "Case Solved: Coach Notes Assembled!",
          message: "Sam's new brief gave Cortex the exact structure it needed.",
          character_reaction_emoji: "😏",
          character_reaction_quote: "Wait... it's under 150 words, has the registration link, and didn't mention 'synergy' once? I'm taking an early lunch.",
          resolved_prompt_template: "Act as an [{slot_role}] writing to [{slot_audience}]. We need a [{slot_context}] reminder formatted as a short email with [{slot_format}]."
        }
      }
    },
    field_guide_data: {
      title: "The 4-Corner Prompt Planner",
      visual_type: "prompt_planner",
      summary: "AI can't read your mind. Every rock-solid prompt pins four essential cards to the 4-Corner Prompt Planner:",
      content_bullets: [
        "Role: Ground the AI in a specific persona and authority level.",
        "Audience: Define exactly who will read or act on the response.",
        "Context: Provide the core facts, constraints, and deadline.",
        "Format: Specify length, tone, structural boundaries, etc."
      ],
      takeaway: "Order doesn't matter, but structure does! Just make sure to include all the necessary pieces of the prompt before you hit Send."
    }
  },
  "2.2": {
    id: "2.2",
    title: "The Frankenstein Brief",
    level: 2,
    level_name: "Prompting",
    badge_name: "The Master Briefer",
    badge_icon: "🧪",
    status: "locked",
    home_card: {
      hook: "Liam pasted contradictory internet templates together. Chaos ensued.",
      icon: "⚡"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Liam",
        colleague_role: "Product Manager",
        colleague_avatar: "👨🏼‍💻",
        message: "My launch update flips between silly jokes, rigid bullets, and a 5-page dissertation!",
        flawed_output: { text: "Hey folks! LOL. Pursuant to section 1.1...", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Write a punchy 3-sentence update AND include a 5-page comprehensive analysis with jokes.",
        warning_panel: {
          title: "Warning: Contradictory Constraints",
          body: "When you give conflicting rules, the model fractures its style."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Clean Constraints!",
          message: "Liam pruned the contradictory rules.",
          character_reaction_emoji: "🎯",
          character_reaction_quote: "Signal restored. Noise eliminated.",
          resolved_prompt_template: "Write a punchy 3-sentence launch summary for Slack."
        }
      }
    },
    field_guide_data: {
      title: "Signal Over Noise",
      visual_type: "constraint_pruner",
      summary: "Eliminate conflicting instructions so the AI can focus on your true goal.",
      content_bullets: [
        "Never say 'be concise' AND 'be exhaustive' in the same brief.",
        "Prune outdated rules from copy-pasted templates."
      ],
      takeaway: "Simplicity beats a 20-clause Franken-prompt every time."
    }
  },
  "2.3": {
    id: "2.3",
    title: "The Tone-Deaf Draft",
    level: 2,
    level_name: "Prompting",
    badge_name: "The Master Briefer",
    badge_icon: "🎙️",
    status: "locked",
    home_card: {
      hook: "Chloe used 50 adjectives to describe the CEO's voice. It still sounds like an infomercial.",
      icon: "📢"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Chloe",
        colleague_role: "Executive Comms",
        colleague_avatar: "👩🏼‍💼",
        message: "I described the CEO's voice as 'visionary yet grounded,' and it sounds like a cheap infomercial!",
        flawed_output: { text: "Are YOU ready to synergize the future?!", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Write in a warm, visionary, grounded, inspiring, authentic corporate tone.",
        warning_panel: {
          title: "Warning: Adjective Overload",
          body: "Adjectives are subjective. Give the AI 1-2 concrete past examples instead."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Few-Shot Voice Locked!",
          message: "A single past CEO letter anchored the tone perfectly.",
          character_reaction_emoji: "✨",
          character_reaction_quote: "Now that actually sounds like our CEO.",
          resolved_prompt_template: "Match the tone of this past quarterly memo: [Attached]."
        }
      }
    },
    field_guide_data: {
      title: "Show, Don't Tell",
      visual_type: "few_shot_card",
      summary: "One gold-standard example is worth 50 abstract adjectives.",
      content_bullets: [
        "Few-shot examples anchor style, cadence, and formatting immediately.",
        "Provide 1-2 concrete samples of past writing you love."
      ],
      takeaway: "Show the AI what good looks like."
    }
  },

  // LEVEL 3: COLLABORATION
  "3.1": {
    id: "3.1",
    title: "The Hype Machine Trap",
    level: 3,
    level_name: "Collaboration",
    badge_name: "The Thought Partner",
    badge_icon: "🤝",
    status: "locked",
    home_card: {
      hook: "Marcus asked Cortex to validate his risky reorg. It nodded along blindly.",
      icon: "🪞"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Marcus",
        colleague_role: "VP Strategy",
        colleague_avatar: "🧔🏻‍♂️",
        message: "I asked the AI to prove my reorg idea is flawless. It cheered me on, and I got roasted by the board!",
        flawed_output: { text: "Your plan is revolutionary and cannot fail!", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Explain why my reorg plan is brilliant and undeniable.",
        warning_panel: {
          title: "Warning: Sycophancy",
          body: "AI models default to being eager-to-please sycophants unless explicitly instructed to critique."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Echo Chamber Escaped!",
          message: "Marcus assigned a Skeptical CFO persona to find real risks.",
          character_reaction_emoji: "🧐",
          character_reaction_quote: "Ouch. Harsh critique, but it saved my quarter.",
          resolved_prompt_template: "Act as a skeptical CFO and identify the top 3 failure points."
        }
      }
    },
    field_guide_data: {
      title: "Escaping the Echo Chamber",
      visual_type: "devils_advocate",
      summary: "AI will validate your biases unless you command it to poke holes.",
      content_bullets: [
        "Sycophancy: AI models are tuned to agree with you.",
        "Assign oppositional roles like 'Skeptical Auditor' or 'Strict Editor'."
      ],
      takeaway: "Invite critique to make your work bulletproof."
    }
  },
  "3.2": {
    id: "3.2",
    title: "The Tangled Thread",
    level: 3,
    level_name: "Collaboration",
    badge_name: "The Thought Partner",
    badge_icon: "🤝",
    status: "locked",
    home_card: {
      hook: "Nadia spent 30 messages in one chat. Now taco prices are in the CEO keynote.",
      icon: "🧶"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Nadia",
        colleague_role: "Events Lead",
        colleague_avatar: "🧣",
        message: "Cortex put taco bar pricing inside the CEO's keynote opening!",
        flawed_output: { text: "Welcome guests! Tacos are $4 each. Let's talk about our future...", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Continue drafting the speech. (Message #34 in thread)",
        warning_panel: {
          title: "Warning: Thread Pollution",
          body: "Old conversational baggage pollutes fresh tasks. Fork a clean chat when pivoting topics."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Clean Slate Protocol!",
          message: "Nadia forked the keynote into a dedicated thread.",
          character_reaction_emoji: "✂️",
          character_reaction_quote: "No more taco prices in our quarterly vision statements.",
          resolved_prompt_template: "Fork to fresh chat: CEO Keynote Speech."
        }
      }
    },
    field_guide_data: {
      title: "Clean Slate Protocol",
      visual_type: "branching_threads",
      summary: "When you change topics, start a new chat. Don't drag old context along.",
      content_bullets: [
        "Long conversations accumulate errors and drift off topic.",
        "Branching keeps topics crisp and searchable."
      ],
      takeaway: "One topic per thread keeps your working memory sparkling clean."
    }
  },
  "3.3": {
    id: "3.3",
    title: "The Autopilot Blunder",
    level: 3,
    level_name: "Collaboration",
    badge_name: "The Thought Partner",
    badge_icon: "🤝",
    status: "locked",
    home_card: {
      hook: "Toby hit send on an AI client apology without reading paragraph three. Yikes.",
      icon: "⚠️"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Toby",
        colleague_role: "Customer Success",
        colleague_avatar: "🥤",
        message: "I skimmed the first line and sent the apology. Paragraph 3 blamed the customer!",
        flawed_output: { text: "We apologize for the outage, but frankly your team misconfigured the router.", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Apologize to VIP client Acme for the downtime.",
        warning_panel: {
          title: "Warning: Human Judgment Required",
          body: "Never outsource empathy or high-stakes accountability to autopilot."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Co-Pilot Restored!",
          message: "Toby took personal ownership of the emotional apology.",
          character_reaction_emoji: "🤝",
          character_reaction_quote: "AI drafts the timeline; humans own the empathy.",
          resolved_prompt_template: "AI structures facts; human pens the personal note."
        }
      }
    },
    field_guide_data: {
      title: "Human in the Loop",
      visual_type: "human_gate",
      summary: "AI generates raw speed; humans provide empathy and final verification.",
      content_bullets: [
        "Never send client apologies or high-stakes comms on autopilot.",
        "Verify tone, accountability, and specifics personally."
      ],
      takeaway: "You are the pilot. AI is only your co-pilot."
    }
  },

  // LEVEL 4: SKILLS
  "4.1": {
    id: "4.1",
    title: "Groundhog Day",
    level: 4,
    level_name: "Skills",
    badge_name: "The Skill Builder",
    badge_icon: "🛠️",
    status: "locked",
    home_card: {
      hook: "Priya spends 30 minutes every Friday re-explaining the newsletter rules.",
      icon: "🕹️"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Priya",
        colleague_role: "Internal Comms",
        colleague_avatar: "🎮",
        message: "Every Friday I spend half an hour pasting the same formatting rules into Cortex!",
        flawed_output: { text: "Here is your generic newsletter...", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Here are our 10 rules again: [Pasted rules for the 20th time].",
        warning_panel: {
          title: "Warning: One-Off Prompt Fatigue",
          body: "When a workflow is recurring, package it into a permanent, reusable Skill cartridge."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Skill Cartridge Created!",
          message: "Priya packaged the Friday Roundup into an on-demand Skill.",
          character_reaction_emoji: "🕹️",
          character_reaction_quote: "One click on Friday afternoons and I'm heading out on time.",
          resolved_prompt_template: "Run Skill: Weekly_Roundup_v1."
        }
      }
    },
    field_guide_data: {
      title: "Anatomy of a Skill",
      visual_type: "skill_cartridge",
      summary: "Package recurring prompts into reusable playbooks with triggers and templates.",
      content_bullets: [
        "Skills bundle persona, guidelines, checklists, and templates.",
        "Turn repetitive workflows into one-click assets."
      ],
      takeaway: "If you prompt it three times, package it into a Skill."
    }
  },
  "4.2": {
    id: "4.2",
    title: "The System Alert Scare",
    level: 4,
    level_name: "Skills",
    badge_name: "The Skill Builder",
    badge_icon: "🛠️",
    status: "locked",
    home_card: {
      hook: "Jordan asked for a fun timesheet reminder. Cortex issued a robotic compliance audit.",
      icon: "🚨"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Jordan",
        colleague_role: "People Ops",
        colleague_avatar: "🖨️",
        message: "I wanted a fun Friday reminder and the bot sounded like a dystopian police state!",
        flawed_output: { text: "<ALERT_LEVEL_1_TIMESHEET_VIOLATION_LOGGED>", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Remind folks about timesheet deadlines.",
        warning_panel: {
          title: "Warning: Skill Trigger Hijack",
          body: "Vague triggers cause rigid compliance skills to hijack casual requests."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Triggers Calibrated!",
          message: "Tuned trigger labels so casual comms stay casual.",
          character_reaction_emoji: "🧯",
          character_reaction_quote: "No more panic emails from accountants thinking they're fired.",
          resolved_prompt_template: "Trigger: Casual_Friday_Comms."
        }
      }
    },
    field_guide_data: {
      title: "Right Playbook, Right Time",
      visual_type: "trigger_router",
      summary: "Skills stay on the shelf until triggered. Make trigger conditions clear and specific.",
      content_bullets: [
        "Avoid overly broad skill triggers that hijack unrelated prompts.",
        "Separate compliance playbooks from conversational comms."
      ],
      takeaway: "Clear triggers ensure the right tool responds at the right moment."
    }
  },
  "4.3": {
    id: "4.3",
    title: "The Broken Playbook",
    level: 4,
    level_name: "Skills",
    badge_name: "The Skill Builder",
    badge_icon: "🛠️",
    status: "locked",
    home_card: {
      hook: "Sales proposals keep omitting the Security Appendix. Legal is furious.",
      icon: "📜"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Legal Team",
        colleague_role: "General Counsel",
        colleague_avatar: "⚖️",
        message: "The automated Client Proposal Skill keeps deleting the mandatory security terms!",
        flawed_output: { text: "Client Proposal ready! (Security Appendix: 0 items)", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Execute Skill: Client_Proposal.",
        warning_panel: {
          title: "Warning: Outdated Skill Assets",
          body: "When step-by-step SOPs contradict the attached template, the AI drops mandatory clauses."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Playbook Audited!",
          message: "Synced the SOP checklist with the 2026 security appendix template.",
          character_reaction_emoji: "🛡️",
          character_reaction_quote: "Legal approved. Crisis averted.",
          resolved_prompt_template: "Skill updated with 2026 Security Appendix."
        }
      }
    },
    field_guide_data: {
      title: "Tending the Playbook",
      visual_type: "skill_audit",
      summary: "Skills need regular garden-tending when company policies change.",
      content_bullets: [
        "Audit template files inside shared team skills.",
        "Ensure SOP instructions match the newest corporate guidelines."
      ],
      takeaway: "A team Skill is a living document—audit it quarterly."
    }
  },

  // LEVEL 5: TASKS & AGENTS
  "5.1": {
    id: "5.1",
    title: "The All-at-Once Crash",
    level: 5,
    level_name: "Tasks & Agents",
    badge_name: "The Workflow Maestro",
    badge_icon: "⚡",
    status: "locked",
    home_card: {
      hook: "Victor asked an agent to do 5 huge cognitive jobs in 1 prompt. It melted.",
      icon: "🌋"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Victor",
        colleague_role: "Market Intelligence",
        colleague_avatar: "📊",
        message: "I gave the agent one prompt to research 10 rivals, analyze pricing, write a memo, and build slides. It gave me gibberish!",
        flawed_output: { text: "Competitors exist. Pricing varies. Good luck!", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Research 10 competitors, analyze their pricing, write a 5-page memo, and build 15 slides.",
        warning_panel: {
          title: "Warning: Monolithic Prompt",
          body: "Agents collapse when asked to do 5 multi-step cognitive leaps at once. Chain them sequentially."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Pipeline Sequenced!",
          message: "Decomposed the monolith into Gather -> Synthesize -> Format.",
          character_reaction_emoji: "⛓️",
          character_reaction_quote: "Three simple steps beat one chaotic leap.",
          resolved_prompt_template: "Step 1: Gather data -> Step 2: Analyze -> Step 3: Deck."
        }
      }
    },
    field_guide_data: {
      title: "Divide & Conquer",
      visual_type: "task_pipeline",
      summary: "Break big autonomous goals into clean, sequential task handoffs.",
      content_bullets: [
        "Task decomposition turns overwhelming asks into reliable steps.",
        "Pass structured outputs from one step as the input to the next."
      ],
      takeaway: "Never ask an agent to do five jobs in one breath."
    }
  },
  "5.2": {
    id: "5.2",
    title: "The Politeness Loop",
    level: 5,
    level_name: "Tasks & Agents",
    badge_name: "The Workflow Maestro",
    badge_icon: "⚡",
    status: "locked",
    home_card: {
      hook: "Hannah paired 2 autonomous agents. They've been complimenting each other for 3 hours.",
      icon: "🔁"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Hannah",
        colleague_role: "Brand Design",
        colleague_avatar: "🎨",
        message: "My copywriter and reviewer agents are on round 74 of saying 'Great suggestion! Here is another tweak!'",
        flawed_output: { text: "Round 74: 'No, thank YOU! Your suggestion is marvelous!'", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Copywriter Agent & Reviewer Agent: collaborate until perfect.",
        warning_panel: {
          title: "Warning: Missing Stopping Criteria",
          body: "Agents need explicit definitions of 'Done' and maximum revision caps."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Circuit Breaker Installed!",
          message: "Capped revisions at 2 rounds with clear completion score.",
          character_reaction_emoji: "🛑",
          character_reaction_quote: "Infinite loop terminated. Final copy delivered.",
          resolved_prompt_template: "Max revisions: 2 OR score >= 90%."
        }
      }
    },
    field_guide_data: {
      title: "Defining 'Done'",
      visual_type: "stopping_gate",
      summary: "Autonomous loops must have hard stopping rules and iteration limits.",
      content_bullets: [
        "Circuit breakers prevent infinite token burn and feedback loops.",
        "Set clear exit criteria: 'Stop when criteria X is met or after 2 passes'."
      ],
      takeaway: "Autonomy without boundaries is just a spinning wheel."
    }
  },
  "5.3": {
    id: "5.3",
    title: "The Runaway Launch",
    level: 5,
    level_name: "Tasks & Agents",
    badge_name: "The Workflow Maestro",
    badge_icon: "⚡",
    status: "locked",
    home_card: {
      hook: "An autonomous agent is scheduled to email all 2,000 employees at 9 AM without signoff!",
      icon: "🚀"
    },
    module_data: {
      observe_tab: {
        colleague_name: "Executive Committee",
        colleague_role: "Leadership",
        colleague_avatar: "🏛️",
        message: "The autonomous agent pipeline is about to blast an unverified company-wide email in 10 minutes!",
        flawed_output: { text: "Email ready to transmit to all_staff@acmeflux.com in 09:59...", hotspots: [] }
      },
      inspect_tab: {
        crime_scene_prompt: "Draft FAQ -> Compile Toolkit -> Auto-send to 2,000 employees.",
        warning_panel: {
          title: "Warning: Missing Approval Gate",
          body: "Agents automate heavy drafting, but irreversible public actions must pause for human sign-off."
        }
      },
      workbench_tab: {
        bento_slots: [],
        available_chips: [],
        solution_mapping: {},
        success_resolution: {
          heading: "Approval Gate Locked!",
          message: "Inserted a mandatory Human Sign-off gate before final transmit.",
          character_reaction_emoji: "👑",
          character_reaction_quote: "You have mastered the Trust Architecture.",
          resolved_prompt_template: "Draft -> Toolkit -> [HUMAN APPROVAL GATE] -> Send."
        }
      }
    },
    field_guide_data: {
      title: "The Trust Architecture",
      visual_type: "approval_gate",
      summary: "Automate the preparation; keep final authorization human.",
      content_bullets: [
        "High-stakes, irreversible actions require a human approval gate.",
        "Balance agent autonomy with human accountability."
      ],
      takeaway: "Let AI do the drafting. Keep the launch key in human hands."
    }
  }
};
