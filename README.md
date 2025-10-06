# 🧠 Offline Habit Tracker (Vanilla JS + PWA)

A **Progressive Web App (PWA)** built entirely with **Vanilla JavaScript + TypeScript**, showcasing  browser APIs, offline-first design, and state management without frameworks.  

This project allows users to **create, track, and maintain daily habits** — all **offline**, thanks to **IndexedDB** and **Service Workers**.

---

## 🎥 Demo Video

▶️ [Watch the 5-Minute YouTube Explanation](https://youtu.be/your-video-link-here)  
*(Coming soon — this video will walk through the concepts, architecture, and app demo.)*

---

## 🧩 Core Features

- ✅ **Add / Edit / Delete habits**
- 📅 **Track daily completions** and visualize streaks
- 🗄️ **Offline-first experience** using IndexedDB
- 💾 **Persistent data** even after browser refresh or offline use
- 📱 **Installable PWA** — works like a native mobile app
- 🚀 **Fast performance** through caching and local storage
- ⚙️ **Modular architecture** with reusable JS modules

---

## 🧠 Key JavaScript Concepts

This project demonstrates **intermediate to advanced browser development concepts**, including:

| Concept | Description |
|----------|-------------|
| **Modules (ESM)** | Organizing logic into import/export files (`db.ts`, `ui.ts`, `state.ts`) |
| **Closures** | Encapsulating app state and internal functions for immutability |
| **Custom Events** | Communicating between components without global variables |
| **Async/Await** | Managing IndexedDB CRUD operations asynchronously |
| **IndexedDB via `idb`** | Local database storage for habits and entries |
| **Service Worker (Workbox)** | Handles caching, offline mode, and PWA lifecycle |
| **Debouncing/Throttling** | Preventing unnecessary re-renders or DB writes |
| **Progressive Enhancement** | App works online or offline, on desktop or mobile |

---

## 🏗️ Project Structure

