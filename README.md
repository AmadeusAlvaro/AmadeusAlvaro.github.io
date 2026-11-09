# Portfolio Website — Amadeus Alvaro Ismanto

A responsive, broadcast-inspired portfolio website showcasing digital journalism, mobile reporting (MoJo), and audio-visual production work. Built with vanilla HTML5, CSS3, and JavaScript, designed to present field assignments, technical credits, and media reels in a clean editorial viewfinder format.

---

## 📌 Project Overview

- **Role:** Design & Front-End Implementation
- **Tech Stack:** HTML5, Modern CSS, Vanilla JavaScript
- **Live Status:** In active development (Work in Progress)

---

## ✨ Features Implemented So Far

- **Full-Width Viewport Layout:** Corner-anchored branding, contact triggers, and responsive sticky tab navigation.
- **Broadcast Viewfinder UI:** Cards styled with simulated camera timecodes (`TC`), REC indicators, and ratio tags (16:9 and 9:16).
- **Dynamic Inspection Modal:** Clicking any project loads an inspection overlay with role metadata, technical pointers, production stills, and direct media launch links.
- **External Media Integration:** Configured to launch YouTube master recordings (with specific timestamp parameters) and Instagram Reels without heavy raw video asset loads.
- **Modular Data Architecture:** Individual `.js` files for each project under `data/projects/` aggregated via `data/projects-index.js`.

---

## 📁 Repository Structure

```text
├── index.html                     # Core site layout & embedded stylesheets
├── styles.css                     # External style backup / custom tokens
├── app.js                         # Dynamic feed renderer & modal controller
├── data/
│   ├── projects-index.js          # Combined projects registry array
│   └── projects/                  # Modular datasets for each project
│       ├── harwacara-media.js
│       ├── the-light-of-java.js
│       ├── unity-2025.js
│       ├── mojo-field-stories.js
│       └── st-louis-exhibition.js
└── assets/
    ├── amadeus-photo.jpg          # Profile portrait
    ├── resume.pdf                 # Downloadable CV
    └── images/                    # Project-specific stills & covers
        ├── the-light-of-java/
        ├── harwacara-media/
        ├── unity-2025/
        ├── mojo/
        └── st-louis/

## 🚀 Running Locally

Follow these steps to clone the repository and run the portfolio locally on your machine.

---

### 1. Clone the Repository

Open your terminal or command prompt and clone the repository:

```bash
git clone [https://github.com/](https://github.com/)<your-username>/<your-repo-name>.git
cd <your-repo-name>
