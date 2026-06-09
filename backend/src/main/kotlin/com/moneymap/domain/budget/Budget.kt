package com.moneymap.domain.budget

import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Serdeable
@MappedEntity("budgets")
data class Budget(
    @field:Id
    val id: UUID,
    val userId: UUID,
    val monthlyIncome: BigDecimal,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
)