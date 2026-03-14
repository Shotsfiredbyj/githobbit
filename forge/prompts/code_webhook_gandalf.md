---
task_type: code
name: webhook_gandalf
description: Generate Cloudflare Worker TypeScript scaffold for the Gandalf bot webhook handler
variables: []
expected_output: code_tree
model_hint: code
---

Generate a Cloudflare Worker TypeScript project scaffold for the Gandalf bot
webhook handler. Gandalf is a GitHub App that monitors CI pipelines and code
review, posting in-character comments.

## Requirements

- Entry point `index.ts` with `fetch` handler verifying the GitHub webhook
  signature using Web Crypto (`crypto.subtle.verify` with HMAC-SHA256).
- Export handler functions for each trigger:
  - `handleCIFailure` — CI check suite failure
  - `handleCIRecovery` — CI goes green after a failure
  - `handleMissingApproval` — merge attempted without required reviews
  - `handleForcePush` — force push to a protected branch
  - `handleFirstContributor` — first-time contributor opens a PR
- Helper modules as separate ES modules:
  - `github.ts` — GitHub API calls (post comment, get PR, get check suite)
  - `rules.ts` — business logic (determine trigger type, severity, response)
  - `config.ts` — defaults and environment bindings
- Strict TypeScript types for all payloads and responses (no `any`)
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
