import { RegisterModel } from "./register.model.js";

class RegisterService {
    #_service

    constructor() {
        this.#_service = new RegisterModel();
    }

    async createRegisterUser({ user_id, event_id }) {
        return await this.#_service.createRegisterUer({ user_id, event_id });
    }

    async createRegisterEvent({ user_id, event_id }) {
        return await this.#_service.createRegisterEvent({ user_id, event_id });
    }
}

export default new RegisterService();