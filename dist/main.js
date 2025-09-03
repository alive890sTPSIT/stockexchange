var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UtentiController } from "./controllers/UtentiController.js";
import { AzioniController } from "./controllers/AzioniController.js";
import { PortafoglioController } from "./controllers/PortafoglioController.js";
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    // --- Test UtentiController ---
    console.log("=== Testing UtentiController ===");
    // Register a new user
    const registerRes = yield UtentiController.register({
        name: "testuser",
        email: "test@example.com",
        password_hash: "password123",
    });
    console.log("Register Response:", registerRes);
    // Login
    const loginRes = yield UtentiController.login({
        email: "test@example.com",
        password_hash: "password123",
    });
    console.log("Login Response:", loginRes);
    // Store login status
    localStorage.setItem("loggedin", loginRes.success ? "true" : "false");
    const id = loginRes.data ? loginRes.data.user_id : 1;
    // --- Test AzioniController ---
    console.log("\n=== Testing AzioniController ===");
    // Fetch all stocks
    const azioniRes = yield AzioniController.read();
    console.log("All Stocks:", azioniRes);
    // Fetch a specific stock (e.g., ID 1)
    const azioneRes = yield AzioniController.readById(1);
    console.log("Stock with ID 1:", azioneRes);
    // --- Test PortafoglioController ---
    console.log("\n=== Testing PortafoglioController ===");
    // Buy a stock (e.g., 5 units of stock ID 1)
    const buyRes = yield PortafoglioController.create({
        utente_id: id,
        azione_id: 1,
        quantita: 5
    });
    console.log("Buy Stock Response:", buyRes);
    // Fetch user's portfolio
    const portafoglioRes = yield PortafoglioController.read();
    console.log("User Portfolio:", portafoglioRes);
    // --- Logout ---
    console.log("\n=== Testing Logout ===");
    const logoutRes = yield UtentiController.logout();
    console.log("Logout Response:", logoutRes);
});
