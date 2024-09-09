<?php
// Nastavení CORS hlaviček a typu obsahu
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

// Zahrnutí připojení k databázi
require 'db.php';

// Zkontrolovat, zda je v URL přítomný parametr 'id'
if (isset($_GET['id']) && is_numeric($_GET['id']) && $_GET['id'] > 0) {
    $id = (int)$_GET['id']; // Ověření, že ID je celé číslo

    try {
        // SQL dotaz na uživatele s daným ID
        $sql = "SELECT * FROM uzivatel WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode($user);
        } else {
            // Odpověď, pokud uživatel nebyl nalezen
            echo json_encode(['message' => 'Uživatel nebyl nalezen']);
        }
    } catch (PDOException $e) {
        // Logování chyb a odpověď při chybě databáze
        error_log("Chyba při získávání uživatele: " . $e->getMessage(), 3, '/path/to/php_errors.log');
        echo json_encode(['message' => 'Chyba při získávání uživatele']);
    }
} else {
    // Odpověď, pokud není ID nebo je neplatné
    echo json_encode(['message' => 'ID uživatele je povinné a musí být platné číslo']);
}
?>