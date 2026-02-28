---
title: RealTime Captions Translate (macOS)
description: Minimal macOS app for real-time English subtitles and Turkish translation using OpenAI Realtime WebRTC.
date: 2026-02-01
repository: https://github.com/BerkCalik/RealTimeCaptionsTranslateMacOS
---

# RealTime Captions Translate (macOS)

A minimal macOS 14+ SwiftUI application that generates real-time English subtitles and Turkish translations directly from system audio input.

The app captures system-level audio (e.g., via BlackHole), processes speech in real time using OpenAI Realtime over WebRTC, and renders dual-language subtitles with low latency.

---

![Sepetteyiz](../assets/projects/RealTimeCaptionsTranslateMacOS.webp)

## 🔗 Repository

- GitHub: https://github.com/BerkCalik/RealTimeCaptionsTranslateMacOS

---

## 🚀 Overview

This project focuses on real-time speech processing and translation with minimal delay and a clean, distraction-free interface.

It is designed for:

- Live technical meetings
- Online conferences
- Webinars
- Developer presentations
- International collaboration

The primary goal is to maintain low latency while preserving translation accuracy — especially for technical terminology.

---

## 🧠 How It Works

1. System audio is captured using CoreAudio (e.g., BlackHole input device).
2. Audio stream is processed via AVFoundation.
3. The stream is transmitted using WebRTC.
4. OpenAI Realtime API performs:
   - Speech-to-text (English subtitles)
   - Instant Turkish translation
5. The UI renders synchronized subtitles in real time.

The pipeline is optimized for responsiveness and minimal buffering.

---

## 🛠 Tech Stack

- **Swift**
- **SwiftUI**
- **AVFoundation**
- **CoreAudio**
- **OpenAI Realtime (WebRTC)**

---

## 🏗 Architecture Highlights

- Single real-time processing pipeline
- Lightweight SwiftUI interface
- Concurrent audio streaming handling
- Minimal state layer for fast UI updates
- Environment-based API configuration

---

## ⚡ Performance Considerations

- Reduced buffering to lower latency
- Efficient audio chunk streaming
- Incremental subtitle rendering
- Controlled UI updates to prevent blocking
- Optimized WebRTC communication flow
