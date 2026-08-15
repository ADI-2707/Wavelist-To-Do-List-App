# Wavelist — Mobile-First Task Management Application

Wavelist is a modern, mobile-first full-stack task management application built with React, Vite, Tailwind CSS, Express, and MongoDB.

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

- **Onboarding Screen**: Mobile hero banner view with herringbone wave pattern background, logo mark, and call to action.
- **Home Dashboard**:
  - Keyword Search Bar.
  - Horizontal Day Strip (Monday through Sunday) with interactive week navigation.
  - Completion Statistics: Task Complete counter and Task Pending status tracker.
  - Weekly Progress Bar: Dynamic percentage indicator based on active vs completed tasks.
  - Daily Task List: Task items with interactive status check toggle and priority indicators.
  - Floating Add Button (FAB): Quick access trigger to create new tasks.
- **Task Management Modal**: Create and edit tasks with title, date, time, description, and priority level (Low / Medium / High).
- **Search View**: Real-time client-side and server-supported search across task titles and descriptions.

---

## Repository Structure

```
wavelist/
├── client/                 # React + Vite + Tailwind CSS frontend
│   ├── public/             # Static assets and favicon
│   ├── src/
│   │   ├── api/            # API client wrapper & local storage fallback
│   │   ├── assets/         # SVG icons and wave pattern asset
│   │   ├── components/     # Reusable UI components (SearchBar, TaskItem, FAB, Modal, etc.)
│   │   ├── pages/          # Application views (Onboarding, Home, Search)
│   │   ├── App.jsx         # App routing and state management
│   │   ├── index.css       # Tailwind CSS design system tokens
│   │   └── main.jsx        # Application entry point
│   ├── README.md           # Client package documentation
│   ├── tailwind.config.js  # Custom theme styling & colors
│   ├── vite.config.js      # Vite build & dev server config
│   └── vitest.config.js    # Vitest testing setup
├── server/                 # Express + Mongoose API backend
│   ├── controllers/        # Route controllers (taskController.js)
│   ├── models/             # Mongoose schemas (Task.js)
│   ├── routes/             # API routes (tasks.js)
│   ├── __tests__/          # Integration tests (health.test.js)
│   ├── app.js              # Express app setup and middleware
│   ├── db.js               # Database connection lifecycle
│   ├── index.js            # Server entry point and graceful shutdown listeners
│   └── README.md           # Server package documentation
├── .github/workflows/      # CI/CD pipeline definition
└── README.md               # Monorepo root documentation
```

---

## Quick Start

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

Run client and server test suites locally:

### Client Unit Tests
```bash
cd client
npm test
```

### Server Integration Tests
```bash
cd server
npm test
```

---

## Package Specific Documentation

For detailed package instructions and setup:
- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)
