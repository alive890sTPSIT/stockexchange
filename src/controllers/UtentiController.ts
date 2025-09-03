import { ApiReponse } from "../models/ApiResponse";

class UtentiController {
    static async login(
        credenziali: { password_hash: string, email: string }
    ): Promise<ApiReponse<{ user_id: number }>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=login",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(credenziali),
                dataType: "json",
                success: function (data: ApiReponse<{ user_id: number }>) {
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

    static async register(
        credenziali: { name: string, password_hash: string, email: string }
    ): Promise<ApiReponse<{ id: number }>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=register",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(credenziali),
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

    static async logout(): Promise<ApiReponse<null>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=logout",
                method: "GET",
                contentType: "application/json",
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

export { UtentiController };
