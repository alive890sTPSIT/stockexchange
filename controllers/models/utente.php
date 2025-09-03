<?php
//-----------------------------------------------------------------------------------
/**
 * Classe Utente
 * è tutta statica, i hate handle objects when they just behave the same
 * sql queries
 */
require_once __DIR__ . '/../DataBase.php';

class utente
{
    /**
     * Metodo: read
     * Scopo: Restituisce tutti gli utenti registrati
     * Parametri: Nessuno
     * Ritorno: array associativo contenente gli utenti oppure array vuoto in caso di errore
     */
    public static function read()
    {
        try {
            $stmt = DataBase::getConnection()->prepare("SELECT * FROM utenti");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Errore DB in read: " . $e->getMessage());
            return [];
        }
    }

    //-----------------------------------------------------------------------------------
    /**
     * Metodo: create
     * Scopo: Registra un nuovo utente nel database senza verificarne la validità
     * Parametri:
     *  - string $nome: nome dell utente
     *  - string $email: Email dell’utente
     *  - string $password: Password in chiaro da cifrare
     * Ritorno: true se la creazione va a buon fine, false altrimenti
     */
    public static function create($nome, $email, $password)
    {
        try {
            $checkStmt = DataBase::getConnection()->prepare("SELECT id FROM utenti WHERE email = ?");
            $checkStmt->execute([$email]);
            if ($checkStmt->rowCount() > 0) {
                return ["success" => false, "message" => "email già registrata"];
            }
            $stmt = DataBase::getConnection()->prepare("INSERT INTO utenti (nome, email, password_hash) VALUES (?, ?, ?)");
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt->execute([$nome, $email, $hashedPassword]);
            return ["success" => true, "message" => "registrazione completata con successo"];
        } catch (PDOException $e) {
            error_log("Errore DB in create: " . $e->getMessage());
            return ["success" => false, "message" => "Errore DB in create: " . $e->getMessage()];
        }
    }

    //-----------------------------------------------------------------------------------
    /**
     * Metodo: login
     * Scopo: Autentica un utente confrontando email e password
     * Parametri:
     *  - string $email: Email dell’utente
     *  - string $password: Password in chiaro
     * Ritorno: true se il login ha successo, false altrimenti
     */
    public static function login($email, $password)
    {
        try {
            // Prepara la query per cercare un utente con l'email fornita
            $stmt = DataBase::getConnection()->prepare("SELECT id, password_hash FROM utenti WHERE email = ?");
            // Esegue la query
            $stmt->execute([$email]);
            // Se non ci sono utenti con quell'email, registra il tentativo fallito e ritorna false
            if ($stmt->rowCount() === 0) {
                return ["success" => false, "message" => "Tentativo di login fallito (email non esistente): $email"];
            }
            // Recupera l’utente come array associativo
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            // Confronta la password inserita con quella salvata nel database
            if (password_verify($password, $user['password_hash'])) {
                // Se la sessione non è già attiva, la avvia
                if (session_status() !== PHP_SESSION_ACTIVE) {
                    session_start();
                }
                // Salva l'ID e l'email dell'utente nella sessione
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_email'] = $email;
                return ["success" => true, "message" => "login completato con successo"];
            } else {
                return ["success" => false, "message" => "Tentativo di login fallito (password errata): $email"];
            }
        } catch (PDOException $e) {
            error_log("Errore DB in login: " . $e->getMessage());
            return ["success" => false, "message" => "Errore DB in login: " . $e->getMessage()];
        }
    }
}
?>
