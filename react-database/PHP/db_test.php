<?php
// Nastavení správných hlaviček
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json"); // Pokud chcete vrátit JSON odpověď

require 'db.php';

// Kontrola připojení k databázi
if ($pdo) {
    // Vracení zprávy ve formátu JSON
    echo json_encode(['message' => 'Připojení k databázi bylo úspěšné.']);
} else {
    echo json_encode(['message' => 'Připojení k databázi selhalo.']);
}
?>