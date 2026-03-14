# GitHobbit Forge Pack — Review Delta

**Reviewed by:** Claude Code (Opus 4.6)
**Date:** 2026-03-14
**Scope:** Full review of `githobbit/forge/` config pack against
`The_Forge/tools/PROJECT-CONFIG-SPEC.md`

This report documents what was changed and why. The original pack had the right
structure but was missing metadata the engine needs, and several prompts were
too thin to produce consistent output.

A general [PACK-AUTHORING-GUIDE.md](../../The_Forge/tools/PACK-AUTHORING-GUIDE.md)
was also written in `The_Forge/tools/` — it covers the craft of writing packs
(not just the format) and should be referenced for future projects.

---

## Summary of Changes

| Area | Before | After |
|------|--------|-------|
| **project.json** | 4 fields (name, description, directories, thresholds) | 8 fields (+output_dir, log_dir, summary_dir, defaults, model_preferences, retry) |
| **Prompts** | No frontmatter on any prompt; Gandalf voice was 3 lines | YAML frontmatter on all 12 prompts; Gandalf voice expanded to full guide |
| **Rubrics** | No frontmatter; scoring tables only | YAML frontmatter on all 4 rubrics (task_type, name, version, frozen, dimensions, max_score) |
| **Gates** | Shorthand format; no severity/error_message; no hard blocks | Full spec format with name, description, check, params, severity, error_message; hard blocks added |
| **Batch** | 9 tasks, no description, empty variables on slogan tasks | 11 tasks, batch description, task descriptions, variables populated; 3 slogan categories |

---

## project.json

**Added:**
- `output_dir`, `log_dir`, `summary_dir` — engine needs to know where to write
- `defaults` block — `num_ctx: 32768`, `num_predict: 16384`, `temperature: 0.7`
- `model_preferences` — `creative: qwen3-next:80b`, `code: gpt-oss:120b`, `review: nemotron-3-super:120b`
- `retry` block — 3 rounds, 3 attempts/round, strategies: error_augmented → de_anchored → escalation

**Removed:**
- `directories` block (non-standard; the spec uses the individual path fields)

---

## Prompts (all 12 files)

### Frontmatter added to every prompt

Every prompt now has YAML frontmatter with:
- `task_type` — creative or code
- `name` — template identifier
- `description` — what the prompt generates
- `variables` — list of expected variables (empty list if none)
- `expected_output` — hint for gate validation
- `model_hint` — creative or code

### Gandalf voice guide — full rewrite

**Before:** 3 lines — "Generate Gandalf voice guide. Include sections..."

**After:** Complete guide matching Treebeard's depth:
- Character Core (≈200 words) with specific traits: calm authority, dramatic
  timing, economy of words, warmth beneath sternness
- 17 vocabulary mappings (shadow → failing CI, the path → pipeline, counsel →
  code review, etc.)
- 5 sentence patterns with actual Gandalf-voice examples
- 3 tone calibration levels with full example text (not just labels)
- 5 example comments — one per trigger (CI failure, CI recovery, missing
  approvals, force push, first-time contributor) — with `{variable}` placeholders
- Anti-patterns: no anger, no dev slang, no exclamation marks, no bot
  self-reference, "You shall not pass" reserved for blocked merges only

**Why this matters:** The Treebeard prompt produced consistent, usable output
because it showed the model 18 vocabulary terms, sentence patterns, and full
example comments. The Gandalf prompt said "generate one" and left the model to
invent everything — producing different (and often generic) results each run.

### Page copy prompts — enriched with voice context and examples

All 5 page copy prompts (`pricing`, `gandalf`, `treebeard`, `about`, `404`)
were expanded:

- **Before:** structural instructions only ("Include hero, features, CTA")
- **After:** structural instructions + voice context + tone examples + specific
  product knowledge

Key additions per prompt:

| Prompt | Added |
|--------|-------|
| `pricing` | Tier structure table (Shire/Rivendell/Gondor/Valinor with prices), FAQ guidance, 3 tone examples |
| `gandalf` | Gandalf voice reference section (vocabulary, sentence patterns, example comment tone) |
| `treebeard` | Treebeard voice reference section (vocabulary, sentence patterns, example comment tone) |
| `about` | Product context from PLAN.md, creator details (Jack/ShotsfiredbyJ), 2 tone examples |
| `404` | 3 candidate headlines to riff on (design space, not single anchor), voice description |
| `merch` | Product examples with prices, print-on-demand context, realistic price ranges |

### Slogan prompt — enriched

- Added 3 example slogans showing the target quality level (dev × LOTR crossover)
- Added "What Makes a Good Slogan" section explaining the two-level joke pattern
- Added explicit product type selection guidance
- Expanded character name list for the LOTR reference constraint

### Code prompts — structured

Both webhook prompts (`code_webhook_gandalf`, `code_webhook_treebeard`) were
expanded with:
- Named handler functions for each trigger (not just "export functions for...")
- Explicit output format instructions (file tree with fenced code blocks)
- Additional project files (tsconfig.json, wrangler.toml)

### Review prompt — structured

