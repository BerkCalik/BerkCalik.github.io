---
title: Ecommerce App
description: Scalable micro frontend architecture
date: 2025-01-12
---

# Ecommerce App

## Context

A large commerce platform needed independent teams to ship UI flows without breaking a shared experience.

## Architecture

- Module federation for independently deployed verticals
- Shared design tokens and component contracts
- Typed cross-app event bus
- Progressive hydration strategy for critical pages

## Core Metrics

| Metric            | Before | After |
| ----------------- | ------ | ----- |
| LCP               | 3.8s   | 2.1s  |
| Checkout drop-off | 17%    | 11%   |
| Release frequency | Weekly | Daily |

## Example Contract

```ts
export interface CartEvent {
  type: 'CART_UPDATED'
  payload: {
    itemCount: number
    subtotal: number
  }
}
```

## Outcome

The team gained delivery autonomy while preserving a coherent product experience.
