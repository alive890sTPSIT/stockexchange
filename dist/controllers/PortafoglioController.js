var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PortafoglioController {
    /**
     * Reads all portfolio items for the logged-in user.
     */
    static read() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                $.ajax({
                    url: "router.php?action=readPortafoglio",
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
        });
    }
    /**
     * Reads a specific portfolio item by its ID.
     */
    static readById(azione_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                $.ajax({
                    url: `router.php?action=readById&azione_id=${azione_id}`,
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
        });
    }
    /**
     * Creates a new portfolio item.
     */
    static create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                $.ajax({
                    url: "router.php?action=createPortafoglio",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(item),
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
        });
    }
}
export { PortafoglioController };
