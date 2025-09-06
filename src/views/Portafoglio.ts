import { PortafoglioItem } from "../models/Portafoglio.js";
import { AzioniController } from "../controllers/AzioniController.js";
export function listPortafoglio(items: PortafoglioItem[]): HTMLElement {
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

  const container = template.content.firstElementChild as HTMLElement;
  const portafoglioColumn = container.querySelector("#portafoglio-column") as HTMLElement;

  // Create Bootstrap list group
  const listGroup = document.createElement("ul");
  listGroup.className = "list-group";

  items.forEach(async (item) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">ID: ${item.id}</div>
          <div><strong>Azione ID:</strong> ${(await AzioniController.readById(item.azione_id)).data?.nome_azienda}</div>
          <div><strong>Quantità:</strong> ${item.quantita}</div>
        </div>
        <div class="text-end">
          <div><strong>Prezzo Acquisto:</strong> €${item.prezzo_acquisto}</div>
        </div>
      </div>
    `;
    listGroup.appendChild(listItem);
  });

  portafoglioColumn.appendChild(listGroup);
  return container;
}
