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
                    type = item.type,
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

    fun createBudget(
        userId: UUID,
        request: CreateBudgetRequest,
    ): BudgetResponse {
        val existingBudget = budgetRepository.findByUserId(userId)

        if (existingBudget != null) {
            return getBudget(userId)
        }

        val now = LocalDateTime.now()

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

    fun updateMonthlyIncome(
        userId: UUID,
        request: UpdateMonthlyIncomeRequest,
    ): BudgetResponse {
        val now = LocalDateTime.now()
        val monthlyIncome = fromCents(request.monthlyIncomeInCents)

        val existingBudget = budgetRepository.findByUserId(userId)

        if (existingBudget == null) {
            budgetRepository.save(
                Budget(
                    id = UUID.randomUUID(),
                    userId = userId,
                    monthlyIncome = monthlyIncome,
                    createdAt = now,
                    updatedAt = now,
                )
            )

            return getBudget(userId)
        }

        budgetRepository.update(
            existingBudget.copy(
                monthlyIncome = monthlyIncome,
                updatedAt = now,
            )
        )

        return getBudget(userId)
    }

    fun addBudgetItem(
        userId: UUID,
        request: CreateBudgetItemRequest,
    ): BudgetResponse {
        val budget = getOrCreateBudget(userId)
        val now = LocalDateTime.now()

        budgetItemRepository.save(
            BudgetItem(
                id = UUID.randomUUID(),
                budgetId = budget.id,
                name = request.name.trim(),
                category = request.category.trim(),
                amount = fromCents(request.amountInCents),
                type = request.type,
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
        val budget = getOrCreateBudget(userId)
        val now = LocalDateTime.now()

        budgetGoalRepository.save(
            BudgetGoal(
                id = UUID.randomUUID(),
                budgetId = budget.id,
                name = request.name.trim(),
                targetAmount = fromCents(request.targetAmountInCents),
                monthlyContribution = fromCents(request.monthlyContributionInCents),
                createdAt = now,
                updatedAt = now,
            )
        )

        return getBudget(userId)
    }

    fun updateBudgetItem(
        userId: UUID,
        itemId: UUID,
        request: UpdateBudgetItemRequest,
    ): BudgetResponse {
        val budget = budgetRepository.findByUserId(userId)
            ?: return getBudget(userId)

        val existingItem = budgetItemRepository.findById(itemId).orElse(null)
            ?: return getBudget(userId)

        if (existingItem.budgetId != budget.id) {
            return getBudget(userId)
        }

        val now = LocalDateTime.now()

        budgetItemRepository.update(
            existingItem.copy(
                name = request.name.trim(),
                category = request.category.trim(),
                amount = fromCents(request.amountInCents),
                type = request.type,
                updatedAt = now,
            )
        )

        return getBudget(userId)
    }

    fun deleteBudgetItem(
        userId: UUID,
        itemId: UUID,
    ): BudgetResponse {
        val budget = budgetRepository.findByUserId(userId)
            ?: return getBudget(userId)

        val existingItem = budgetItemRepository.findById(itemId).orElse(null)
            ?: return getBudget(userId)

        if (existingItem.budgetId != budget.id) {
            return getBudget(userId)
        }

        budgetItemRepository.delete(existingItem)

        return getBudget(userId)
    }

    fun updateBudgetGoal(
        userId: UUID,
        goalId: UUID,
        request: UpdateBudgetGoalRequest,
    ): BudgetResponse {
        val budget = budgetRepository.findByUserId(userId)
            ?: return getBudget(userId)

        val existingGoal = budgetGoalRepository.findById(goalId).orElse(null)
            ?: return getBudget(userId)

        if (existingGoal.budgetId != budget.id) {
            return getBudget(userId)
        }

        val now = LocalDateTime.now()

        budgetGoalRepository.update(
            existingGoal.copy(
                name = request.name.trim(),
                targetAmount = fromCents(request.targetAmountInCents),
                monthlyContribution = fromCents(request.monthlyContributionInCents),
                updatedAt = now,
            )
        )

        return getBudget(userId)
    }

    fun deleteBudgetGoal(
        userId: UUID,
        goalId: UUID,
    ): BudgetResponse {
        val budget = budgetRepository.findByUserId(userId)
            ?: return getBudget(userId)

        val existingGoal = budgetGoalRepository.findById(goalId).orElse(null)
            ?: return getBudget(userId)

        if (existingGoal.budgetId != budget.id) {
            return getBudget(userId)
        }

        budgetGoalRepository.delete(existingGoal)

        return getBudget(userId)
    }

    private fun getOrCreateBudget(userId: UUID): Budget {
        return budgetRepository.findByUserId(userId)
            ?: createEmptyBudget(userId)
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