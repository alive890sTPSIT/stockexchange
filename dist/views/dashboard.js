var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { listPortafoglio } from "./Portafoglio.js";
import { PortafoglioController } from "../controllers/PortafoglioController.js";
//@ts-ignore
import { startGrafici } from "./startGrafici.js";
export function dashboard() {
    var _a, _b;
    const template = document.createElement("template");
    template.innerHTML = `
        <div class="container-xxl mt-4 mb-4">
            <h1 class="text-center">Stock Exchange</h1>
            <p class="text-center">Gestisci le tue azioni e controlla il tuo portafoglio</p>
            <div class="row">
                <div class="col-2">
                    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
                            type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
                        <button class="nav-link" id="v-pills-azioni-tab" data-bs-toggle="pill" data-bs-target="#v-pills-azioni"
                            type="button" role="tab" aria-controls="v-pills-azioni" aria-selected="false">Azioni</button>
                        <button class="nav-link" id="v-pills-portafoglio-tab" data-bs-toggle="pill"
                            data-bs-target="#v-pills-portafoglio" type="button" role="tab" aria-controls="v-pills-portafoglio"
                            aria-selected="false">Portafoglio</button>
                    </div>
                </div>
                <div class="col-10">
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"
                            tabindex="0">This page is dedicated to the management of your stocks and portfolio</div>
                        <div class="tab-pane fade" id="v-pills-azioni" role="tabpanel" aria-labelledby="v-pills-azioni-tab"
                            tabindex="0"></div>
                        <div class="tab-pane fade" id="v-pills-portafoglio" role="tabpanel" aria-labelledby="v-pills-portafoglio-tab"
                            tabindex="0"></div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="modalConfermaEliminazione" tabindex="-1" aria-labelledby="modalConfermaEliminazioneLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalConfermaEliminazioneLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Confermi l'eliminazione?</p>
                            <p></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="btnConfermaEliminazione">Elimina</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    const dashboard = template.content.firstElementChild;
    // Qui andranno aggiornati anche gli event listener, ma per ora li lascio commentati
    (_a = dashboard.querySelector("#v-pills-azioni-tab")) === null || _a === void 0 ? void 0 : _a.addEventListener('show.bs.tab', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            dashboard.querySelector("#v-pills-azioni").innerHTML = "";
            dashboard.querySelector("#v-pills-azioni")
                .innerHTML = yield fetch("./src/views/grafici.html").then(res => res.text());
            startGrafici();
        });
    });
    (_b = dashboard.querySelector("#v-pills-portafoglio-tab")) === null || _b === void 0 ? void 0 : _b.addEventListener('show.bs.tab', (event) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        dashboard.querySelector("#v-pills-portafoglio").innerHTML = "";
        dashboard.querySelector("#v-pills-portafoglio")
            .appendChild(listPortafoglio((_a = (yield PortafoglioController.read()).data) !== null && _a !== void 0 ? _a : []));
    }));
    return dashboard;
}
