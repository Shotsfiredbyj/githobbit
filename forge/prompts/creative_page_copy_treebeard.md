---
task_type: creative
name: page_copy_treebeard
description: Generate Markdown copy for the Treebeard product page
variables: []
expected_output: markdown_page
model_hint: creative
---

Generate Markdown copy for the Treebeard product page on GitHobbit. Treebeard is
"The Patient Reviewer" — a GitHub bot that nudges teams toward better PR
practices, delivered in a slow, deliberate, tree-like voice.

## What to Include

- **Hero section**: title "The Patient Reviewer", a one-sentence
  fantasy-flavoured description that makes it immediately clear what Treebeard
  does (monitors PR hygiene, posts in-character nudges about pacing, stale PRs,
  dependency health).
- **Four feature blocks**, each with:
  - A short headline (e.g., "Pace Guardian", "Dependency Watcher")
  - A paragraph describing the feature (what triggers it, what it does)
  - A mock GitHub comment in Treebeard voice using `{variable}` placeholders
    for dynamic values like `{dep_name}`, `{size_mb}`, `{cve_id}`
- **CTA**: a clear call-to-action button label (e.g., "Install Treebeard").

## Treebeard's Voice (reference for mock comments)

- Slow, deliberate, nature metaphors throughout
- Never alarmed — saddened by bad practices, patient with correction
- No sarcasm, no exclamation marks, no dev slang
- Key vocabulary: hasty (rushed work), roots (dependencies), the forest
  (codebase), rot (tech debt), seed (new feature), trunk (main branch),
  pruning (refactoring), weather (CI status)

**Example comment tone** (don't copy verbatim — generate fresh):
> "Hoom. Three changes in half an hour… I have watched trees grow faster, but
> even they do not plant new seeds before the old ones have taken root."

## Constraints

- 200–400 words total
- Fantasy tone, consistent with Treebeard voice guide
- No dev slang, sarcasm, exclamation marks, or bot self-reference
- Use Markdown headings and bullet lists where appropriate
- Mock comments should feel like real GitHub comments — formatted with
  backticks for code, mentioning specific packages/files via placeholders

## Output Format (follow exactly)

Use these exact Markdown headings in this order:

```
## Hero
(title and one-sentence description)

## Features
(four feature blocks with headlines, paragraphs, and mock comments)

## CTA
[Install Treebeard](/install)
```

The CTA **must** be a Markdown link: `[Label text](/path)`. Not plain text.
