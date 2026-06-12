package com.moneymap.controllers

import com.moneymap.models.BudgetResponse
import com.moneymap.models.CreateBudgetGoalRequest
import com.moneymap.models.CreateBudgetItemRequest
import com.moneymap.models.CreateBudgetRequest
import com.moneymap.models.UpdateMonthlyIncomeRequest
import com.moneymap.services.BudgetService
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.Put
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule
import java.util.UUID

@Controller("/api/v1/budget")
@Secured(SecurityRule.IS_AUTHENTICATED)
class BudgetController(
    private val budgetService: BudgetService,
) {
    @Get
    fun getBudget(authentication: Authentication): BudgetResponse {
        val userId = getUserId(authentication)

        return budgetService.getBudget(userId)
    }

    @Post
    fun createBudget(
        authentication: Authentication,
        @Body request: CreateBudgetRequest,
    ): BudgetResponse {
        val userId = getUserId(authentication)

        return budgetService.createBudget(userId, request)
    }

    @Put("/income")
    fun updateMonthlyIncome(
        authentication: Authentication,
        @Body request: UpdateMonthlyIncomeRequest,
    ): BudgetResponse {
        val userId = getUserId(authentication)

        return budgetService.updateMonthlyIncome(userId, request)
    }

    @Post("/items")
    fun addBudgetItem(
        authentication: Authentication,
        @Body request: CreateBudgetItemRequest,
    ): BudgetResponse {
        val userId = getUserId(authentication)

        return budgetService.addBudgetItem(userId, request)
    }

    @Put("/goal")
    fun setBudgetGoal(
        authentication: Authentication,
        @Body request: CreateBudgetGoalRequest,
    ): BudgetResponse {
        val userId = getUserId(authentication)

        return budgetService.setBudgetGoal(userId, request)
    }

    private fun getUserId(authentication: Authentication): UUID {
        return UUID.fromString(authentication.attributes["userId"].toString())
    }
}