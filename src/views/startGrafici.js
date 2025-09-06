import { AzioniController } from './dist/controllers/AzioniController.js';
import { PortafoglioController } from './dist/controllers/PortafoglioController.js';

// Variabili globali
let azioneChart;
let selectedAzioneId = null;
let updateInterval;
// Variabili globali per memorizzare i dati storici
let historicalData = {};
let historicalLabels = [];

// Funzione per aggiornare il grafico
async function updateChart(simbolo, nome_azienda) {
    const response = await AzioniController.readById(selectedAzioneId);
    if (response.success && response.data) {
        const azione = response.data;
        const ctx = document.getElementById('azioneChart').getContext('2d');
        // Inizializza i dati storici per questa azione, se non esistono
        if (!historicalData[selectedAzioneId]) {
            historicalData[selectedAzioneId] = [];
            historicalLabels = [];
        }
        // Aggiungi il nuovo prezzo e il timestamp ai dati storici
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();
        historicalData[selectedAzioneId].push(azione.prezzo_attuale);
        historicalLabels.push(timeLabel);
        // Limita il numero di punti visualizzati (es. ultimi 10)
        const maxPoints = 10;
        if (historicalData[selectedAzioneId].length > maxPoints) {
            historicalData[selectedAzioneId].shift();
            historicalLabels.shift();
        }
        const data = {
            labels: historicalLabels,
            datasets: [{
                label: `${simbolo} - ${nome_azienda}`,
                data: historicalData[selectedAzioneId],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Andamento ${simbolo} - ${nome_azienda} (€${azione.prezzo_attuale}, ${azione.variazione_percentuale ? azione.variazione_percentuale + '%' : 'N/D'})`
                    },
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Orario'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Prezzo'
                        }
                    }
                }
            },
        };
        // Distruggi il grafico precedente se esiste
        if (azioneChart) {
            azioneChart.destroy();
        }
        // Crea il nuovo grafico
        azioneChart = new Chart(ctx, config);
    } else {
        console.error('Errore nel caricamento dei dati:', response.message);
    }
}

// Funzione per aggiungere l'azione selezionata al portafoglio
async function aggiungiAlPortafoglio() {
    if (!selectedAzioneId) return;
    const response = await AzioniController.readById(selectedAzioneId);
    if (response.success && response.data) {
        const azione = response.data;
        const item = {
            azione_id: selectedAzioneId,
            simbolo: azione.simbolo,
            nome_azienda: azione.nome_azienda,
            quantita: 1, // Quantità predefinita
        };
        const result = await PortafoglioController.create(item);
        if (result.success) {
            alert(`Azione ${azione.simbolo} aggiunta al portafoglio!`);
        } else {
            alert(`Errore: ${result.message}`);
        }
    } else {
        alert('Errore nel caricamento dei dati dell\'azione.');
    }
}

// Funzione per caricare la lista delle azioni
async function loadAzioni() {
    const response = await AzioniController.read();
    if (response.success && response.data) {
        const azioniList = document.getElementById('azioniList');
        const btnAggiungi = document.getElementById('aggiungiAlPortafoglioBtn');
        azioniList.innerHTML = '';
        response.data.forEach(azione => {
            const listItem = document.createElement('a');
            listItem.href = '#';
            listItem.className = 'list-group-item list-group-item-action';
            listItem.textContent = `${azione.simbolo} - ${azione.nome_azienda}`;
            listItem.onclick = () => selectAzione(azione.id, azione.simbolo, azione.nome_azienda);
            azioniList.appendChild(listItem);
        });
        if (response.data.length > 0) {
            selectAzione(response.data[0].id, response.data[0].simbolo, response.data[0].nome_azienda);
        }
    } else {
        alert('Errore nel caricamento delle azioni: ' + (response.message || 'Dati non disponibili'));
    }
}

// Funzione per selezionare un'azione
function selectAzione(id, simbolo, nome_azienda) {
    selectedAzioneId = id;
    clearInterval(updateInterval);
    // Resetta i dati storici quando si cambia azione
    historicalData = {};
    historicalLabels = [];
    updateChart(simbolo, nome_azienda);
    updateInterval = setInterval(() => updateChart(simbolo, nome_azienda), 3000);
    // Abilita il pulsante "Aggiungi al Portafoglio"
    document.getElementById('aggiungiAlPortafoglioBtn').disabled = false;
    document.getElementById('aggiungiAlPortafoglioBtn').onclick = aggiungiAlPortafoglio;
}

// Carica la lista delle azioni all'avvio
export function startGrafici() {
    loadAzioni();
    // Inizialmente il pulsante è disabilitato
    document.getElementById('aggiungiAlPortafoglioBtn').disabled = true;
}