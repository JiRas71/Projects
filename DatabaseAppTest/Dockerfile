# Použití oficiálního Maven image pro sestavení aplikace
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /app

# Zkopírování pom.xml a stažení závislostí před kopírováním zdrojového kódu
COPY pom.xml .
RUN mvn dependency:go-offline

# Zkopírování zdrojového kódu a sestavení aplikace
COPY src ./src
RUN mvn clean package -DskipTests