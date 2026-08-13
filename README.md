# 🌊 Wavelist — Mobile-First To-Do & Task Management App

Wavelist is a mobile-first, full-stack task management application designed with React, Vite, Tailwind CSS, Express, and MongoDB.

---

## 🚀 Live Demo & Deployments

- **Frontend (Vercel)**: `https://wavelist.vercel.app` *(Connect your Vercel deployment)*
- **Backend (Render)**: `https://wavelist-api.onrender.com` *(Connect your Render Web Service)*

> ℹ️ **Note**: Render free tier web services automatically spin down after inactivity and may experience a ~30-second cold-start on the first request.

---

## ✨ Features

- **Onboarding Screen**: Hero view with custom herringbone wave pattern background, brand logo, and "Get started" CTA.
- **Home Dashboard**:
  - Keyword Search Bar.
  - Horizontal Day Strip (Mon–Sun) with week navigation (`<` and `>`).
  - Stat Cards: **Task Complete** (primary color) & **Task Pending** (danger accent).
  - Weekly Progress Bar with dynamic completion percentage.
  - Tasks Today list with status check toggle (strikethrough when completed).
  - Floating Add Button (FAB).
- **Task Modal**: Create and edit tasks with title, date, time, description, and priority (Low / Medium / High).
- **Search Screen**: Real-time keyword filter across titles and descriptions with back navigation.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS v3, Lucide Icons
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas (Free M0 Cluster)
- **Deployment**: Vercel (Client) + Render (Server)

---

## 📁 Repository Structure

```
wavelist/
├── client/                 # React + Vite + Tailwind CSS Frontend
│   ├── public/             # Logo & Favicon assets
│   ├── src/
│   │   ├── api/            # Express API Fetch wrapper
│   │   ├── assets/         # Wave SVG pattern & logo
│   │   ├── components/     # SearchBar, DayStrip, StatCard, TaskItem, FAB, Modal
│   │   ├── pages/          # Onboarding, Home, Search
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                 # Express + Mongoose Backend
│   ├── controllers/        # taskController.js
│   ├── models/             # Task.js (Mongoose schema)
│   ├── routes/             # tasks.js router
│   ├── index.js            # Express server & MongoDB connection
│   └── .env.example
├── .gitignore
└── README.md
```

---

## 💻 Local Setup & Development

### 1. Prerequisites
- Node.js v18+ installed
- MongoDB installed locally OR a MongoDB Atlas cluster URI

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Set your MONGO_URI in server/.env
npm run dev
```
*Server runs at http://localhost:5000*

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*Client runs at http://localhost:5173*

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Server health check & DB connection status |
| `GET` | `/api/tasks` | Get all tasks (sorted by date/time) |
| `GET` | `/api/tasks/search?q=keyword` | Keyword search on title/description |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Edit an existing task |
| `PATCH` | `/api/tasks/:id/status` | Toggle Completed / In Progress status |
| `DELETE` | `/api/tasks/:id` | Delete a task |

---

## ☁️ Deployment Guide

### Deploy Backend to Render
1. Push this repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New Web Service**.
3. Select your GitHub repository.
4. Set **Root Directory**: `server`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `npm start`
7. Add Environment Variables:
   - `PORT`: `5000`
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/wavelist?retryWrites=true&w=majority`

### Deploy Frontend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import your GitHub repository.
3. Set **Root Directory**: `client`
4. Set **Framework Preset**: `Vite`
5. Set **Build Command**: `npm run build`
6. Set **Output Directory**: `dist`
7. Add Environment Variable:
   - `VITE_API_URL`: `https://<your-render-app>.onrender.com/api`
