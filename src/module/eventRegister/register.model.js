import { Postgres } from "../../postgres/postgres.js";

export class RegisterModel {
    #_postgres

    constructor() {
        this.#_postgres = new Postgres();
    }

    async createRegisterUer({ user_id, event_id }) {
        const query = 'UPDATE users SET events = array_append(events, $1) WHERE id = $2 RETURNING *';
        return await this.#_postgres.fetch(query, event_id, user_id);
    }

    async createRegisterEvent({ user_id, event_id }) {
        const query = 'UPDATE events SET participants = array_append(participants, $1) WHERE id = $2 RETURNING *';
        return await this.#_postgres.fetch(query, user_id, event_id);
    }
}