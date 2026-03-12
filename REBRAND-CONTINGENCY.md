# GitHobbit Rebrand Contingency Plan

## Context

**This is a contingency plan, not a rebrand decision.** GitHobbit's viral appeal
depends entirely on the LOTR theme — "One does not simply push to main" has
cultural recognition that no original brand can replicate. The Tolkien IP is a
strategic asset, not a liability.

However, if the Tolkien Estate or Warner Bros ever sends a cease-and-desist,
we need to be able to rebrand quickly rather than scramble. This plan documents
every touchpoint, provides a ready-to-go replacement theme, and is designed so
the rebrand can be executed as a forge batch run — swap prompt templates, regenerate
content, update the site.

**Trigger:** Only execute this plan if legal action is received or credibly threatened.
**Goal:** Complete rebrand executable in one focused weekend using the forge engine.

---

## Section 1: Current Tolkien IP Inventory

### 1.1 High-Risk Elements (Commercial Use of Character Names)

| Element | Where | Risk |
|---------|-------|------|
| **Treebeard** (bot name) | Product identity, Worker code, GitHub App, all templates | Product named after trademarked character |
| **Gandalf** (bot name) | Product identity, Worker code, GitHub App, all templates | Product named after trademarked character |
| **GitHobbit** (brand) | Domains, repo, all pages, DNS | "Hobbit" is famously trademarked |
| **Pricing tiers** | Shire, Rivendell, Gondor, Valinor | Place names used commercially |
| **Elrond** | "Talk to Elrond (Sales)" CTA | Character name in commercial context |

### 1.2 Medium-Risk Elements (Named Characters/Places in Content)

- **9 named characters** in testimonials: Bilbo, Aragorn, Galadriel, Pippin, Legolas, Gimli, Boromir, Sauron, Saruman
- **14+ place names**: Mordor, Isengard, Moria, Helm's Deep, Fangorn, Erebor, Lothlórien, Mirkwood, Dale, Bag End, Tookborough, Middle-earth
- **Feature names**: Stars of Eärendil, Forks of Saruman, Mithril Security, Palantír Packages, The Shire Pages
- **Mordor Mode** dark theme toggle
- **Easter eggs**: One Ring cursor, Tengwar inscription, console Gandalf quotes

### 1.3 Lower-Risk Elements (Cultural Parody)

- Merch slogans without character names ("Merge conflict at Helm's Deep", "My pipeline has more stages than Moria")
- Quote parodies ("One does not simply push to main")
- Generic fantasy terms used alongside LOTR ("second breakfast", "hobbit-hole")

### 1.4 What Survives Any Rebrand

- Forge engine (project-agnostic)
- Worker code architecture (webhooks, rules engine, GitHub API)
- Gate definitions (structural checks are mostly content-agnostic)
- 3 of 5 rubrics (page copy, bot template, worker code — content-agnostic dimensions)
- Infrastructure (Cloudflare Workers, Printful, GitHub Pages)
- Print-on-demand model (zero physical inventory to write off)

---

## Section 2: Replacement Brand — GitGrimoire

### 2.1 Brand Identity

**Name:** GitGrimoire
**Tagline:** "Where spells ship code"
**Theme:** Medieval arcane / spellbooks — public domain, no IP risk

A grimoire is a book of spells and magical knowledge. A developer's codebase is
literally a book of incantations that makes machines do things. The metaphor is
natural, warm, and opens rich vocabulary: spells (commands), enchantments (features),
wards (security), rituals (CI/CD), scrolls (docs), familiars (bots), runes (code).

**Why GitGrimoire over alternatives:**
- Same syllable count as GitHobbit
- "Grimoire" is public domain medieval terminology — zero IP risk
- Preserves warm, bookish, cozy energy
- Rich vocabulary for dev tools
- Merch-ready ("This regex is cursed", "Senior Spell Engineer")

**Alternatives if GitGrimoire domains unavailable:**

| Name | Theme | Trade-off |
|------|-------|-----------|
| GitFable | Fairy tales / folklore | Very warm, universal. Less dev-specific vocabulary |
| GitHearth | Cozy cottage / hearthfire | Maximum cozy. Less fantasy |
| GitGlade | Forest clearing | Nature-forward. Narrower vocabulary |

### 2.2 Domain Candidates

Secure .com and .dev at minimum. Register proactively before the rebrand trigger.

| Domain | Notes |
|--------|-------|
| `gitgrimoire.com` | Primary |
| `gitgrimoire.dev` | Dev-focused, HTTPS-enforced |
| `gitgrimoire.ai` | If bots are the lead product |
| `gitgrimoire.io` | Developer convention |
| `grimoire.dev` | Shorter, may be taken |
| `gitfable.com` / `.dev` | Backup brand |
| `githearth.dev` | Backup brand |

