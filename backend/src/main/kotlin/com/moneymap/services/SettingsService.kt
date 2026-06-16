package com.moneymap.services

import com.moneymap.models.AccountStatus
import com.moneymap.models.AccountSettingsResponse
import com.moneymap.models.ChangePasswordRequest
import com.moneymap.models.PreferenceSettingsResponse
import com.moneymap.models.ProfileSettingsResponse
import com.moneymap.models.SettingsResponse
import com.moneymap.models.UpdatePreferenceSettingsRequest
import com.moneymap.models.UpdateProfileSettingsRequest
import com.moneymap.repositories.UserRepository
import com.moneymap.domain.user.User
import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import jakarta.inject.Singleton
import org.mindrot.jbcrypt.BCrypt
import java.time.Instant
import java.util.UUID

@Singleton
class SettingsService(
    private val userRepository: UserRepository
) {
    fun getSettings(userId: UUID): SettingsResponse {
        val user = findUser(userId)
        return user.toSettingsResponse()
    }

    fun updateProfile(
        userId: UUID,
        request: UpdateProfileSettingsRequest
    ): SettingsResponse {
        val user = findUser(userId)

        var firstName = request.firstName.trim()
        var lastName = request.lastName.trim()
        var email = request.email.trim().lowercase()

        if (firstName.isBlank()) {
            throw HttpStatusException(HttpStatus.BAD_REQUEST, "First name is required.")
        }

        if (lastName.isBlank()) {
            throw HttpStatusException(HttpStatus.BAD_REQUEST, "Last name is required.")
        }

        if (email.isBlank()) {
            throw HttpStatusException(HttpStatus.BAD_REQUEST, "Email is required.")
        }

        if (email != user.email.lowercase() && userRepository.existsByEmail(email)) {
            throw HttpStatusException(HttpStatus.CONFLICT, "Email is already in use.")
        }

        user.firstName = firstName
        user.lastName = lastName
        user.email = email

        val updatedUser = userRepository.update(user)
        return updatedUser.toSettingsResponse()
    }

    fun updatePreferences(
        userId: UUID,
        request: UpdatePreferenceSettingsRequest
    ): SettingsResponse {
        val user = findUser(userId)

        if (request.monthlyBudgetCycleDay !in 1..28) {
            throw HttpStatusException(
                HttpStatus.BAD_REQUEST,
                "Monthly budget cycle day must be between 1 and 28."
            )
        }

        user.currency = request.currency
        user.monthlyBudgetCycleDay = request.monthlyBudgetCycleDay
        user.notificationsEnabled = request.notificationsEnabled

        val updatedUser = userRepository.update(user)
        return updatedUser.toSettingsResponse()
    }

    fun changePassword(
        userId: UUID,
        request: ChangePasswordRequest
    ) {
        val user = findUser(userId)

        if (request.currentPassword.isBlank()) {
            throw HttpStatusException(HttpStatus.BAD_REQUEST, "Current password is required.")
        }

        if (request.newPassword.length < 8) {
            throw HttpStatusException(
                HttpStatus.BAD_REQUEST,
                "New password must be at least 8 characters."
            )
        }

        val passwordMatches = BCrypt.checkpw(request.currentPassword, user.passwordHash)

        if (!passwordMatches) {
            throw HttpStatusException(HttpStatus.BAD_REQUEST, "Current password is incorrect.")
        }

        user.passwordHash = BCrypt.hashpw(request.newPassword, BCrypt.gensalt())
        userRepository.update(user)
    }

    fun requestAccountDeletion(userId: UUID): SettingsResponse {
        val user = findUser(userId)

        user.accountStatus = AccountStatus.DELETION_REQUESTED
        user.deletionRequested = true
        user.deletionRequestedAt = Instant.now()

        val updatedUser = userRepository.update(user)
        return updatedUser.toSettingsResponse()
    }

    private fun findUser(userId: UUID) =
        userRepository.findById(userId).orElseThrow {
            HttpStatusException(HttpStatus.NOT_FOUND, "User not found.")
        }

    private fun User.toSettingsResponse(): SettingsResponse {
        return SettingsResponse(
            profile = ProfileSettingsResponse(
                firstName = firstName,
                lastName = lastName,
                fullName = "$firstName $lastName",
                email = email,
                accountType = accountType
            ),
            preferences = PreferenceSettingsResponse(
                currency = currency,
                monthlyBudgetCycleDay = monthlyBudgetCycleDay,
                notificationsEnabled = notificationsEnabled
            ),
            account = AccountSettingsResponse(
                accountStatus = accountStatus,
                deletionRequested = deletionRequested
            )
        )
    }
}