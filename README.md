# PaddyGuard AI — Academic Research Documentation Website

> **Project ID:** R26-SE-015  
> **Degree:** B.Sc. (Hons) in Information Technology Specialized in Software Engineering  
> **Institution:** Sri Lanka Institute of Information Technology (SLIIT)  
> **Faculty:** Faculty of Computing | Department of Information Technology  
> **Submission Date:** March 2026  

---

## 1. Project Overview

**PaddyGuard AI** is a multimodal intelligent decision support system designed to address critical yield loss challenges in Sri Lankan and South Asian smallholder rice farming. 

While conventional agricultural AI models operate under a fragile **closed-world assumption** (forcing non-rice leaves, soil backgrounds, or unfamiliar pests into trained disease categories with dangerously high false confidence), **PaddyGuard AI** introduces:
1. **Out-of-Distribution (OOD) Reliability Layer:** Rejection of unfamiliar inputs via **ODIN**, **Mahalanobis Distance**, and **OpenMax**.
2. **Multimodal Accessibility:** Spoken Sinhala symptom recognition and voice synthesis (TTS) to empower low-literacy farmers.
3. **Model Transparency:** **Grad-CAM** visual saliency heatmaps highlighting pathological foliar lesions.
4. **Knowledge-Grounded Advisory:** **Retrieval-Augmented Generation (RAG)** over verified IRRI/FAO/DOA agronomic literature combined with deterministic expert safety rules and an acreage-calibrated pesticide dosage calculator.

This website serves as the **official academic research documentation portal** for project assessment and peer review.

---

## 2. Four Core Research Components

| Component | Title | Lead Researcher | Primary Technologies | Research Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Component 1** | Voice-Based Rice Disease Diagnosis | **Keshan B K** (`IT22303820`) | Whisper / Vosk ASR, TF-IDF, BERT, Sinhala TTS | **25%** |
| **Component 2** | Rice Leaf Disease Classification with OOD | **Hewanayake H.M.L.M** (`IT22168740`) | ResNet50, EfficientNetB3, DenseNet121, ODIN, Mahalanobis, OpenMax, Grad-CAM | **25%** |
| **Component 3** | Hybrid AI Treatment Advisory & RAG Chatbot | **Weerasinghe KGJP** (`IT22273680`) | RAG, FAISS / ChromaDB, LLM, Expert Rules, Dosage Engine | **25%** |
| **Component 4** | Rice Pest Detection with OOD | **Kalhara E P K** (`IT22065858`) | YOLOv8, ResNet50, EfficientNet, OOD Rejection | **25%** |

### Academic Supervision:
- **Research Supervisor:** Dr. Nathali Silva (Senior Lecturer, Department of Information Technology, SLIIT)
- **Co-Supervisor:** Ms. Poorna Panduwawala (Lecturer, Department of Information Technology, SLIIT)
- **External Field Expert:** Mrs. Anoma Gunarathna (Department of Agriculture, Sri Lanka)

---

## 3. Technology Stack & Lightweight Architecture

In strict adherence to university evaluation requirements and the **20 MB upload constraint**, the website avoids heavy JS frameworks (React, Next.js, Bootstrap, Tailwind):
- **Markup:** Semantic HTML5 with full ARIA accessibility.
- **Styling:** Modular Vanilla CSS3 (CSS Custom Properties, Glassmorphism, CSS Grid & Flexbox, Light & Dark mode support).
- **Interactivity:** Modular Vanilla JavaScript (ES6+).
- **Graphics & Assets:** Vector SVG diagrams and icons (zero multi-megabyte raster images or bloated video files).
- **Total Bundle Size:** `< 2 MB` (extremely lightweight, loads instantly).

---

## 4. Directory & File Structure

```text
research-web/
├── index.html                   # Executive Home, Abstract, 4 Components, Interactive Pipeline & Demonstrators
├── domain.html                  # In-depth Literature Survey, Research Gap, Objectives, Methodology & References
├── milestones.html              # University Milestones, WBS (T1-T10), Gantt Schedule & Budget Breakdown
├── documents.html               # Academic Document Repository with category filters & download handlers
├── presentations.html           # Defense Slide Decks & Presentation Outlines
├── about.html                   # Research Team Profiles, Supervision, Commercialization & SDG Alignment
├── contact.html                 # Academic Inquiry Form (Frontend Demo) & University Information
│
├── css/
│   ├── style.css                # Global tokens, typography, navbar, footer, modals, dark theme
│   ├── components.css           # Component cards, simulators, timeline, tables, badges
│   └── responsive.css           # Full responsive breakpoints (320px to 1920px)
│
├── js/
│   ├── data.js                  # Central Single-Source-of-Truth Project Data Configuration
│   ├── main.js                  # Theme toggle, mobile drawer, scroll progress, modal controllers
│   ├── search.js                # Instant global client-side search (Ctrl+K)
│   ├── interactive.js           # Architecture Zoom/Inspector, Voice Simulator, Grad-CAM & Dosage Demos
│   ├── milestones.js            # Milestones rendering and status filters
│   ├── documents.js             # Document library filters, search and download handler
│   └── presentations.js         # Presentations deck library
│
├── assets/
│   ├── favicon.svg              # Rice leaf + AI node vector favicon
│   ├── diagrams/
│   │   └── paddyguard_architecture.svg   # Multi-tier vector architecture diagram
│   └── icons/
├── documents/                   # Target folder for official PDF submissions
├── presentations/               # Target folder for official slide deck files
├── vercel.json                  # Clean URLs, caching headers & security rules for Vercel
└── README.md                    # Project documentation & maintainer guide
```

