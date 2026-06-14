package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.time.LocalDate
import java.util.UUID

@Serdeable
data class RecurringExpenseResponse(
    val id: UUID,
    val name: String,
    val category: String,
    val amountInCents: Long,
    val frequency: String,
    val nextPaymentDate: LocalDate,
)

@Serdeable
data class CreateRecurringExpenseRequest(
    val name: String,
    val category: String,
    val amountInCents: Long,
    val frequency: String,
    val nextPaymentDate: LocalDate,
)