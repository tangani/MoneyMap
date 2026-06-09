package com.moneymap.controllers

import com.moneymap.models.BudgetResponse
import com.moneymap.services.BudgetService
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/api/v1/budget")
class BudgetController(
    private val budgetService: BudgetService
) {

    @Get
    fun getBudget(): BudgetResponse {
        return budgetService.getBudget()
    }
}