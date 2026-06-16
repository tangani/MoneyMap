package com.moneymap.domain.user

import com.moneymap.models.AccountStatus
import com.moneymap.models.AccountType
import com.moneymap.models.CurrencyCode
import io.micronaut.data.annotation.DateCreated
import io.micronaut.data.annotation.Id
import io.micronaut.data.annotation.MappedEntity
import java.time.Instant
import java.util.UUID

@MappedEntity("users")
data class User(
    @field:Id
    val id: UUID,

    var firstName: String,
    var lastName: String,
    var email: String,
    var passwordHash: String,

    val accountType: AccountType = AccountType.PERSONAL,

    var currency: CurrencyCode = CurrencyCode.ZAR,

    var monthlyBudgetCycleDay: Int = 1,

    var notificationsEnabled: Boolean = true,

    var accountStatus: AccountStatus = AccountStatus.ACTIVE,

    var deletionRequested: Boolean = false,

    var deletionRequestedAt: Instant? = null,

    @DateCreated
    val createdAt: Instant? = null
)