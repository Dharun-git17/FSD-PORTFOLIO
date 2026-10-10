# Dharun S — Cinematic 3D Developer Portfolio

A deployable portfolio website for **Dharun S**, Full Stack Developer and Artificial Intelligence & Data Science student. Built with React 19, TypeScript, Vite, Three.js (React Three Fiber), Framer Motion, and Tailwind CSS.

---

## 🌟 Key Features

- **Cinematic 3D Hero Experience**: Interactive metallic kinetic sculpture rendered in real time with Three.js / React Three Fiber, featuring studio volumetric lighting, mouse-responsive rotation, scroll depth, and static WebGL fallbacks.
- **Factually Verified Resume Data**: Reflects Dharun S's authentic background as an Artificial Intelligence & Data Science undergraduate at Karpaga Vinayaga College of Engineering and Technology.
- **Architectural Telemetry Console**: Interactive engineering blueprint in the About section exploring Frontend, Backend, and Algorithmic problem-solving pillars.
- **High-Impact Project Showcase**:
  - **Project 01 — Image Steganography**: Secret message encoder with interactive Least Significant Bit (LSB) binary pixel simulator.
  - **Project 02 — E-Commerce Website**: Full-stack responsive storefront with interactive cart test and real-time product preview.
  - **Project 03 — BugSense AI**: Duplicate defect finder with interactive semantic similarity vector clustering.
- **Verified Education & Credentials**: Clearly demarcates the B.Tech degree from the 1-month internship at Codec Technologies and courses in Cyber Security (Skill India), Networking (Great Learning), and MySQL (Udemy).
- **Recruiter Usability**: Includes an interactive resume viewer, 1-click email copy, validated inquiry form with client-side mailto dispatch, and downloadable PDF resume.
- **Static Hosting Optimized**: Zero private server or database needed; configured for seamless GitHub Pages deployment with relative-safe asset paths.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand marks

---

## 📂 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml            # Official GitHub Pages deployment workflow
├── public/
│   ├── Dharun_S_Resume.pdf       # Verified downloadable PDF resume
│   └── projects/
│       ├── steganography.jpg     # Steganography project artwork
│       ├── ecommerce.jpg         # E-Commerce storefront artwork
│       └── bugsense.jpg          # BugSense AI dashboard artwork
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky navigation with mobile drawer & scrollspy
│   │   ├── Hero.tsx              # Cinematic hero section with typography & CTAs
│   │   ├── Hero3D.tsx            # Three.js 3D kinetic sculpture & WebGL fallback
│   │   ├── About.tsx             # Philosophy, 3 pillars & telemetry console
│   │   ├── Skills.tsx            # Categorized skills without arbitrary % bars
│   │   ├── Projects.tsx          # Featured showcase container
│   │   ├── ProjectCard.tsx       # 3D tilted project card with interactive demo
│   │   ├── Education.tsx         # B.Tech degree & certified training timeline
│   │   ├── Contact.tsx           # Verified channels, 1-click copy & inquiry form
│   │   ├── Footer.tsx            # Wordmark, socials & smooth back-to-top
│   │   ├── ResumeModal.tsx       # Printable & downloadable resume modal
│   │   └── SocialIcons.tsx       # Verified GitHub & LinkedIn SVG icons
│   ├── data/
│   │   └── portfolioData.ts      # Centralized factual data configuration
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces and schema types
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Custom design tokens, glassmorphism & typography
│   └── main.tsx                  # Application entry point
├── index.html                    # SEO meta tags, Google Fonts & Open Graph
├── vite.config.ts                # Relative base configuration & vendor chunking
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js version 18 or higher (Node 20+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/Dharun-git17/<repository-name>.git
cd <repository-name>
npm install
```

### Development Server

Start Vite local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Typecheck and generate the optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 GitHub Pages Deployment Guide

### Option 1: Automatic GitHub Actions (Recommended)

1. Push your repository to GitHub under your account (`https://github.com/Dharun-git17/<repo-name>`).
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) will automatically trigger on any push to `main` or `master`, build the app, and publish it to GitHub Pages.

### Option 2: Custom Subpath / User Page

- If hosting on `https://dharun-git17.github.io/` (User page), the default base path `./` or `/` works automatically.
- If hosting under a specific repository name `https://dharun-git17.github.io/<repo-name>/`, you can set the environment variable:
  ```bash
  VITE_BASE_PATH=/<repo-name>/ npm run build
  ```
  The app defaults to relative base `./`, which is safe for any subpath.

---

## ⚙️ Customization & Updating Content

All editable content is centralized in [**`src/data/portfolioData.ts`**](src/data/portfolioData.ts):
- `personalInfo`: Name, title, email, LinkedIn, GitHub, locations.
- `skillsData`: Technologies grouped by Frontend, Backend, Database, and Tools.
- `projectsData`: Project titles, descriptions, tags, features, and repository URLs.
- `educationData`: Academic degree details.
- `certificationsData`: Internship and course certifications.

---

## 📄 License

Created by **Dharun S**. All rights reserved. Built with curiosity. Crafted with code.
