package com.moneymap.services

import com.moneymap.domain.recurring.RecurringExpense
import com.moneymap.models.CreateRecurringExpenseRequest
import com.moneymap.models.RecurringExpenseResponse
import com.moneymap.repositories.RecurringExpenseRepository
import jakarta.inject.Singleton
import java.util.UUID

@Singleton
class RecurringExpenseService(
    private val recurringExpenseRepository: RecurringExpenseRepository,
) {
    fun getRecurringExpenses(userId: UUID): List<RecurringExpenseResponse> {
        return recurringExpenseRepository.findByUserId(userId)
            .map { it.toResponse() }
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