---

## Section 3: Character Mapping

### 3.1 Treebeard → Rootwood

| | Treebeard | Rootwood |
|---|---|---|
| **Archetype** | Ancient Ent, tree-herder | Ancient forest guardian spirit |
| **Core trait** | Patient, deliberate, sad not angry | Identical |
| **Vocabulary** | "hasty", "hoom", "roots", "the forest" | "hasty", "hmm", "roots", "the wood" |
| **World** | Fangorn Forest | The Old Wood |

**Voice sketch:**
- Opener: "Hmm." or "I have been watching..." (never "Hoom" — too Treebeard-specific)
- Key terms: hasty, roots, the wood, sapling, seedling, canopy (main branch), undergrowth (stale branches), rot (tech debt), heartwood (core logic)
- Sentence patterns: Observation → facts → gentle counsel. No exclamation marks. No sarcasm.

**Example (rapid-fire PR):**
> Hmm. Three changes in half an hour. Even the fastest-growing sapling puts down
> roots before reaching for the canopy. Your previous change has not yet been
> reviewed — perhaps let it take hold before planting another.

**Example (stale PR):**
> This change has sat here for five days now. In the wood, we call that fallen
> timber — useful for a time, but eventually it becomes part of the undergrowth
> and nobody remembers what it once was.

### 3.2 Gandalf → Warden

| | Gandalf | Warden |
|---|---|---|
| **Archetype** | Wizard, authoritative | Gate keeper, tower sentinel |
| **Core trait** | Dramatic but efficient | Identical |
| **Vocabulary** | "You shall not pass", "flame", "shadow" | "None shall pass", "the flame", "shadow" |
| **World** | Bridges of Middle-earth | The Keep (CI/CD), the bridge (deployment), the gate (merge) |

**Voice sketch:**
- Signature phrase: "None shall pass" — ONLY for genuinely dangerous events. Generic gate-guard language, not Tolkien.
- Key terms: shadow (failures), the flame (CI), the light (green builds), the bridge (deployment), the gate (merge), the watchtower (monitoring), well fought (recovery)
- Sentence patterns: Declarative. Short for urgency, longer for praise.

**Example (CI failure):**
> The flame has gone out. Your build fell to shadow in the `{check_name}` step.
>
> **What broke:** `{failure_message}`
>
> The path forward is clear — fix this, and the flame shall return.

**Example (missing approvals):**
> **None shall pass.**
>
> This change requires {n} approvals before it may cross the bridge. You have
> {current}. Patience — the council must speak before the gate opens.

---

## Section 4: Full Replacement Mapping

### 4.1 Pricing Tiers

| Tier | Old | New | Tagline |
|------|-----|-----|---------|
| Free | The Shire | **The Cottage** | "A comfortable beginning" |
| Pro | Rivendell | **The Tower** | "Where the wise keep watch" |
| Team | Gondor | **The Keep** | "The stronghold stands" |
| Enterprise | Valinor | **The Citadel** | "Beyond the ordinary" |

### 4.2 Feature Names

| Old | New |
|-----|-----|
| Gandalf Copilot | **Familiar** (Copilot) |
| Pull Quests | **Pull Quests** (keep — "quest" is public domain) |
| Grievances | **Grievances** (keep — real English word) |
| Treebeard (Dependabot) | **Rootwood** (Dependabot) |
| Stars of Eärendil | **Starlight Bookmarks** |
| Forks of Saruman | **Forks of Fate** |
| Deeds (Actions) | **Rites** (Actions) |
| The Shire Pages | **Cottage Pages** |
| Mithril Security | **Wardstone Security** |
| Palantír Packages | **Scrying Packages** |

### 4.3 UI Elements

| Old | New |
|-----|-----|
| Mordor Mode (dark theme) | **Shadow Mode** |
| "Flee Mordor" button | "Flee the Shadow" |
| One Ring cursor (Konami code) | Floating spell rune (✦) with arcane glow |
| Tengwar inscription | Elder Futhark runes + git commands (public domain) |
| Console Gandalf quote | Original grimoire-themed quote |
| `bilbo@bag-end.shire` placeholder | `apprentice@the-cottage.dev` |
| "Search the Shire..." | "Search the Grimoire..." |

### 4.4 Testimonial Characters

| Old | New | Archetype |
|-----|-----|-----------|
| Bilbo Baggins, Bag End Enterprises | Bramble Thornbury, Thornbury Cottage Software | Cozy elder dev |
| Aragorn, Gondor OSS Foundation | Roland Ashford, Irongate OSS Foundation | Noble maintainer |
| Galadriel, Lothlórien Cloud | Selene Brightmere, Brightmere Cloud | Wise architect |
| Pippin, Tookborough Inc. | Finch Underhill, Underhill & Co. | Junior dev |
| Legolas, Mirkwood InfoSec | Alder Swiftbow, Deepwood InfoSec | Security engineer |
| Gimli, Erebor Data Centre | Thrain Copperbeard, Copperbeard Data Foundry | Infrastructure |

