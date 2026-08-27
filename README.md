# CRM Platform — Frontend

A full-stack Customer Relationship Management (CRM) frontend built with Next.js, React, and TypeScript.

The frontend provides the user interface for authentication, user management, leads, customers, deals, tasks, services, notes, activities, notifications, invitations, and profile/account settings.

## Features

### Authentication
- Registration
- Login and logout
- Email verification with OTP
- Forgot-password flow
- Password reset
- Change password
- Invitation-based account setup
- Protected dashboard routes

### CRM
- Leads and lead conversion
- Customers
- Deals and pipeline stages
- Tasks
- Services
- Notes
- Activity history
- Notifications

### User & Organization Management
- User listing
- User invitations
- Pending invitation management
- Roles and permissions UI
- Reporting relationships
- Personal profile and profile editing

### Real-Time Updates
- Socket.IO client integration
- Real-time notifications

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Redux Toolkit
- Axios
- Socket.IO Client
- Lucide React
- Sonner

## Architecture

The frontend uses a feature-based structure so each business domain keeps its related UI, API services, schemas, and types together.

```text
frontend/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── leads/
│   │   ├── customers/
│   │   ├── deals/
│   │   ├── tasks/
│   │   ├── services/
│   │   └── ...
│   ├── shared/
│   └── lib/
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

The frontend communicates with the backend through HTTP APIs and Socket.IO. It does not connect directly to PostgreSQL.

```text
Browser
   │
   ├── HTTP
   └── WebSocket
        │
        ▼
Express Backend
        │
        ▼
PostgreSQL
```

## Environment Variables

The frontend currently requires one environment variable.

Create `.env.local` in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, set it to the deployed backend URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:8000` |

## Getting Started

### Prerequisites

- Node.js
- npm
- A running CRM backend

### Install

```bash
git clone <your-repository-url>
cd CRM/frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Authentication

Authentication is implemented by the backend. The frontend provides the authentication screens and calls the corresponding backend APIs.

Typical flow:

```text
Login / Register
      ↓
Backend authentication
      ↓
HTTP-only authentication cookie
      ↓
Protected dashboard
```

Password recovery remains inside the login experience:

```text
Login
  ↓
Forgot password?
  ↓
Email
  ↓
OTP
  ↓
New password
  ↓
Login
```

## Deployment

The frontend can be deployed independently from the backend.

Example setup:

```text
Frontend  → Vercel
Backend   → Render
Database  → Neon PostgreSQL
Email     → Brevo
```

Set the production API URL in the hosting provider's environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## Security

Do not commit environment files containing secrets or environment-specific configuration.

Recommended `.gitignore` entries:

```gitignore
.env
.env.*
!.env.example
node_modules/
.next/
```

`NEXT_PUBLIC_API_URL` is intentionally public because it is used by browser code. Secrets such as database credentials, JWT secrets, and Brevo API keys belong only in the backend environment.

## Project Status

The frontend currently covers the main CRM workflows for authentication, users, leads, customers, deals, tasks, services, notes, activities, notifications, invitations, and profile/account management.

## Author

**Akash Kumar**
