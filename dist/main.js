var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formAuthentication } from "./views/authenticate.js";
import { dashboard } from "./views/dashboard.js";
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    // --- Test UtentiController ---
    if (localStorage.getItem("loggein") === "true") {
        app_loader("dashboard");
    }
    else {
        app_loader("authenticate");
    }
});
function app_loader(page) {
    const app = document.getElementById("app");
    if (!app)
        return;
    app.innerHTML = "";
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
