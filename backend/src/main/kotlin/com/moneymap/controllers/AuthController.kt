package com.moneymap.controllers

import com.moneymap.models.AuthResponse
import com.moneymap.models.LoginRequest
import com.moneymap.models.SignupRequest
import com.moneymap.services.AuthService
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Post

@Controller("/api/v1/auth")
class AuthController(
    private val authService: AuthService
) {

    @Post("/signup")
    fun signup(@Body request: SignupRequest): AuthResponse {
        return authService.signup(request)
    }

    @Post("/login")
    fun login(@Body request: LoginRequest): AuthResponse {
        return authService.login(request)
    }
}