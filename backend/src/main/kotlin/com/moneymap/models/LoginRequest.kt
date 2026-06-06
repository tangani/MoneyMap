package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class LoginRequest(
    val email: String,
    val password: String
)