### 4.5 Footer/Nav Links

| Old | New |
|-----|-----|
| About (The Legendarium) | About (The Chronicle) |
| Blog (The Red Book) | Blog (The Codex) |
| Careers (Quests) | Careers (Quests) — keep |
| Contact Gandalf | Contact the Warden |
| Premium Support (Eagles) | Premium Support (Griffins) |
| Terms of Fellowship | Terms of Service |
| Privacy (Invisibility Policy) | Privacy (Cloaking Policy) |
| Cookie Policy (Lembas) | Cookie Policy (Provisions) |
| Sitemap of Middle-earth | Sitemap of the Realm |
| Marketplace of Dale | The Bazaar |
| Trending in the Shire | Trending in the Guild |
| Collections (Hoards) | Collections (Vaults) |
| Fellowship Topics | Guild Topics |
| Status (Palantír) | Status (Scrying Glass) |

---

## Section 5: Merch Slogan Strategy

### 5.1 Slogans That Survive As-Is

None survive completely unchanged — even "One does not simply push to main" is
too associated with Boromir/LOTR. However, generic dev-culture jokes that don't
reference specific characters or places can be lightly reworked.

### 5.2 Slogan Categories for GitGrimoire

**Git Operations (spellcasting):**
- "git push --force is a forbidden spell"
- "My commit history reads like a spellbook"
- "Merge conflicts are just dueling incantations"
- "git blame the apprentice"
- "I enchanted this branch three ages ago"

**CI/CD (forge/fire/ritual):**
- "The build flame has gone out (again)"
- "My pipeline has more stages than a summoning ritual"
- "CI passed: the wards held"
- "Deploy to prod? That requires a higher circle of magic"
- "This build has been running since the First Age"

**Code Review (council/wisdom):**
- "Reviewed by the Council of Elders"
- "LGTM — Let the Gate Master through"
- "Needs approval from at least two senior mages"
- "That PR has more comments than the index"

**Debugging (divination):**
- "console.log('reveal thyself')"
- "Stack trace longer than a wizard's beard"
- "It's a feature, not a curse"
- "The debugger sees all"
- "My bug tracker is a map of the underworld"

**General Dev Culture:**
- "I code in the comfort of my cottage"
- "Senior Spell Engineer"
- "Keep calm and consult the grimoire"
- "This regex is cursed"
- "Read the scroll (RTFM)"
- "Turning coffee into code since the First Age"

### 5.3 What's Lost and How to Compensate

The LOTR slogans have instant cultural recognition. GitGrimoire slogans need to
earn their viral status. Mitigation: generate 5× the candidates (150 instead of
30) via the forge and curate harder. The grimoire theme has genuine meme potential
("this regex is cursed" is immediately sticker-worthy) but it needs volume to
find the winners.

---

## Section 6: Forge Implementation

### 6.1 The Rebrand Is a Config Pack Swap

The forge engine is project-agnostic. Rebranding = new project config directory.
No engine changes needed.

### 6.2 Prompt Templates to Rewrite (14 total)

| Template | Changes |
|----------|---------|
| `merch_slogans.md` | All vocabulary, character constraints → grimoire theme |
| `voice_treebeard.md` → `voice_rootwood.md` | Complete character bible rewrite |
| `voice_gandalf.md` → `voice_warden.md` | Complete character bible rewrite |
| `page_copy_pricing.md` | Tier names, taglines, FAQ |
| `page_copy_treebeard.md` → `page_copy_rootwood.md` | Hero, features, examples |
| `page_copy_gandalf.md` → `page_copy_warden.md` | Hero, features, examples |
| `page_copy_about.md` | "The Legendarium" → "The Chronicle" |
| `page_copy_404.md` | Path/wandering references |
| `page_copy_merch.md` | "Gear for the Fellowship" → "Gear for the Guild" |
| `bot_templates_treebeard.md` → `bot_templates_rootwood.md` | All comment templates |
| `bot_templates_gandalf.md` → `bot_templates_warden.md` | All comment templates |
| `code_webhook_treebeard.md` → `code_webhook_rootwood.md` | Bot name in Worker code |
| `code_webhook_gandalf.md` → `code_webhook_warden.md` | Bot name in Worker code |
| `code_webhook_shared.md` | Minor bot-name references |

### 6.3 Rubrics to Update (2 of 5)

