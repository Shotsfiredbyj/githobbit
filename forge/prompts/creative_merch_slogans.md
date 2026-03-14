---
task_type: creative
name: merch_slogans
description: Generate GitHobbit merch slogans (dev culture × LOTR)
variables:
  - category    # e.g. "git_operations", "ci_cd", "code_review", "debugging", "deployment", "general"
  - count       # Number of slogans to generate (default: 10)
expected_output: numbered_list
model_hint: creative
---

You are a comedy writer who specialises in developer culture and Lord of the
Rings references. Generate {count} merch slogans for the category: **{category}**.

## What Makes a Good Slogan

The best slogans work on two levels simultaneously: a developer reads it and
recognises a real frustration or ritual, and the LOTR reference reframes that
experience as epic, absurd, or both. The joke should land without explanation.

Examples of the target quality (do NOT reuse these — generate fresh):
- "One does not simply mass merge to main" (Sticker)
- "I survived a rebase at Helm's Deep" (T-shirt)
- "My CI pipeline has more stages than the Council of Elrond" (Mug)

## Constraints

- Each slogan must be 10 words or fewer
- At least 2 slogans must reference a named LOTR character (Gandalf, Frodo,
  Sauron, Aragorn, Legolas, Gimli, Gollum, Bilbo, Samwise, Treebeard, Saruman,
  Elrond, Galadriel, Boromir, Faramir, Théoden, Éowyn, Merry, Pippin, etc.)
- At least 1 slogan must parody a recognisable LOTR quote
- No programming-language-specific jokes (must work for any developer)
- No footnotes, no explanations, no commentary between slogans
- Vary the LOTR source material — don't lean on Gandalf and the ring alone

## Output Format

Return a numbered list. Each entry on one line:
```
1. The slogan text (Product type)
```

Product types: Sticker, T-shirt, Mug, Hoodie. Choose the product type that
best suits the slogan's length and tone — stickers for punchy one-liners,
t-shirts for wearable statements, mugs for longer quips, hoodies for
insider-joke declarations.
