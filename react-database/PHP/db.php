<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json");

// Připojení k databázi (zde doporučuji načítat z externího konfiguračního souboru)
$host = 'db.dw184.webglobe.com';
$dbname = 'jiras_web_cz';
$username = 'jiras_web_cz';
$password = 'JiRas8522';

try {
    // Připojení k databázi
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Nastavení chybového režimu na výjimky
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // V produkčním prostředí logujte chyby místo jejich přímého výpisu
    error_log($e->getMessage(), 3, '/path/to/your/log/file.log');
    // Výstup bezpečné zprávy pro uživatele
    echo json_encode(['error' => 'Nepodařilo se připojit k databázi.']);
    exit();
}
?>