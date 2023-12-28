import { ExchangeModel } from "./exchange.model.js";

class ExchangeService {
    #_exchangeModel

    constructor() {
        this.#_exchangeModel = new ExchangeModel();
    }

    async getExchanges() {
        return await this.#_exchangeModel.getExchanges();
    }

    async getPendingExchanges() {
        return await this.#_exchangeModel.getPendingExchanges();
    }

    async getFinishedExchanges() {
        return await this.#_exchangeModel.getFinishedExchanges();
    }

    async getExchangeById(id) {
        return await this.#_exchangeModel.getExchangeById(id);
    }

    async getExchangeByUserId(id) {
        return await this.#_exchangeModel.getExchangeByUserId(id);
    }

    async getExchangeByIdNotChanged(id) {
        return await this.#_exchangeModel.getExchangeByIdNotChanged(id);
    }

    async createExchange(payload) {
        return await this.#_exchangeModel.createExchange(payload);
    }

    async finishExchange(payload) {
        return await this.#_exchangeModel.finishExchange(payload);
    }

    async cancelExchange(id) {
        return await this.#_exchangeModel.cancelExchange(id);
    }
}

export default new ExchangeService();