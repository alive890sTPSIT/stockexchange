<?php
require_once __DIR__ . '/../DataBase.php';

class azione {
    public static function read() {
        try {
            $stmt = DataBase::getConnection()->prepare("SELECT * FROM azioni");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Errore DB in read: " . $e->getMessage());
            return [];
        }
    }

    public static function readById($id) {
        try {
            $stmt = DataBase::getConnection()->prepare("SELECT * FROM azioni WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Errore DB in readById: " . $e->getMessage());
            return [];
        }
    }

    public static function update($id) {
        try {
            $current = self::readById($id);
            if (empty($current)) {
                return ["success" => false, "message" => "Azione non trovata"];
            }

            $maxChangePercent = 5;
            $randomChange = (mt_rand(-$maxChangePercent * 100, $maxChangePercent * 100) / 100);
            $newPrice = $current['prezzo_attuale'] * (1 + $randomChange / 100);
            $newVariazionePercentuale = $randomChange;

            $stmt = DataBase::getConnection()->prepare(
                "UPDATE azioni SET prezzo_attuale = ?, variazione_percentuale = ? WHERE id = ?"
            );
            $stmt->execute([$newPrice, $newVariazionePercentuale, $id]);

            return [
                "success" => true,
                "message" => "Azione aggiornata con successo",
                "new_price" => $newPrice,
                "variazione_percentuale" => $newVariazionePercentuale
            ];
        } catch (PDOException $e) {
            error_log("Errore DB in update: " . $e->getMessage());
            return ["success" => false, "message" => "Errore DB in update: " . $e->getMessage()];
        }
    }
}
?>
