# System Design Mastery Portal

A GitHub Pages-ready, portfolio-quality learning portal for system design interview preparation.

## Project Overview

This project is a modular static website for developers preparing for:
- Beginner-to-intermediate system design growth
- Service company interviews
- Product company interviews
- Big Tech interview loops

It includes:
- Data-driven topic rendering
- Search + filters
- Dark/light mode
- Local progress tracking
- Favorite topics
- Next recommended topic
- Study streak tracking
- Visual roadmap page
- Glossary, learning paths, interview framework, and revision checklist pages

## Folder Structure

```text
SystemDesignConcepts/
├── index.html
├── README.md
├── LICENSE
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── data/
│   └── topics.js
└── pages/
    ├── roadmap.html
    ├── learning-paths.html
    ├── glossary.html
    ├── interview-framework.html
    └── checklist.html
```

## Run Locally

Option 1: open `index.html` directly in your browser.

Option 2 (recommended): run a local static server.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages Deployment

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
4. Save and wait for deployment.
5. Your site appears at:
   `https://<your-username>.github.io/<repo-name>/`

## How to Add New Modules

1. Open `data/topics.js`.
2. Add a new topic object in `window.SYSTEM_DESIGN_TOPICS` with fields:
   - `id`, `title`, `module`, `difficulty`, `studyTime`, `tags`, `order`, `summary`, `quiz`, `diagram`
3. (Optional) add the topic ID to one or more entries in `window.LEARNING_PATHS`.
4. Refresh the site. Cards and roadmap update automatically.

## Notes

- The UI is built with plain HTML, CSS, and vanilla JavaScript to keep deployment simple.
- All links use relative paths for GitHub Pages compatibility.
- User state is stored in `localStorage` only (no backend required).
