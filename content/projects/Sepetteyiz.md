---
title: Sepetteyiz – iOS & Android
description: A real-time collaborative shopping list application designed for families and shared households.
date: 2025-03-10
repository: -
---

# Sepetteyiz – Smart Shared Shopping Lists

Sepetteyiz is a collaborative shopping list application designed to make grocery planning simple, fast, and organized.

It allows families, roommates, or friends to manage shared shopping lists in real time — ensuring everyone stays aligned before and during store visits.

---

![Sepetteyiz](../assets/projects/sepetteyiz.jpg)

## 📲 Download

- 🍎 **App Store:** [Download on the App Store](https://apps.apple.com/us/app/sepetteyiz/id6759273947)
- 🤖 **Google Play:** [Get it on Google Play](https://play.google.com/store/apps/details?id=com.kompanse.shoplist)

---

## 🚀 Overview

The core idea behind Sepetteyiz is eliminating confusion in shared shopping.

Instead of sending messages like _“Did you buy the milk?”_, everyone sees the same list, updated instantly.

The app focuses on:

- Simplicity
- Real-time collaboration
- Fast interaction
- Clean, distraction-free UI

---

## ✨ Key Features

### 👥 Shared Lists

Invite family members or roommates by username and collaborate instantly on shared shopping lists.

### ⚡ Real-Time Sync

All changes are reflected immediately across devices.  
When someone adds or checks off an item, everyone sees it in real time.

### 🧠 Smart Autocomplete

As you type, Sepetteyiz suggests items to speed up list creation and reduce repetitive typing.

### 📦 Units & Quantities

Add detailed quantities using specific units such as:

- lbs
- oz
- gallon
- dozen

This ensures clarity and avoids mistakes during shopping.

### 🎨 Personalization

- 10 unique avatars
- Sleek Dark Mode interface
- Minimal and intuitive design
- i18n Multi-language support

---

## 🏗 Architecture & Technical Approach

The application was designed with scalability and real-time responsiveness as primary goals.

### Core Decisions

- Centralized real-time state synchronization
- Optimistic UI updates for instant feedback
- Clean modular structure
- Strict TypeScript usage
- Lightweight state management

---

## 🛠 Tech Stack

### Mobile

- React Native
- Expo
- TypeScript
- Zustand (state management)

### Backend & Services

- Firebase Authentication
- Firebase Realtime Database
- Push Notifications
- RevenueCat (subscription management)

### Dev & Delivery

- ESLint
- Fastlane (automated builds & releases)

---

## ⚡ Performance & UX Considerations

- Real-time database listeners optimized to reduce unnecessary re-renders
- Lightweight global state with Zustand
- Optimistic updates to avoid UI latency
- Minimal network payload structure
- Fast app startup time

---

Sepetteyiz demonstrates how real-time systems, clean architecture, and thoughtful UX can combine to create a practical everyday tool.

---
