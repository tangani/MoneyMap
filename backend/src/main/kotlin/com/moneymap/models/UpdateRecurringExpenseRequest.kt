package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.time.LocalDate

@Serdeable
data class UpdateRecurringExpenseRequest(
    val name: String,
    val category: String,
    val amountInCents: Long,
    val frequency: String,
    val nextPaymentDate: LocalDate,
)