# JobTracker

A full-stack job application tracking tool built for developers who want to stay on top of their job search. Built with a modern React frontend and a RESTful Express API — clean architecture, real authentication, and a smooth UI that works on every screen size.

**Live Demo:** [job-tracker-nine-azure.vercel.app](https://job-tracker-nine-azure.vercel.app)

---

## Features

- **JWT Authentication** — Secure register, login, and logout with bcrypt password hashing
- **Password Validation** — Real-time strength indicator with regex-based rules enforced on both client and server
- **Application Management** — Full CRUD: add, edit, and delete job applications with status tracking
- **Status Tracking** — Four stages: Applied → Interview → Offer → Rejected
- **Dashboard** — Live statistics showing application counts per status with skeleton loading states
- **Search & Filter** — Instant client-side search by company or position, combined with status filters
- **Pagination** — Applications list paginated at 10 items per page
- **Protected Routes** — Route guards for both authenticated and unauthenticated users
- **Auto Logout** — Automatic session expiry handling via Axios response interceptor
- **Change Password** — Secure password update flow with current password verification
- **Responsive Design** — Mobile-first layout with hamburger navigation and adaptive components

---

## Tech Stack

### Frontend

| Technology            | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| React + Vite          | UI framework and build tool                    |
| Redux Toolkit         | Global auth state management                   |
| TanStack Query        | Server state, caching, and mutations           |
| React Hook Form + Yup | Form management and validation                 |
| Axios                 | HTTP client with request/response interceptors |
| React Router v6       | Client-side routing and protected routes       |
| Tailwind CSS          | Utility-first styling                          |
| Lucide React          | Icon library                                   |

### Backend

| Technology            | Purpose                          |
| --------------------- | -------------------------------- |
| Node.js + Express     | REST API server                  |
| Knex.js               | SQL query builder and migrations |
| PostgreSQL (Supabase) | Production database              |
| SQLite                | Development database             |
| JWT                   | Stateless authentication         |
| bcryptjs              | Password hashing                 |

### Infrastructure

| Service  | Role                        |
| -------- | --------------------------- |
| Vercel   | Frontend deployment         |
| Render   | Backend deployment          |
| Supabase | Managed PostgreSQL database |

---

## Project Structure

```
job-tracker/
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/              # Axios instance and request functions
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level page components
│   │   ├── schemas/          # Yup validation schemas
│   │   ├── store/            # Redux store and auth slice
│   │   └── utils/            # Helper functions (formatDate, statusColors)
│   └── vercel.json           # SPA routing config
│
└── server/                   # Express backend
    ├── api/
    │   ├── auth/             # Register, login, JWT middleware
    │   ├── applications/     # CRUD endpoints and model
    │   └── users/            # Change password endpoint
    ├── data/
    │   ├── migrations/       # Knex database migrations
    │   └── db-config.js      # Database connection
    ├── knexfile.js           # Environment-based DB config
    └── index.js              # Server entry point
```

---

## API Endpoints

### Auth

| Method | Endpoint             | Description           | Auth |
| ------ | -------------------- | --------------------- | ---- |
| POST   | `/api/auth/register` | Register new user     | ❌   |
| POST   | `/api/auth/login`    | Login and receive JWT | ❌   |

### Applications

| Method | Endpoint                  | Description                     | Auth |
| ------ | ------------------------- | ------------------------------- | ---- |
| GET    | `/api/applications`       | Get all user applications       | ✅   |
| GET    | `/api/applications/stats` | Get status counts for dashboard | ✅   |
| GET    | `/api/applications/:id`   | Get single application          | ✅   |
| POST   | `/api/applications`       | Create new application          | ✅   |
| PUT    | `/api/applications/:id`   | Update application              | ✅   |
| DELETE | `/api/applications/:id`   | Delete application              | ✅   |

### Users

| Method | Endpoint                     | Description     | Auth |
| ------ | ---------------------------- | --------------- | ---- |
| PUT    | `/api/users/change-password` | Update password | ✅   |

---

## Database Schema

```sql
users
  id            INTEGER PRIMARY KEY
  username      TEXT UNIQUE NOT NULL
  email         TEXT UNIQUE NOT NULL
  password      TEXT NOT NULL
  created_at    TIMESTAMP
  updated_at    TIMESTAMP

applications
  id            INTEGER PRIMARY KEY
  user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE
  company_name  TEXT NOT NULL
  position      TEXT NOT NULL
  status        TEXT DEFAULT 'applied'
  applied_date  DATE
  notes         TEXT
  created_at    TIMESTAMP
  updated_at    TIMESTAMP
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Clone the repository

```bash
git clone https://github.com/mertkaya20/job-tracker.git
cd job-tracker
```

### Backend setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
```

Run migrations and start the server:

```bash
npx knex migrate:latest
npm run server
```

### Frontend setup

```bash
cd client
npm install
npm run dev
```

---

## Key Implementation Details

**Feature-based architecture** — Both client and server are organized by feature rather than file type, making the codebase easy to navigate and scale.

**Dual validation** — All user inputs are validated on the frontend with Yup schemas before hitting the API, and independently validated again on the backend. Frontend validation improves UX; backend validation ensures security regardless of how the API is called.

**Ownership enforcement** — Every application endpoint verifies that the requesting user owns the resource before allowing reads, updates, or deletes. Token-based identity is never trusted from the request body.

**Interceptor-based auth** — A single Axios response interceptor handles 401 errors globally, automatically clearing the session and redirecting to login when a token expires — except on auth endpoints where 401 is an expected response.

**PostgreSQL compatibility** — Knex's `.returning()` is used for insert operations to support PostgreSQL's insert behavior while keeping the same query interface across environments.

---

## Screenshots

> Dashboard with live stats and recent applications

> Applications list with search, filter, and pagination

> Add / Edit application modal

---

## Contact

**Mert Kaya**

- GitHub: [@mertkaya20](https://github.com/mertkaya20)
- LinkedIn: [merttkaya20](https://www.linkedin.com/in/merttkaya20/)
