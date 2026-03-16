---
task_type: creative
name: page_copy_404
description: Generate Markdown copy for the GitHobbit 404 page
variables: []
expected_output: markdown_page
model_hint: creative
---

Generate Markdown copy for the GitHobbit 404 page. This is what visitors see
when they hit a broken or nonexistent URL.

## What to Include

- **Hero**: a short, fantasy-flavoured headline. Candidates to riff on (pick
  the best or improve):
  - "You have strayed from the path"
  - "Not all who wander are lost — but this page is"
  - "The road goes ever on, but not to here"
- **Message**: a brief (2–3 sentence) explanation that the page doesn't exist,
  delivered with warmth and whimsy. Don't apologise — make it charming.
- **CTA**: a link back to the home page. In-character label — not "Go home" but
  something like "Return to the Shire" or "Find your way back."

## Voice

Light, warm, gently amused. The visitor made a wrong turn — this page should
make them smile rather than feel frustrated. Think Gandalf giving directions
with a twinkle, not a stern lecture.

## Constraints

- 30–100 words total
- Fantasy tone, no dev slang, no bot self-reference
- No exclamation marks

## Output Format (follow exactly)

Use these exact Markdown headings in this order:

```
## Hero
(fantasy-flavoured headline)

## Message
(2–3 sentences, warm and whimsical)

## CTA
[Return to the Shire](/)
```

The CTA **must** be a Markdown link: `[Label text](/path)`. Not plain text.
