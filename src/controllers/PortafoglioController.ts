import { ApiReponse } from "../models/ApiResponse.js";

interface PortafoglioItem {
    id?: number;
    utente_id: number;
    azione_id: number;
    quantita: number;
    prezzo_acquisto: number;
}

class PortafoglioController {
    /**
     * Reads all portfolio items for the logged-in user.
     */
    static async read(): Promise<ApiReponse<PortafoglioItem[]>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=readPortafoglio",
                method: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (data: ApiReponse<PortafoglioItem[]>) {
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

    /**
     * Reads a specific portfolio item by its ID.
     */
    static async readById(azione_id: number): Promise<ApiReponse<PortafoglioItem>> {
        return new Promise((resolve) => {
            $.ajax({
                url: `router.php?action=readById&azione_id=${azione_id}`,
                method: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (data: ApiReponse<PortafoglioItem>) {
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

    /**
     * Creates a new portfolio item.
     */
    static async create(item: Omit<PortafoglioItem, "id"|"prezzo_acquisto">): Promise<ApiReponse<{ id: number }>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=createPortafoglio",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(item),
                dataType: "json",
                success: function (data: ApiReponse<{ id: number }>) {
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

    /**
     * Deletes a portfolio item by its ID.
     */
    static async delete(id: number): Promise<ApiReponse<null>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=deletePortafoglio",
                method: "DELETE",
                contentType: "application/json",
                data: JSON.stringify({ id }),
                dataType: "json",
                success: function (data: ApiReponse<null>) {
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

export { PortafoglioController };
