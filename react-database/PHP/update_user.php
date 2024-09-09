<?php
// Nastavení CORS hlaviček a typu obsahu
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

// Zahrnutí souboru s připojením k databázi
require 'db.php';

// Získání dat z POST požadavku
$data = json_decode(file_get_contents("php://input"));

$id = $data->id ?? null;
$jmeno = $data->jmeno ?? null;
$prijmeni = $data->prijmeni ?? null;
$email = $data->email ?? null;
$telefon = $data->telefon ?? null;
$aktivni = $data->aktivni ?? 1;

// Kontrola, zda jsou všechna pole vyplněná
if (!empty($id) && !empty($jmeno) && !empty($prijmeni) && !empty($email) && !empty($telefon)) {
    try {
        // SQL dotaz pro aktualizaci uživatele
        $sql = "UPDATE uzivatel SET jmeno = :jmeno, prijmeni = :prijmeni, email = :email, telefon = :telefon, aktivni = :aktivni WHERE id = :id";
        $stmt = $pdo->prepare($sql);

        // Provedení dotazu s parametry
        if ($stmt->execute([
            ':id' => $id,
            ':jmeno' => $jmeno,
            ':prijmeni' => $prijmeni,
            ':email' => $email,
            ':telefon' => $telefon,
            ':aktivni' => $aktivni
        ])) {
            echo json_encode(['message' => 'Uživatel byl úspěšně upraven']);
        } else {
            echo json_encode(['message' => 'Chyba při aktualizaci uživatele']);
        }
    } catch (PDOException $e) {
        // Logování chyby do souboru s chybami
        error_log("Chyba při aktualizaci uživatele: " . $e->getMessage(), 3, '/path/to/php_errors.log');
        echo json_encode(['message' => 'Nastala chyba při aktualizaci uživatele']);
    }
} else {
    echo json_encode(['message' => 'Všechna pole jsou povinná']);
}
?>