package com.moneymap.repositories

import com.moneymap.domain.budget.BudgetGoal
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.CrudRepository
import java.util.UUID

@JdbcRepository(dialect = Dialect.POSTGRES)
interface BudgetGoalRepository : CrudRepository<BudgetGoal, UUID> {
    fun findByBudgetId(budgetId: UUID): BudgetGoal?
}