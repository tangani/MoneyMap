package com.moneymap.controllers

import com.moneymap.models.CreateGoalRequest
import com.moneymap.models.GoalResponse
import com.moneymap.models.UpdateGoalRequest
import com.moneymap.services.GoalService
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.*
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule
import java.util.UUID

@Secured(SecurityRule.IS_AUTHENTICATED)
@Controller("/api/v1/goals")
class GoalController(
    private val goalService: GoalService
) {
    @Get
    fun getGoals(authentication: Authentication): List<GoalResponse> {
        val userId = UUID.fromString(authentication.attributes["userId"].toString())
        return goalService.getGoals(userId)
    }

    @Post
    fun createGoal(
        authentication: Authentication,
        @Body request: CreateGoalRequest
    ): GoalResponse {
        val userId = UUID.fromString(authentication.attributes["userId"].toString())
        return goalService.createGoal(userId, request)
    }

    @Put("/{goalId}")
    fun updateGoal(
        authentication: Authentication,
        goalId: UUID,
        @Body request: UpdateGoalRequest
    ): GoalResponse {
        val userId = UUID.fromString(authentication.attributes["userId"].toString())
        return goalService.updateGoal(userId, goalId, request)
    }

    @Delete("/{goalId}")
    fun deleteGoal(
        authentication: Authentication,
        goalId: UUID
    ): HttpResponse<Any> {
        val userId = UUID.fromString(authentication.attributes["userId"].toString())
        goalService.deleteGoal(userId, goalId)
        return HttpResponse.noContent()
    }
}