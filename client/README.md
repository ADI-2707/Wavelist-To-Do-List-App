# Wavelist Client

The frontend application for Wavelist, a mobile-first task management web application built with React 18, Vite, and Tailwind CSS.

---

## Tech Stack

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F54E00?style=for-the-badge&logo=lucide&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

---

## Live Deployments

- **Live Site (Netlify)**: `https://magnificent-flan-ea6dcf.netlify.app`
- **Netlify Dashboard**: `https://app.netlify.com/projects/magnificent-flan-ea6dcf/overview`

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

## Architecture and Structure

```
client/
├── public/                 # Static public files (favicon, logo)
├── src/
│   ├── api/
│   │   ├── tasks.js        # API fetch wrapper with local storage fallback
│   │   └── __tests__/      # Unit tests for API client layer
│   ├── assets/
│   │   ├── wave-pattern.svg# Herringbone SVG background pattern
│   │   └── wavelist-logo.svg
│   ├── components/
│   │   ├── DayStrip.jsx    # Horizontal date picker strip (Mon-Sun)
│   │   ├── FAB.jsx         # Floating Action Button for task creation
│   │   ├── ProgressBar.jsx # Weekly task completion percentage bar
│   │   ├── SearchBar.jsx   # Search input component
      ├── StatCard.jsx    # Complete and pending task metrics cards
│   │   ├── TaskFormModal.jsx # Form modal for task creation & editing
│   │   ├── TaskItem.jsx    # Individual task card item
│   │   └── __tests__/      # Component unit tests for TaskItem, TaskFormModal, DayStrip
│   ├── pages/
│   │   ├── Home.jsx        # Dashboard overview page
│   │   ├── Onboarding.jsx  # Animated landing page with 3D logo sequence
│   │   ├── Search.jsx      # Debounced task filtering and search page
│   │   └── __tests__/      # Page integration unit tests for Onboarding, Home, Search
│   ├── App.jsx             # Main container, routing state & API actions
│   ├── App.test.jsx        # Smoke component test
│   ├── index.css           # Tailwind custom CSS rules & animation keyframes
│   ├── main.jsx            # React root DOM rendering
│   └── setupTests.js       # Jest DOM matchers setup
├── index.html              # HTML shell
├── netlify.toml            # Netlify deployment rules & SPA redirects
├── package.json            # Scripts & dependencies
├── tailwind.config.js      # Tailwind design system configuration
├── vite.config.js          # Vite development & build setup
└── vitest.config.js        # Vitest runner configuration
```

---

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `client` directory (optional for local dev):
```env
VITE_API_URL=http://localhost:5000/api
```
If the API backend is unreachable, the client automatically falls back to browser local storage for seamless offline demonstration.

### 3. Start Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173`.

---

## Available Scripts

- `npm run dev`: Starts Vite local development server with hot module replacement (HMR).
- `npm run build`: Compiles production build to `dist/` directory.
- `npm run preview`: Previews production build locally.
- `npm run test`: Runs test suite using Vitest (24 unit and component tests).
- `npm run lint`: Runs ESLint check across source files.

---

## Test Suites

Tests are written using Vitest and React Testing Library across 8 test suites (24 passing tests).

Run client tests:
```bash
npm test
```
