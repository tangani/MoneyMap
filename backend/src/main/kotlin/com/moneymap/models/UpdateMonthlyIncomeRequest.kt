package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class UpdateMonthlyIncomeRequest(
    val monthlyIncomeInCents: Long,
)
