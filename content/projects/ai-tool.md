---
title: AI Tool
description: AI-assisted workflow system for internal teams
date: 2025-04-30
---

# AI Tool

## Problem

Internal teams were spending too much time on repetitive triage and report preparation.

## Implementation

- React workspace with role-based UX shells
- Prompt orchestration layer with typed templates
- Local-first caching for draft continuity
- Audit-friendly activity timeline

## Features

- [x] Prompt presets by team
- [x] Structured output validation
- [x] Source attachment with citation metadata
- [x] Performance dashboards

## SQL Snapshot

```sql
SELECT team, COUNT(*) AS completed_reports
FROM workflow_runs
WHERE status = 'done'
GROUP BY team
ORDER BY completed_reports DESC;
```

## Result

Report preparation time decreased by 44% in the first two quarters.
