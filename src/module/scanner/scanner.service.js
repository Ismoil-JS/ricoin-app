import { ScannerModel } from "./scanner.model.js";

class ScannerService {
    #_scannerModel

    constructor() {
        this.#_scannerModel = new ScannerModel();
    }

    async createEarned(payload) {
        return await this.#_scannerModel.createEarned(payload);
    }

    async checkEarned(payload) {
        return await this.#_scannerModel.checkEarned(payload);
    }
}

export default new ScannerService();