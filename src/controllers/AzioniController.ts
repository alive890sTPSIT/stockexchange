interface Azione {
  id: number;
  simbolo: string;
  nome_azienda: string;
  settore: string | null;
  prezzo_attuale: number;
  variazione_percentuale: number | null;
}

class AzioniController {
  static async read(): Promise<{ success: boolean; data?: Azione[]; message?: string }> {
    return new Promise((resolve) => {
      $.ajax({
        url: "router.php?action=readAzioni",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, status, errorThrown) {
          resolve({
            success: false,
            message: `AJAX error: ${status} - ${errorThrown}`,
          });
        },
      });
    });
  }

  static async readById(id: number): Promise<{ success: boolean; data?: Azione; message?: string }> {
    return new Promise((resolve) => {
      $.ajax({
        url: `router.php?action=readAzioniById&id=${id}`,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, status, errorThrown) {
          resolve({
            success: false,
            message: `AJAX error: ${status} - ${errorThrown}`,
          });
        },
      });
    });
  }
}

export { AzioniController };
