---
title: Code
description: Repository code section and engineering philosophy
date: 2025-12-09
---

# Code

This section mirrors how I structure frontend repositories for scale.

## Principles

- Type-safe boundaries between modules
- Predictable routing and URL-driven state
- Strong UI composition with reusable primitives
- Accessibility-first interaction design

## Example: Typed Utility

```ts
export const notNull = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined
}
```

## Delivery Checklist

- [x] Strict TypeScript
- [x] Lint and format pipelines
- [x] Static content loading
- [x] Component architecture for growth

> Code quality is a product feature, not a maintenance chore.
