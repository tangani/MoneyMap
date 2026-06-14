package com.moneymap.domain.goals

import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import io.micronaut.serde.annotation.Serdeable
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Serdeable
@MappedEntity(value = "goals")
data class Goal(
    @field:Id
    val id: UUID = UUID.randomUUID(),

    val userId: UUID,
    var name: String,
    var targetAmount: BigDecimal,
    var currentAmount: BigDecimal = BigDecimal.ZERO,

    val createdAt: LocalDateTime = LocalDateTime.now(),
    var updatedAt: LocalDateTime = LocalDateTime.now()
)