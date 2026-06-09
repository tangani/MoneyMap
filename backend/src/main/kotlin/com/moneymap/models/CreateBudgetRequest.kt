package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal

@Serdeable
data class CreateBudgetRequest(
    val monthlyIncome: BigDecimal,
)