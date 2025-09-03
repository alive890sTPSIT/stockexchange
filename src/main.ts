import { UtentiController } from "./controllers/UtentiController.js";
import { AzioniController } from "./controllers/AzioniController.js";
import { PortafoglioController } from "./controllers/PortafoglioController.js";

window.onload = async () => {
  // --- Test UtentiController ---
  console.log("=== Testing UtentiController ===");

  // Register a new user
  const registerRes = await UtentiController.register({
    name: "testuser",
    email: "test@example.com",
    password_hash: "password123",
  });
  console.log("Register Response:", registerRes);

  // Login
  const loginRes = await UtentiController.login({
    email: "test@example.com",
    password_hash: "password123",
  });
  console.log("Login Response:", loginRes);

  // Store login status
  localStorage.setItem("loggedin", loginRes.success ? "true" : "false");
  const id=loginRes.data? loginRes.data.user_id:1;
  // --- Test AzioniController ---
  console.log("\n=== Testing AzioniController ===");

  // Fetch all stocks
  const azioniRes = await AzioniController.read();
  console.log("All Stocks:", azioniRes);

  // Fetch a specific stock (e.g., ID 1)
  const azioneRes = await AzioniController.readById(1);
  console.log("Stock with ID 1:", azioneRes);

  // --- Test PortafoglioController ---
  console.log("\n=== Testing PortafoglioController ===");

  // Buy a stock (e.g., 5 units of stock ID 1)
  const buyRes = await PortafoglioController.create({
    utente_id:id,
    azione_id: 1,
    quantita: 5
  });
  console.log("Buy Stock Response:", buyRes);

  // Fetch user's portfolio
  const portafoglioRes = await PortafoglioController.read();
  console.log("User Portfolio:", portafoglioRes);

  // --- Logout ---
  console.log("\n=== Testing Logout ===");
  const logoutRes = await UtentiController.logout();
  console.log("Logout Response:", logoutRes);
};
