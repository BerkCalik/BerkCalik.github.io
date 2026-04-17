---
title: Trimly AI - Chrome Extension
description: A Chrome extension built with WXT, React, and TypeScript for summarizing or translating web content using OpenAI models.
date: 2026-04-17
repository: https://github.com/BerkCalik/trimly-ai
---

# Trimly AI - Chrome Extension

Trimly AI is a Chrome extension built with WXT, React, and TypeScript for summarizing or translating web content with OpenAI models.

It supports full-page extraction, selected-text summaries from the context menu, prompt customization, history tracking, and an expanded reader view for long outputs.

![Trimly AI Popup](/assets/projects/trimly-ai-1.jpg)
![Trimly AI Settings](/assets/projects/trimly-ai-2.jpg)

---

## 🔗 Project Links

- GitHub: https://github.com/BerkCalik/trimly-ai

---

## ✨ Features

- Summarize readable web pages from the toolbar popup
- Process selected text directly from the right-click context menu
- Choose an output language, including Original
- Choose summary length: Short, Medium, Long, or Full
- Use Full mode for translation-only output without summarization
- Pick between supported OpenAI models in settings
- Save API key, model, prompt, language, and app-language preferences locally
- Reopen results in a dedicated reader tab with larger typography
- Keep history entries with summary, prompt, model, source, and timestamp
- Restore active popup jobs if the popup closes during streaming

---

## 🧠 How It Works

1. Open the extension from the Chrome toolbar or select text on a page and use the context menu.
2. In the popup, choose the target language and summary length.
3. Press Trimly to start processing from the toolbar flow.
4. Copy the result or open it in a new tab for a larger reading view.
5. Manage API key, model, prompt, app language, and history from the options page.

---

## 🖥 Screens

- **Popup:** starts summaries or translations and displays streaming results
- **Options:** manages settings and lets you inspect history entries
- **Reader:** shows the latest result in a larger, more readable layout

---

## 🛠 Tech Stack

- **TypeScript**
- **React 19**
- **WXT** (Web Extension framework)
- **Vite** (build toolchain under WXT)
- **Chrome Extension Manifest V3**
- **Tailwind CSS**
- **PostCSS + Autoprefixer**
- **@mozilla/readability** (content extraction)
- **marked** (Markdown render/parse)
- **OpenAI API** (/v1/chat/completions)
