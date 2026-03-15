# GitHobbit — Weekend Build Plan

## Context

GitHobbit is a fantasy-themed parody of GitHub, starting as a satirical landing
page and expanding into genuinely useful developer tools (Treebeard PR bot,
Gandalf CI bot) with merch and email capture.

**What exists today:** Single static `index.html` (951 lines, pure HTML/CSS/JS)
deployed via GitHub Pages at githobbit.com. Both .com and .ai domains configured.
29 dead placeholder links. Email input has no backend. No build tooling.

**Goal:** Use Arnor's distributed local AI infrastructure to produce all creative
artefacts, code components, and integrations needed to ship a complete Phase 1
(merch, email, full site) and Phase 2 MVP (bot Workers).

**Repo:** `git@github.com:Shotsfiredbyj/githobbit.git` at `/home/jack/githobbit/`

## Infrastructure

GitHobbit is the first project to use the **Arnor Forge engine** — a reusable
platform tool that orchestrates generation, validation, and review across the
fleet. The engine and its documentation live in Arnor:

- **Engine:** `The_Forge/tools/forge.py`
- **Build plan:** `The_Forge/FORGE-BUILD-PLAN.md`
- **Config spec:** `The_Forge/tools/PROJECT-CONFIG-SPEC.md`
- **Config template:** `The_Forge/tools/project_template/`

This plan covers GitHobbit-specific work only: project config, creative content,
website, merch, and bots. The forge engine is built and maintained separately.

---

## Section 1: Project Config Pack

GitHobbit's forge config at `githobbit/forge/`, following the spec in
`The_Forge/tools/PROJECT-CONFIG-SPEC.md`.

### 1.1 File Structure

```
githobbit/forge/
  project.json
  prompts/
    creative_merch_slogans.md
    creative_voice_treebeard.md
    creative_voice_gandalf.md
    creative_page_copy_pricing.md
    creative_page_copy_treebeard.md
    creative_page_copy_gandalf.md
    creative_page_copy_about.md
    creative_page_copy_404.md
    creative_page_copy_merch.md
    creative_bot_templates_treebeard.md
    creative_bot_templates_gandalf.md
    code_webhook_treebeard.md
    code_webhook_gandalf.md
    code_webhook_shared.md
    review_slogan.md
    review_voice.md
    review_page_copy.md
    review_bot_template.md
    review_worker_code.md
  rubrics/
    creative_slogan_v1.md
    creative_voice_v1.md
    creative_page_copy_v1.md
    creative_bot_template_v1.md
    code_worker_v1.md
  gates/
    creative_slogan.json
    creative_voice_guide.json
    creative_page_copy.json
    creative_bot_template.json
    code_worker.json
  batches/
    creative_sprint.json
    code_sprint.json
  outputs/              (gitignored)
  logs/                 (gitignored)
  summaries/            (checked in)
```

### 1.2 Quality Thresholds

```json
{
  "thresholds": {
    "creative": {"pass": 80, "flag": 60, "reject": 60},
    "code": {"pass": 85, "flag": 70, "reject": 55}
  }
}
```

### 1.3 Rubrics

Five analytic rubrics, each with 5 dimensions scored 1-10 with weighted totals
out of 100. Anchors at low/mid/high with observable, specific language.

#### Merch Slogan Rubric (`rubrics/creative_slogan_v1.md`)

