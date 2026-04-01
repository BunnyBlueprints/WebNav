# WebNav

WebNav is a modern full-stack workspace for bulk URL exploration, session tracking, analytics, and resource management.

It combines a polished React frontend with a Node.js + MongoDB backend, plus authentication with email/password, Google, and GitHub.

## Highlights

- Bulk file upload for `CSV`, `XLS`, `XLSX`, and exported Google Sheets
- Session History and Saved URLs views
- Analytics and Resource Center dashboards
- User profile management with avatar upload, password update, 2FA toggle, and active session tracking
- Light and dark mode across the app
- MongoDB-backed persistence for user profile updates and uploaded session records

## Tech Stack

- Frontend: `React`, `TypeScript`, `Vite`, `Tailwind CSS`
- Backend: `Node.js`, `Express`, `MongoDB Atlas`, `Mongoose`
- Auth: `JWT cookies`, `Google OAuth`, `GitHub OAuth`

## Project Structure

```text
WebNav/
├── frontend/   # React app
├── backend/    # Express API
└── README.md
```

## Quick Start

### 1. Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure environment

Update `backend/.env` with:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:4000/api/auth/github/callback
```

### 3. Run the app

```bash
cd backend && npm start
cd frontend && npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:4000`

## Status

This project includes working authentication, profile management, upload-session persistence, and a fully themed frontend experience.
