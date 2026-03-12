# GitHobbit — Product Plan

## What It Is

A fantasy-themed parody of developer tooling culture, starting as a satirical
landing page and expanding into genuinely useful developer tools with a
comedic voice.

The site is the marketing. The tools are the product.

## Current State

Static landing page at githobbit.com. Parody of GitHub's homepage with
fantasy-themed naming, testimonials, and easter eggs.

## Product Roadmap

### Phase 1 — Viral Launch

- Ship the landing page (done)
- Merch store (print-on-demand via Printful/Printify, zero inventory)
  - Stickers, t-shirts, mugs with developer/fantasy crossover slogans
  - Examples: "One does not simply push to main", "I survived a merge conflict at Helm's Deep"
- Email capture on the site ("Join the Fellowship" — early access to tools)
- Social launch: Hacker News, Reddit r/programming, dev Twitter/Bluesky

### Phase 2 — Bot Tools

Two GitHub App integrations with a fantasy-themed comedic voice:

#### Treebeard — The Patient Reviewer

A GitHub bot that nudges teams toward better practices, delivered in a
slow, deliberate, tree-like voice.

Triggers and behaviours:

- **Rapid-fire PRs:** If a user opens a PR within minutes of their last one,
  comments with a gentle nudge to slow down and review the previous one first.
- **Stale PRs:** If a PR sits unreviewed for days, posts a reminder that
  draws attention to the neglect — in character.
- **Large dependencies:** When a new dependency is unusually large, flags it
  with a comment about its weight and download impact on CI.
- **Dependency health alerts:** Surfaces known vulnerabilities or outdated
  packages in a way that's hard to ignore because it's entertaining.

Why it works: developers ignore most automated comments. A bot with personality
gets read. The underlying function — PR hygiene, dependency awareness — is
the real value.

#### Gandalf — The CI Guardian

A GitHub bot that watches CI pipelines and code review, and communicates
status with a wizardly voice.

Triggers and behaviours:

- **CI failure:** Comments with a summary of what broke, delivered as a
  dramatic denial of passage.
- **CI recovery:** When a pipeline goes green after a failure, acknowledges
  the fix with characteristic timing humour.
- **Missing approvals:** If someone tries to merge without required reviews,
  blocks with a reminder about the approval policy.
- **Force push to main:** Alerts the team with urgency and a link to the
  diff showing what changed.
- **First-time contributors:** Welcomes new contributors with an encouraging,
  in-character greeting.

Why it works: CI status comments are wallpaper — people scroll past them.
A distinctive voice cuts through. The utility is surfacing CI health and
review hygiene clearly.

### Phase 3 — Monetisation

- **Free tier:** Core bot functionality with default triggers and responses.
- **Paid tier ($3–5/month per repo):**
  - Configurable rules and thresholds
  - Custom trigger responses
  - Slack/Discord notification forwarding
  - Dashboard with PR health metrics
- **Merch** continues as passive revenue alongside tools.

## Technical Architecture

Both bots are GitHub Apps:

1. Register as a GitHub App with webhook subscriptions
   (pull_request, check_suite, push, issue_comment, etc.)
2. Receive webhook events at a lightweight HTTP service
3. Apply configurable rules to determine response
4. Post comments via the GitHub API

Hosting: single small VPS or serverless (Cloudflare Workers / AWS Lambda).
Minimal infrastructure — these are stateless webhook handlers with a small
config store.

## Voice & Branding

The fantasy theme is the differentiator. Without it, these are commodity
PR/CI bots. With it, they're memorable, shareable, and fun to install.

The voice should be:

- Consistent enough to feel like a character, not random jokes
- Useful first — every comment should contain actionable information
- Funny second — the comedy is delivery, not content
- Configurable — teams can adjust tone from "full character" to "subtle"

## Revenue Projections (Conservative)

Assuming modest viral traction:

- 500 free installs in first month
- 5% conversion to paid → 25 paying repos × $4/mo = $100/mo
- Merch: unpredictable, but sticker sales from dev audiences can be
  surprisingly consistent. $200–500 in the launch spike.
- Growth from there depends on whether the tools are genuinely good.

This isn't a venture-scale business. It's a fun side project that could
cover its own costs and then some.

## Risk

The fantasy theming is parody. If the brand voice ever needs to change,
the underlying tools (PR nudges, CI summaries, dependency alerts) stand
on their own. A rebrand would lose the marketing hook but retain all
paying users — they're paying for the function, not the flavour.

Keep the product separable from the theme at all times.
