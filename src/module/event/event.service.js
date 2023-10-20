import { EventModel } from "./event.model.js";

class EventService {
    #_productModel

    constructor() {
        this.#_productModel = new EventModel();
    }

    async getEvents() {
        return await this.#_productModel.getEvents();
    }

    async getEventById(id) {
        return await this.#_productModel.getEventById(id);
    }

    async createEvent(payload) {
        return await this.#_productModel.createEvent(payload);
    }

    async updateEvent(payload) {
        return await this.#_productModel.updateEvent(payload);
    }

    async deleteEvent(id) {
        return await this.#_productModel.deleteEvent(id);
    }
}

export default new EventService();