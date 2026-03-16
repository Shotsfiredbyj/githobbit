---
task_type: creative
name: page_copy_gandalf
description: Generate Markdown copy for the Gandalf product page
variables: []
expected_output: markdown_page
model_hint: creative
---

Generate Markdown copy for the Gandalf product page on GitHobbit. Gandalf is
"The CI Guardian" — a GitHub bot that watches CI pipelines and code review,
communicating status with a wizardly voice.

## What to Include

- **Hero section**: title "The CI Guardian", a one-sentence fantasy-flavoured
  description that makes it immediately clear what Gandalf does (monitors CI
  and review status, posts in-character comments).
- **Five feature blocks**, each with:
  - A short headline (e.g., "Pipeline Watch", "Merge Guardian")
  - A paragraph describing the feature (what triggers it, what it does)
  - A mock GitHub comment in Gandalf voice using `{variable}` placeholders
    for dynamic values like `{module}`, `{failure_count}`, `{reviewer_list}`
- **CTA**: a clear call-to-action button label (e.g., "Install Gandalf").

## Gandalf's Voice (reference for mock comments)

- Calm authority — never raises his voice
- Dramatic timing — uses pauses for emphasis
- Economy of words — says much with little
- "You shall not pass" reserved for blocked merges and critical CI failures only
- Key vocabulary: shadow/darkness (failing CI), the path (pipeline), counsel
  (code review), the bridge (the PR), the Fellowship (the team)

**Example comment tone** (don't copy verbatim — generate fresh):
> "A shadow has fallen across this build. The tests speak of failure in
> `{module}`. Look to the logs, and do not attempt passage until the darkness
> is lifted."

## Constraints

- 200–500 words total
- Fantasy tone, consistent with Gandalf voice
- No dev slang, sarcasm, exclamation marks, or bot self-reference
- Use Markdown headings and bullet lists
- Mock comments should feel like real GitHub comments — formatted with
  backticks for code, mentioning specific files/modules via placeholders

## Output Format (follow exactly)

Use these exact Markdown headings in this order:

```
## Hero
(title and one-sentence description)

## Features
(five feature blocks with headlines, paragraphs, and mock comments)

## CTA
[Install Gandalf](/install)
```

The CTA **must** be a Markdown link: `[Label text](/path)`. Not plain text.
