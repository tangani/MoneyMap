package com.moneymap.services

import com.moneymap.domain.recurring.RecurringExpense
import com.moneymap.models.CreateRecurringExpenseRequest
import com.moneymap.models.RecurringExpenseResponse
import com.moneymap.models.UpdateRecurringExpenseRequest
import com.moneymap.repositories.RecurringExpenseRepository
import jakarta.inject.Singleton
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Singleton
class RecurringExpenseService(
    private val recurringExpenseRepository: RecurringExpenseRepository,
) {
    fun getRecurringExpenses(userId: UUID): List<RecurringExpenseResponse> {
        return recurringExpenseRepository.findByUserId(userId)
            .map { it.toResponse() }
    }

    private fun fromCents(amountInCents: Long): BigDecimal {
        return BigDecimal(amountInCents).divide(BigDecimal("100"))
    }


    fun createRecurringExpense(
        userId: UUID,
        request: CreateRecurringExpenseRequest,
    ): RecurringExpenseResponse {
        val expense = recurringExpenseRepository.save(
            RecurringExpense(
                userId = userId,
                name = request.name,
                category = request.category,
                amountInCents = request.amountInCents,
                frequency = request.frequency,
                nextPaymentDate = request.nextPaymentDate,
            )
        )

        return expense.toResponse()
    }

    fun updateRecurringExpense(
        userId: UUID,
        expenseId: UUID,
        request: UpdateRecurringExpenseRequest,
    ): List<RecurringExpenseResponse> {
        val existingExpense = recurringExpenseRepository.findById(expenseId).orElse(null)
            ?: return getRecurringExpenses(userId)

        if (existingExpense.userId != userId) {
            return getRecurringExpenses(userId)
        }

        recurringExpenseRepository.update(
            existingExpense.copy(
                name = request.name.trim(),
                category = request.category.trim(),
                amountInCents = request.amountInCents,
                frequency = request.frequency.trim(),
                nextPaymentDate = request.nextPaymentDate,
            )
        )

        return getRecurringExpenses(userId)
    }

    fun deleteRecurringExpense(
        userId: UUID,
        expenseId: UUID,
    ): List<RecurringExpenseResponse> {
        val existingExpense = recurringExpenseRepository.findById(expenseId).orElse(null)
            ?: return getRecurringExpenses(userId)

        if (existingExpense.userId != userId) {
            return getRecurringExpenses(userId)
        }

        recurringExpenseRepository.delete(existingExpense)

        return getRecurringExpenses(userId)
    }

    private fun RecurringExpense.toResponse(): RecurringExpenseResponse {
        return RecurringExpenseResponse(
            id = id,
            name = name,
            category = category,
            amountInCents = amountInCents,
            frequency = frequency,
            nextPaymentDate = nextPaymentDate,
        )
    }
}