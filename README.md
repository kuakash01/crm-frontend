# CRM Platform — Frontend

A modern Customer Relationship Management (CRM) frontend built with **Next.js, React, and TypeScript**.

The frontend provides the user interface for authentication, user management, leads, customers, deals, tasks, services, notes, activities, notifications, invitations, profiles, and account settings.

---

## Overview

The frontend is the client-facing application of the CRM platform.

It communicates with the backend through HTTP API requests and Socket.IO for real-time updates. The frontend does **not** connect directly to PostgreSQL.

The application follows a **feature-based architecture**, where each major business domain keeps its related components, API services, schemas, and types together.

---

## Features

### Authentication

- User registration
- Login and logout
- Email verification with OTP
- Forgot-password flow
- Password reset
- Change password
- Invitation-based account setup
- Protected dashboard routes
- Password visibility controls
- Authentication loading and error states

### CRM

#### Leads

- Lead listing
- Create and update leads
- Lead assignment
- Lead status tracking
- Lead source tracking
- Lead conversion

#### Customers

- Customer listing
- Customer creation and management
- Customer assignment
- Customer status management
- Lead-to-customer conversion
- Customer origin tracking

#### Deals

- Deal management
- Deal assignment
- Deal pipeline stages
- Deal pricing
- Expected close dates

#### Tasks

- Task creation and management
- Task assignment
- Task status
- Task priority
- Due dates
- CRM entity relationships

#### Services

- Service management
- Service pricing
- Active/inactive services
- Organization-specific services

#### Notes & Activities

- Notes attached to CRM entities
- Activity history
- Entity-based activity views

#### Notifications

- Notification center
- Read/unread state
- Real-time notification updates
- Notification badges and feedback

### User & Organization Management

- User listing
- User creation through invitations
- Pending invitation management
- Invitation acceptance
- Roles and permissions UI
- Reporting relationships
- Personal profile
- Profile editing
- Account information
- Password management

### Real-Time Updates

- Socket.IO client integration
- Real-time notifications
- Live updates without requiring a page refresh

---

## Tech Stack

### Core

- **Next.js**
- **React**
- **TypeScript**

### UI

- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**
- **Sonner**

### Forms & Validation

- **React Hook Form**
- **Zod**
- **@hookform/resolvers**

### State & Networking

- **Redux Toolkit**
- **Axios**
- **Socket.IO Client**

---

## Architecture

The frontend follows a feature-based structure.

```text
frontend/
├── public/
│
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
│   │
│   ├── shared/
│   └── lib/
│
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md