package com.moneymap.services

import com.moneymap.domain.transactions.Transaction
import com.moneymap.domain.transactions.TransactionSource
import com.moneymap.models.CreateTransactionRequest
import com.moneymap.models.TransactionResponse
import com.moneymap.repositories.TransactionRepository
import jakarta.inject.Singleton
import java.time.LocalDateTime
import java.util.UUID

@Singleton
class TransactionService(
    private val transactionRepository: TransactionRepository
) {

    fun createTransaction(
        userId: UUID,
        request: CreateTransactionRequest
    ): TransactionResponse {
        val transaction = Transaction(
            userId = userId,
            description = request.description,
            category = request.category,
            amountInCents = request.amountInCents,
            type = request.type,
            source = TransactionSource.MANUAL,
            transactionDate = request.transactionDate
        )

        return transactionRepository.save(transaction).toResponse()
    }

    fun getRecentTransactions(
        userId: UUID,
        limit: Int = 5
    ): List<TransactionResponse> {
        return transactionRepository
            .findByUserIdOrderByTransactionDateDesc(userId)
            .take(limit)
            .map { it.toResponse() }
    }

    private fun Transaction.toResponse(): TransactionResponse {
        return TransactionResponse(
            id = this.id,
            description = this.description,
            category = this.category,
            amountInCents = this.amountInCents,
            type = this.type,
            source = this.source,
            transactionDate = this.transactionDate,
            createdAt = this.createdAt
        )
    }
}