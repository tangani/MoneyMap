package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class SettingsResponse(
    val profile: ProfileSettingsResponse,
    val preferences: PreferenceSettingsResponse,
    val account: AccountSettingsResponse
)

@Serdeable
data class ProfileSettingsResponse(
    val firstName: String,
    val lastName: String,
    val fullName: String,
    val email: String,
    val accountType: AccountType
)

@Serdeable
data class PreferenceSettingsResponse(
    val currency: CurrencyCode,
    val monthlyBudgetCycleDay: Int,
    val notificationsEnabled: Boolean
)

@Serdeable
data class AccountSettingsResponse(
    val accountStatus: AccountStatus,
    val deletionRequested: Boolean
)