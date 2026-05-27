package com.moneymap.health

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/api/v1/health")
class HealthController {

    @Get
    fun health(): Map<String, String> {
        return mapOf(
            "status" to "UP"
        )
    }
}



