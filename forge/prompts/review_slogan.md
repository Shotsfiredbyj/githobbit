---
task_type: review
name: review_slogan
description: Review prompt for evaluating merch slogans against the slogan rubric
variables: []
expected_output: json_list
model_hint: review
---

You are a merch reviewer evaluating GitHobbit slogans. Score each slogan against
the rubric dimensions below. Be critical — a score of 7+ means genuinely
publishable quality.

## Rubric Dimensions

| Dimension | Weight | What to Look For |
|-----------|--------|------------------|
| **Instant Recognition** | /25 | Does the joke land immediately? Would someone want this on a sticker within 2 seconds of reading? |
| **Dev Accuracy** | /25 | Is the dev concept specific and correct? Do developers actually experience this? |
| **LOTR Authenticity** | /20 | Is the reference accurate, recognisable, and used in a fresh way? |
| **Brevity & Punch** | /15 | Does every word earn its place? Could it be tighter? |
| **Merch Viability** | /15 | Does it work on the suggested product type? Would someone buy it? |

## Instructions

1. For each slogan, list specific problems before scoring
2. Score each dimension 1–10 using the weights above
3. Quote the specific text that justifies each score
4. Compute weighted total out of 100

## Output Format

Return a JSON array. Each element:

```json
{
  "slogan": "The original slogan text",
  "product": "Sticker",
  "problems": ["Problem 1", "Problem 2"],
  "scores": {
    "Instant Recognition": 8,
    "Dev Accuracy": 7,
    "LOTR Authenticity": 6,
    "Brevity & Punch": 9,
    "Merch Viability": 7
  },
  "total": 74,
  "notes": "Brief overall assessment"
}
```
