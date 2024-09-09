<?php
// Nastavení CORS hlaviček a typu obsahu
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

// Zahrnutí připojení k databázi
require 'db.php';

try {
    // SQL dotaz na všechny uživatele - můžeš specifikovat konkrétní sloupce pro optimalizaci
    $sql = "SELECT id, jmeno, prijmeni, email, telefon, aktivni, vytvoren FROM uzivatel";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($users) {
        // Vracení pole všech uživatelů jako JSON
        echo json_encode($users);
    } else {
        // Odpověď, pokud nebyli nalezeni žádní uživatelé
        echo json_encode(['message' => 'Žádní uživatelé nebyli nalezeni']);
    }
} catch (PDOException $e) {
    // Zpracování a logování chyb
    error_log("Chyba při načítání uživatelů: " . $e->getMessage(), 3, '/path/to/php_errors.log');
    echo json_encode(['message' => 'Chyba při načítání uživatelů']);
}
?>