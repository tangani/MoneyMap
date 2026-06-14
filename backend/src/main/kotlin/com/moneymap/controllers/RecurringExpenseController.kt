package com.moneymap.controllers

import com.moneymap.models.CreateRecurringExpenseRequest
import com.moneymap.models.RecurringExpenseResponse
import com.moneymap.services.RecurringExpenseService
import io.micronaut.http.annotation.*
import io.micronaut.security.authentication.Authentication
import java.util.UUID

@Controller("/api/v1/recurring-expenses")
class RecurringExpenseController(
    private val recurringExpenseService: RecurringExpenseService,
) {
    @Get
    fun getRecurringExpenses(authentication: Authentication): List<RecurringExpenseResponse> {
        val userId = UUID.fromString(authentication.attributes["userId"].toString())
        return recurringExpenseService.getRecurringExpenses(userId)
    }

    @Post
    fun createRecurringExpense(
        authentication: Authentication,
        @Body request: CreateRecurringExpenseRequest,
    ): RecurringExpenseResponse {
        val userId = UUID.fromString(authentication.attributes["userId"].toString())
        return recurringExpenseService.createRecurringExpense(userId, request)
    }
}