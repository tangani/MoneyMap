package com.moneymap.services

import com.moneymap.domain.goals.Goal
import com.moneymap.models.CreateGoalRequest
import com.moneymap.models.GoalResponse
import com.moneymap.models.UpdateGoalRequest
import com.moneymap.repositories.GoalRepository
import io.micronaut.http.HttpStatus
import io.micronaut.http.exceptions.HttpStatusException
import jakarta.inject.Singleton
import java.math.BigDecimal
import java.math.RoundingMode
import java.time.LocalDateTime
import java.util.UUID

@Singleton
class GoalService(
    private val goalRepository: GoalRepository
) {
    fun getGoals(userId: UUID): List<GoalResponse> {
        return goalRepository.findByUserId(userId).map { it.toResponse() }
    }

    fun createGoal(userId: UUID, request: CreateGoalRequest): GoalResponse {
        val goal = Goal(
            userId = userId,
            name = request.name,
            targetAmount = request.targetAmount,
            currentAmount = request.currentAmount
        )

        return goalRepository.save(goal).toResponse()
    }

    fun updateGoal(
        userId: UUID,
        goalId: UUID,
        request: UpdateGoalRequest
    ): GoalResponse {
        val goal = goalRepository.findByIdAndUserId(goalId, userId)
            ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "Goal not found")

        goal.name = request.name
        goal.targetAmount = request.targetAmount
        goal.currentAmount = request.currentAmount
        goal.updatedAt = LocalDateTime.now()

        return goalRepository.update(goal).toResponse()
    }

    fun deleteGoal(userId: UUID, goalId: UUID) {
        val goal = goalRepository.findByIdAndUserId(goalId, userId)
            ?: throw HttpStatusException(HttpStatus.NOT_FOUND, "Goal not found")

        goalRepository.delete(goal)
    }

    private fun Goal.toResponse(): GoalResponse {
        val progress = if (targetAmount.compareTo(BigDecimal.ZERO) == 0) {
            0
        } else {
            currentAmount
                .divide(targetAmount, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal("100"))
                .setScale(0, RoundingMode.HALF_UP)
                .toInt()
        }

        return GoalResponse(
            id = id!!,
            name = name,
            targetAmount = targetAmount,
            currentAmount = currentAmount,
            progressPercentage = progress
        )
    }
}