package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal
import java.util.UUID

@Serdeable
data class CreateBudgetItemRequest(
    val userId: UUID,
    val budgetId: UUID,
    val name: String,
    val category: String,
    val amount: BigDecimal,
)