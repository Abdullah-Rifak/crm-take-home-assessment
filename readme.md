# CRM Lead Management System

Full-stack CRM application built for an intern take-home assessment. Manage sales leads, track pipeline progress, add notes per lead, and view live dashboard analytics — all behind a secure JWT login.

---

## Project Overview

This is a working CRM Lead Management System built with React on the frontend, NestJS on the backend, and MongoDB as the database. It covers the full lifecycle of a sales lead: capturing it, assigning it to a salesperson, updating its status through the pipeline, adding follow-up notes, and viewing aggregate stats on a dashboard.

---

## Tech Stack

| Area | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | NestJS (Node.js) |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| Styling | Tailwind CSS + custom CSS |

---

## Features Implemented

- **Authentication** — Email/password login with bcrypt-hashed passwords and JWT-protected API routes
- **Protected Routes** — Frontend route guard redirects unauthenticated users to the login page
- **Lead CRUD** — Create, view, edit, and delete leads
- **Lead Status Tracking** — New, Contacted, Qualified, Proposal Sent, Won, Lost
- **Lead Notes** — Add and view notes per lead, sorted newest first
- **Dashboard** — Live pipeline metrics powered by MongoDB aggregation
- **Search** — Real-time search across lead name, company name, and email
- **Filtering** — Filter by status, lead source, and assigned salesperson
- **Server-Side Pagination** — Backend returns paginated results; frontend shows page controls
- **Inline Form Validation** — Field-level error messages on lead creation, editing, and login

---

## Lead Fields

- Lead Name
- Company Name
- Email
- Phone Number
- Lead Source (Website, LinkedIn, Referral, Cold Email, Event)
- Assigned Salesperson
- Status
- Estimated Deal Value
- Created Date *(auto)*
- Last Updated Date *(auto)*

---

## Dashboard Metrics

- Total Leads
- New Leads
- Qualified Leads
- Won Leads
- Lost Leads
- Total Estimated Deal Value
- Total Value of Won Deals

---

## Repository Structure

```
crm-take-home-assessment/
├── .env.example              # Environment variable template
├── backend/
│   └── src/
│       ├── auth/             # Login endpoint, JWT strategy, auth guard
│       ├── leads/            # Lead CRUD, filtering, search, pagination
│       ├── notes/            # Notes per lead
│       ├── dashboard/        # Aggregated pipeline metrics
│       ├── users/            # Users collection + admin seed
│       └── app.module.ts     # Root module, MongoDB connection
└── frontend/
    └── src/
        ├── pages/            # Login, Dashboard, Leads, Notes
        ├── componenets/      # ProtectedRoute guard
        └── services/         # Axios API client
```

---

## How to Run Locally

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB running locally on the default port (`27017`)

### 1. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your local values (defaults work out of the box for local MongoDB).

### 2. Start the Backend

```bash
cd backend
npm install
npm run start
```

Backend runs at `http://localhost:3000`

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. Vite may use `5174` if that port is busy.

---

## Environment Variables

Copy `.env.example` to `.env` before starting the backend. Variables are loaded via NestJS's config module.

| Variable | Description | Default |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/crm` |
| `JWT_SECRET` | Secret used to sign JWT tokens | *(set in .env)* |

The frontend API base URL is set to `http://localhost:3000` in `src/services/api.js`.

---

## Database Setup

No manual schema creation is needed. Mongoose auto-creates the `crm` database and collections (`leads`, `notes`, `users`) on first write.

The admin user is seeded automatically when the backend starts — no manual insert required.

Make sure MongoDB is running before starting the backend:

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Ubuntu / WSL
sudo service mongod start

# Windows
net start MongoDB
```

---

## Test Login Credentials

| Field | Value |
|---|---|
| Email | `admin@example.com` |
| Password | `password123` |

---

## Known Limitations

- **Pagination size is fixed at 2 per page** — intentionally small to make pagination visible during the demo. Can be changed in `leads.jsx` (`pageSize` constant).
- **No token refresh** — JWT tokens expire and require the user to log in again. A refresh token flow would be the production-ready next step.
- **Single admin user** — the users module seeds one account. Multi-user support (registration, roles) is scaffolded but not fully built out.
- **Not deployed** — the app runs locally only. Deployment would require hosting the backend (e.g. Railway or Render) and frontend (e.g. Vercel) with proper environment variables configured.

---

## Reflection

This project covered more than I expected from an intern assessment. It wasn't just about wiring up CRUD — I had to think about how all the pieces connect: how the JWT flows from login to the guard to every protected route, how MongoDB aggregation works for the dashboard metrics, and how to combine filtering, search, and pagination in a single backend query without breaking any of the combinations.

The part I found most challenging was `LeadsService.findAll()`. It needed to handle optional filters, regex search across multiple fields, and optional server-side pagination — all at once — and return different shapes depending on whether pagination params were included. Getting the frontend and backend to stay in sync across all those query parameters required careful thinking about the API contract.

If I had more time, I'd add unit tests for the service layer, build a proper lead detail page, add a "Contacted" count to the dashboard (it's a tracked status but not shown in metrics), and explore adding a follow-up reminder or lead activity timeline as a bonus feature that would genuinely help a sales team.

Overall, building this end-to-end — auth, database, API, and a polished React frontend — in a short window gave me a much clearer picture of how a real full-stack application fits together.

---

## Demo Video

> *[Demo video](https://drive.google.com/file/d/1DJevYxnQ31RXDyTLW6bIMaMCSh9DYsZa/view?usp=sharing)*

---

## Deployed Application

Not deployed. Please run locally using the instructions above with the test credentials provided.
