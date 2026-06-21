package com.moneymap.models

import com.moneymap.domain.transactions.TransactionType
import io.micronaut.serde.annotation.Serdeable
import java.time.LocalDate

@Serdeable
data class CreateTransactionRequest(
    val description: String,
    val category: String?,
    val amountInCents: Long,
    val type: TransactionType,
    val transactionDate: LocalDate
)