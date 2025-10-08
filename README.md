# 🧠 Offline Habit Tracker (Vanilla JS + PWA)

A **Progressive Web App (PWA)** built  with **Vanilla JavaScript + TypeScript**, showcasing  browser APIs, offline-first design, and state management without frameworks.  

This project allows users to **create, track, and maintain daily habits** — all **offline**, thanks to **IndexedDB** and **Service Workers**.

---

## 🎥 Demo Video

▶️ [Watch the 5-Minute YouTube Explanation](https://youtu.be/IEepu7yx9XI)  

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
| **Modules (ESM)** | Organizing logic into import/export files (`db.ts`, `ui.ts`, `createStore.ts`) |
| **Closures** | Encapsulating app state and internal functions for immutability |
| **Custom Events** | Communicating between components without global variables |
| **Async/Await** | Managing IndexedDB CRUD operations asynchronously |
| **IndexedDB via `idb`** | Local database storage for habits and entries |
| **Service Worker (Workbox)** | Handles caching, offline mode, and PWA lifecycle |
| **Debouncing/Throttling** | Preventing unnecessary re-renders or DB writes |
| **Progressive Enhancement** | App works online or offline, on desktop or mobile |

---

## 🏗️ Project Structure

habit-tracker/
│
├── src/
│ ├── db.ts # IndexedDB setup & CRUD operations
│ ├── createStore.ts # Global state management
│ ├── ui.ts # DOM rendering and event handling
│ ├── main.ts # App initialization & event listeners
│ └── sw.js # Service Worker for caching and offline support
│
├── index.html # App shell
├── manifest.json # PWA metadata
├── vite.config.ts # Vite setup for fast dev environment
└── README.md

📲 Installation & Offline Use

Clone the repo

git clone https://github.com/ramosmarco95/offline-habit-tracker.git
cd habit-tracker


Install dependencies

npm install


Run locally

npm run dev


Build for production

npm run build


Install the PWA

Open the app in Chrome

Click “Install App” (or “Add to Home Screen” on mobile)

Use it offline — data is stored locally in IndexedDB

🧭 How It Works

UI Layer: Renders habits, streaks, and buttons dynamically.

State Layer: Manages app state and triggers re-renders.

Data Layer: Stores and retrieves habits/entries from IndexedDB.

Service Worker: Caches static assets, enabling offline mode.

Manifest: Makes the app installable like a native app.

📚 Learning Outcomes

By completing this project, you’ll gain hands-on experience with:

Building offline-ready web apps

Designing modular, maintainable JavaScript code

Understanding browser storage and PWA lifecycle

Using Vite, TypeScript, and testing tools in real projects

👨‍💻 Author

Marco Ramos
🎓 Software Development 
🌐 Portfolio Website : https://ramosmarco95.github.io/portfolio/

📧 Contact: tva.variant09@gmail.com

🏁 License

This project is licensed under the MIT License — feel free to use and modify it for learning or personal projects.