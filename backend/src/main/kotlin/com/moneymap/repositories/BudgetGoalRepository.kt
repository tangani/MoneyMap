package com.moneymap.repositories

import com.moneymap.domain.budget.BudgetGoal
import io.micronaut.data.annotation.Repository
import io.micronaut.data.repository.CrudRepository
import java.util.UUID

@Repository
interface BudgetGoalRepository : CrudRepository<BudgetGoal, UUID> {
    fun findByBudgetId(budgetId: UUID): BudgetGoal?
}