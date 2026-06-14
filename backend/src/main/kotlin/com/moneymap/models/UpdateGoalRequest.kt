package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal

@Serdeable
data class UpdateGoalRequest(
    val name: String,
    val targetAmount: BigDecimal,
    val currentAmount: BigDecimal
)