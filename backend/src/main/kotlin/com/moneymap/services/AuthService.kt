package com.moneymap.services

import com.moneymap.domain.user.User
import com.moneymap.models.AuthResponse
import com.moneymap.models.LoginRequest
import com.moneymap.models.SignupRequest
import com.moneymap.repositories.UserRepository
import jakarta.inject.Singleton
import java.time.Instant
import java.util.UUID
import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import org.mindrot.jbcrypt.BCrypt

@Singleton
class AuthService(
    private val userRepository: UserRepository,
    private val tokenService: TokenService,
) {

    fun signup(request: SignupRequest): AuthResponse {
        val existingUser = userRepository.findByEmail(request.email)

        if (existingUser != null) {
            throw HttpStatusException(
                HttpStatus.CONFLICT,
                "User with email already exists"
            )
        }

        val user = User(
            id = UUID.randomUUID(),
            firstName = request.firstName,
            lastName = request.lastName,
            email = request.email,
            passwordHash = BCrypt.hashpw(
                request.password,
                BCrypt.gensalt()
            ),
            createdAt = Instant.now()
        )

        val savedUser = userRepository.save(user)

        return AuthResponse(
            userId = savedUser.id,
            firstName = savedUser.firstName,
            lastName = savedUser.lastName,
            email = savedUser.email,
            token = tokenService.generateToken(savedUser.id, savedUser.email),
            message = "Signup successful"
        )
    }

    fun login(request: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(request.email)
            ?: throw HttpStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            )

        if (!BCrypt.checkpw(
                request.password,
                user.passwordHash
            )) {
            throw HttpStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            )
        }

        return AuthResponse(
            userId = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            token = tokenService.generateToken(user.id, user.email),
            message = "Login successful"
        )

    }
}