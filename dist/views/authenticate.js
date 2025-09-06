var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UtentiController } from "../controllers/UtentiController.js";
export function btnLogOut() {
    const template = document.createElement("template");
    template.innerHTML = `
    <button class="btn btn-danger" id="btnLogOut">Log out</button>
  `;
    const button = template.content.querySelector("#btnLogOut");
    button.onclick = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        UtentiController.logout().then((res) => {
            if (res.success) {
                document.cookie.split(";").forEach(cookie => {
                    const name = cookie.split("=")[0].trim();
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                });
                location.reload();
            }
            else {
                alert(res.message || "Logout failed");
            }
        });
    });
    return button;
}
export function formAuthentication() {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="container">
      <div class="container">
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="tab-login" data-bs-toggle="pill" href="#pills-login" role="tab"
              aria-controls="pills-login" aria-selected="true">Login</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="tab-register" data-bs-toggle="pill" href="#pills-register" role="tab"
              aria-controls="pills-register" aria-selected="false">Register</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form>
              <p class="text-center">Accedi</p>
              <div class="form-outline mb-4">
                <input type="text" id="loginName" class="form-control" inputmode="email" />
                <label class="form-label" for="loginName">email</label>
              </div>
              <div class="form-outline mb-4">
                <input type="password" id="loginPassword" class="form-control" />
                <label class="form-label" for="loginPassword">Password</label>
              </div>
              <button id="btnSign" type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
            </form>
          </div>
          <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form>
              <p class="text-center">Register</p>
              <div class="form-outline mb-4">
                <input type="text" id="registerName" class="form-control" />
                <label class="form-label" for="registerName">Name</label>
              </div>
              <div class="form-outline mb-4">
                <input type="email" id="registerEmail" class="form-control" />
                <label class="form-label" for="registerEmail">Email</label>
              </div>
              <div class="form-outline mb-4">
                <input type="password" id="registerPassword" class="form-control" />
                <label class="form-label" for="registerPassword">Password</label>
              </div>
              <button type="submit" class="btn btn-primary btn-block mb-3">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
    const card = template.content.cloneNode(true);
    const container = card.querySelector(".container > .container");
    const formRegister = container.querySelector("#pills-register form");
    formRegister.onsubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        UtentiController.register({
            name: (formRegister.querySelector("#registerName")).value,
            password_hash: (formRegister.querySelector("#registerPassword")).value,
            email: (formRegister.querySelector("#registerEmail")).value,
        }).then((res) => {
            if (res.success) {
                if (res.success)
                    location.reload();
            }
        });
    });
    const formSign = container.querySelector("#pills-login form");
    formSign.onsubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        console.log((formSign.querySelector("#loginName")).value);
        console.log((formSign.querySelector("#loginPassword")).value);
        UtentiController.login({
            email: (formSign.querySelector("#loginName")).value,
            password_hash: (formSign.querySelector("#loginPassword")).value
        }).then((res) => {
            if (res.success) {
                localStorage.setItem("loggein", "true");
                location.reload();
            }
        });
    });
    return container;
}
