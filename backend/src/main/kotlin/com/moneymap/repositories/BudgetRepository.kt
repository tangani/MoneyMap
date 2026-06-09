package com.moneymap.repositories

import com.moneymap.domain.budget.Budget
import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository
import java.util.UUID

@Repository
interface BudgetRepository : CrudRepository<Budget, UUID> {
    fun findByUserId(userId: UUID): Budget?
}