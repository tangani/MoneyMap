package com.moneymap.domain.budget

import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Serdeable
@MappedEntity("budget_goals")
data class BudgetGoal(
    @field:Id
    val id: UUID,
    val budgetId: UUID,
    val name: String,
    val targetAmount: BigDecimal,
    val monthlyContribution: BigDecimal,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)