| Dimension | Weight | Low (1-3) | Mid (5-6) | High (8-10) |
|-----------|--------|-----------|-----------|-------------|
| **Instant Recognition** | /25 | Reader needs to think about the joke; reference is obscure or forced | Gets a smile but doesn't stick; reference works but isn't memorable | Laugh-out-loud or instant "I need this on a sticker"; reference lands immediately |
| **Dev Accuracy** | /25 | Dev concept is wrong or forced ("merge conflict" used where it doesn't fit) | Dev concept is correct but generic (could apply to any tool) | Dev concept is specific and relatable — devs nod because they've lived it |
| **LOTR Authenticity** | /20 | LOTR reference is wrong, obscure, or from the films only in a shallow way | Reference is recognisable but surface-level (Gandalf, ring, Mordor only) | Reference draws from deeper lore or uses a well-known quote in a fresh way |
| **Brevity & Punch** | /15 | Wordy, needs trimming; the joke is buried in extra words | Concise but could be tighter; lands on second read | Every word earns its place; reads like a bumper sticker or a punchline |
| **Merch Viability** | /15 | Too long for a sticker, too niche for a shirt, or requires explanation | Works on one product type but not others | Works across stickers/shirts/mugs; standalone without context |

#### Voice Guide Rubric (`rubrics/creative_voice_v1.md`)

| Dimension | Weight | Low (1-3) | Mid (5-6) | High (8-10) |
|-----------|--------|-----------|-----------|-------------|
| **Character Consistency** | /25 | Voice shifts between paragraphs; character would never say some of these things | Voice is mostly stable but has moments that feel off or generic | Every sentence could only come from this character; voice is unmistakable |
| **Vocabulary Discipline** | /20 | Uses dev slang the character wouldn't know; breaks immersion | Mostly in-character vocabulary but occasionally slips into generic AI language | Vocabulary is tight and distinctive; metaphors come from the character's world |
| **Actionable Examples** | /20 | Examples are vague or don't match the trigger they're written for | Examples work but are predictable; could be guessed without the guide | Examples are specific, surprising, and immediately usable in a GitHub comment |
| **Anti-Pattern Clarity** | /15 | Anti-patterns are vague ("don't be mean") or missing | Anti-patterns are listed but lack examples of what violation looks like | Anti-patterns are specific with before/after examples showing the boundary |
| **Tone Calibration** | /20 | Only one tone level, or levels aren't meaningfully different | Three levels exist but the differences are just length, not tone | Three levels feel like the same character at different intensities — full is theatrical, minimal is a raised eyebrow |

#### Page Copy Rubric (`rubrics/creative_page_copy_v1.md`)

| Dimension | Weight | Low (1-3) | Mid (5-6) | High (8-10) |
|-----------|--------|-----------|-----------|-------------|
| **Clarity in 10 Seconds** | /30 | Visitor can't tell what the product is after reading the hero section | Visitor understands the product but not why they'd want it | Visitor knows what it is, who it's for, and wants to scroll down — in 10 seconds |
| **Fantasy/Function Balance** | /25 | Fantasy overwhelms function — visitor thinks it's a joke site, not a real product | Fantasy is present but feels bolted on; could remove it without loss | Fantasy adds flavour without obscuring function; removing it would make the page boring |
| **Voice Warmth** | /15 | Reads like a corporate SaaS page or like a bot wrote it | Has personality but feels constructed; trying too hard | Reads like a person who's genuinely enthusiastic about a fun product |
| **CTA Effectiveness** | /15 | No clear next action, or CTA is buried or confusing | CTA is present and clear but uninspired ("Sign up") | CTA is clear, in-character, and creates a reason to click now |
| **Structure & Flow** | /15 | Wall of text, no visual hierarchy, or sections in wrong order | Sections are logical but transitions feel abrupt | Natural reading flow; each section earns the next scroll |

#### Bot Comment Template Rubric (`rubrics/creative_bot_template_v1.md`)

| Dimension | Weight | Low (1-3) | Mid (5-6) | High (8-10) |
|-----------|--------|-----------|-----------|-------------|
| **Actionable Information** | /30 | Comment is all character, no useful information; dev has to go find what broke | Information is present but buried under character flavour | Dev gets the information they need in the first 2 lines; character enhances, never obscures |
| **Character Voice** | /25 | Sounds generic or like a different character; voice is inconsistent with guide | Voice is recognisable but has moments of stiffness or breaking character | Unmistakably this character; every word choice reinforces the persona |
| **Trigger Accuracy** | /20 | Template doesn't match its trigger (e.g., stale PR template reads like a CI failure) | Template matches trigger but misses nuance (e.g., doesn't scale language to severity) | Template precisely matches trigger and adapts tone to severity/context |
| **Variable Integration** | /10 | Variables feel jammed in; `{dep_name}` breaks the sentence flow | Variables are present and grammatically correct but feel templated | Variables read naturally; you'd believe the character looked up the information |
| **Brevity** | /15 | Comment is so long devs will scroll past it — defeating the purpose | Reasonable length but could be tighter | Every line earns its place; minimal mode is genuinely minimal |

#### Worker Code Rubric (`rubrics/code_worker_v1.md`)

| Dimension | Weight | Low (1-3) | Mid (5-6) | High (8-10) |
|-----------|--------|-----------|-----------|-------------|
| **Correctness** | /30 | Doesn't handle the webhook event correctly; logic errors in rule evaluation | Handles the happy path but misses edge cases (missing fields, malformed payloads) | Handles all specified triggers correctly including edge cases and error states |
| **Spec Compliance** | /20 | Missing required exports, wrong function signatures, or missing route handlers | Exports and signatures match but some config defaults are wrong or missing | Exact match to spec: all exports, all handlers, all config defaults |
| **Workers Compatibility** | /20 | Uses Node.js APIs (`fs`, `path`, `crypto`), `require()`, or global state | Workers-compatible but uses patterns that are fragile in edge runtime | Clean Workers code: `fetch` handler, `crypto.subtle`, proper `Response` construction |
| **Security** | /15 | No webhook signature verification, or secrets in code, or injection vectors | Verification present but incomplete (e.g., timing-safe compare missing) | Full HMAC-SHA256 verification with timing-safe compare; no secrets in code; input validation |
| **TypeScript Quality** | /15 | Missing type annotations, `any` types, no interfaces for webhook payloads | Types present but loose (wide unions, optional everything) | Strict types, discriminated unions for events, proper error types, no `any` |

