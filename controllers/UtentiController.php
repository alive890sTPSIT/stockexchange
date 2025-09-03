<?php
require_once 'models/utente.php';
class UtentiController
{
    /**
     * Metodo: login
     * Scopo: Gestisce il login dell'utente e imposta la sessione
     * Parametri: Nessuno (usa $_POST)
     * Ritorno: array con esito e messaggio
     */
    public static function login()
    {
        try {
            // Verifica se la richiesta HTTP è di tipo POST
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $data = json_decode(file_get_contents("php://input"), true) ?? [];
                $email = $data['email'] ?? null;
                $password = $data['password_hash'] ?? null;

                // Sanifica l’email e la password ricevute tramite POST
                $email = filter_var($email, FILTER_SANITIZE_EMAIL);
                $password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8');

                // Controlla che l’email sia valida e che la password non sia vuota
                if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($password)) {
                    echo json_encode(["success" => false, "message" => "email or password non valide"]);
                }

                // Tenta il login con il modello utente
                $result = utente::login($email, $password);
                if ($result["success"]) {
                    echo json_encode([
                        "success" => true,
                        "message" => "Login Success",
                        "data" => ["user_id" => $_SESSION["user_id"]]
                    ]);
                    exit;
                } else {
                    echo json_encode(["success" => false, "message" => $result['message']]);
                }
            } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
                // return ['success' => false, 'message' => 'Visualizzazione pagina login'];
                echo json_encode(['success' => false, 'message' => 'Login Page']);
                exit;
            }
        } catch (Exception $e) {
            error_log("Errore nel controller: " . $e->getMessage());
            $_SESSION['error'] = 'Errore interno del server';
            echo json_encode(['success' => false, 'message' => "Errore nel controller: " . $e->getMessage()]);
            exit;
        }
    }

    //--------------------------------------------------------------------------------------------------------------
    /**
     * Metodo: registerUser
     * Scopo: Registra un nuovo utente nel sistema
     * Parametri: Nessuno (usa $_POST)
     * Ritorno: array con esito e messaggio
     */
    public static function register()
    {
        try {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $data = json_decode(file_get_contents("php://input"), true) ?? [];
                $email = $data['email'] ?? null;
                $password = $data['password_hash'] ?? null;
                $name = $data['name'] ?? null;

                // Sanifica l’email e la password ricevute da form POST
                $email = filter_var($email, FILTER_SANITIZE_EMAIL);
                $password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8');

                // Verifica che l'email sia valida e la password sia lunga almeno 6 caratteri
                if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
                    echo json_encode(["success" => false, "message" => "email or password non valide"]);
                }

                $result = utente::create($name, $email, $password);

                // Prova a creare un nuovo utente
                if ($result['success']) {
                    // return ['success' => true, 'message' => 'Registrazione completata con successo'];
                    echo json_encode([
                        'success' => true,
                        'message' => 'Register Success',
                        "data" => ["id" => DataBase::getConnection()->lastInsertId()]
                    ]);
                    exit;
                } else {
                    // In caso di errore, lancia un'eccezione
                    echo json_encode(['success' => false, 'message' => $result['message']]);
                }
            } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
                // Se è una GET, presumibilmente visualizzazione pagina registrazione
                // return ['success' => false, 'message' => 'Visualizzazione pagina registrazione'];
                echo json_encode(['success' => false, 'message' => 'Register Page']);
                exit;
            }
        } catch (Exception $e) {
            // Log dell’errore e gestione sessione
            error_log($e->getMessage());
            $_SESSION['error'] = 'Errore interno del server';
            // return ['success' => false, 'message' => 'Errore durante la registrazione.'];
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            exit;
        }
    }

    //--------------------------------------------------------------------------------------------------------------
    public static function logout()
    {
        session_unset(); // svuota $_SESSION
        session_destroy(); // distrugge la sessione
        echo json_encode([
            'success' => true,
            'message' => 'Logout effettuato correttamente'
        ]);
    }
}
?>
