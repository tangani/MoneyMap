package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class CreateBudgetItemRequest(
    val name: String,
    val category: String,
    val type: String,
    val amountInCents: Long,
)