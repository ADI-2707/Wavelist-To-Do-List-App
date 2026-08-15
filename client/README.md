# Wavelist Client

The frontend application for Wavelist, a mobile-first task management web application built with React, Vite, and Tailwind CSS.

---

## Tech Stack

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F54E00?style=for-the-badge&logo=lucide&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

---

## Live Deployment

- **Live Site**: `https://magnificent-flan-ea6dcf.netlify.app`
- **Netlify Dashboard**: `https://app.netlify.com/projects/magnificent-flan-ea6dcf/overview`

---

## Architecture and Structure

```
client/
├── public/                 # Static public files (favicon, logo)
├── src/
│   ├── api/
│   │   └── tasks.js        # API fetch wrapper with local storage fallback
│   ├── assets/
│   │   ├── wave-pattern.svg# Herringbone SVG background pattern
│   │   └── wavelist-logo.svg
│   ├── components/
│   │   ├── DayStrip.jsx    # Horizontal date picker strip (Mon-Sun)
│   │   ├── FAB.jsx         # Floating Action Button for task creation
│   │   ├── ProgressBar.jsx # Weekly task completion percentage bar
│   │   ├── SearchBar.jsx   # Search input component
│   │   ├── StatCard.jsx    # Complete and pending task metrics cards
│   │   ├── TaskFormModal.jsx # Form modal for task creation & editing
│   │   └── TaskItem.jsx    # Individual task card item
│   ├── pages/
│   │   ├── Home.jsx        # Dashboard overview page
│   │   ├── Onboarding.jsx  # Landing hero page with custom wave background
│   │   └── Search.jsx      # Task filtering and search page
│   ├── App.jsx             # Main container, routing state & API actions
│   ├── App.test.jsx        # Smoke component test
│   ├── index.css           # Tailwind custom CSS rules & color tokens
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
- `npm run test`: Runs test suite using Vitest.
- `npm run lint`: Runs ESLint check across source files.

---

## Testing

Tests are written using Vitest and React Testing Library (`App.test.jsx`).

Run tests:
```bash
npm test
```
