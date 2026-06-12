package com.moneymap.services

import io.micronaut.security.authentication.Authentication
import io.micronaut.security.token.generator.AccessRefreshTokenGenerator
import jakarta.inject.Singleton
import java.util.UUID

@Singleton
class TokenService(
    private val accessRefreshTokenGenerator: AccessRefreshTokenGenerator,
) {
    fun generateToken(userId: UUID, email: String): String {
        val authentication = Authentication.build(
            email,
            mapOf(
                "userId" to userId.toString(),
                "email" to email,
            )
        )

        return accessRefreshTokenGenerator.generate(authentication)
            .orElseThrow { IllegalStateException("Could not generate JWT token") }
            .accessToken
    }
}