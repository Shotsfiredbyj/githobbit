---
task_type: creative
name: page_copy_merch
description: Generate Markdown copy for the GitHobbit merch store page
variables: []
expected_output: markdown_page
model_hint: creative
---

Generate Markdown copy for the GitHobbit Merch page. GitHobbit sells
print-on-demand developer merch (stickers, t-shirts, mugs, hoodies) with
fantasy × developer culture crossover slogans.

## What to Include

- **Hero section**: title "Gear for the Fellowship", short intro that makes
  the merch feel like a natural extension of the brand — not an afterthought.
- **Intro paragraph** (≈50 words): what's on offer, that it's print-on-demand
  via a storefront (Printful). Keep it honest — this is merch, not a product
  launch.
- **Product grid**: a Markdown table with 4–6 representative products. Each row:
  product name, short description (≤10 words), price, and a placeholder link
  `https://merch.githobbit.com/{product_slug}`.

  Example products to riff on (generate fresh names/descriptions):
  | Product | Description | Price |
  |---------|-------------|-------|
  | "One Does Not Simply" Sticker | The classic, for your laptop lid | $3 |
  | Helm's Deep Rebase Tee | For survivors of interactive rebase | $25 |

- **CTA**: "Browse the Store" button linking to the storefront.

## Voice

Enthusiastic but not pushy. The merch page should feel like a friend showing
you their favourite stickers, not a sales pitch. Fantasy references in product
names and descriptions, but the page structure (grid, prices, links) should be
clean and scannable.

## Constraints

- ≤300 words total
- Fantasy tone, no dev slang, no bot self-reference
- Use Markdown headings and tables for the grid
- Prices should feel reasonable for print-on-demand (stickers $3–5, tees $20–30,
  mugs $12–18, hoodies $40–55)

## Output Sections

Hero, Intro, Products, CTA
