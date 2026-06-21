package com.moneymap.repositories

import com.moneymap.domain.transactions.Transaction
import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository
import java.util.UUID

@Repository
interface TransactionRepository : CrudRepository<Transaction, UUID> {

    fun findByUserIdOrderByTransactionDateDescCreatedAtDesc(
        userId: UUID
    ): List<Transaction>
}
