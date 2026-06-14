package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class UpdateBudgetGoalRequest(
    val name: String,
    val targetAmountInCents: Long,
    val monthlyContributionInCents: Long,
)