<?php
require_once 'models/portafoglio.php';

class PortafoglioController
{
    /**
     * Metodo: read
     * Scopo: Restituisce tutte le voci del portafoglio per l'utente loggato
     * Parametri: Nessuno (usa $_SESSION)
     * Ritorno: JSON con esito e dati
     */
    public static function read()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                if (!isset($_SESSION['user_id'])) {
                    echo json_encode(['success' => false, 'message' => 'Utente non autenticato']);
                    exit;
                }
                $utente_id = $_SESSION['user_id'];
                $result = portafoglio::read($utente_id);
                if (!empty($result)) {
                    echo json_encode(['success' => true, 'message' => 'Portafoglio recuperato', 'data' => $result]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Nessuna voce trovata nel portafoglio']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
            }
        } catch (Exception $e) {
            error_log("Errore nel controller: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => "Errore nel controller: " . $e->getMessage()]);
        }
    }

    /**
     * Metodo: create
     * Scopo: Aggiunge una nuova voce al portafoglio
     * Parametri: Nessuno (usa $_POST)
     * Ritorno: JSON con esito e messaggio
     */
    public static function create()
{
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
            return;
        }

        if (!isset($_SESSION['user_id'])) {
            echo json_encode(['success' => false, 'message' => 'Utente non autenticato']);
            return;
        }

        $data = json_decode(file_get_contents("php://input"), true) ?? [];
        $azione_id = $data['azione_id'] ?? null;
        $quantita = $data['quantita'] ?? null;
        $utente_id = $_SESSION['user_id'];

        if (!$azione_id || !$quantita) {
            echo json_encode(['success' => false, 'message' => 'Dati mancanti']);
            return;
        }

        // Fetch the current price from the azioni table
        $azione = azione::readById($azione_id);
        if (empty($azione)) {
            echo json_encode(['success' => false, 'message' => 'Azione non trovata']);
            return;
        }

        $prezzo_acquisto = $azione['prezzo_attuale'];

        // Create the portfolio entry
        $result = portafoglio::create($utente_id, $azione_id, $quantita, $prezzo_acquisto);
        echo json_encode($result);

    } catch (Exception $e) {
        error_log("Errore nel controller: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => "Errore nel controller: " . $e->getMessage()]);
    }
}

    /**
     * Metodo: delete
     * Scopo: Rimuove una voce dal portafoglio
     * Parametri: id (da $_GET)
     * Ritorno: JSON con esito e messaggio
     */
    public static function delete()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
                if (!isset($_SESSION['user_id'])) {
                    echo json_encode(['success' => false, 'message' => 'Utente non autenticato']);
                    exit;
                }
                $data = json_decode(file_get_contents("php://input"), true) ?? [];
                $id = $data['id'] ?? null;
                if (!$id) {
                    echo json_encode(['success' => false, 'message' => 'ID voce non specificato']);
                    exit;
                }
                $result = portafoglio::delete($id);
                echo json_encode($result);
            } else {
                echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
            }
        } catch (Exception $e) {
            error_log("Errore nel controller: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => "Errore nel controller: " . $e->getMessage()]);
        }
    }
}
?>
