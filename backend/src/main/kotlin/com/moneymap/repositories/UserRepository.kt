package com.moneymap.repositories

import com.moneymap.domain.user.User
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.CrudRepository
import java.util.UUID

@JdbcRepository(dialect = Dialect.POSTGRES)
interface UserRepository : CrudRepository<User, UUID> {
    fun findByEmail(email: String): User?
}