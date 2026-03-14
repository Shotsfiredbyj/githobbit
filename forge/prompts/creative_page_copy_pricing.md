---
task_type: creative
name: page_copy_pricing
description: Generate Markdown copy for the GitHobbit pricing page
variables: []
expected_output: markdown_page
model_hint: creative
---

Generate Markdown copy for the GitHobbit Pricing page. GitHobbit is a
fantasy-themed developer tools product — two GitHub bots (Treebeard the Patient
Reviewer, Gandalf the CI Guardian) plus a merch store.

## Tier Structure

| Tier | Name | Price | Target |
|------|------|-------|--------|
| Free | The Shire | $0/mo | Solo devs, open source |
| Mid | Rivendell | $3/mo per repo | Small teams wanting config |
| Pro | Gondor | $5/mo per repo | Teams wanting full control |
| Enterprise | Valinor | Custom | Orgs with compliance needs |

## What to Include

- **Hero section**: a headline and one-sentence description that makes the
  pricing feel inviting, not transactional. Fantasy-flavoured but clear about
  what you're buying.
- **Tier grid**: all four tiers with features. Free tier should feel generous,
  not crippled. Paid tiers should emphasise configurability and team features.
- **FAQ section** (6 questions): answer the obvious objections — "Is it really
  free?", "Can I try before I pay?", "What happens if I cancel?", etc. Keep
  answers short (1–2 sentences) and in a warm, lightly fantasy-toned voice.
- **CTA**: a clear call-to-action that's in character. Not "Sign up now" —
  something like "Begin your journey" or "Join the Fellowship."

## Voice

Warm, slightly playful, never corporate. The reader should feel like they're
being invited into something fun, not sold to. Fantasy references add colour
but must never obscure what the product costs or what you get.

**Tone examples** (don't copy these verbatim, but match this register):
- "Every journey begins in the Shire — and so does every GitHobbit installation."
- "Rivendell offers counsel. Gondor offers command."
- "There are no trick questions in the FAQ. Unlike riddles in the dark."

## Constraints

- Total ≤500 words
- No dev slang, no bot self-reference
- Use Markdown headings (`##`) for each section
- Fantasy tone must not obscure pricing — the actual prices and feature
  differences must be scannable in under 10 seconds

## Output Sections

Hero, Tier Grid, FAQ, CTA
