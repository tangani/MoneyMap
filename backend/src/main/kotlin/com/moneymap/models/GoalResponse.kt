package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal
import java.util.UUID

@Serdeable
data class GoalResponse(
    val id: UUID,
    val name: String,
    val targetAmount: BigDecimal,
    val currentAmount: BigDecimal,
    val progressPercentage: Int
)