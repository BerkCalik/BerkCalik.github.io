---
title: Berk Çalık Portfolio Site
description: A GitHub-inspired portfolio built with React and TypeScript, powered by static Markdown content and deployed on GitHub Pages.
date: 2026-02-20
repository: -
---

# Berk Çalık Portfolio Site

A GitHub-inspired personal portfolio built with React and TypeScript.

This project recreates the structure and behavior of a real GitHub repository page while serving as a fully static, content-driven portfolio. All content is powered by Markdown files and dynamically rendered within a GitHub-like interface.

The site is designed to feel familiar to developers while showcasing projects, experience, and technical depth in a structured and scalable way.

#### 🔗 Repository

- GitHub: https://github.com/BerkCalik/BerkCalik.github.io


---

## 🚀 Overview

The core idea behind this project was to:

- Replicate the GitHub repository layout  
- Use Markdown as the single source of content  
- Maintain a clean and scalable architecture  
- Deploy fully static via GitHub Pages  

Instead of a traditional portfolio layout, this site behaves like a repository:

- Tabs (Code, About, Projects, Skills, Contact)
- File list view
- Markdown rendering panel
- Real GitHub API integrations (Languages, Commits, Contributors)

---

## 🏗 Architecture

The project follows a modular and scalable frontend architecture.

### Key Architectural Decisions

- Feature-based folder structure  
- Dynamic Markdown loading using import.meta.glob
- URL-synchronized routing with React Router  
- GitHub-like layout composition (centered container, stacked cards)  
- Right-side repository sidebar (About, Languages, Commits, Contributors)  
- API-driven dynamic data integration  

All content is stored as static .md files inside a structured /content directory.

---

## 🧠 GitHub-Inspired Layout

The UI mimics the real GitHub repository page:

- Centered max-width container  
- Repository header & tab navigation  
- File list card  
- README-style markdown card  
- Right repository sidebar  
- Dark/Light theme toggle  

Special attention was given to:

- Compact spacing  
- Subtle borders  
- Accurate typography  
- Code block styling  
- Copy-to-clipboard functionality  

---

## 🔗 GitHub API Integrations

To increase realism, the sidebar pulls live data from GitHub:

- Languages (byte-based percentage calculation)
- Latest commits
- Contributors

All API calls include loading and error handling states and maintain layout integrity.

---

## 🛠 Tech Stack

### Core

- React
- TypeScript
- Vite
- React Router
- TailwindCSS

### Content & Rendering

- react-markdown
- remark-gfm
- rehype-highlight

### State & Structure

- Feature-based architecture
- Clean component separation
- Utility-based logic modules

### Quality & Tooling

- ESLint
- Prettier
- Strict TypeScript mode

---

## ⚡ Performance Considerations

- Static content generation via Vite
- Optimized Markdown rendering
- Memoized computations where needed
- Lightweight component structure
- No backend dependency

---

## 🚀 Deployment

The project is fully static and deployed using **GitHub Pages**.

It supports:

- Base path configuration
- Static hosting compatibility
- SPA routing under GitHub Pages

---

## 👨‍💻 My Role

- Designed the full system architecture  
- Implemented GitHub-like layout and behavior  
- Built dynamic Markdown routing system  
- Integrated GitHub API data  
- Implemented theme system (dark/light)  
- Optimized performance and code structure  
- Configured deployment for GitHub Pages  

---

This project demonstrates frontend architecture discipline, UI precision, and scalable content-driven design.