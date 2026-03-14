---
task_type: code
name: webhook_treebeard
description: Generate Cloudflare Worker TypeScript scaffold for the Treebeard bot webhook handler
variables: []
expected_output: code_tree
model_hint: code
---

Generate a Cloudflare Worker TypeScript project scaffold for the Treebeard bot
webhook handler. Treebeard is a GitHub App that nudges teams toward better PR
practices, posting in-character comments about pacing, staleness, and dependency
health.

## Requirements

- Entry point `index.ts` with `fetch` handler verifying the GitHub webhook
  signature using Web Crypto (`crypto.subtle.verify` with HMAC-SHA256).
- Export a primary handler: `handlePullRequest(event: PRPayload): Promise<Response>`
- Additional handlers for each trigger:
  - `handleRapidFirePR` — user opens multiple PRs in quick succession
  - `handleStalePR` — PR unreviewed for configurable number of days
  - `handleLargeDependency` — new dependency exceeds size threshold
  - `handleVulnerableDependency` — dependency has known CVE
- Helper modules as separate ES modules:
  - `github.ts` — GitHub API calls (post comment, get PR, list dependencies)
  - `rules.ts` — business logic (determine trigger type, thresholds, response)
  - `config.ts` — defaults and environment bindings
- Strict TypeScript types for all payloads, responses, and errors (no `any`)
- Placeholder variables `{WEBHOOK_SECRET}`, `{INSTALLATION_TOKEN}` for secrets

## Constraints

- No Node.js APIs (`require`, `fs`, `path`, `process`) — Workers runtime only
- Must compile with `tsc --noEmit`
- Keep each file under 200 lines
- Brief comments only — no JSDoc novels
- No `console.log` or debugging statements
- Use ES module syntax (`import`/`export`)

## Output Format

Output a file tree with each file's content in a fenced Markdown code block:

```
project/
  index.ts
  github.ts
  rules.ts
  config.ts
  tsconfig.json
  wrangler.toml
```

For each file, provide the full content in a code fence with the filename as
a comment on the first line.
