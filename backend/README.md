# MoneyMap Backend

MoneyMap is a personal finance and budgeting platform designed to help users take control of their finances through budgeting, recurring expense tracking, savings goals, debt management, and spending insights.

This repository contains the backend services powering the MoneyMap platform.

---

## Tech Stack

### Core Framework

* Kotlin
* Java 21
* Micronaut 4.10.14
* Gradle 9.x

### Database

* PostgreSQL

### API

* RESTful APIs
* JSON Serialization (Jackson)

### Development Tools

* Docker
* Docker Compose
* GitHub Actions (planned)

---

## Project Vision

MoneyMap aims to provide users with:

* Monthly budgeting
* Recurring payment tracking
* Savings goal management
* Debt tracking
* Spending analytics
* Financial reports
* Financial health insights

Future enhancements:

* Open Banking integrations
* AI-powered financial recommendations
* Investment tracking
* Shared household budgets
* Mobile applications

---

## Architecture

The backend follows:

* Hexagonal Architecture
* Domain-Driven Design (DDD)
* Clean Architecture principles

### High-Level Structure

```text
┌─────────────────────┐
│    REST Controllers │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Application Layer   │
│ Use Cases / Services│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Domain Layer        │
│ Entities & Rules    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Infrastructure      │
│ DB, External APIs   │
└─────────────────────┘
```

---

## Planned Domain Modules

### Budgets

Manage monthly income and expenses.

Examples:

* Rent
* Groceries
* Transport
* Utilities
* Savings

### Recurring Payments

Track recurring commitments such as:

* Netflix
* Gym Memberships
* Insurance
* Internet Services

### Goals

Track financial goals.

Examples:

* Emergency Fund
* Holiday Savings
* Home Deposit
* New Car

### Debt

Monitor and reduce debt.

Examples:

* Credit Cards
* Personal Loans
* Student Loans

### Insights

Generate analytics including:

* Monthly spending trends
* Savings rate
* Debt reduction progress
* Category breakdowns

---

## Local Development

### Prerequisites

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

### Running Locally

Clone the repository:

```bash
git clone https://github.com/tangani/MoneyMap.git
cd backend
```

Start dependencies:

```bash
docker compose up -d
```

Run the application:

```bash
./gradlew run
```

Application:

```text
http://localhost:8080
```

Health endpoint:

```text
GET /health
```

---

## Build

```bash
./gradlew clean build
```

Run tests:

```bash
./gradlew test
```

---

## API Roadmap

### Authentication

* User Registration
* Login
* JWT Authentication
* Password Reset

### Budget Management

* Create Budget
* Update Budget
* Delete Budget
* View Budget Summary

### Recurring Expenses

* Create Recurring Expense
* Update Recurring Expense
* Cancel Recurring Expense

### Goals

* Create Goal
* Update Goal
* Track Progress

### Debt Tracking

* Create Debt
* Make Payments
* Track Outstanding Balance

---

## Environment Variables

Example:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/moneymap
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres

JWT_SECRET=change_me
```

---

## Future Infrastructure

Planned deployment stack:

* GitHub
* GitHub Actions
* AWS
* Docker
* PostgreSQL
* Cloud Monitoring

---

## Useful Links

### Micronaut

* https://docs.micronaut.io/4.10.14/guide/index.html
* https://docs.micronaut.io/4.10.14/api/index.html
* https://guides.micronaut.io/

### Gradle

* https://gradle.org/

### Kotlin

* https://kotlinlang.org/

---

## Current Status

🚧 Early Development

Current milestone:

* Backend project setup
* Health endpoint
* Initial architecture
* Domain modelling

Next milestone:

* User Authentication
* Database integration
* Budget CRUD functionality
