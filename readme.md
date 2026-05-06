# CRM Lead Management System

Full-stack CRM application built for intern take-home assessment.

## Project Overview

This project is a simple CRM for a small sales team. It supports login, lead lifecycle management, lead notes, dashboard metrics, and search/filtering.

## Tech Stack

- Frontend: React + Vite
- Backend: NestJS (Node.js)
- Database: MongoDB (Mongoose)
- Auth: JWT-based authentication

## Features Implemented

- Authentication with test user credentials
- Protected CRM routes using JWT auth guard
- Lead CRUD (create, read, update, delete)
- Lead status updates (New, Contacted, Qualified, Proposal Sent, Won, Lost)
- Lead details fields:
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
- Lead notes per lead:
	- Note Content
	- Created By
	- Created Date
- Dashboard stats:
	- Total Leads
	- New Leads
	- Qualified Leads
	- Won Leads
	- Lost Leads
	- Total Estimated Deal Value
	- Total Value of Won Deals
- Search and filtering for lead list:
	- Search by lead name/company/email
	- Filter by status
	- Filter by lead source
	- Filter by assigned salesperson

## Repository Structure

- `frontend/` React app
- `backend/` NestJS API

## How To Run Locally

### 1) Prerequisites

- Node.js 18+
- npm 9+
- MongoDB running locally

### 2) Start Backend

```bash
cd backend
npm install
npm run start
```

Backend runs at `http://localhost:3000`.

### 3) Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Environment Variables

Current setup uses defaults in code:

- MongoDB URI: `mongodb://localhost:27017/crm`
- Backend Port: `3000`
- Frontend API Base URL: `http://localhost:3000`

If needed, these can be moved to `.env` files.

## Test Login Credentials

- Email: `admin@example.com`
- Password: `password123`

## Database Setup

1. Install and run MongoDB locally.
2. Ensure MongoDB listens on default port `27017`.
3. App will use database `crm` automatically on first write.

## Known Limitations

- Single hardcoded test user for authentication.
- No pagination on leads list.
- No role-based access control.
- JWT secret is currently static in backend guard.

## Reflection

This project focused on delivering an end-to-end CRM workflow quickly while keeping code straightforward to explain in a demo. The largest learning areas were route protection, connecting frontend filters to backend query logic, and refining the dashboard to match business metrics. Given more time, the next improvements would be DTO validation, environment-based configuration, and stronger UX polish.

## Demo Video

Add your demo video link here:

- `TODO: Paste Loom/YouTube/Drive link`

## Deployed Application

Add deployment link here (if available):

- `TODO: Paste deployed app link or write "Not deployed"`

