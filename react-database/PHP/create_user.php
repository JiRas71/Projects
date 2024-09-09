<?php
// Nastavení CORS hlaviček a typu obsahu
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

// Pro vývojové prostředí můžete mít zapnuté chyby, pro produkci je vypněte
ini_set('display_errors', 0); // Pro produkci
ini_set('display_startup_errors', 0); // Pro produkci
error_reporting(0); // Pro produkci

// Připojení k databázi (soubor db.php musí obsahovat $pdo pro připojení)
require 'db.php';

// Získání dat z POST požadavku
$data = json_decode(file_get_contents("php://input"));

$jmeno = $data->jmeno ?? null;
$prijmeni = $data->prijmeni ?? null;
$email = $data->email ?? null;
$telefon = $data->telefon ?? null;
$aktivni = 1; // Vždy nastaveno na aktivní

// Validace vstupu
if (empty($jmeno) || empty($prijmeni) || empty($email) || empty($telefon)) {
    echo json_encode(['message' => 'Všechna pole jsou povinná']);
    exit();
}

// Validace e-mailu
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['message' => 'Neplatný formát e-mailu']);
    exit();
}

try {
    // SQL dotaz pro vložení uživatele a aktuálního data
    $sql = "INSERT INTO uzivatel (jmeno, prijmeni, email, telefon, aktivni, vytvoren) 
            VALUES (:jmeno, :prijmeni, :email, :telefon, :aktivni, NOW())";
    
    $stmt = $pdo->prepare($sql);

    // Provedení dotazu s parametry
    $stmt->execute([
        ':jmeno' => $jmeno,
        ':prijmeni' => $prijmeni,
        ':email' => $email,
        ':telefon' => $telefon,
        ':aktivni' => $aktivni
    ]);

    // Pokud byl uživatel úspěšně vytvořen
    echo json_encode(['message' => 'Uživatel byl úspěšně vytvořen']);
} catch (PDOException $e) {
    // Logování chyb v produkci (soubor logů může být např. na cestě /var/log/php_errors.log)
    error_log("Chyba při vkládání uživatele: " . $e->getMessage(), 3, '/path/to/php_errors.log');
    
    // Odpověď pro uživatele, že došlo k chybě
    echo json_encode(['message' => 'Chyba při vkládání uživatele']);
}
?>