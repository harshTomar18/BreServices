# BRE_SERVICES - Full-Stack MERN Architecture

A clean, enterprise-grade Full-Stack monorepo built with **React (Vite) + React Router v7** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 📁 Project Architecture

```
BRE_SERVICES/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── layouts/            # Page layouts (MainLayout with Outlet)
│   │   ├── pages/              # Route views (HomePage, ServicesPage, NotFoundPage)
│   │   ├── services/           # Backend API clients (api.js)
│   │   ├── App.jsx             # React Router v7 configuration
│   │   ├── main.jsx            # Application root
│   │   └── index.css           # Glassmorphism dark theme & design tokens
│   ├── index.html
│   ├── vite.config.js          # Vite config with /api proxy to backend
│   └── package.json
│
├── server/                     # Backend API Application
│   ├── src/
│   │   ├── config/             # DB connection & environment configs (db.js)
│   │   ├── controllers/        # Request & response business logic
│   │   │   ├── health.controller.js
│   │   │   └── service.controller.js
│   │   ├── middlewares/        # Express middlewares
│   │   │   ├── errorHandler.js # Centralized error handler
│   │   │   └── notFound.js     # 404 Route handler
│   │   ├── models/             # Mongoose data schemas (service.model.js)
│   │   ├── routes/             # RESTful API route endpoints
│   │   │   ├── index.js        # Aggregated router (/api/v1)
│   │   │   ├── health.routes.js
│   │   │   └── service.routes.js
│   │   ├── utils/              # Standardized utility wrappers
│   │   │   ├── ApiError.js     # Uniform error envelope
│   │   │   ├── ApiResponse.js  # Uniform success envelope
│   │   │   └── asyncHandler.js # Async route wrapper
│   │   ├── app.js              # Express app, CORS, parser & morgan setup
│   │   └── server.js           # Server listen & DB connection bootstrap
│   ├── .env.example            # Environment variables template
│   ├── .env                    # Active local environment variables
│   └── package.json
│
├── .gitignore                  # Global ignore rules
├── package.json                # Root orchestrator with concurrent scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local MongoDB instance or MongoDB Atlas URI)

### 2. Quick Setup

From the root directory:

```bash
# Install all dependencies for both client and server
npm run install:all
```

### 3. Environment Configuration

The backend contains a pre-configured `.env` file in `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/bre_services
CLIENT_URL=http://localhost:5173
```

> **Note**: To use MongoDB Atlas, replace `MONGODB_URI` with your connection string:
> `mongodb+srv://<user>:<password>@cluster.mongodb.net/bre_services?retryWrites=true&w=majority`

### 4. Running the Application

Run both frontend and backend concurrently with a single command:

```bash
npm run dev
```

Alternatively, you can run them individually:

```bash
# Run backend only (http://localhost:5000)
npm run dev:server

# Run frontend only (http://localhost:5173)
npm run dev:client
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Service uptime, timestamp, and MongoDB status |
| `GET` | `/api/v1/services` | Retrieve all registered services |
| `POST` | `/api/v1/services` | Create a new service (Body: `name`, `description`, `category`, `price`) |
| `GET` | `/api/v1/services/:id` | Retrieve service details by ID |

---

## 💎 Features

- **Decoupled Architecture**: Independent frontend and backend packages avoiding dependency conflicts.
- **Robust Error Handling**: Express errors routed through standard `ApiError` format with HTTP status codes.
- **Resilient Database Management**: Server automatically detects MongoDB availability and reports status gracefully without crashing.
- **Vite Proxy**: Transparent `/api` forwarding from Vite dev server to Express on port 5000.
- **Modern UI**: Dark glassmorphic design system using Google Fonts (Outfit & Plus Jakarta Sans).
