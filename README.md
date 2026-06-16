# 💰 MoneyMap

MoneyMap is a modern personal finance platform designed to help individuals take control of their finances through budgeting, savings goals, recurring expense tracking, spending insights, and long-term financial planning.

The project is being built as a full-stack platform consisting of:

* 🌐 Web Application
* 📱 Android Application (planned)
* 📱 iOS Application (planned)
* ⚙️ Kotlin + Micronaut Backend APIs
* 🗄️ PostgreSQL Database

---

# 🎯 Vision

Many people know how much they earn but struggle to understand where their money goes.

MoneyMap aims to provide a single platform where users can:

* Track income and expenses
* Build realistic monthly budgets
* Monitor recurring payments
* Set and achieve savings goals
* Manage account preferences
* Understand spending habits
* Improve financial decision-making

The long-term goal is to create a modern, accessible financial management platform that helps users build sustainable financial habits.

---

# 💡 Financial Model

MoneyMap is built around four core financial pillars.

## Budget

Flexible monthly spending allocations such as:

* Groceries
* Transport
* Entertainment
* Utilities
* Personal spending

Budgets consist of:

* Monthly income
* Budget items
* Budget goals

---

## Recurring Expenses

Fixed monthly commitments such as:

* Rent
* Insurance
* Gym memberships
* Streaming services
* Mobile contracts

Recurring expenses include:

* Category
* Frequency
* Amount
* Next payment date

---

## Goals

Dedicated savings objectives such as:

* Emergency Fund
* Laptop Fund
* University Fees
* House Deposit
* Holiday Savings

Each goal contains:

* Target amount
* Current amount
* Progress tracking

---

## Reports

Reports aggregate information from Budgets, Goals, and Recurring Expenses to provide:

* Financial health overview
* Goal allocation analysis
* Recurring expense breakdown
* Monthly cash flow visibility
* Savings performance tracking

---

# 🚀 Current Status

## Current Milestone

MoneyMap currently supports:

* User signup
* User login
* JWT authentication
* Protected application routes
* Budget management
* Budget goal management
* Savings goals
* Recurring expense tracking
* User settings management
* Password changes
* Account deletion requests
* PostgreSQL persistence
* Production deployments

The application is now operating as a fully authenticated full-stack platform with persistent storage, production hosting, and complete CRUD functionality across all major financial modules.

---

# ✅ Completed

## Frontend

* Landing page
* Signup page
* Login page
* JWT session handling
* Route protection
* Budget dashboard
* Budget backend integration
* Budget item CRUD
* Budget goal CRUD
* Savings goals CRUD
* Recurring expense CRUD
* Settings backend integration
* Password management UI
* Account deletion requests
* Reports page scaffold
* Responsive navigation
* Mobile bottom navigation

---

## Backend

### Authentication

* User signup API
* User login API
* Password hashing (BCrypt)
* JWT generation
* JWT validation
* Protected APIs

### Budget Management

* Monthly income management
* Budget item CRUD
* Budget goal CRUD
* Budget ownership validation

### Goals

* Goal CRUD
* Goal progress calculation

### Recurring Expenses

* Recurring expense CRUD
* Ownership validation

### Settings

* Profile management
* Email updates
* Currency preferences
* Monthly budget cycle preferences
* Notification preferences
* Password changes
* Account deletion requests (soft delete)

### Infrastructure

* Micronaut
* PostgreSQL
* Flyway migrations
* Docker support
* Request validation
* API serialization

---

## Infrastructure

* GitHub repositories
* Docker development environment
* PostgreSQL containerized development environment
* Backend deployment on Render
* Frontend deployment on Vercel
* Environment variable configuration
* JWT secret management

---

# 🏗️ Architecture

```text
┌─────────────────────┐
│      Frontend       │
│ Next.js + React     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       Backend       │
│ Kotlin + Micronaut  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

---

## Current Domain Model

```text
User
├── Profile
├── Preferences
├── Authentication
└── Settings

Budget
├── Monthly Income
├── Budget Items
└── Budget Goal

Goal
├── Target Amount
├── Current Amount
└── Progress

