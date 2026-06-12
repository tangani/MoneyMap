package com.moneymap.controllers

import com.moneymap.models.BudgetResponse
import com.moneymap.models.CreateBudgetGoalRequest
import com.moneymap.models.CreateBudgetItemRequest
import com.moneymap.models.CreateBudgetRequest
import com.moneymap.services.BudgetService
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
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
        val userId = UUID.fromString(
            authentication.attributes["userId"].toString()
        )

        return budgetService.getBudget(userId)
    }

    @Post
    fun createBudget(@Body request: CreateBudgetRequest): BudgetResponse {
        return budgetService.createBudget(request)
    }

    @Post("/items")
    fun addBudgetItem(@Body request: CreateBudgetItemRequest): BudgetResponse {
        return budgetService.addBudgetItem(request)
    }

    @Post("/goal")
    fun setBudgetGoal(@Body request: CreateBudgetGoalRequest): BudgetResponse {
        return budgetService.setBudgetGoal(request)
    }
}