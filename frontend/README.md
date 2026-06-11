# MoneyMap

MoneyMap is a personal finance platform designed to help individuals build better financial habits through budgeting, goal-based saving, expense tracking, and financial insights.

The long-term vision is to provide a simple, modern, and accessible financial management experience for users across web, Android, and iOS platforms.

---

## Vision

Many people know where they earn money but struggle to understand where it goes.

MoneyMap aims to bridge that gap by providing tools that help users:

* Create realistic budgets
* Track recurring expenses
* Set and achieve savings goals
* Monitor spending habits
* Build healthier financial habits
* Make informed financial decisions

---

## Current Features

### Authentication

* User registration
* Secure login
* Backend-powered authentication APIs
* Session management (in progress)

### Budget Management

Create and manage monthly budgets by category.

Features include:

* Monthly income tracking
* Budget allocation
* Expense categorization
* Remaining balance calculation

### Financial Goals

Track progress towards personal financial objectives.

Examples:

* Emergency fund
* Laptop fund
* Holiday savings
* Home deposit

### Recurring Expenses

Monitor recurring monthly commitments such as:

* Rent
* Utilities
* Subscriptions
* Insurance
* Transport costs

### Reports & Insights

Gain visibility into financial behaviour through:

* Spending summaries
* Budget performance
* Goal progress tracking

---

## Planned Features

### Transactions

* Manual transaction tracking
* Transaction categorization
* Spending history

### Bank Integrations

* Connect bank accounts
* Automatic transaction imports
* Account balance synchronization

### AI-Assisted Budgeting

* Budget recommendations
* Spending trend analysis
* Personalized savings suggestions

### Financial Forecasting

* Cash-flow projections
* Savings forecasts
* Budget simulations

### Debt Management

* Debt tracking
* Repayment planning
* Progress monitoring

### Mobile Applications

* Android application
* iOS application
* Push notifications
* Offline support

### Multi-Currency Support

Support for users across different countries and currencies.

---

## Technology Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### Backend

* Kotlin
* Micronaut
* PostgreSQL
* Docker

### Future Infrastructure

* Cloud-hosted backend
* Mobile applications
* Push notifications
* Analytics and monitoring

---

## Project Structure

```text
frontend/
├── app/
│   ├── page.tsx
│   ├── login/
│   ├── signup/
│   ├── budget/
│   ├── goals/
│   ├── recurring-expenses/
│   ├── reports/
│   └── settings/
│
├── components/
│   ├── budget/
│   ├── goals/
│   ├── recurring/
│   ├── reports/
│   ├── settings/
│   └── shared/
│
├── lib/
├── types/
└── public/
```

---

## Pages

| Page               | Description                              |
| ------------------ | ---------------------------------------- |
| Home               | Landing page introducing MoneyMap        |
| Login              | Existing user authentication             |
| Signup             | New account registration                 |
| Budget             | Budget dashboard and monthly planning    |
| Goals              | Savings goals and progress tracking      |
| Recurring Expenses | Manage subscriptions and recurring costs |
| Reports            | Financial summaries and analytics        |
| Settings           | User preferences and account management  |

---

## User Journey

### 1. Create Account

Users sign up and create a MoneyMap account.

### 2. Set Financial Goals

Define savings objectives and target amounts.

### 3. Create Monthly Budget

Allocate income across spending categories.

### 4. Track Expenses

Monitor spending and recurring commitments.

### 5. Review Progress

Analyze financial performance and goal completion.

### 6. Improve Financial Habits

Use insights to make better financial decisions.

---

## Getting Started

### Prerequisites

* Node.js 22+
* npm, yarn, pnpm, or bun

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd MoneyMap/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run lint checks
```

---

## Development Roadmap

### Phase 1 — Foundations ✅

* Landing page
* Authentication pages
* Budget dashboard
* Goals page
* Recurring expenses page
* Reports page
* Settings page

### Phase 2 — Backend Integration 🚧

* User persistence
* Authentication APIs
* Budget APIs
* Goal APIs
* PostgreSQL integration

### Phase 3 — Transactions

* Transaction management
* Expense categorization
* Spending history

### Phase 4 — Insights

* Reporting
* Analytics
* Forecasting

### Phase 5 — Mobile Applications

* Android app
* iOS app
* Push notifications

---

## Project Status

🚧 Active Development

MoneyMap is currently being developed as a full-stack personal finance platform.

The frontend is functional and the backend APIs are actively being integrated. Features, architecture, and implementation details may evolve as the project grows.

---

## Contributing

This project is currently private and under active development.

Contributions, feedback, and suggestions are welcome as the platform evolves.

---

## License

Private Project

© MoneyMap
