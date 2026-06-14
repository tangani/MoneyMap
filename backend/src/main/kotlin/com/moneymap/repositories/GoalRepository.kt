package com.moneymap.repositories

import com.moneymap.domain.goals.Goal
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.CrudRepository
import java.util.UUID

@JdbcRepository(dialect = Dialect.POSTGRES)
interface GoalRepository : CrudRepository<Goal, UUID> {
    fun findByUserId(userId: UUID): List<Goal>

    fun findByIdAndUserId(id: UUID, userId: UUID): Goal?
}