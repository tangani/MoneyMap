package com.moneymap.domain.recurring

import io.micronaut.data.annotation.*
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@MappedEntity("recurring_expenses")
data class RecurringExpense(
    @field:Id
    val id: UUID = UUID.randomUUID(),

    val userId: UUID,
    val name: String,
    val category: String,
    val amountInCents: Long,
    val frequency: String,
    val nextPaymentDate: LocalDate,

    val createdAt: LocalDateTime = LocalDateTime.now()
)
