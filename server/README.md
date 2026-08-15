# Wavelist Server

The backend REST API service for Wavelist built with Node.js, Express, and Mongoose for MongoDB.

---

## Tech Stack

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-000000?style=for-the-badge&logo=npm&logoColor=white)

---

## Live Deployments

- **Render Web Service Dashboard**: `https://dashboard.render.com/web/srv-d9vhjt8jo6nc73fue9eg`

---

## Architecture and Structure

The server codebase is structured for testability and modularity, separating the Express application initialization from database connections and HTTP server startup.

```
server/
├── controllers/
│   └── taskController.js   # CRUD & search handlers for tasks
├── models/
│   └── Task.js             # Mongoose schema for task model
├── routes/
│   └── tasks.js            # Express router mapping for task endpoints
├── __tests__/
│   ├── health.test.js      # Integration tests for health and readiness endpoints
│   └── tasks.test.js       # Integration tests for task REST API CRUD endpoints
├── app.js                  # Express middleware setup, CORS, express.json parser, error handlers
├── db.js                   # MongoDB connection and graceful disconnection utility
├── index.js                # Server entry point, signal handlers (SIGTERM, SIGINT)
├── package.json            # Scripts and dependencies
└── .env.example            # Environment variables template
```

---

## Environment Configuration

Copy `.env.example` to `.env` in the `server` directory and configure the environment variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/wavelist?retryWrites=true&w=majority
```

---

## REST API Endpoints

### Health & Readiness Probes

| Method | Endpoint | Description | Expected Status |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Service liveness probe and database state indicator | `200 OK` |
| `GET` | `/api/ready` | Service readiness probe (confirms database connectivity) | `200 OK` (connected) / `503 Service Unavailable` (disconnected) |

### Tasks API

| Method | Endpoint | Description | Request Body / Query Params |
| --- | --- | --- | --- |
| `GET` | `/api/tasks` | Fetch all tasks sorted by date/time | None |
| `GET` | `/api/tasks/search?q=keyword` | Search tasks by title or description | `q`: search query string |
| `POST` | `/api/tasks` | Create a new task | `{ title, description, dateTime, endTime, priority, status }` |
| `PUT` | `/api/tasks/:id` | Update an existing task | `{ title, description, dateTime, endTime, priority, status }` |
| `PATCH` | `/api/tasks/:id/status` | Toggle status (`Completed` / `In Progress`) | Optional `{ status }` |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID | None |

---

## Task Schema Specification

```javascript
{
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  dateTime: { type: Date, required: true, default: Date.now },
  endTime: { type: String, default: '' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
  createdAt: { type: Date, default: Date.now }
}
```

---

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run API Server
```bash
# Development mode with auto-reload (Nodemon)
npm run dev

# Production startup
npm run start
```

---

## Available Scripts

- `npm run dev`: Starts Express API server with Nodemon auto-reload.
- `npm run start`: Starts production Node.js server.
- `npm run test`: Runs integration test suite using Jest and Supertest (11 tests).

---

## Test Suites

Integration tests are executed using Jest and Supertest across 2 test suites (11 passing tests).

Run server test suite:
```bash
npm test
```