### 1.4 Gates

#### Creative Gates

| Task Type | Gate | Pass Condition |
|-----------|------|---------------|
| **Slogans** | Word count | Each slogan ≤ 10 words |
| **Slogans** | Count | Exactly 10 slogans per batch |
| **Slogans** | Character names | At least 2 slogans contain a named LOTR character |
| **Slogans** | Quote parody | At least 1 slogan parodies a recognisable LOTR quote |
| **Voice guides** | Section presence | Must contain: Character Core, Vocabulary, Sentence Patterns, Tone Calibration, Example Comments, Anti-Patterns |
| **Voice guides** | Example count | At least 1 example comment per trigger type |
| **Voice guides** | Word count | 1500–2500 words total |
| **Page copy** | Section presence | Must contain all required sections per page spec |
| **Page copy** | CTA presence | At least 1 call-to-action with link placeholder |
| **Page copy** | Word count | Per-page limits (e.g. About ≤ 500 words, 404 ≤ 100 words) |
| **Bot templates** | Trigger coverage | One template per trigger type per bot |
| **Bot templates** | Tone variants | 3 variants per template (full/subtle/minimal) |
| **Bot templates** | Variable placeholders | All `{variable}` placeholders present and valid |

#### Code Gates

| Gate | Pass Condition |
|------|---------------|
| **Syntax** | TypeScript compiles (`tsc --noEmit`) without errors |
| **Exports** | All required exports present (check against spec) |
| **No Node APIs** | No `require()`, no `fs`, no `path`, no `process` — Workers-only |
| **Web Crypto only** | Crypto operations use `crypto.subtle`, not Node crypto |
| **Single code block** | Response contains exactly 1 code block per file |
| **Type annotations** | All functions have explicit return types |

### 1.5 Hard Blocks

#### Creative Hard Blocks

| Block | Applies To | What Triggers It |
|-------|-----------|-----------------|
| **Hallucinated lore** | All creative | References LOTR events, characters, or quotes that don't exist in the source material |
| **Bot self-reference** | Voice guides, bot templates | Any mention of "I am a bot", "as an AI", "I'm automated", or similar |
| **Wrong character voice** | Bot templates | Treebeard using exclamation marks; Gandalf using nature metaphors; either using dev slang |
| **Sarcasm in Treebeard** | Voice guide, bot templates | Treebeard being sarcastic, passive-aggressive, or condescending |
| **Overused "You shall not pass"** | Gandalf templates | Using the phrase for anything other than genuinely dangerous events (force push, missing approvals) |
| **Function obscured** | Page copy, bot templates | A developer reading the output can't determine the actual product function within 10 seconds |
| **Empty content** | All | Response is empty, truncated, or just the prompt echoed back |

#### Code Hard Blocks

| Block | What Triggers It |
|-------|-----------------|
| **Syntax error** | `tsc --noEmit` fails |
| **Node.js APIs** | Any use of `require()`, `fs`, `path`, `process`, `Buffer`, `crypto` (Node) |
| **Missing exports** | Required handler function not exported |
| **Secrets in code** | Hardcoded API keys, tokens, or webhook secrets |
| **No webhook verification** | Missing HMAC-SHA256 signature check in the request handler |
| **eval/exec** | Any use of `eval()`, `Function()`, or dynamic code execution |
| **Multiple code blocks** | Response contains more than one code block per requested file |

### 1.6 Voice Consistency Check

After all bot templates pass gates + review:

1. Collect all Treebeard + Gandalf comments (all triggers, all tone levels)
2. Shuffle randomly, strip bot names
3. Send to Gemma 3 12B: "These comments come from two different bot characters.
   Group them by character. For each group, explain what makes the voice distinct."
4. If Gemma can't reliably distinguish → voices need more differentiation
5. If it misattributes any comment → revise that specific comment

---

## Section 2: Creative Artefacts

### 2.1 Voice Guides

Two character bibles (~1500-2000 words each), generated by Qwen3-Next 80B,
reviewed by Gemma 3 12B on Anduril.

#### Treebeard Voice Guide

**Character core:** Slow, deliberate, uses nature metaphors. Not alarmed by bad
practices — saddened. Calls things by full names ("your proposed change", not "PR").

**Vocabulary:**
- "Hoom" / "Hmm" as opener (sparingly)
- "hasty" → rushed work
- "roots" → dependencies
- "the forest" → the codebase
- "young one" / "friend" → PR author (warm, never condescending)
- "grow" → building/shipping
- "rot" → tech debt, vulnerabilities

**Sentence patterns:**
- Opens with observation, not accusation: "I see you have been busy today..."
- States facts before opinions
- Closes with gentle advice, never demands

**Example comments per trigger:**

*Rapid-fire PR (3rd in 30 min):*
> Hoom. Three changes in half an hour. I have watched trees grow faster, but even
> they do not plant new seeds before the old ones have taken root. Your previous
> change is still unreviewed — perhaps let it breathe before asking the forest to
> consider another.

