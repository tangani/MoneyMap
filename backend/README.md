# MoneyMap Backend

The MoneyMap Backend powers the MoneyMap personal finance platform.

It provides the APIs, business logic, data persistence, and integrations required to help users manage budgets, track expenses, achieve savings goals, and gain insights into their financial health.

The long-term vision is to build a scalable fintech-style platform supporting web, Android, and iOS applications.

---

# Vision

MoneyMap exists to help people understand, control, and improve their financial lives.

The backend is responsible for:

* User authentication and authorization
* Budget management
* Goal tracking
* Recurring expense management
* Financial reporting
* Future banking integrations
* Future AI-powered financial insights

---

# Current Features

## Authentication

Implemented:

* User Registration
* User Login
* Request validation
* API response handling

Endpoints:

```http
POST /api/v1/auth/signup
POST /api/v1/auth/login
```

Upcoming:

* Password hashing (BCrypt)
* JWT authentication
* Refresh tokens
* Password reset

---

## Budget Management

Currently in development.

Planned capabilities:

* Create budgets
* Update budgets
* Delete budgets
* Monthly budget summaries
* Budget category tracking

---

## Financial Goals

Currently in development.

Planned capabilities:

* Create savings goals
* Track progress
* Monthly contribution tracking
* Goal completion analytics

---

## Recurring Expenses

Currently in development.

Examples:

* Rent
* Insurance
* Streaming services
* Gym memberships
* Internet services

---

# Technology Stack

## Core Framework

* Kotlin 2.3
* Java 21
* Micronaut 4.10
* Gradle 9

## Database

* PostgreSQL

## Serialization

* Micronaut Serialization
* JSON APIs

## Development Tools

* Docker
* Docker Compose
* IntelliJ IDEA
* Git

---

# Architecture

The backend follows principles inspired by:

* Domain-Driven Design (DDD)
* Clean Architecture
* Hexagonal Architecture

## High-Level Architecture

```text
┌──────────────────────┐
│     REST API Layer   │
│     Controllers      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Application       │
│      Services        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Domain         │
│ Business Rules       │
│     Entities         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Infrastructure     │
│ PostgreSQL / Docker  │
│ Future Integrations  │
└──────────────────────┘
```

---

# Project Structure

```text
backend/
├── src/
│   ├── main/
│   │   ├── kotlin/
│   │   │   └── com/moneymap/
│   │   │       ├── controllers/
│   │   │       ├── services/
│   │   │       ├── repositories/
│   │   │       ├── domain/
│   │   │       ├── models/
│   │   │       └── config/
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       └── logback.xml
│   │
│   └── test/
│
├── docker-compose.yml
├── Dockerfile
├── build.gradle.kts
└── settings.gradle.kts
```

---

# Domain Roadmap

## Users

* Registration
* Login
* Authentication
* Profile management

## Budgets

Track monthly income and spending.

Examples:

* Rent
* Groceries
* Transport
* Utilities
* Savings

## Goals

Track financial objectives.

Examples:

* Emergency Fund
* Holiday Fund
* Laptop Fund
* Home Deposit

## Recurring Expenses

Track ongoing commitments.

Examples:

* Netflix
* Spotify
* Insurance
* Internet

## Reports

Generate financial insights.

Examples:

* Spending trends
* Savings rate
* Goal progress
* Category analysis

## Debt Management

Future functionality:

* Credit card tracking
* Personal loans
* Repayment schedules
* Debt reduction analytics

---

# Local Development

## Prerequisites

Install:

* Java 21
* Docker
* Docker Compose
* Git

Verify installation:

```bash
java --version
docker --version
docker compose version
```

---

## Clone Repository

```bash
git clone https://github.com/tangani/MoneyMap.git
cd MoneyMap/backend
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=jdbc:postgresql://localhost:6543/moneymap
DATABASE_USERNAME=moneymap
DATABASE_PASSWORD=moneymap
```

---

## Start PostgreSQL

```bash
docker compose up -d
```

Verify:

```bash
docker ps
```

---

## Run Application

```bash
./gradlew run
```

Application:

```text
http://localhost:8080
```

Health Check:

```http
GET /health
```

---

# Build & Test

Build:

```bash
./gradlew clean build
```

Run tests:

```bash
./gradlew test
```

Run a single test:

```bash
./gradlew test --tests "*AuthControllerTest"
```

---

# API Roadmap

## Phase 1 — Foundations ✅

* Micronaut project setup
* Docker support
* PostgreSQL setup
* Health endpoint
* Authentication endpoints

## Phase 2 — Core Budgeting 🚧

* Budget APIs
* Budget persistence
* Budget summaries
* Goal APIs
* Goal persistence

## Phase 3 — Financial Tracking

* Recurring expenses
* Transaction tracking
* Category management

## Phase 4 — Insights

* Reports
* Analytics
* Financial forecasting

## Phase 5 — Platform Expansion

* Mobile applications
* Push notifications
* Banking integrations
* AI-assisted budgeting

---

# Deployment

Current deployment target:

* Render
* Docker
* PostgreSQL

Future deployment options:

* AWS
* Railway
* Kubernetes
* Managed PostgreSQL

---

# Future Integrations

Potential integrations include:

* Open Banking APIs
* Bank transaction imports
* Push notification providers
* Email providers
* Analytics platforms

---

# Useful Links

## Micronaut

https://docs.micronaut.io/

## Kotlin

https://kotlinlang.org/

## PostgreSQL

https://www.postgresql.org/

## Gradle

https://gradle.org/

---

# Current Status

🚧 Active Development

## Completed

* Micronaut backend setup
* Docker support
* PostgreSQL configuration
* User signup endpoint
* User login endpoint
* Request validation
* API serialization

## In Progress

* Database persistence
* Password hashing
* Budget APIs
* Goal APIs

## Next Milestone

* Complete authentication flow
* Persist users to PostgreSQL
* Budget CRUD operations
* Frontend-to-backend integration

---

# License

Private Project

© MoneyMap
