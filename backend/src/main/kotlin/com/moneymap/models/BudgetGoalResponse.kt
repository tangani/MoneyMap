package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class BudgetGoalResponse(
    val id: String,
    val name: String,
    val targetAmountInCents: Long,
    val currentAmountInCents: Long,
    val monthlyContributionInCents: Long
)