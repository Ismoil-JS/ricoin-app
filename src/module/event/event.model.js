import { Postgres } from "../../postgres/postgres.js";

export class EventModel {
    #_postgres

    constructor() {
        this.#_postgres = new Postgres();
    }

    async getEvents() {
        const query = `SELECT * FROM events ORDER BY date`;
        return await this.#_postgres.fetch(query);
    }

    async getEventById(id) {
        const query = `SELECT * FROM events WHERE id = $1`;
        return await this.#_postgres.fetch(query, id);
    }

    async createEvent(payload) {
        const query = `INSERT INTO events (name, date, coins, location) VALUES ($1, $2, $3, $4) RETURNING *`;
        return await this.#_postgres.fetch(query, payload.name, payload.date, payload.coins, payload.location);
    }

    async updateEvent(payload) {
        const product = await this.getEventById(payload.id);

        const { name, date, coins, location } = payload; // Destructure payload

        const query = `
            UPDATE events 
            SET 
                name = $1,
                date = $2,
                coins = $3,
                location = $4,
            WHERE id = $5
            RETURNING *
        `;

        if (product.length === 0) {
            return null;
        }

        return await this.#_postgres.fetch(
            query,
            name || product[0].name, // Use payload value if defined, otherwise use the existing value
            date || product[0].date,
            coins || product[0].coins,
            location || product[0].location,
            payload.id
        );
    }


    async deleteEvent(id) {
        const query = `DELETE FROM events WHERE id = $1`;
        return await this.#_postgres.fetch(query, id);
    }
}