package com.moneymap.services

import com.moneymap.domain.user.User
import com.moneymap.models.AuthResponse
import com.moneymap.models.LoginRequest
import com.moneymap.models.SignupRequest
import com.moneymap.repositories.InMemoryUserRepository
import jakarta.inject.Singleton
import java.time.Instant
import java.util.UUID

@Singleton
class AuthService(
    private val userRepository: InMemoryUserRepository
) {

    fun signup(request: SignupRequest): AuthResponse {
        val existingUser = userRepository.findByEmail(request.email)

        if (existingUser != null) {
            throw IllegalArgumentException("User with email already exists")
        }

        val user = User(
            id = UUID.randomUUID(),
            firstName = request.firstName,
            lastName = request.lastName,
            email = request.email,
            passwordHash = request.passwordHash, // temporary: hash this later
            createdAt = Instant.now()
        )

        val savedUser = userRepository.save(user)

        return AuthResponse(
            userId = savedUser.id,
            firstName = savedUser.firstName,
            lastName = savedUser.lastName,
            email = savedUser.email,
            message = "Signup successful"
        )
    }

    fun login(request: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(request.email)
            ?: throw IllegalArgumentException("Invalid email or password")

        if (user.passwordHash != request.password) {
            throw IllegalArgumentException("Invalid email or password")
        }

        return AuthResponse(
            userId = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            message = "Login successful"
        )
    }
}