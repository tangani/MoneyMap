package com.moneymap.domain.budget

import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Serdeable
@MappedEntity("budget_items")
data class BudgetItem(
    @field:Id
    val id: UUID,
    val budgetId: UUID,
    val name: String,
    val category: String,
    val amount: BigDecimal,
    val type: String = "EXPENSE",
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)