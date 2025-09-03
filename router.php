<?php
session_start();
header('Content-Type: application/json');
require_once 'controllers/UtentiController.php';
require_once 'controllers/AzioniController.php';
require_once 'controllers/PortafoglioController.php';

$action = $_GET['action'] ?? null;
if (!$action) {
    header("Location: /");
    exit;
}

try {
    switch ($action) {
        // ==== USER ====
        case 'login':
            UtentiController::login();
            break;
        case 'register':
            UtentiController::register();
            break;
        case 'logout':
            UtentiController::logout();
            break;

        // ==== AZIONI ====
        case 'readAzioni':
            AzioniController::read();
            break;
        case 'readAzioniById':
            AzioniController::readById();
            break;

        // ==== PORTAFOGLIO ====
        case 'readPortafoglio':
            require 'config/auth.php';
            PortafoglioController::read();
            break;
        case 'createPortafoglio':
            require 'config/auth.php';
            PortafoglioController::create();
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Azione non riconosciuta']);
            exit;
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Errore del server: ' . $e->getMessage()]);
    exit;
}
