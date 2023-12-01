import { Postgres } from "../../postgres/postgres.js";

export class ScannerModel {
    #_postgres

    constructor() {
        this.#_postgres = new Postgres();
    }

    async createEarned(payload) {
        const query = `INSERT INTO earned_coins (user_id, event_id) VALUES ($1, $2) RETURNING *;`;

        return await this.#_postgres.fetch(query, payload.user_id, payload.event_id);
    }

    async checkEarned(payload) {
        const query = `SELECT * FROM earned_coins WHERE user_id = $1 AND event_id = $2;`;

        return await this.#_postgres.fetch(query, payload.user_id, payload.event_id);
    }
}
