<?php
//-----------------------------------------------------------------------------------
/**
 * Classe Portafoglio
 * Gestisce le operazioni sul portafoglio degli utenti
 */
require_once __DIR__ . '/../DataBase.php';

class portafoglio {
    /**
     * Metodo: read
     * Scopo: Restituisce tutte le voci del portafoglio per un utente specifico
     * Parametri:
     *  - int $utente_id: ID dell'utente
     * Ritorno: array associativo contenente le voci del portafoglio oppure array vuoto in caso di errore
     */
    public static function read($utente_id) {
        try {
            $stmt = DataBase::getConnection()->prepare(
                "SELECT * FROM portafoglio WHERE utente_id = ?"
            );
            $stmt->execute([$utente_id]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Errore DB in read: " . $e->getMessage());
            return [];
        }
    }


    /**
     * Metodo: create
     * Scopo: Aggiunge una nuova voce al portafoglio
     * Parametri:
     *  - int $utente_id: ID dell'utente
     *  - int $azione_id: ID dell'azione
     *  - int $quantita: Quantità di azioni
     *  - float $prezzo_acquisto: Prezzo di acquisto per azione
     * Ritorno: array associativo con esito e messaggio
     */
    public static function create($utente_id, $azione_id, $quantita, $prezzo_acquisto) {
        try {
            $stmt = DataBase::getConnection()->prepare(
                "INSERT INTO portafoglio (utente_id, azione_id, quantita, prezzo_acquisto) VALUES (?, ?, ?, ?)"
            );
            $stmt->execute([$utente_id, $azione_id, $quantita, $prezzo_acquisto]);
            return ["success" => true, "message" => "Voce aggiunta al portafoglio con successo"];
        } catch (PDOException $e) {
            error_log("Errore DB in create: " . $e->getMessage());
            return ["success" => false, "message" => "Errore DB in create: " . $e->getMessage()];
        }
    }

    /**
     * Metodo: delete
     * Scopo: Rimuove una voce dal portafoglio
     * Parametri:
     *  - int $id: ID della voce del portafoglio
     * Ritorno: array associativo con esito e messaggio
     */
    public static function delete($id) {
        try {
            $stmt = DataBase::getConnection()->prepare(
                "DELETE FROM portafoglio WHERE id = ?"
            );
            $stmt->execute([$id]);
            return ["success" => true, "message" => "Voce rimossa dal portafoglio con successo"];
        } catch (PDOException $e) {
            error_log("Errore DB in delete: " . $e->getMessage());
            return ["success" => false, "message" => "Errore DB in delete: " . $e->getMessage()];
        }
    }
}
?>
