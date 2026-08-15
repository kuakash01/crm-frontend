# CRM Frontend

Frontend application for the CRM Platform built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, and **ShadCN UI**.

## Requirements

- Node.js 20+
- npm

## Installation

Clone the repository and install dependencies.

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

## Running the Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

## Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Axios
- ShadCN UI
- React Hook Form
- Zod
- Sonner
- Lucide React

## Project Structure

```
src/
│
├── app/
├── components/
├── features/
├── shared/
├── store/
├── lib/
├── hooks/
└── middleware.ts
```

## Backend

This frontend requires the CRM Backend API to be running.

Example:

```
http://localhost:8000/api
```

## Features

- Authentication
- Role Based Access Control (RBAC)
- Dashboard
- Lead Management
- Customer Management
- Deal Management
- Kanban Deal Pipeline
- Services Management
- Tasks
- Notes
- Activities
- Pagination
- Search & Filters
- Responsive Dashboard Layout

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Notes

- Ensure the backend server is running before starting the frontend.
- Update `.env.local` if the backend URL changes.
- Restart the development server after modifying environment variables.