FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY gradle.properties .

COPY src src

RUN chmod +x ./gradlew
RUN ./gradlew clean shadowJar --no-daemon


FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/build/libs/*-all.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


#    To build the Docker image, run the following command in the terminal from the directory containing this Dockerfile:
# docker build -t moneymap-backend .

#    To run the container, make sure to replace the database connection details with your actual values.
#    The example below assumes you have a PostgreSQL database running on your host machine and accessible
#    via `host.docker.internal` on port `6543`.

#docker run --rm -p 8080:8080 \
#  -e DATASOURCES_DEFAULT_URL="jdbc:postgresql://host.docker.internal:6543/moneymap" \
#  -e DATASOURCES_DEFAULT_USERNAME="moneymap" \
#  -e DATASOURCES_DEFAULT_PASSWORD="moneymap" \
#  moneymap-backend