Recurring Expense
├── Amount
├── Category
├── Frequency
└── Next Payment Date
```

---

# 💵 Cash Flow Philosophy

MoneyMap treats income as being allocated across multiple financial responsibilities.

Future reporting calculations will follow:

```text
Monthly Income
- Goal Contributions
- Recurring Expenses
- Budget Allocations
--------------------------------
= Available Cash
```

This provides a clearer view of financial health than budgeting alone.

---

# 🗺️ Development Roadmap

## Phase 1 — Foundations ✅

* [x] Repository setup
* [x] Frontend application structure
* [x] Backend application structure
* [x] Docker development environment
* [x] PostgreSQL integration
* [x] User authentication
* [x] Password hashing
* [x] JWT authentication
* [x] Route protection
* [x] Frontend ↔ Backend integration
* [x] Backend deployment
* [x] Frontend deployment

---

## Phase 2 — Budget Management ✅

* [x] Budget persistence
* [x] Monthly income management
* [x] Budget item CRUD
* [x] Budget goal CRUD
* [x] Database persistence
* [x] JWT-secured APIs

---

## Phase 3 — Savings Goals ✅

* [x] Goal persistence
* [x] Goal CRUD APIs
* [x] Goal frontend integration
* [x] Goal progress calculations

---

## Phase 4 — Recurring Expenses ✅

* [x] Recurring expense persistence
* [x] Recurring expense CRUD APIs
* [x] Frontend integration
* [x] JWT-secured endpoints
* [x] PostgreSQL persistence

---

## Phase 5 — Settings & Account Management ✅

* [x] Profile management
* [x] Email updates
* [x] Currency preferences
* [x] Budget cycle preferences
* [x] Notification preferences
* [x] Password changes
* [x] Account deletion requests
* [x] Soft-delete architecture
* [x] User preference persistence

---

## Phase 6 — Insights & Reporting 🚧

* [ ] Cash flow overview
* [ ] Spending by category
* [ ] Goal allocation reporting
* [ ] Upcoming payment reporting
* [ ] Financial health dashboard
* [ ] Pie chart visualizations
* [ ] Savings analytics

---

## Phase 7 — Financial Tracking

* [ ] Transaction management
* [ ] Expense categorization
* [ ] Spending history
* [ ] Monthly summaries
* [ ] Financial health scoring

---

## Phase 8 — Mobile Applications

* [ ] Android application (Kotlin)
* [ ] iOS application (Swift)
* [ ] Push notifications
* [ ] Offline support

---

## Phase 9 — Financial Intelligence

* [ ] Financial forecasting
* [ ] AI-powered budgeting assistance
* [ ] Churn prediction
* [ ] Dormancy prediction
* [ ] Savings recommendations
* [ ] Personalized financial insights
* [ ] Subscription likelihood prediction

---

## Phase 10 — Financial Platform

* [ ] Bank integrations
* [ ] Open Banking APIs
* [ ] Multi-account management
* [ ] Investment tracking
* [ ] Debt management
* [ ] Financial planning tools

---

# 🔐 Security

MoneyMap currently implements:

* BCrypt password hashing
* JWT authentication
* Protected APIs
* User ownership validation
* Route protection
* Secure environment variables

Future improvements include:

* Password reset flow
* Email verification
* Multi-factor authentication
* Session management

---

# 💡 Why MoneyMap Exists

Personal finance software often falls into one of two categories:

1. Too complicated for everyday users.
2. Too simple to provide meaningful financial insights.

MoneyMap aims to strike a balance between simplicity and usefulness.

The goal is not merely to record financial information, but to help users:

* Understand their finances
* Build healthy financial habits
* Make informed decisions
* Achieve long-term financial goals

---

# 🌱 Project Philosophy

MoneyMap is built around five principles.

## Simplicity

Financial tools should be easy to use.

## Transparency

Users should clearly understand their financial position.

## Privacy

Financial data should be handled responsibly.

## Accessibility

Good financial tools should be available to everyone.

## Sustainability

The focus is on building long-term financial habits rather than short-term fixes.

---

# 📚 Documentation

Additional documentation is available in:

* `frontend/README.md`
* `backend/README.md`

---

# 📄 License

Private Project

MoneyMap is currently under active development and is not yet available for public use.

© 2026 MoneyMap
