<?php
// Nastavení CORS hlaviček a typu obsahu
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

// Zahrnutí připojení k databázi
require 'db.php';

// Získání dat z POST požadavku
$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? null;

// Validace ID
if (empty($id) || !is_numeric($id) || $id <= 0) {
    echo json_encode(['message' => 'ID uživatele je povinné a musí být platné číslo']);
    exit();
}

try {
    // Ověření, že uživatel s daným ID existuje
    $checkSql = "SELECT id FROM uzivatel WHERE id = :id";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([':id' => $id]);
    $userExists = $checkStmt->fetch();

    if ($userExists) {
        // SQL dotaz pro smazání uživatele
        $sql = "DELETE FROM uzivatel WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id' => $id]);

        echo json_encode(['message' => 'Uživatel byl úspěšně odstraněn']);
    } else {
        echo json_encode(['message' => 'Uživatel s tímto ID neexistuje']);
    }
} catch (PDOException $e) {
    // Logování chyb pro vývojové účely
    error_log("Chyba při mazání uživatele: " . $e->getMessage(), 3, '/path/to/php_errors.log');
    
    // Odpověď o chybě
    echo json_encode(['message' => 'Chyba při mazání uživatele']);
}
?>