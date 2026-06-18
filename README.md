# MedTrain LMS 🏥

> **AI-Enabled Healthcare Learning Management System** for emergency care and resuscitation training programs — BLS, ACLS, PALS, NALS, ATLS, BLSO.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?logo=tailwindcss)
![React Query](https://img.shields.io/badge/TanStack_Query-5-ff4154?logo=reactquery)
![MSW](https://img.shields.io/badge/MSW-Mock_API-orange)

---

## 🌟 Features

### Three Role-Based Portals

| Portal | Route | Description |
|---|---|---|
| **Learner** | `/learner` | Course viewing, assessments, OSCE results, certificates, profile |
| **Faculty** | `/faculty` | Batch monitoring, OSCE evaluation, AI feedback generator |
| **Admin** | `/admin` | Course builder, batch management, simulation scheduler, reports |

### Key Capabilities
- 🔐 **JWT Role Guard** — PrivateRoute checks role from localStorage, redirects to correct portal
- 📚 **Course Engine** — Video, PDF, and interactive module renderers with progress tracking
- 📝 **MCQ Assessment** — One question per screen, countdown timer, result review with per-question breakdown
- 🩺 **OSCE Evaluation** — Faculty submits step-by-step pass/fail checklist; learners see read-only results
- 🤖 **AI Feedback** — Mock AI generates personalized learner feedback (plugs into `/api/ai/feedback`)
- 📊 **Recharts Analytics** — Bar, line, and pie charts on admin dashboard
- 📅 **Simulation Calendar** — Monthly calendar view with session chips per day
- 🏆 **Certifications** — Color-coded expiry status, download button per cert
- 📤 **CSV Export** — Per-report export on the Reports page
- 🔔 **Notification Drawer** — Slide-in panel with renewal reminders and test result alerts

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (MSW mocks all API calls — no backend needed)
npm run dev
```

Open **`http://localhost:5173`**

---

## 🔑 Demo Login Credentials

> Password for all accounts: **`MedTrain@123`**

| Role | Email |
|---|---|
| Learner | `priya@medtrain.io` |
| Faculty | `suresh@medtrain.io` |
| Admin | `admin@medtrain.io` |

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19 + Vite 8** | App framework & build tool |
| **Tailwind CSS v4** | Utility-first styling (Vite plugin) |
| **React Router v6** | Nested routes, lazy loading |
| **TanStack React Query** | Server state management |
| **Axios** | HTTP client with JWT interceptor |
| **MSW (Mock Service Worker)** | Full API mock layer for development |
| **React Hook Form + Zod** | Form handling + schema validation |
| **Recharts** | Admin analytics charts |
| **date-fns** | Date formatting & calculations |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layouts/         # LearnerLayout, FacultyLayout, AdminLayout
│   └── shared/          # Navbar, Sidebar, StatusBadge, ProgressBar, etc.
├── context/
│   ├── AuthContext.jsx  # JWT auth state
│   └── ToastContext.jsx # Toast notification system
├── lib/
│   ├── axios.js         # Axios instance + interceptors
│   └── queryClient.js   # React Query client
├── mocks/
│   ├── browser.js       # MSW worker setup
│   ├── handlers.js      # 20+ API handlers
│   └── seed.js          # Mock data (learners, programs, certs...)
├── pages/
│   ├── auth/            # LoginPage
│   ├── learner/         # Dashboard, CourseView, Assessment, OSCE, Certificates, Profile
│   ├── faculty/         # Dashboard, LearnerMonitor, OSCEEvaluation, AssessmentReview, FeedbackGenerator
│   └── admin/           # Dashboard, CourseBuilder, BatchManagement, SimulationScheduler, UserManagement, Reports
└── router/
    ├── index.jsx         # Full route tree
    └── PrivateRoute.jsx  # Role-based route guard
```

---

## 🎭 Mock Data Seed

| Entity | Count |
|---|---|
| Users (Learners) | 10 |
| Faculty | 3 |
| Admin | 1 |
| Programs | 6 (BLS, ACLS, PALS, NALS, ATLS, BLSO) |
| Courses + Modules | 3 courses, 14 modules |
| Certificates | 5 |
| Batches | 3 |
| Simulations | 4 |

---

## 🔌 API Integration

Base URL: `http://localhost:8000/api`

All requests include `Authorization: Bearer <token>` via Axios interceptor. On `401` — clears localStorage and redirects to `/login`.

Key endpoints (all mocked with MSW):

```
POST /auth/login
GET  /learner/dashboard
GET  /courses/:id/modules
POST /courses/:id/modules/:moduleId/complete
GET  /assessments/:id
POST /assessments/:id/submit
GET  /osce/:sessionId/:learnerId
POST /osce/:sessionId/evaluate
GET  /faculty/batch/:id/learners
POST /ai/feedback
GET  /admin/dashboard
GET  /admin/reports/completion
```

---

## 📸 Screenshots

| Login | Learner Dashboard | Admin Analytics |
|---|---|---|
| Split panel with demo logins | Blue banner, course cards, sidebar | Recharts bar + line + pie charts |

---

## 📄 License

MIT — built for educational and demonstration purposes.
