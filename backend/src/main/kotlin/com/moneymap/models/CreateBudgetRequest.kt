package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class CreateBudgetRequest(
    val monthlyIncomeInCents: Long,
)