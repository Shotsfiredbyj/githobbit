---
task_type: creative
name: bot_template
version: 1
frozen: false
dimensions: 5
max_score: 100
---

# Bot Comment Template Rubric v1

## Scoring Instructions

Score each dimension from 1–10 using the anchors below. For each score,
quote specific text from the output as evidence.

## Dimensions

| Dimension | Weight | Low (1-3) | Mid (5-6) | High (8-10) |
|-----------|--------|-----------|-----------|-------------|
| **Actionable Information** | /30 | Comment is all character, no useful information; dev has to go find what broke | Information is present but buried under character flavour | Dev gets the information they need in the first 2 lines; character enhances, never obscures |
| **Character Voice** | /25 | Sounds generic or like a different character; voice is inconsistent with guide | Voice is recognisable but has moments of stiffness or breaking character | Unmistakably this character; every word choice reinforces the persona |
| **Trigger Accuracy** | /20 | Template doesn't match its trigger (e.g., stale PR template reads like a CI failure) | Template matches trigger but misses nuance (e.g., doesn't scale language to severity) | Template precisely matches trigger and adapts tone to severity/context |
| **Variable Integration** | /10 | Variables feel jammed in; `{dep_name}` breaks the sentence flow | Variables are present and grammatically correct but feel templated | Variables read naturally; you'd believe the character looked up the information |
| **Brevity** | /15 | Comment is so long devs will scroll past it — defeating the purpose | Reasonable length but could be tighter | Every line earns its place; minimal mode is genuinely minimal |
