# Wavelist — Mobile-First Task Management Application

Wavelist is a modern, mobile-first full-stack task management application built with React 18, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

---

## Tech Stack

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

---

## Live Deployments

- **Frontend App (Netlify)**: `https://magnificent-flan-ea6dcf.netlify.app`
- **Netlify Dashboard**: `https://app.netlify.com/projects/magnificent-flan-ea6dcf/overview`
- **Backend Service (Render)**: `https://dashboard.render.com/web/srv-d9vhjt8jo6nc73fue9eg`

Note: Render free tier web services automatically spin down after inactivity and may experience a ~30-second cold-start on the first request.

---

## Key Features

- **Onboarding Entrance Animation**: Multi-stage sequence featuring initial full-screen blue background, 3D centered logo pop-in, 3D scale-to-zero transition, sliding white section, and staggered asset entry.
- **Home Dashboard**:
  - Keyword Search Bar.
  - Horizontal Day Strip (Monday through Sunday) with interactive week navigation.
  - Completion Statistics: Task Complete counter and Task Pending status tracker.
  - Weekly Progress Bar: Dynamic percentage indicator based on active vs completed tasks.
  - Daily Task List: Task items with interactive status check toggle and priority indicators.
  - Floating Add Button (FAB): Quick access trigger to create new tasks.
- **Task Management Modal**: Create and edit tasks with title, date, start/end time, description, and priority level (Low / Medium / High).
- **Search View**: 300ms debounced real-time client-side and server-supported search across task titles and descriptions.

---

## Repository Structure

```
wavelist/
├── client/                 # React + Vite + Tailwind CSS frontend
│   ├── public/             # Static public assets
│   ├── src/
│   │   ├── api/            # API client wrapper & local storage fallback
│   │   │   └── __tests__/  # Unit tests for API layer
│   │   ├── assets/         # SVG icons, logo, and wave pattern asset
│   │   ├── components/     # Reusable UI components
│   │   │   └── __tests__/  # Unit tests for TaskItem, TaskFormModal, DayStrip
│   │   ├── pages/          # Application views (Onboarding, Home, Search)
│   │   │   └── __tests__/  # Page integration unit tests
│   │   ├── App.jsx         # App routing and state management
│   │   ├── index.css       # Tailwind CSS design system & animation keyframes
│   │   ├── main.jsx        # Application entry point
│   │   └── setupTests.js   # Jest DOM matchers setup
│   ├── README.md           # Client package documentation
│   ├── tailwind.config.js  # Custom theme styling & colors
│   ├── vite.config.js      # Vite build & dev server config
│   └── vitest.config.js    # Vitest testing setup
├── server/                 # Express + Mongoose API backend
│   ├── controllers/        # Route controllers (taskController.js)
│   ├── models/             # Mongoose schemas (Task.js)
│   ├── routes/             # API routes (tasks.js)
│   ├── __tests__/          # Integration tests (health.test.js, tasks.test.js)
│   ├── app.js              # Express app setup, CORS, body parser, error handlers
│   ├── db.js               # Database connection lifecycle
│   ├── index.js            # Server entry point and graceful shutdown listeners
│   └── README.md           # Server package documentation
├── .github/workflows/      # CI/CD and Release pipeline definitions
├── .releaserc.json         # Semantic release configuration
└── README.md               # Monorepo root documentation
```

---

## Local Development Setup

### Prerequisites
- Node.js v18 or higher
- MongoDB instance running locally or a MongoDB Atlas connection string

### 1. Server Setup
```bash
cd server
npm install
cp .env.example .env
# Configure MONGO_URI in server/.env
npm run dev
```
The API server will run at `http://localhost:5000`.

### 2. Client Setup
```bash
cd client
npm install
npm run dev
```
The React frontend application will run at `http://localhost:5173`.

---

## Test Suites

Run client and server test suites locally (35 total passing tests):

### Client Unit & Component Tests (24 Tests)
```bash
cd client
npm test
```

### Server REST API Integration Tests (11 Tests)
```bash
cd server
npm test
```

---

## CI/CD and Versioning

Automated Semantic Release and Continuous Integration are configured using GitHub Actions:
- **CI Pipeline** (`.github/workflows/ci.yml`): Runs client and server test suites on pull requests and pushes.
- **Release Pipeline** (`.github/workflows/release.yml`): Automatically parses Conventional Commits on `main`, bumps package versions, updates `CHANGELOG.md`, and publishes GitHub Releases.

---

## Package Specific Documentation

For detailed package instructions and setup:
- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)
