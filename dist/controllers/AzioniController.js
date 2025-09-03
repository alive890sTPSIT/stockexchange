var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AzioniController {
    static read() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    static readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
export { AzioniController };
