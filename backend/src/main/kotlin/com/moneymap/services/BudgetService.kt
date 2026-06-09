package com.moneymap.services

import com.moneymap.models.*
import jakarta.inject.Singleton

@Singleton
class BudgetService {

    fun getBudget(): BudgetResponse {
        return BudgetResponse(
            monthlyIncomeInCents = 5_000_000,
            items = listOf(
                BudgetItemResponse(
                    id = "rent",
                    name = "Rent",
                    amountInCents = 750_000,
                    category = "Bills",
                    type = "EXPENSE"
                ),
                BudgetItemResponse(
                    id = "groceries",
                    name = "Groceries",
                    amountInCents = 300_000,
                    category = "Essentials",
                    type = "EXPENSE"
                ),
                BudgetItemResponse(
                    id = "transport",
                    name = "Transport",
                    amountInCents = 150_000,
                    category = "Essentials",
                    type = "EXPENSE"
                ),
                BudgetItemResponse(
                    id = "savings",
                    name = "Savings",
                    amountInCents = 200_000,
                    category = "Goals",
                    type = "SAVING"
                )
            ),
            goal = BudgetGoalResponse(
                id = "monthly-savings-goal",
                name = "Increase monthly savings",
                targetAmountInCents = 500_000,
                currentAmountInCents = 200_000,
                monthlyContributionInCents = 200_000
            )
        )
    }
}