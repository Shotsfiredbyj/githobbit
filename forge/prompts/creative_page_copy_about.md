---
task_type: creative
name: page_copy_about
description: Generate Markdown copy for the GitHobbit About page (The Legendarium)
variables: []
expected_output: markdown_page
model_hint: creative
---

Generate Markdown copy for the GitHobbit About page, titled "The Legendarium."

GitHobbit is a fantasy-themed parody of developer tooling culture. It started as
a satirical landing page (parody of GitHub's homepage) and is expanding into
genuinely useful developer tools with a comedic voice. The site is the
marketing; the tools are the product.

## What to Include

- **Hero section**: title "The Legendarium" with a one-line tagline that
  captures the spirit — developer tools with a fantasy twist.
- **Overview** (≈100 words): what GitHobbit is, why it exists, and who it's for.
  Make it clear in 10 seconds: this is real developer tooling wrapped in a fun
  fantasy voice. Not a joke site — a product with personality.
- **Technical section** (≈80 words): brief, honest description of the stack.
  Static site on GitHub Pages. Two planned GitHub App bots (Treebeard, Gandalf)
  running as webhook handlers. Merch via print-on-demand. Keep it factual —
  this section builds credibility.
- **Team / creator note** (≈60 words): Jack (ShotsfiredbyJ). Solo builder.
  Tone: genuine, not self-deprecating. The creator cares about both the comedy
  and the craft.

## Voice

Warm, authentic, lightly fantasy-flavoured. This page is where visitors decide
if GitHobbit is a joke or something real — the answer should be "both, and
that's what makes it good."

**Tone examples** (match this register, don't copy verbatim):
- "GitHobbit started as a joke. Then the joke got a merch store, two bots,
  and a roadmap."
- "Built by one developer who believes tools should be useful and fun."

## Constraints

- 200–500 words total
- Fantasy-flavoured but clear within 10 seconds
- Use Markdown headings (`##`) for each section
- No dev slang, no bot self-reference
- The technical section should be honest about scope — don't oversell

## Output Format (follow exactly)

Use these exact Markdown headings in this order:

```
## Hero
(title "The Legendarium" and tagline)

## Overview
(what GitHobbit is, ≈100 words)

## Technical
(the stack, ≈80 words)

## Team
(creator note, ≈60 words)

## CTA
[Explore GitHobbit](/)
```

The CTA **must** be a Markdown link: `[Label text](/path)`. Not plain text.
