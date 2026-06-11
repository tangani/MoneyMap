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

# 🚀 Current Status

## ✅ Completed

### Frontend

* Landing page
* Signup page
* Login page
* Budget dashboard
* Goals page
* Recurring expenses page
* Reports page
* Settings page
* Responsive navigation

### Backend

* Micronaut project setup
* Docker support
* PostgreSQL configuration
* User signup API
* User login API
* Request validation
* API serialization

### Infrastructure

* GitHub repositories
* Docker development environment
* Backend deployment
* Frontend deployment preparation

---

## 🚧 In Progress

### Authentication

* Password hashing
* Session management
* JWT authentication

### Persistence

* User persistence
* Budget persistence
* Goal persistence

### API Development

* Budget APIs
* Goal APIs
* Recurring expense APIs

---

## 📋 Planned

### Core Finance Features

* Transaction tracking
* Expense categorization
* Debt management
* Budget analytics

### Insights

* Spending trends
* Financial reports
* Savings forecasting
* Goal performance analytics

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
                           │
┌─────────────┐            ▼            ┌─────────────┐
│  Web App    │ ─────► Backend APIs ◄──│   iOS App   │
└─────────────┘                         └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ PostgreSQL  │
                    └─────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

## Backend

* Kotlin
* Micronaut
* Java 21
* Gradle

## Database

* PostgreSQL

## Infrastructure

* Docker
* Docker Compose
* Render
* GitHub

## Future Technologies

* Android (Kotlin)
* iOS (Swift)
* Push Notifications
* Cloud Monitoring
* Analytics

---

# 📁 Repository Structure

```text
MoneyMap/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── README.md
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── build.gradle.kts
│   └── README.md
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/tangani/MoneyMap.git
cd MoneyMap
```

---

## Run Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## Run Backend

Start PostgreSQL:

```bash
cd backend

docker compose up -d
```

Run backend:

```bash
./gradlew run
```

Backend:

```text
http://localhost:8080
```

Health Check:

```text
GET /health
```

---

# 🗺️ Development Roadmap

## Phase 1 — Foundations ✅

* [x] Repository setup
* [x] Frontend application structure
* [x] Backend application structure
* [x] Authentication pages
* [x] Signup API
* [x] Login API
* [x] Docker development environment

---

## Phase 2 — Core Budgeting 🚧

* [ ] PostgreSQL persistence
* [ ] Budget CRUD APIs
* [ ] Goal CRUD APIs
* [ ] Recurring expense APIs
* [ ] Frontend integration

---

## Phase 3 — Financial Tracking

* [ ] Transaction management
* [ ] Expense categorization
* [ ] Spending history
* [ ] Monthly summaries

---

## Phase 4 — Insights & Reporting

* [ ] Financial reports
* [ ] Savings analytics
* [ ] Goal tracking insights
* [ ] Forecasting

---

## Phase 5 — Mobile Applications

* [ ] Android app
* [ ] iOS app
* [ ] Push notifications
* [ ] Offline support

---

## Phase 6 — Financial Platform

* [ ] Bank integrations
* [ ] Open Banking
* [ ] AI-powered budgeting
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
