package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal
import java.util.UUID

@Serdeable
data class CreateBudgetGoalRequest(
    val userId: UUID,
    val name: String,
    val targetAmount: BigDecimal,
    val monthlyContribution: BigDecimal,
)