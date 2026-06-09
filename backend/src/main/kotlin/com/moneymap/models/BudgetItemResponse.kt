package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class BudgetItemResponse(
    val id: String,
    val name: String,
    val amountInCents: Long,
    val category: String,
    val type: String
)