*Stale PR (5 days unreviewed):*
> This change has sat here for five days now. In the forest, we call that a fallen
> log — useful for a time, but eventually it becomes part of the undergrowth and
> nobody remembers it was once a tree. Someone should look at this before it takes
> root where it lies.

*Large dependency (>5MB):*
> You have brought something large into the forest. This new root — `{dep_name}` —
> weighs {size_mb}MB and will slow the wind through every build. That is not a
> reason to refuse it, but it is a reason to be sure you need it. Do you?

*Vulnerable dependency:*
> There is rot in one of the roots. `{dep_name}` has a known vulnerability
> ({cve_id}) and the forest cannot be safe while it remains.

**Anti-patterns:** Never angry/sarcastic. Never uses dev slang. Never uses
exclamation marks. Never lectures. Never mentions being a bot.

#### Gandalf Voice Guide

**Character core:** Dramatic but efficient. Shifts between warm encouragement and
stern authority. References fire, light, darkness, shadow, paths, bridges, gates.

**Vocabulary:**
- "You shall not pass" — ONLY for genuinely dangerous events (force push, merge
  without approvals). Never overused.
- "shadow" → failures, breaking changes, security issues
- "flame" → CI (the flame of Anor)
- "light" → passing tests, green builds
- "the path" → the pipeline
- "the bridge" → deployment
- "Fly, you fools!" → urgent issues (very sparingly)

**Example comments:**

*CI failure:*
> The flame has gone out. Your build fell to shadow in the `{check_name}` step.
>
> **What broke:** `{failure_message}`
>
> The path forward is clear — fix this, and the flame shall return.

*CI recovery:*
> The flame burns bright once more. After {n} attempts, the shadow has passed and
> all checks stand green. Well fought.

*Missing approvals:*
> **You shall not pass.**
>
> This change requires {n} approvals before it may cross the bridge. You have
> {current}. Patience — the Council must speak before the gate opens.

*Force push to main:*
> A force push to `main`. This is no small thing — history has been rewritten.
> [View the diff]({diff_url}).
>
> If this was intentional, so be it. If not, the damage must be undone swiftly.
> Fly, you fools!

*First-time contributor:*
> Welcome, friend. Your first contribution to this project — a fine beginning.
> The road goes ever on, and it is good to have new companions on it.

**Anti-patterns:** Never uses "You shall not pass" for minor issues. Never
sarcastic. Never mentions being a bot. Every quote must serve the message.

### 2.2 Merch Slogans

Generate 30 candidates in 3 batches of 10 (by category) using Qwen3-Next 80B.
Review/rank all 30 with Gemma 3 12B. User picks final set.

**Seed slogans by category:**

**Git Operations:**
1. "One does not simply push to main" 🧙
2. "git rebase --hard (Isengard style)" 🏰
3. "My git log reads like the Silmarillion" 📜
4. "Force push? That's a Balrog move" 🔥
5. "I committed to this branch 3000 years ago" 🌳
6. "Merge conflict at Helm's Deep" ⚔️
7. "git blame Sauron" 👁️

**CI/CD:**
8. "The beacons are lit! (Build passed)" 🔥✅
9. "You shall not deploy (to production)" 🧙‍♂️🚫
10. "My pipeline has more stages than Moria" ⛏️
11. "CI/CD: Cast It Into the Fire / Didn't Deploy" 🌋
12. "The Eagles carried my deployment" 🦅
13. "This build has been running since the Second Age" ⏳

**Code Review:**
14. "Reviewed by the Council of Elrond" 🏛️
15. "LGTM — Legolas Gets The Merge" 🏹✅
16. "Your code needs a second breakfast" 🍳
17. "That PR has more comments than the appendices" 📖
18. "Needs approval from at least two hobbits" 🧑‍🤝‍🧑

**Debugging:**
19. "console.log('One ring to find them')" 💍
20. "My bug tracker is just a map of Mordor" 🗺️
21. "Stack trace longer than the road to Mordor" 🥾
22. "It's a feature, Precious" 🐸
23. "The debugger sees all (like the Eye of Sauron)" 👁️‍🗨️

**General Dev Culture:**
24. "I code in the comfort of my hobbit-hole" 🏡
25. "Senior Hobbit Engineer" 🧑‍💻
26. "My codebase is older than Treebeard" 🌲
27. "I survived a sprint at Helm's Deep" ⚔️
28. "Keep calm and carry the Ring" 💍
29. "Speak friend and enter (the codebase)" 🚪
30. "There and back again: a developer's tale" 📕

**Emoji usage note:** Use emojis on merch where they fit naturally — matches the
website's playful tone. Stickers especially benefit from a single emoji accent.
For t-shirts and mugs, emoji use is optional per design.

