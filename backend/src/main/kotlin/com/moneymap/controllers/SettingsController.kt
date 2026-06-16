package com.moneymap.controllers

import com.moneymap.models.ChangePasswordRequest
import com.moneymap.models.SettingsResponse
import com.moneymap.models.UpdatePreferenceSettingsRequest
import com.moneymap.models.UpdateProfileSettingsRequest
import com.moneymap.services.SettingsService
import io.micronaut.http.HttpStatus
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.Put
import io.micronaut.http.annotation.Status
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule
import java.util.UUID

@Controller("/api/v1/settings")
@Secured(SecurityRule.IS_AUTHENTICATED)
class SettingsController(
    private val settingsService: SettingsService
) {
    @Get
    fun getSettings(authentication: Authentication): SettingsResponse {
        return settingsService.getSettings(authentication.userId())
    }

    @Put("/profile")
    fun updateProfile(
        authentication: Authentication,
        @Body request: UpdateProfileSettingsRequest
    ): SettingsResponse {
        return settingsService.updateProfile(authentication.userId(), request)
    }

    @Put("/preferences")
    fun updatePreferences(
        authentication: Authentication,
        @Body request: UpdatePreferenceSettingsRequest
    ): SettingsResponse {
        return settingsService.updatePreferences(authentication.userId(), request)
    }

    @Put("/password")
    @Status(HttpStatus.NO_CONTENT)
    fun changePassword(
        authentication: Authentication,
        @Body request: ChangePasswordRequest
    ) {
        settingsService.changePassword(authentication.userId(), request)
    }

    @Post("/delete-request")
    fun requestAccountDeletion(authentication: Authentication): SettingsResponse {
        return settingsService.requestAccountDeletion(authentication.userId())
    }

    private fun Authentication.userId(): UUID {
        return UUID.fromString(attributes["userId"].toString())
    }
}