---

## 5. How to Run Locally

Because the project is built with standard web technologies, you can run it with any static HTTP server or preview directly:

### Option A: Using Python built-in server (Recommended)
```bash
# In the project directory:
python -m http.server 8000
```
Then open your browser at: `http://localhost:8000`

### Option B: Using Node `serve` or `npx http-server`
```bash
npx serve .
# or
npx http-server -p 8000
```

### Option C: Direct Browser Opening
Double-click `index.html` to open directly in Chrome, Edge, Safari, or Firefox.

---

## 6. How to Deploy to Vercel

The repository contains `vercel.json` and is 100% pre-configured for Vercel zero-configuration static deployment:

### Option 1: Via Vercel CLI
```bash
# Install Vercel CLI if needed
npm install -g vercel

# Deploy directly from terminal
vercel
```

### Option 2: Via GitHub / GitLab Import
1. Push this directory to your GitHub repository.
2. Log into [Vercel Dashboard](https://vercel.com).
3. Click **Add New...** → **Project**.
4. Select your `research-web` repository.
5. Leave Framework Preset as **Other** (Root Directory `./`).
6. Click **Deploy**. Vercel will host it automatically with global CDN distribution and SSL.

---

## 7. How to Update Data (Single-Source-of-Truth)

All academic contents are centralized in [`js/data.js`](file:///c:/Users/kavin/OneDrive/Desktop/research%20web/js/data.js). Modifying this single file automatically updates all pages, search indexing, and cards across the website.

### A. Updating Milestone Dates & Marks
Open `js/data.js` and locate the `milestones` array:
```javascript
{
  id: "m2",
  number: "02",
  name: "Progress Presentation 1",
  assessment: "Progress Review 1 (PP1)",
  status: "Completed",              // Update status
  date: "May 15, 2026",             // Update date
  marksAllocated: "15%",            // Update marks allocated
  marksAwarded: "14.2%",            // Update marks awarded
  ...
}
```

### B. Uploading and Linking New Documents
1. Copy your PDF file into the `documents/` folder (e.g. `documents/R26-SE-015_Progress_1_Report.pdf`).
2. In `js/data.js`, under `documents`, set the `fileUrl` and change status:
```javascript
{
  id: "doc-8",
  title: "Progress Presentation 1 - Consolidated Progress Report",
  code: "R26-SE-015_PP1_Report",
  category: "Progress Documents",
  status: "Available",              // Changed from "To be updated"
  fileUrl: "documents/R26-SE-015_Progress_1_Report.pdf", // Link real file
  ...
}
```
The download button on `documents.html` will automatically activate and link to the file!

### C. Updating Empirical Research Results
When laboratory experimental validation is finalized, update the `targetMetrics` in `js/data.js`:
```javascript
targetMetrics: {
  evaluatedAccuracy: "94.8% on hold-out test set",
  evaluatedAUROC: "0.962 (ODIN at T=1000)",
  evaluatedLatency: "380 ms on Android edge"
}
```

### D. Updating Team Members or Supervision
Edit `team` or `supervision` in `js/data.js`. The profiles, student IDs, emails, and responsibilities on `about.html` will dynamically update.

---

## 8. Academic Integrity Statement

In adherence to SLIIT Faculty of Computing and international research assessment guidelines:
- No accuracy figures, experimental metrics, or assessment marks have been fabricated.
- Unconfirmed milestones, marks, and dates are explicitly maintained as *"To be updated"* or *"Pending"*.
- The website is purely an academic documentation portal for evaluating the research project *PaddyGuard AI*.

---

## 9. Contact & Licensing

- **Project Lead Inquiries:** `it22168740@my.sliit.lk` / `it22303820@my.sliit.lk`
- **Institution:** Department of Information Technology, SLIIT, Malabe, Sri Lanka.
- **License:** Academic Research Evaluation License (All Commercial & Invention Rights Reserved by the Authors).