**Product suitability:**
- Stickers (die-cut, 3"): All work. Short slogans best.
- T-shirts: 1, 6, 9, 14, 16, 24, 25, 27, 28, 30
- Mugs: 2, 5, 8, 11, 15, 22, 29
- Hoodies: 1, 9, 24, 25, 27

### 2.3 Page Copy

Each page generated by Qwen3-Next 80B with its own prompt template, reviewed on Anduril.

#### Pricing Page

| Tier | Name | Price | Tagline |
|------|------|-------|---------|
| Free | The Shire | $0 | "A comfortable beginning" |
| Pro | Rivendell | $3/mo per repo | "Where the wise gather" |
| Team | Gondor | $5/mo per repo | "The White City stands" |
| Enterprise | Valinor | Custom | "Beyond the circles of the world" |

FAQ (6 questions in-character):
1. "Can I try before I commit?" — The Shire is free forever. No ring required.
2. "What if I cancel?" — Back to The Shire. No data destroyed — we're not Sauron.
3. "Can I change tiers?" — Anytime. The path between tiers is well-worn.
4. "Open-source discount?" — Rivendell tier free for OSS. The Elves support the Free Peoples.
5. "How does per-repo pricing work?" — Each repo with a bot = one seat.
6. "Is my code safe?" — We never read your code. Bots only see webhook events.

#### Treebeard Product Page
Hero: "The Patient Reviewer". 4 feature blocks with example bot comments.
CTA: "Install Treebeard" (placeholder URL initially).

#### Gandalf Product Page
Hero: "The CI Guardian". 5 feature blocks with example bot comments.
CTA: "Install Gandalf".

#### About Page (The Legendarium)
Single-column, max-width 700px. Under 500 words. What, why, who, tech, open-source.

#### 404 Page
- "You have strayed from the path"
- "Not all who wander are lost — but this page is."
- Link: "Return to the Shire"
- Easter egg: URL containing "mordor" → "One does not simply navigate to Mordor."

#### Merch Page Intro
- "Gear for the Fellowship"
- "Stickers, shirts, and mugs for developers who speak both Python and Elvish."

### 2.4 Email Sequences

**Deferred.** No email service this weekend. Will draft copy when email capture is added.

---

## Section 3: Website Build

### 3.1 Architecture: Stay Static

Pure static HTML, no build step. GitHub Pages deploys repo root directly.
Shared header/footer via `components.js` (injects HTML on DOMContentLoaded).
6 pages total — a framework is overhead with no payoff.

### 3.2 File Structure

```
githobbit/
  index.html          (updated)
  pricing.html         (new)
  treebeard.html       (new)
  gandalf.html         (new)
  about.html           (new)
  merch.html           (new)
  404.html             (new)
  css/
    style.css          (extracted from index.html <style>)
  js/
    components.js      (shared nav + footer injection)
    easter-eggs.js     (extracted from index.html <script>)
  forge/               (project config — see Section 1)
```

### 3.3 CSS/JS Extraction

Extract index.html's 580-line `<style>` block to `css/style.css` (mechanical move).
Extract inline `<script>` to `js/easter-eggs.js`. All pages link to shared CSS/JS.

### 3.4 Shared Components (`components.js`)

- Defines nav HTML as template literal (matching existing nav structure)
- Defines footer HTML (matching existing footer)
- On DOMContentLoaded, injects into `<nav id="shared-nav">` and `<footer id="shared-footer">`
- Attaches Mordor mode toggle
- Highlights current nav link based on `window.location.pathname`

### 3.5 Page Build Specs

#### index.html Updates
1. Extract CSS → `css/style.css`
2. Extract JS → `js/easter-eggs.js`
3. Wire nav: Product → `#features`, Pricing → `/pricing.html`, Open Sauce → GitHub repo
4. Wire footer: map each `href="#"` to correct page or `title="Coming soon"`
5. Add merch CTA: third button "Browse the merch" → `/merch.html`
6. Mobile hamburger menu: visible below 768px, toggles `.nav-links`

#### pricing.html
Shared CSS/nav/footer. 4-column pricing grid (2x2 mobile). FAQ via `<details>/<summary>`.

#### treebeard.html / gandalf.html
Hero + feature blocks. Each feature shows a styled "GitHub comment" mock
(dark card, avatar, username "treebeard-bot"/"gandalf-bot", comment text).

#### about.html
Single-column readable layout, max-width 700px.

#### merch.html
Intro copy + product grid with images, names, prices, "Buy" links to Printful storefront.

#### 404.html
Centered, minimal. GitHub Pages auto-serves `404.html` for missing pages.

---

## Section 4: Merch Store

### 4.1 Platform: Printful Storefront (Free)

- Free hosted store with every Printful account
- Handles checkout, payments (Stripe built-in), fulfilment
- `/merch.html` links out to storefront (or embeds via iframe later)
- Zero inventory, zero shipping, zero payment processing setup
- Custom domain: `merch.githobbit.com`

### 4.2 Product Catalog

**Stickers (die-cut, 3"x3"):** $3-4 each, or 5/$12. Text-only on transparent/white.
Top picks: "One does not simply push to main", "git blame Sauron", "LGTM — Legolas
Gets The Merge", "Senior Hobbit Engineer"

**T-shirts (Bella Canvas 3001):** $25-30. Single slogan front, small logo back neck.
Colours: black, dark grey, navy (GitHub Dark aesthetic).
Top picks: "One does not simply push to main", "I survived a sprint at Helm's Deep",
"Senior Hobbit Engineer"

**Mugs (11oz white ceramic):** $15-18. Slogan one side, logo other.
Top picks: "Your code needs a second breakfast", "console.log('One ring to find them')",
"Speak friend and enter"

**Hoodies (optional):** $45-50. Same designs as tees. 1-2 designs only to start.

### 4.3 Design Production

**Text-only (weekend-feasible):** Clean sans-serif (Inter, JetBrains Mono for code).
White text on dark. Canva or Inkscape. No illustration needed — these are the MVP.

**Illustrated (post-weekend):** Octohobbit mascot, Gandalf terminal silhouette.
Needs actual design work beyond local models.

### 4.4 Setup Steps

1. Create Printful account
2. Set up Printful Storefront
3. Configure `merch.githobbit.com` DNS
4. Upload designs (start: 4-6 stickers, 2-3 shirts, 2 mugs)
5. Set prices
6. Add storefront links to `/merch.html`

### 4.5 Site Integration

**Phase 1 (weekend):** Link-out. `/merch.html` shows product previews with "Buy"
buttons linking to `merch.githobbit.com/{product}`.

**Phase 2 (post-weekend):** Printful JS widget embedded directly.

---

## Section 5: Email Capture

**Deferred.** Not building email capture this weekend. The hero email input stays
as a visual element but won't be wired to a backend. Can be added later with
Buttondown or similar when the bots are closer to launch and there's something
to announce.

---

## Section 6: GitHub App MVPs (Treebeard + Gandalf)

### 6.1 Hosting: Cloudflare Workers (Free Tier)

- 100,000 requests/day free
- No VPS to maintain
- Edge deployment (fast webhook response)
- Workers KV for config (1GB free)
- Self-hosting on Arnor rejected: no port forwarding by design

Architecture: `GitHub webhook → Cloudflare Worker → Rules engine → GitHub API (post comment)`

Each bot is a separate Worker and separate GitHub App.

### 6.2 GitHub App Registration (per bot)

1. `github.com/settings/apps/new`
2. App name: "Treebeard Bot" / "Gandalf Bot"
3. Homepage: `githobbit.com/treebeard` / `githobbit.com/gandalf`
4. Webhook URL: `treebeard.githobbit.workers.dev/webhook`
5. Permissions: Pull requests (R/W), Checks (R), Contents (R), Metadata (R)
6. Treebeard events: `pull_request` (opened, reopened, synchronize)
7. Gandalf events: `pull_request` (opened), `check_suite` (completed),
   `push` (force push), `pull_request_review` (approval tracking)
8. Generate private key (.pem), note App ID

### 6.3 Worker Code Structure (TypeScript)

```
workers/
  treebeard/
    src/
      index.ts          # Entry point, webhook verification
      rules.ts          # Rule engine
      templates.ts      # Comment templates (3 tone levels)
      github.ts         # GitHub API client
      config.ts         # Default thresholds
    wrangler.toml
  gandalf/
    src/
      index.ts, rules.ts, templates.ts, github.ts, config.ts
    wrangler.toml
  shared/
    github-auth.ts      # JWT gen, installation token exchange
    webhook-verify.ts   # HMAC-SHA256 verification (Web Crypto API)
    types.ts
```

### 6.4 Treebeard Rules

```typescript
interface TreebeardConfig {
  rapidfire_window_minutes: number;   // default: 30
  rapidfire_threshold: number;        // default: 3
  stale_pr_days: number;              // default: 5
  large_dep_threshold_mb: number;     // default: 5
  check_vulnerabilities: boolean;     // default: true
}
```

- **Rapid-fire:** On `pull_request.opened`, query author's other open PRs, filter by time window
- **Stale:** Cron Trigger (daily), query all open PRs, nudge if no review activity > threshold. Track nudged PRs in KV.
- **Large dep:** On PR opened/sync, parse diff for package manifests, check npm/PyPI APIs for size
- **Dep health:** Check GitHub Advisory DB or OSV.dev for CVEs in added/updated deps

### 6.5 Gandalf Rules

- **CI failure:** On `check_suite.completed` (conclusion=failure), extract failed check + message, post to PR
- **CI recovery:** On `check_suite.completed` (conclusion=success), check KV for prior failure state, celebrate if recovering
- **Missing approvals:** On PR opened, check branch protection config, post policy reminder
- **Force push:** On `push` with `forced=true` to default branch, alert with diff link
- **First-time contributor:** On `pull_request.opened`, check `author_association` field

### 6.6 Comment Templates

Stored as template literals in `templates.ts`. Variable interpolation via `{variable_name}`.
Each template has 3 variants: `full`, `subtle`, `minimal` — controlled by user config in Workers KV.

### 6.7 Local Testing

- smee.io for webhook forwarding during dev
- `npx smee-client --url https://smee.io/xxx --target http://localhost:8787`
- `npx wrangler dev` for local Worker
- Test repos: `Shotsfiredbyj/treebeard-test`, `Shotsfiredbyj/gandalf-test`

---

## Section 7: Prompt Template Specs

### 7.1 Merch Slogan Generation (`prompts/creative_merch_slogans.md`)

System: generate GitHobbit merch slogans (dev culture × LOTR).
Category variable `{category}`: git operations, CI/CD, code review, debugging, deployment, general.
Output: 10 numbered slogans, each with product suitability note.
Constraints: under 10 words, no specific languages, no footnote-requiring jokes,
vary LOTR sources, at least 2 character names, at least 1 quote parody.

### 7.2 Voice Generation (`prompts/creative_voice_treebeard.md`, `creative_voice_gandalf.md`)

Character core (200 words), vocabulary (15-20 terms), sentence patterns (5 w/ examples),
tone calibration (3 levels w/ comparison), example comments (per trigger), anti-patterns (5).

### 7.3 Page Copy (`prompts/creative_page_copy_{page}.md`)

Per-page templates with tier details, feature lists, voice constraints.
Output: labelled markdown sections. Voice: warm, witty, clear. Fantasy = flavour,
not confusion — visitor understands what they're buying within 10 seconds.

### 7.4 Code Generation (`prompts/code_webhook_{bot}.md`)

Cloudflare Worker webhook handler spec. index.ts, github.ts, webhook-verify.ts.
Constraints: Workers environment (no Node.js APIs), Web Crypto, Fetch, TypeScript strict.

### 7.5 Reviews (`prompts/review_{task_type}.md`)

One review prompt per task type, each embedding its specific rubric:

| Prompt File | Rubric Used | Target Reviewer |
|------------|-------------|-----------------|
| `review_slogan.md` | `creative_slogan_v1.md` | Anduril / gemma3:12b |
| `review_voice.md` | `creative_voice_v1.md` | Anduril / gemma3:12b |
| `review_page_copy.md` | `creative_page_copy_v1.md` | Anduril / gemma3:12b |
| `review_bot_template.md` | `creative_bot_template_v1.md` | Anduril / gemma3:12b |
| `review_worker_code.md` | `code_worker_v1.md` | Annuminas / nemotron or Anduril / gemma3:12b |

---

## Section 8: Task Dependency Graph

### Prerequisite: Arnor Forge Engine

The forge engine must be built and tested before any generation tasks run.
See `The_Forge/FORGE-BUILD-PLAN.md`.

### Layer 0: Project Setup

| ID | Task | Blocks |
|----|------|--------|
| P1 | Write GitHobbit project config (`forge/project.json`) | All generation |
| P2 | Write all prompt templates (`forge/prompts/*.md`) | All generation |
| P3 | Write rubric files (`forge/rubrics/*_v1.md`) | All reviews |
| P4 | Write gate configs (`forge/gates/*.json`) | All validation |
| P5 | Extract CSS from index.html → `css/style.css` | All new pages |
| P6 | Extract JS from index.html → `js/easter-eggs.js` | All new pages |
| P7 | Create `js/components.js` (shared nav/footer) | All new pages |

### Layer 1: Creative Generation (forge tasks)

| ID | Task | Blocks | Model |
|----|------|--------|-------|
| C1 | Treebeard voice guide | T1, T5 | qwen3-next:80b |
| C2 | Gandalf voice guide | T2, T5 | qwen3-next:80b |
| C3 | Merch slogans (3×10) | M1 | qwen3-next:80b |
| C4 | Pricing page copy | W1 | qwen3-next:80b |
| C5 | Treebeard page copy | W2 | qwen3-next:80b |
| C6 | Gandalf page copy | W3 | qwen3-next:80b |
| C7 | About page copy | W4 | qwen3-next:80b |
| C8 | 404 page copy | W6 | qwen3-next:80b |
| C9 | Merch page intro copy | W5 | qwen3-next:80b |

**Pipeline:** Generate C1 on Barrowblade → while C2 generates, send C1 to Anduril
for review → while C3 generates, review C2 → etc.

**Parallelisation:** If Annuminas is available, creative tasks split across both
hosts. Meanwhile Eregion handles code tasks independently, and Anduril reviews
everything as it arrives.

### Layer 1B: Code Generation (forge tasks, parallel across hosts)

| ID | Task | Blocks | Host | Model |
|----|------|--------|------|-------|
| K1 | Treebeard Worker skeleton (index.ts, rules.ts) | T3 | Barrowblade or Annuminas | gpt-oss:120b |
| K2 | Gandalf Worker skeleton | T4 | Annuminas or Barrowblade | gpt-oss:120b |
| K3 | Shared Worker code (auth, verify, types) | T3, T4 | Eregion | gpt-oss:20b |

### Layer 2: Reviews (automatic, parallel with generation)

| ID | Task | Depends On |
|----|------|------------|
| RC1–RC9 | Review each creative output | Corresponding C task |
| RK1–RK3 | Review each code output | Corresponding K task |

### Layer 3: Human Curation (user picks winners)

| ID | Task | Depends On |
|----|------|------------|
| H1 | Select final merch slogans | C3, RC3 |
| H2 | Approve/revise all page copy | C4–C9, RC4–RC9 |
| H3 | Approve/revise voice guides | C1, C2, RC1, RC2 |
| H4 | Approve/revise bot comment templates | T5 |

### Layer 4: Website Build (agent tasks — needs approved copy)

| ID | Task | Depends On |
|----|------|------------|
| W1 | Build pricing.html | P5, P7, H2 |
| W2 | Build treebeard.html | P5, P7, H2 |
| W3 | Build gandalf.html | P5, P7, H2 |
| W4 | Build about.html | P5, P7, H2 |
| W5 | Build merch.html | P5, P7, H2 |
| W6 | Build 404.html | P5, P7, H2 |
| W7 | Update index.html (wire links, merch CTA, hamburger) | P5, P6, P7 |

### Layer 5: Merch Setup (manual — needs approved slogans)

| ID | Task | Depends On |
|----|------|------------|
| M1 | Create Printful account + storefront | H1 |
| M2 | Create sticker designs (Canva/Inkscape) | H1 |
| M3 | Create t-shirt designs | H1 |
| M4 | Create mug designs | H1 |
| M5 | Upload designs to Printful, set prices | M2, M3, M4 |
| M6 | Configure merch.githobbit.com | M1 |
| M7 | Add product links to merch.html | M5, W5 |

### Layer 6: Bot Templates (forge tasks — needs approved voice guides)

| ID | Task | Depends On |
|----|------|------------|
| T1 | Treebeard comment templates (all triggers, 3 tones) | H3 |
| T2 | Gandalf comment templates (all triggers, 3 tones) | H3 |
| T5 | Voice consistency check | T1, T2 |

### Layer 7: Bot Deployment (agent tasks — needs everything)

| ID | Task | Depends On |
|----|------|------------|
| T3 | Assemble Treebeard Worker with templates, deploy | K1, K3, T1, H4 |
| T4 | Assemble Gandalf Worker with templates, deploy | K2, K3, T2, H4 |
| T6 | Register Treebeard GitHub App | T3 |
| T7 | Register Gandalf GitHub App | T4 |
| T8 | Test both bots on test repos | T6, T7 |

### Layer 8: Integration & Ship

| ID | Task | Depends On |
|----|------|------------|
| S1 | Update product pages with real install URLs | T6, T7 |
| S3 | Final review all pages locally | All W tasks |
| S4 | Push to main, verify GitHub Pages | S3 |
| S5 | Configure githobbit.ai redirect | S4 |

### Realistic Weekend Scope

**Core deliverables (very achievable):**
- GitHobbit project config (prompts, rubrics, gates)
- All creative generation, 6 new pages, updated index.html
- Merch store with 8-12 products

**Stretch (may spill to next week):**
- Bot Workers fully deployed and tested

**Pacing:** Phases flow based on runrate, not time-of-day. Each layer
unblocks the next — move to the next phase when the current one completes,
not when the clock says so.

---

## Verification

1. **Project config:** `forge.py --project ~/githobbit/forge --dry-run --batch creative_sprint.json`
2. **Rubric calibration:** Run each rubric through Gemma on a hand-written example — verify scores in expected range
3. **Creative output:** Gates pass + model review score 60+ + human review for final selection
4. **Code output:** Gates pass (tsc, no Node APIs) + model review score 70+ + manual testing
5. **Website:** Open each HTML page in browser locally, check all links, test mobile
6. **Merch store:** Place a test order on Printful storefront
7. **Bots:** Open test PRs on test repos, verify comments appear with correct voice
8. **Voice consistency:** Run cross-bot distinguishability test (Section 1.6)
9. **Retry pipeline:** Deliberately submit a gate-failing output and verify automatic retry fires

## Critical Files

- `/home/jack/githobbit/index.html` — refactor target
- `/home/jack/githobbit/PLAN.md` — product requirements
- `/home/jack/The Founding Of Arnor/The_Forge/FORGE-BUILD-PLAN.md` — forge engine plan
- `/home/jack/The Founding Of Arnor/The_Forge/tools/PROJECT-CONFIG-SPEC.md` — config spec
