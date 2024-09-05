# Použití oficiálního Maven image pro sestavení aplikace
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app

# Zkopírování souborů pro build
COPY pom.xml .
COPY src ./src

# Sestavení aplikace
RUN mvn clean package -DskipTests

# Použití oficiálního OpenJDK image pro spuštění aplikace
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Zkopírování sestaveného jar souboru z předchozího kroku
COPY --from=build /app/target/*.jar app.jar

# Exponování portu, na kterém aplikace běží
EXPOSE 8080

# Příkaz pro spuštění aplikace
CMD ["java", "-jar", "app.jar"]