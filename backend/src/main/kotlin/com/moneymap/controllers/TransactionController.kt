package com.moneymap.controllers

import com.moneymap.models.CreateTransactionRequest
import com.moneymap.models.TransactionResponse
import com.moneymap.services.TransactionService
import io.micronaut.http.annotation.*
import io.micronaut.security.authentication.Authentication
import java.util.UUID

@Controller("/api/v1/transactions")
class TransactionController(
    private val transactionService: TransactionService
) {

    @Post
    fun createTransaction(
        authentication: Authentication,
        @Body request: CreateTransactionRequest
    ): TransactionResponse {
        val userId = extractUserId(authentication)

        return transactionService.createTransaction(
            userId = userId,
            request = request
        )
    }

    @Get
    fun getRecentTransactions(
        authentication: Authentication,
        @QueryValue(defaultValue = "5") limit: Int
    ): List<TransactionResponse> {
        val userId = extractUserId(authentication)

        return transactionService.getRecentTransactions(
            userId = userId,
            limit = limit
        )
    }

    private fun extractUserId(authentication: Authentication): UUID {
        return UUID.fromString(authentication.attributes["userId"].toString())
    }
}