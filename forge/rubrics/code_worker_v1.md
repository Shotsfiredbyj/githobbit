---
task_type: code
name: worker_code
version: 1
frozen: false
dimensions: 5
max_score: 100
---

# Worker Code Rubric v1

## Scoring Instructions

Score each dimension from 1–10 using the anchors below. For each score,
quote specific code from the output as evidence.

## Dimensions

| Dimension | Weight | Low (1-3) | Mid (5-6) | High (8-10) |
|-----------|--------|-----------|-----------|-------------|
| **Correctness** | /30 | Doesn't handle the webhook event correctly; logic errors in rule evaluation | Handles the happy path but misses edge cases (missing fields, malformed payloads) | Handles all specified triggers correctly including edge cases and error states |
| **Spec Compliance** | /20 | Missing required exports, wrong function signatures, or missing route handlers | Exports and signatures match but some config defaults are wrong or missing | Exact match to spec: all exports, all handlers, all config defaults |
| **Type Safety** | /20 | Missing type annotations, uses `any` everywhere, no interfaces for payloads | Has types but they're incomplete — some handlers lack return types, payloads partially typed | Full type coverage: explicit return types, payload interfaces, discriminated unions for events |
| **Workers Compatibility** | /15 | Uses Node APIs (require, fs, process) that don't exist in Workers runtime | Mostly Workers-compatible but slips in a Node pattern (e.g. Buffer instead of Uint8Array) | Pure Workers runtime: fetch API, crypto.subtle, no Node imports, correct module exports |
| **Code Quality** | /15 | Monolithic handler, no separation of concerns, copy-pasted blocks | Reasonable structure but some duplication or unclear naming | Clean separation: routing, rule evaluation, comment formatting, and config are distinct modules |
