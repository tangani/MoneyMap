package com.moneymap.repositories

import com.moneymap.domain.budget.BudgetItem
import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository
import java.util.UUID

@Repository
interface BudgetItemRepository : CrudRepository<BudgetItem, UUID> {
    fun findByBudgetId(budgetId: UUID): List<BudgetItem>
}