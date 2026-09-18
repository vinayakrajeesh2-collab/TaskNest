# 🌱 TaskNest — Tasks → Focus → Grow

> A minimal, cartoon-inspired productivity web application combining clean task management, a plant-growing focus timer, and a warm SaaS aesthetic.

---

## ✨ Features

- **Strictly Two Pages**: Dedicated **Tasks** and **Focus** modes with zero unnecessary dashboards or authentication.
- **Cute Cartoon + Modern SaaS Identity**:
  - Friendly cartoon cat companion mascot with contextual encouraging quotes.
  - Terrarium dome with visual plant growth stages (Sprout 🌱 → Sapling 🌿 → Budding Plant 🪴 → Blooming Tree 🌳).
  - Rounded cards, soft shadows, and responsive layouts.
- **Universal Dynamic Greeting**:
  - Automatically updates based on local time (*"Good Morning! 👋"*, *"Good Afternoon! ☀️"*, *"Good Evening! 🌙"*, *"Good Night! 🌙"*).
  - Real-time formatted local date badge.
- **Full Task Management**:
  - Create tasks with Priority flags (**High 🚩**, **Medium 🟡**, **Low 🟢**) and optional Due Dates.
  - Animated checkboxes that transition completed tasks into a dedicated section.
  - Inline editing and deletion.
  - Real-time `All`, `Active`, and `Completed` filter pills with dynamic count badges.
  - "Today's Progress" card with progress bar and responsive seedling artwork.
- **Plant Growth Focus Timer**:
  - Real-elapsed time countdown engine using `Date.now()` timestamp math and `visibilitychange` resynchronization (zero lag or drift on inactive tabs).
  - Presets: `25 min Focus`, `5 min Break`, `50 min Focus`, and `Custom` duration modal.
  - Session completion celebration overlay with pure Web Audio harmonic zen chime.
  - Focus session counters and total accumulated focus time tracking.
- **Light / Dark Mode**: Seamless toggle between fresh organic green and deep midnight navy atmospheres.
- **Complete Persistence**: Automatically saves all tasks, focus stats, and theme preference to `localStorage`.
- **Fully Responsive**: Desktop left sidebar navigation and mobile fixed frosted-glass bottom navigation.

---

## 🚀 Getting Started

TaskNest is self-contained with zero external runtime build dependencies.

### Option 1: Python Built-in Server
```bash
python serve.py
# or
python -m http.server 5173
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Option 2: Direct Browser
Open `index.html` directly in any modern web browser.

---

## 🛠 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System & CSS Variables)
- **Framework**: React 18 (Self-contained vendor bundle)
- **Audio**: Web Audio API (Synthesized harmonic chime)
- **Persistence**: Browser `localStorage`

---

## 📄 License

MIT License © 2026 TaskNest
