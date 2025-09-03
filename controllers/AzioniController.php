<?php
require_once 'models/azione.php';
class AzioniController {
    public static function read() {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $result = azione::read();
                echo json_encode(["success" => true, "data" => $result]);
            } else {
                echo json_encode(["success" => false, "message" => "Metodo non consentito"]);
            }
        } catch (Exception $e) {
            error_log("Errore nel controller: " . $e->getMessage());
            echo json_encode(["success" => false, "message" => "Errore nel controller: " . $e->getMessage()]);
        }
    }

    public static function readById() {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $id = $_GET['id'] ?? null;
                if (!$id) {
                    echo json_encode(["success" => false, "message" => "ID non specificato"]);
                    return;
                }
                $result = azione::readById($id);
                if (!empty($result)) {
                    azione::update($id);
                    $result = azione::readById($id);
                    echo json_encode(["success" => true, "data" => $result]);
                } else {
                    echo json_encode(["success" => false, "message" => "Azione non trovata"]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Metodo non consentito"]);
            }
        } catch (Exception $e) {
            error_log("Errore nel controller: " . $e->getMessage());
            echo json_encode(["success" => false, "message" => "Errore nel controller: " . $e->getMessage()]);
        }
    }
}
?>
