package com.moneymap.domain.user

import io.micronaut.data.annotation.DateCreated
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import java.time.Instant
import java.util.UUID

@MappedEntity("users")
data class User(
    @field:Id
    val id: UUID,

    val firstName: String,
    val lastName: String,
    val email: String,
    val passwordHash: String,

    @DateCreated
    val createdAt: Instant? = null
)