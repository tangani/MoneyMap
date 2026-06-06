package com.moneymap.repositories

import com.moneymap.domain.user.User
import jakarta.inject.Singleton
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

@Singleton
class InMemoryUserRepository {

    private val users = ConcurrentHashMap<UUID, User>()

    fun save(user: User): User {
        users[user.id] = user
        return user
    }

    fun findByEmail(email: String): User? {
        return users.values.firstOrNull {
            it.email.equals(email, ignoreCase = true)
        }
    }
}