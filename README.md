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
* Track debt repayment progress
* Understand spending habits
* Improve financial decision-making

The long-term goal is to create a modern, accessible financial management platform that helps users build sustainable financial habits.

---

# 💡 Financial Model

MoneyMap is built around four core financial pillars:

### Budget

Flexible monthly spending allocations such as:

* Groceries
* Transport
* Entertainment
* Utilities
* Personal spending

### Recurring Expenses

Fixed monthly commitments such as:

* Rent
* Insurance
* Gym memberships
* Streaming services
* Mobile contracts

### Goals

Dedicated savings objectives such as:

* Emergency Fund
* Laptop Fund
* University Fees
* House Deposit
* Holiday Savings

Each goal contains:

* Target amount
* Current amount
* Monthly contribution

### Reports

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
* Budget goals
* Recurring expense tracking
* PostgreSQL persistence
* Frontend and backend production deployments

The application is now operating as a full-stack web application with authenticated users, persistent data storage, and production hosting.

---

## ✅ Completed

### Frontend

* Landing page
* Signup page
* Login page
* JWT session handling
* Route protection
* Budget dashboard
* Budget backend integration
* Goal management
* Recurring expense management
* Reports page
* Settings page
* Responsive navigation
* Mobile bottom navigation

### Backend

* Micronaut project setup
* Docker support
* PostgreSQL configuration
* Flyway migrations
* User signup API
* User login API
* Password hashing
* JWT generation
* JWT-protected APIs
* Budget APIs
* Budget persistence
* Budget item persistence
* Budget goal persistence
* Recurring expense APIs
* Recurring expense persistence
* Request validation
* API serialization

### Infrastructure

* GitHub repositories
* Docker development environment
* PostgreSQL containerized development environment
* Backend deployment (Render)
* Frontend deployment (Vercel)
* Environment variable configuration

---

## 🚧 In Progress

### Budget & Goals

* Goal progress calculations
* Goal contribution tracking
* Monthly savings allocation model
* Validation improvements

### Reporting

* Dynamic reporting engine
* Pie chart visualizations
* Cash flow summaries
* Financial health metrics

### Financial Tracking

* Transaction management
* Expense categorization
* Spending history

---

## 📋 Planned

### Reports & Analytics

* Goal allocation pie charts
* Recurring expense category pie charts
* Monthly spending trends
* Income versus commitments analysis
* Emergency fund progress reporting
* Savings performance tracking

### Core Finance Features

* Transaction tracking
* Debt management
* Financial health scoring
* Monthly summaries

### Platform Expansion

* Android application
* iOS application
* Push notifications
* Multi-currency support

### Advanced Features

* Bank integrations
* Open Banking APIs
* AI-powered budgeting assistance
* Financial forecasting
* Personalized recommendations

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

### Long-Term Architecture

```text
                    ┌─────────────┐
                    │ Android App │
                    └──────┬──────┘
                           │

┌─────────────┐            ▼            ┌─────────────┐
│   Web App   │ ─────► Backend APIs ◄── │   iOS App   │
└─────────────┘                          └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ PostgreSQL  │
                    └─────────────┘
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

This approach provides a more accurate view of a user's financial position than traditional budgeting alone.

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
* [x] Budget income management
* [x] Budget item management
* [x] Budget goal management
* [x] Database persistence
* [x] Refresh-safe user data
* [x] JWT-secured budget APIs

---

## Phase 3 — Recurring Expenses ✅

* [x] Recurring expense persistence
* [x] Recurring expense APIs
* [x] Frontend integration
* [x] JWT-secured endpoints
* [x] PostgreSQL persistence
* [x] Create recurring expenses
* [x] View recurring expenses
* [x] Edit recurring expenses
* [x] Delete recurring expenses

---

## Phase 4 — Budget Enhancements ✅

* [x] Edit budget items
* [x] Delete budget items
* [x] Edit budget goals
* [x] Delete budget goals
* [x] Edit recurring expenses
* [x] Delete recurring expenses

---

## Phase 5 — Financial Tracking 🚧

* [ ] Goal contribution tracking
* [ ] Goal progress calculations
* [ ] Transaction management
* [ ] Expense categorization
* [ ] Spending history
* [ ] Monthly summaries

---

## Phase 6 — Insights & Reporting

* [ ] Goal allocation pie charts
* [ ] Recurring expense pie charts
* [ ] Budget category analysis
* [ ] Emergency fund reporting
* [ ] Savings analytics
* [ ] Cash flow dashboard
* [ ] Financial forecasting
* [ ] Export functionality

---

## Phase 7 — Mobile Applications

* [ ] Android application (Kotlin)
* [ ] iOS application (Swift)
* [ ] Push notifications
* [ ] Offline support

---

## Phase 8 — Financial Platform

* [ ] Bank integrations
* [ ] Open Banking APIs
* [ ] AI-powered budgeting
* [ ] Financial forecasting
* [ ] Personalized recommendations

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

MoneyMap is built around five principles:

### Simplicity

Financial tools should be easy to use.

### Transparency

Users should understand their financial position clearly.

### Privacy

Financial data should be handled responsibly.

### Accessibility

Good financial tools should be available to everyone.

### Sustainability

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
