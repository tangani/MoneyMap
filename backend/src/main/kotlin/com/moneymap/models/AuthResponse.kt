package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable
import java.util.UUID

@Serdeable
data class AuthResponse(
    val userId: UUID,
    val firstName: String,
    val lastName: String,
    val email: String,
    val message: String
)