package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class BudgetResponse(
    val monthlyIncomeInCents: Long,
    val items: List<BudgetItemResponse>,
    val goal: BudgetGoalResponse
)