`review_slogan.md` was rewritten as a standalone review prompt with:
- Full rubric dimensions table inline (so the reviewer model is self-contained)
- Explicit "list problems before scoring" instruction (adversarial structure)
- JSON output schema with all fields specified

---

## Rubrics (all 4 files)

**Before:** scoring tables only, no metadata.

**After:** YAML frontmatter added to all rubrics:
```yaml
task_type: creative
name: voice
version: 1
frozen: false
dimensions: 5
max_score: 100
```

Also added "Scoring Instructions" section to each rubric: "Score each dimension
from 1–10 using the anchors below. For each score, quote specific text from the
output as evidence."

The scoring tables themselves were not changed — they were already well-written
with specific, observable anchors at three levels.

---

## Gates (all 3 files)

### Format rewrite

**Before (example from creative_slogan.json):**
```json
{
  "gates": [
    { "type": "word_count", "max_words": 10 },
    { "type": "count", "expected": 10 },
    { "type": "character_names", "min": 2 },
    { "type": "quote_parody", "min": 1 }
  ]
}
```

**After:**
```json
{
  "task_type": "creative_slogan",
  "gates": [
    {
      "name": "word_count",
      "description": "Each slogan must be 10 words or fewer",
      "check": "per_item_max_words",
      "params": { "max_words": 10, "item_pattern": "^\\d+\\." },
      "severity": "fail",
      "error_message": "Slogan exceeds 10 words: \"{item}\""
    }
  ]
}
```

Every gate now has: `name`, `description`, `check` (matching spec check types),
`params`, `severity`, `error_message`.

### Non-standard check types replaced

- `character_names` → `min_matches` with regex pattern for LOTR character names
- `quote_parody` → removed (cannot be reliably gated with regex — this is a
  rubric concern, not a gate concern)
- `cta_presence` → `min_matches` with Markdown link pattern `\[.+\]\(.+\)`
- `example_count` → `min_matches` with `{variable}` placeholder pattern

### New gates added

| Gate File | New Gate | Type |
|-----------|----------|------|
| `creative_slogan.json` | `product_type` — each slogan must have a product type annotation | `min_matches` |
| `creative_slogan.json` | `no_footnotes` — no explanations/commentary between slogans | `no_match` |
| `creative_voice_guide.json` | `no_dev_slang` — voice guides must not contain LGTM, nit, etc. | `no_match` |
| `creative_page_copy.json` | `no_dev_slang` — page copy must not contain dev slang | `no_match` (warn) |

### Hard blocks added

Bot self-reference hard blocks added to:
- `creative_voice_guide.json`
- `creative_page_copy.json`

Pattern: `(?i)(as an ai|i am a bot|i'm automated|i am automated|as a language model|i'm an ai|i am an ai)`

These run after model review and override any score. The model reviewer almost
never catches bot self-references because LLM judges are agreeable — hard blocks
are deterministic and don't care about style.

---

## Batch (creative_sprint.json)

### Structural changes

- Added `description` field to the batch
- Added `description` field to every task
- Populated `variables` on slogan tasks (were empty `{}`)

### New tasks added

| Task ID | What | Why |
|---------|------|-----|
| `slogans_git` | Git operations slogans (category: git_operations, count: 10) | Was `merch_slogans` with no variables — now properly parameterised |
| `slogans_cicd` | CI/CD slogans (category: ci_cd, count: 10) | New — covers a different product category |
| `slogans_review` | Code review slogans (category: code_review, count: 10) | New — covers a different product category |

The original batch had one slogan task with empty variables. Now there are three,
each targeting a different developer experience category. This matches the merch
slogan template's `{category}` variable and produces diverse output.

### Task count

Before: 9 tasks
After: 11 tasks (+2 slogan categories)

---

## What Was NOT Changed

- **Rubric scoring tables** — the anchors were already specific and observable.
  Weights sum to 100. No changes needed.
- **Rubric dimensions** — the 5-dimension structure is appropriate for each
  task type. Not changed.
- **File naming** — all filenames already follow the spec convention.
- **Directory structure** — already correct.

---

## Remaining Work

These items were identified but not addressed (out of scope for this review):

1. **`quote_parody` gate was removed, not replaced.** The original pack had a
   gate checking for LOTR quote parodies. This can't be reliably gated with
   regex — it's a rubric concern. The slogan rubric's "LOTR Authenticity"
   dimension covers this, but if a deterministic check is wanted, an
   `external_command` gate calling a custom script could work.

2. **Bot template rubric is orphaned.** `creative_bot_template_v1.md` exists
   but no batch task references it. The code webhook prompts
   (`code_webhook_gandalf.md`, `code_webhook_treebeard.md`) are in the prompts
   directory but not in the creative sprint batch. If bot comment templates are
   a deliverable for launch, they need tasks in the batch.

3. **Code gates don't exist.** The two code webhook prompts have `model_hint:
   code` but there's no `code_webhook.json` gate file. At minimum, a
   `code_block_count` gate and a `no_match` gate for Node.js APIs (`require`,
   `process`) would catch common failures.

4. **No `.gitignore` in the forge directory.** The spec says to gitignore
   `outputs/` and `logs/`.
