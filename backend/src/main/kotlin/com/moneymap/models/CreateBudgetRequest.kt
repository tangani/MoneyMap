package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal
import java.util.UUID

@Serdeable
data class CreateBudgetRequest(
    val userId: UUID,
    val monthlyIncome: BigDecimal,
)