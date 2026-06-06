package com.moneymap.domain.user

import java.time.Instant
import java.util.UUID

data class User(
    val id: UUID,
    val firstName: String,
    val lastName: String,
    val email: String,
    val passwordHash: String,
    val createdAt: Instant
)