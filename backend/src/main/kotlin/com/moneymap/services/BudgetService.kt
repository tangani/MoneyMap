package com.moneymap.services

import com.moneymap.domain.budget.Budget
import com.moneymap.domain.budget.BudgetGoal
import com.moneymap.domain.budget.BudgetItem
import com.moneymap.models.*
import com.moneymap.repositories.BudgetGoalRepository
import com.moneymap.repositories.BudgetItemRepository
import com.moneymap.repositories.BudgetRepository
import jakarta.inject.Singleton
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Singleton
class BudgetService(
    private val budgetRepository: BudgetRepository,
    private val budgetItemRepository: BudgetItemRepository,
    private val budgetGoalRepository: BudgetGoalRepository,
) {

    private fun toCents(amount: BigDecimal): Long {
        return amount.multiply(BigDecimal("100")).toLong()
    }

    private fun fromCents(amountInCents: Long): BigDecimal {
        return BigDecimal(amountInCents).divide(BigDecimal("100"))
    }

    fun getBudget(userId: UUID): BudgetResponse {
        val budget = budgetRepository.findByUserId(userId)
            ?: return BudgetResponse(
                monthlyIncomeInCents = 0,
                items = emptyList(),
                goal = null,
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
                    type = if (item.category == "Goals") "SAVING" else "EXPENSE",
                )
            },
            goal = goal?.let {
                BudgetGoalResponse(
                    id = it.id.toString(),
                    name = it.name,
                    targetAmountInCents = toCents(it.targetAmount),
                    currentAmountInCents = 0,
                    monthlyContributionInCents = toCents(it.monthlyContribution),
                )
            },
        )
    }

    fun createBudget(userId: UUID, request: CreateBudgetRequest): BudgetResponse {
        val existingBudget = budgetRepository.findByUserId(userId)

        if (existingBudget != null) {
            return getBudget(userId)
        }

        val now = LocalDateTime.now()

        budgetRepository.save(
            Budget(
                id = UUID.randomUUID(),
                userId = userId,
                monthlyIncome = request.monthlyIncome,
                createdAt = now,
                updatedAt = now,
            )
        )

        return getBudget(userId)
    }

    fun updateMonthlyIncome(
        userId: UUID,
        request: UpdateMonthlyIncomeRequest,
    ): BudgetResponse {
        val now = LocalDateTime.now()

        val existingBudget = budgetRepository.findByUserId(userId)

        if (existingBudget == null) {
            budgetRepository.save(
                Budget(
                    id = UUID.randomUUID(),
                    userId = userId,
                    monthlyIncome = fromCents(request.monthlyIncomeInCents),
                    createdAt = now,
                    updatedAt = now,
                )
            )

            return getBudget(userId)
        }

        budgetRepository.update(
            existingBudget.copy(
                monthlyIncome = fromCents(request.monthlyIncomeInCents),
                updatedAt = now,
            )
        )

        return getBudget(userId)
    }

    fun addBudgetItem(
        userId: UUID,
        request: CreateBudgetItemRequest,
    ): BudgetResponse {
        val budget = budgetRepository.findByUserId(userId)
            ?: createEmptyBudget(userId)

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

        return getBudget(userId)
    }

    fun setBudgetGoal(
        userId: UUID,
        request: CreateBudgetGoalRequest,
    ): BudgetResponse {
        val budget = budgetRepository.findByUserId(userId)
            ?: createEmptyBudget(userId)

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

        return getBudget(userId)
    }

    private fun createEmptyBudget(userId: UUID): Budget {
        val now = LocalDateTime.now()

        return budgetRepository.save(
            Budget(
                id = UUID.randomUUID(),
                userId = userId,
                monthlyIncome = BigDecimal.ZERO,
                createdAt = now,
                updatedAt = now,
            )
        )
    }
}