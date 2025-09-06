import { formAuthentication } from "./views/authenticate.js";
import { dashboard } from "./views/dashboard.js";
window.onload = async () => {

  // --- Test UtentiController ---
  if (localStorage.getItem("loggein") === "true") {
    app_loader("dashboard");
  }
  else {
    app_loader("authenticate");
  }
}

function app_loader(page: "dashboard" | "authenticate") {
  const app=document.getElementById("app");
  if(!app) return;
  app.innerHTML="";
  switch (page) {
    case "dashboard":
      app.appendChild(dashboard());
      break;
    case "authenticate":
      app.appendChild(formAuthentication());
      break;
    default:
      alert("UI not found");
      break;
  }
  console.log("app loader ended");
}