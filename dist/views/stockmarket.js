var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Chart } from "../../node_modules/chart.js/dist/types";
export function stockmarket() {
    const template = document.createElement("template");
    template.innerHTML = `
    <h2 id="stockTitle">Andamento Azione</h2>
    <div style="max-width: 100%; height: 400px;">
      <canvas id="stockChart"></canvas>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="list-group" id="stockList"></div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title" id="selectedStockTitle">Seleziona un'azione</h5>
            <p class="card-text" id="selectedStockPrice">Prezzo: -</p>
            <div class="input-group mb-3">
              <input type="number" class="form-control" id="quantityInput" placeholder="Quantità" min="1" value="1">
              <button class="btn btn-primary" type="button" id="buyButton" disabled>Acquista</button>
            </div>
            <div id="buyMessage" class="alert" style="display: none;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
    const stockmarketElement = template.content.firstChild;
    const canvas = stockmarketElement.querySelector('#stockChart');
    const ctx = canvas.getContext('2d');
    const stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Explicitly type labels as an array of strings
            datasets: [{
                    label: 'Prezzo €',
                    data: [], // Explicitly type data as an array of numbers
                    borderColor: 'blue',
                    fill: false,
                }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Orario'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Prezzo (€)'
                    }
                }
            }
        }
    });
    let selectedStockId = 1;
    let selectedStockData = null;
    function updateData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`router.php?action=readAzioniById&id=${selectedStockId}`);
                const data = yield response.json();
                if (data.success && data.data) {
                    const time = new Date().toLocaleTimeString();
                    stockChart.data.labels.push(time);
                    stockChart.data.datasets[0].data.push(data.data.prezzo_attuale);
                    if (stockChart.data.labels.length > 20) {
                        stockChart.data.labels.shift();
                        stockChart.data.datasets[0].data.shift();
                    }
                    stockChart.update();
                    stockmarketElement.querySelector('#stockTitle').textContent = `Andamento Azione ${data.data.simbolo} (${data.data.nome_azienda})`;
                    selectedStockData = data.data;
                    updateBuySection(data.data);
                }
                else {
                    console.error("Errore nei dati ricevuti:", data.message);
                }
            }
            catch (error) {
                console.error("Errore nel recupero dati:", error);
            }
        });
    }
    function updateBuySection(stock) {
        stockmarketElement.querySelector('#selectedStockTitle').textContent = `${stock.simbolo} - ${stock.nome_azienda}`;
        stockmarketElement.querySelector('#selectedStockPrice').textContent = `Prezzo: €${stock.prezzo_attuale.toFixed(2)}`;
        stockmarketElement.querySelector('#buyButton').disabled = false;
    }
    function loadStocks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("router.php?action=readAzioni");
                const data = yield response.json();
                if (data.success && data.data) {
                    const stockList = stockmarketElement.querySelector('#stockList');
                    stockList.innerHTML = '';
                    data.data.forEach((stock, index) => {
                        const button = document.createElement('button');
                        button.type = 'button';
                        button.className = `list-group-item list-group-item-action ${index === 0 ? 'active' : ''}`;
                        button.textContent = `${stock.simbolo} - ${stock.nome_azienda}`;
                        button.dataset.id = stock.id + "";
                        button.addEventListener('click', () => {
                            selectedStockId = stock.id;
                            stockChart.data.labels = [];
                            stockChart.data.datasets[0].data = [];
                            updateData();
                            stockmarketElement.querySelectorAll('#stockList .list-group-item').forEach((btn) => {
                                btn.classList.remove('active');
                            });
                            button.classList.add('active');
                        });
                        stockList.appendChild(button);
                    });
                }
                else {
                    console.error("Errore nel caricamento delle azioni:", data.message);
                }
            }
            catch (error) {
                console.error("Errore nel recupero azioni:", error);
            }
        });
    }
    stockmarketElement.querySelector('#buyButton').addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        const quantity = parseInt(stockmarketElement.querySelector('#quantityInput').value);
        if (!quantity || quantity < 1) {
            showBuyMessage('Inserisci una quantità valida', 'alert-warning');
            return;
        }
        if (!selectedStockData) {
            showBuyMessage('Seleziona un\'azione', 'alert-warning');
            return;
        }
        try {
            const response = yield fetch("router.php?action=createPortafoglio", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    azione_id: selectedStockId,
                    quantita: quantity,
                    prezzo_acquisto: selectedStockData.prezzo_attuale
                })
            });
            const data = yield response.json();
            if (data.success) {
                showBuyMessage(`Acquisto effettuato: ${quantity} azioni di ${selectedStockData.simbolo}`, 'alert-success');
            }
            else {
                showBuyMessage(`Errore: ${data.message}`, 'alert-danger');
            }
        }
        catch (error) {
            console.error("Errore nell'acquisto:", error);
            showBuyMessage('Errore durante l\'acquisto', 'alert-danger');
        }
    }));
    function showBuyMessage(message, alertClass) {
        const alert = stockmarketElement.querySelector('#buyMessage');
        alert.textContent = message;
        alert.className = `alert ${alertClass}`;
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 5000);
    }
    setInterval(updateData, 2000);
    updateData();
    loadStocks();
    return stockmarketElement;
}
