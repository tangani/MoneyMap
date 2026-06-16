package com.moneymap.models

import io.micronaut.serde.annotation.Serdeable

@Serdeable
data class UpdatePreferenceSettingsRequest(
    val currency: CurrencyCode,
    val monthlyBudgetCycleDay: Int,
    val notificationsEnabled: Boolean
)