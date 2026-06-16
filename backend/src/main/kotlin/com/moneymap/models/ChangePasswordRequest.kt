package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class ChangePasswordRequest(
    val currentPassword: String,
    val newPassword: String
)