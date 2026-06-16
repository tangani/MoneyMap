package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class UpdateProfileSettingsRequest(
    val firstName: String,
    val lastName: String,
    val email: String
)