var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AzioniController } from "../controllers/AzioniController.js";
export function listPortafoglio(items) {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-12" id="portafoglio-column">
          <!-- List group will go here -->
        </div>
      </div>
    </div>
  `;
    const container = template.content.firstElementChild;
    const portafoglioColumn = container.querySelector("#portafoglio-column");
    // Create Bootstrap list group
    const listGroup = document.createElement("ul");
    listGroup.className = "list-group";
    items.forEach((item) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">ID: ${item.id}</div>
          <div><strong>Azione ID:</strong> ${(_a = (yield AzioniController.readById(item.azione_id)).data) === null || _a === void 0 ? void 0 : _a.nome_azienda}</div>
          <div><strong>Quantità:</strong> ${item.quantita}</div>
        </div>
        <div class="text-end">
          <div><strong>Prezzo Acquisto:</strong> €${item.prezzo_acquisto}</div>
        </div>
      </div>
    `;
        listGroup.appendChild(listItem);
    }));
    portafoglioColumn.appendChild(listGroup);
    return container;
}
