package com.moneymap.models

import com.moneymap.domain.transactions.TransactionSource
import com.moneymap.domain.transactions.TransactionType
import io.micronaut.serde.annotation.Serdeable
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@Serdeable
data class TransactionResponse(
    val id: UUID,
    val description: String,
    val category: String?,
    val amountInCents: Long,
    val type: TransactionType,
    val source: TransactionSource,
    val transactionDate: LocalDate,
    val createdAt: LocalDateTime
)