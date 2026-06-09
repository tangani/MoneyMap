package com.moneymap.repositories

import com.moneymap.domain.budget.BudgetItem
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.CrudRepository
import java.util.UUID

@JdbcRepository(dialect = Dialect.POSTGRES)
interface BudgetItemRepository : CrudRepository<BudgetItem, UUID> {
    fun findByBudgetId(budgetId: UUID): List<BudgetItem>
}