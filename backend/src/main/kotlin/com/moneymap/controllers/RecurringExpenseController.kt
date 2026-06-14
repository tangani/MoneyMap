package com.moneymap.controllers

import com.moneymap.models.CreateRecurringExpenseRequest
import com.moneymap.models.RecurringExpenseResponse
import com.moneymap.models.UpdateRecurringExpenseRequest
import com.moneymap.services.RecurringExpenseService
import io.micronaut.http.annotation.*
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule
import java.util.UUID

@Controller("/api/v1/recurring-expenses")
@Secured(SecurityRule.IS_AUTHENTICATED)
class RecurringExpenseController(
    private val recurringExpenseService: RecurringExpenseService,
) {
    private fun getUserId(authentication: Authentication): UUID {
        return UUID.fromString(authentication.attributes["userId"].toString())
    }

    @Get
    fun getRecurringExpenses(authentication: Authentication): List<RecurringExpenseResponse> {
        val userId = getUserId(authentication)
        return recurringExpenseService.getRecurringExpenses(userId)
    }

    @Post
    fun createRecurringExpense(
        authentication: Authentication,
        @Body request: CreateRecurringExpenseRequest,
    ): RecurringExpenseResponse {
        val userId = getUserId(authentication)
        return recurringExpenseService.createRecurringExpense(userId, request)
    }

    @Put("/{expenseId}")
    fun updateRecurringExpense(
        authentication: Authentication,
        expenseId: UUID,
        @Body request: UpdateRecurringExpenseRequest,
    ): List<RecurringExpenseResponse> {
        val userId = getUserId(authentication)
        return recurringExpenseService.updateRecurringExpense(userId, expenseId, request)
    }

    @Delete("/{expenseId}")
    fun deleteRecurringExpense(
        authentication: Authentication,
        expenseId: UUID,
    ): List<RecurringExpenseResponse> {
        val userId = getUserId(authentication)
        return recurringExpenseService.deleteRecurringExpense(userId, expenseId)
    }
}