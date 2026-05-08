# CRM Lead Management System

Full-stack CRM application built for an intern take-home assessment.

## Current Status

The app is functional end to end and now includes a more polished Tailwind UI, inline form validation, lead pagination, lead notes, search and filters, and dashboard metrics. The frontend and backend both build successfully.

## What Is Implemented

- Authentication backed by a MongoDB users collection with a seeded admin account
- Protected CRM routes using JWT auth guard
- Lead CRUD operations
- Lead notes per lead record
- Dashboard metrics for pipeline and deal value
- Search and filtering by name, company, email, status, source, and assigned salesperson
- Tailwind-based UI across login, dashboard, leads, and notes
- Inline form validation for login and lead creation/editing
- Client-side pagination on the leads page with 2 leads per page

## Lead Fields

- Lead Name
- Company Name
- Email
- Phone Number
- Lead Source
- Assigned Salesperson
- Status
- Estimated Deal Value
- Created Date
- Last Updated Date

## Dashboard Metrics

- Total Leads
- New Leads
- Qualified Leads
- Won Leads
- Lost Leads
- Total Estimated Deal Value
- Total Value of Won Deals

## Repository Structure

- `frontend/` React + Vite app
- `backend/` NestJS API

## How To Run Locally

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB running locally

### Backend

```bash
cd backend
npm install
npm run start
```

Backend runs at `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend usually runs at `http://localhost:5173`. If that port is busy, Vite may pick another port such as `5174`.

## Environment

Environment variables are loaded through Nest's config module.

- MongoDB URI: set `MONGO_URI`
- JWT secret: set `JWT_SECRET`
- Backend port: `3000`
- Frontend API base URL: `http://localhost:3000`

Copy `.env.example` to `.env` before starting the backend.

## Test Login Credentials

- Email: `admin@example.com`
- Password: `password123`



## Submission Notes

The important functional pieces are covered: login, protected routes, lead management, notes, filters, dashboard stats, pagination, validation, and a consistent UI.

