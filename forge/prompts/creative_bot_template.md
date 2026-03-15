---
task_type: creative
name: bot_template
description: Generate bot comment templates for GitHub Actions bots (Treebeard/Gandalf) for four triggers: CI failure, CI recovery, missing approvals, force push. Each template must be in-character, actionable, and under 30 words.
variables: [bot]
expected_output: Four bot comment templates, each preceded by a number and trigger label (e.g., "1. CI Failure:"), under 30 words each, containing at least one variable placeholder like {commit_sha} or {workflow_name}, in the voice of either Treebeard or Gandalf.
model_hint: creative
---

You are generating **bot comment templates** for GitHub Actions bots in the GitHobbit universe. There are **two bots**: Treebeard (slow, wise, tree-like) and Gandalf (calm authority, dramatic timing). Each bot has a distinct voice guide – use the appropriate one based on the bot name in the variable.

You must produce **exactly four templates**, one for each trigger below. For each template:

1.  Start with the number and trigger label: `1. CI Failure:`
2.  Write **one comment** that the bot would post on a PR for that trigger.
3.  The comment must be **under 30 words**.
4.  It must contain **at least one variable placeholder** from the list: `{commit_sha}`, `{workflow_name}`, `{job_name}`, `{error_line}`, `{approver_name}`, `{approval_count}`, `{required_approvals}`, `{pusher_name}`, `{branch_name}`, `{base_branch}`.
5.  The comment must be **in-character** for the specified bot – use their vocabulary, sentence patterns, and tone.
6.  **Do not** include bot self-reference ("I am a bot", etc.), dev slang (LGTM, nit, shipit), or explanations.
7.  Output only the numbered list – no intro, no outro, no commentary.

## Bot: {{ bot }}

## Triggers

*   **1. CI Failure:** The CI workflow just failed. Provide the error and next steps.
*   **2. CI Recovery:** The CI workflow just passed after being fixed. Acknowledge the fix.
*   **3. Missing Approvals:** The PR lacks required approvals. State how many are needed.
*   **4. Force Push:** Someone force-pushed to the PR branch. Warn about rewriting history.

## Voice Context (Summary)

**Treebeard**: Slow, deliberate, ancient wisdom. Uses tree/earth metaphors. Short sentences. Examples: "The root grows deep.", "Haste makes waste.", "Check the soil before you plant."
**Gandalf**: Calm authority, dramatic timing, warm beneath sternness. Uses light/shadow/middle-earth metaphors. Measured sentences. Examples: "All we have to decide is what to do with the time that is given us.", "Even the smallest person can change the course of the future."

## Bad Examples (What NOT to do)

*   "CI failed lol fix it" – Wrong bot, wrong tone, no variables.
*   "As an AI, I detected a failure in {workflow_name}." – Bot self-reference.
*   "LGTM! Looks good to me!" – Dev slang, wrong trigger.
*   A paragraph-long explanation – Violates brevity.

Generate the four templates now for the {{ bot }} bot.
