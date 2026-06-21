package com.moneymap.domain.transactions

import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import io.micronaut.serde.annotation.Serdeable
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@Serdeable
@MappedEntity(value = "transactions")
data class Transaction(
    @field:Id
    val id: UUID = UUID.randomUUID(),

    val userId: UUID,
    var description: String,
    var category: String? = null,
    var amountInCents: Long,
    var type: TransactionType,
    var source: TransactionSource = TransactionSource.MANUAL,
    var transactionDate: LocalDate,

    val createdAt: LocalDateTime = LocalDateTime.now(),
    var updatedAt: LocalDateTime = LocalDateTime.now()
)