| Rubric | Change |
|--------|--------|
| `creative_slogan` | "LOTR Authenticity" → "Fantasy Authenticity" — new anchors for grimoire vocabulary |
| `creative_voice` | Anchor text in "Character Consistency" and "Vocabulary Discipline" |
| `creative_page_copy` | No changes — content-agnostic |
| `creative_bot_template` | No changes — content-agnostic |
| `code_worker` | No changes — content-agnostic |

### 6.4 Gates to Update (1 of 5 + 1 new)

**Update:** `creative_slogan.json` — replace LOTR character regex with grimoire
vocabulary regex.

**Add:** `no_tolkien_ip` hard block gate for ALL creative tasks:

```json
{
  "name": "no_tolkien_ip",
  "check": "no_match",
  "params": {
    "pattern": "(?i)(gandalf|frodo|sauron|aragorn|bilbo|gimli|legolas|treebeard|saruman|mordor|rivendell|gondor|rohan|shire|hobbit|ent|nazgul|balrog|mithril|silmaril|palantir|tengwar|fangorn|isengard|moria|erebor|lothlorien|valinor|numenor|middle.earth|one ring|you shall not pass)"
  },
  "severity": "hard_block",
  "error_message": "Output contains Tolkien IP"
}
```

This is the critical safety net — prevents generation models from slipping
back into LOTR vocabulary.

### 6.5 Execution Sequence

1. Register backup domains (can do proactively, before any trigger)
2. Create `no_tolkien_ip` hard block gate
3. Rewrite all 14 prompt templates
4. Update 2 rubrics (create v2 if v1 has been used)
5. Update slogan gate regex
6. Update batch configs (new task IDs, template references)
7. Update `project.json`
8. `--dry-run` to validate config pack
9. Test batch (3 slogans) — verify Tolkien blocklist fires on leakage
10. Full generation run
11. Update `index.html` and all pages (search-and-replace + manual review)
12. Update Worker code (bot names, template strings)
13. Re-register GitHub Apps with new names
14. DNS cutover to new domain, 301 redirect from old
15. Delist old merch designs, upload new ones on Printful

**Timeline:** One focused weekend.

---

## Section 7: Risk Assessment

### What's Lost

| Loss | Severity | Mitigation |
|------|----------|------------|
| LOTR meme recognition — instant viral energy | **HIGH** | Generate 5× slogan candidates, curate harder. Grimoire theme has meme potential but needs to earn it. |
| "You shall not pass" as CI denial | **HIGH** | "None shall pass" is close but weaker. May need an original catchphrase: "The gate is shut." |
| SEO / existing traffic | **MEDIUM** | 301 redirect from old domains. Keep active 12+ months. |
| Community recognition | **MEDIUM** | Own the rebrand story: "Same tools, new spellbook, zero lawyers." |
| Emotional attachment to LOTR theme | **REAL** | The grimoire theme can carry warmth and personality. It's a sidegrade, not a downgrade. |

### What's Gained

- Zero IP risk — no cease-and-desist vulnerability
- Full creative ownership — can trademark Rootwood, Warden, GitGrimoire
- Broader appeal — not everyone knows LOTR, everyone knows what a spellbook is
- Professional credibility — original brand > parody brand for enterprise/investors
- Merch freedom — own every design, every name

---

## Section 8: Pre-Trigger Action Items

Things to do now, before any legal issue arises:

1. **Register backup domains** — gitgrimoire.com, gitgrimoire.dev at minimum
2. **Keep the product separable from the theme** — the build plan already notes this as a design principle. Every architectural decision should maintain this separation.
3. **Save this plan** to the GitHobbit repo as `REBRAND-CONTINGENCY.md`

---

## Critical Files

- `/home/jack/githobbit/index.html` — 951 lines, all Tolkien references
- `/home/jack/githobbit/BUILD-PLAN.md` — master build spec with all content definitions
- `/home/jack/githobbit/PLAN.md` — product plan (notes "keep product separable from theme")
- `/home/jack/The Founding Of Arnor/The_Forge/tools/forge.py` — engine (no content changes needed)
- `/home/jack/The Founding Of Arnor/The_Forge/tools/PROJECT-CONFIG-SPEC.md` — config pack spec
- `/home/jack/githobbit/forge/` — project config (not yet created — will need rebrand variant)

## Verification

When executed:
1. Run `--dry-run` on rebrand config pack — validates all templates, rubrics, gates
2. Test batch of 3 slogans — verify `no_tolkien_ip` gate fires on any LOTR leakage
3. Grep entire output directory for Tolkien terms — should be zero matches
4. Visual review of all HTML pages — no LOTR references in rendered content
5. Test both bots on test repos — comments use new voice, no LOTR vocabulary
