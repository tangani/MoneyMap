package com.moneymap.services

import com.moneymap.domain.budget.Budget
import com.moneymap.domain.budget.BudgetGoal
import com.moneymap.domain.budget.BudgetItem
import com.moneymap.models.*
import com.moneymap.repositories.BudgetGoalRepository
import com.moneymap.repositories.BudgetItemRepository
import com.moneymap.repositories.BudgetRepository
import jakarta.inject.Singleton
import java.time.LocalDateTime
import java.util.UUID

@Singleton
class BudgetService(
    private val budgetRepository: BudgetRepository,
    private val budgetItemRepository: BudgetItemRepository,
    private val budgetGoalRepository: BudgetGoalRepository,
) {

    private val temporaryUserId = UUID.fromString("b3cc51aa-d019-4cff-a806-06c279515d32")

    private fun toCents(amount: java.math.BigDecimal): Long {
        return amount.multiply(java.math.BigDecimal("100")).toLong()
    }

    fun getBudget(userId: UUID): BudgetResponse {
        val budget = budgetRepository.findByUserId(userId)
            ?: return BudgetResponse(
                monthlyIncomeInCents = 0,
                items = emptyList(),
                goal = null
            )

        val items = budgetItemRepository.findByBudgetId(budget.id)
        val goal = budgetGoalRepository.findByBudgetId(budget.id)

        return BudgetResponse(
            monthlyIncomeInCents = toCents(budget.monthlyIncome),
            items = items.map { item ->
                BudgetItemResponse(
                    id = item.id.toString(),
                    name = item.name,
                    amountInCents = toCents(item.amount),
                    category = item.category,
                    type = if (item.category == "Goals") "SAVING" else "EXPENSE"
                )
            },
            goal = goal?.let {
                BudgetGoalResponse(
                    id = it.id.toString(),
                    name = it.name,
                    targetAmountInCents = toCents(it.targetAmount),
                    currentAmountInCents = toCents(it.monthlyContribution),
                    monthlyContributionInCents = toCents(it.monthlyContribution)
                )
            }
        )
    }

    fun createBudget(request: CreateBudgetRequest): BudgetResponse {
        val existingBudget = budgetRepository.findByUserId(request.userId)

        if (existingBudget != null) {
            return getBudget(request.userId)
        }

        val now = LocalDateTime.now()

        budgetRepository.save(
            Budget(
                id = UUID.randomUUID(),
                userId = request.userId,
                monthlyIncome = request.monthlyIncome,
                createdAt = now,
                updatedAt = now,
            )
        )

        return getBudget(request.userId)
    }

    fun addBudgetItem(request: CreateBudgetItemRequest): BudgetResponse {
        val budget = budgetRepository.findByUserId(temporaryUserId)
            ?: throw IllegalStateException("Budget must be created before adding items")

        val now = LocalDateTime.now()

        budgetItemRepository.save(
            BudgetItem(
                id = UUID.randomUUID(),
                budgetId = budget.id,
                name = request.name,
                category = request.category,
                amount = request.amount,
                createdAt = now,
                updatedAt = now,
            )
        )

        return getBudget(request.userId)
    }

    fun setBudgetGoal(request: CreateBudgetGoalRequest): BudgetResponse {
        val budget = budgetRepository.findByUserId(temporaryUserId)
            ?: throw IllegalStateException("Budget must be created before setting a goal")

        val now = LocalDateTime.now()

        budgetGoalRepository.save(
            BudgetGoal(
                id = UUID.randomUUID(),
                budgetId = budget.id,
                name = request.name,
                targetAmount = request.targetAmount,
                monthlyContribution = request.monthlyContribution,
                createdAt = now,
                updatedAt = now,
            )
        )

        return getBudget(request.userId)
    }
}